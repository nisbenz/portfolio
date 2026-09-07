---
title: "Benchmarking a from-scratch matmul against OpenBLAS"
date: "2026-09-02"
description: "How TensorLib's blocked AVX2+FMA matmul kernel works: packed-RHS tiling, micro-kernels, and what the numbers look like next to a battle-tested BLAS."
tags: ["tensorlib", "simd", "c"]
---

Matrix multiplication is the hot loop of deep learning, so when I started
TensorLib  a pure-C deep learning library with zero external ML
dependencies  it was obvious the whole project would live or die by my
matmul. This post is a build log of that kernel.

## The naive version is a memory problem

The textbook triple loop is not slow because of flops; it's slow because it
walks memory in the worst possible pattern. Each inner product streams a
full row of A and a full column of B, and columns of a row-major matrix are
stride-`n` apart  every load misses cache.

## Blocked tiling + packed RHS

The fix is classic: block the matrices so working sets fit in L1/L2, and
repack the right-hand side so the micro-kernel reads it contiguously.

```c
// blocked matmul: C[M,N] += A[M,K] * B_packed[K,N]
for (int jc = 0; jc < N; jc += NC) {
  pack_panelB(B, ldB, K, jc, NC, B_packed);
  for (int pc = 0; pc < K; pc += KC) {
    for (int ic = 0; ic < M; ic += MC) {
      micro_kernel(A + ..., B_packed, C + ..., MC, KC, NC, ldC);
    }
  }
}
```

The packing step copies each panel of B into a contiguous buffer once per
block row, and then the micro-kernel can do dense SIMD loads instead of
gathered strided ones. That single extra pass over B is what pays for the
entire scheme.

## The micro-kernel

The inner kernel keeps 8 rows of A resident in registers and broadcasts
elements of B against them with FMA:

```c
for (int p = 0; p < KC; p++) {
  __m256 b0 = _mm256_load_ps(B_packed + p * NC);
  for (int i = 0; i < 8; i++) {
    acc[i] = _mm256_fmadd_ps(_mm256_broadcast_ss(Ap + p), b0, acc[i]);
  }
}
```

Eight accumulators, one broadcast per row, one vector load per column  the
arithmetic intensity works out so the kernel is compute-bound rather than
load-bound, which is the whole game.

## Numbers

I benchmarked against OpenBLAS's `cblas_sgemm` on the same machine, same
threading rules. The gap at large sizes is real  OpenBLAS wins, obviously 
but the interesting part is how small the gap gets once packing and blocking
are in place, and exactly where the gap opens up (cache-aliasing sizes,
odd N, transposed layouts).

I'll publish the actual benchmark table and the profiling session in a
follow-up post, along with what didn't work: my first two kernel shapes, and
why packed-RHS beat packed-LHS for my access pattern.
