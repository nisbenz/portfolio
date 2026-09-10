---
title: "Tensorlib: building the pieces of a language model from scratch"
date: "2026-09-02"
description: "Why I built Tensorlib without an ML dependency, how its layers fit together, and what it takes to make a from-scratch project genuinely useful."
tags: ["tensorlib", "deep-learning", "c"]
---

I wanted to train a language model from scratch.

Training a transformer with PyTorch is wonderfully easy. A few modules, a
dataset, an optimizer, and a training loop are enough to get a model moving.
That convenience is exactly what made me curious about everything underneath
it: how tensors are represented, how gradients make their way through a
computation, and how a decoder becomes a trainable language model.

So I decided to build the infrastructure myself, without an ML dependency.
And huzzah: Tensorlib was born.

Tensorlib is a small, from-scratch deep-learning library written in C. The
goal is practical and personal: build enough of the stack that a language
model can be defined, trained, tested, and understood end to end.

## The stack, one layer at a time

The useful way to think about Tensorlib is as a set of layers. Each layer
depends on the one below it, but each also has a clear responsibility.

```text
Layer 3   decoder architecture
Layer 2   neural-network modules
Layer 1   autograd
Layer 0   tensor mechanics
```

This structure keeps the project from becoming a collection of special cases.
The transformer is the thing I want to train, but it should be assembled from
general pieces rather than implemented as one large model-specific program.

## Layer 0: tensor mechanics, the building blocks

Everything starts with the tensor itself.

At this layer, Tensorlib needs to answer the basic questions: where are the
values stored, what shape do they have, how are indices mapped to memory, and
what does it mean to apply an operation to them? The first operations are the
building blocks for everything higher up: creating and reshaping tensors,
elementwise arithmetic, reductions, matrix multiplication, and the other
small operations that neural-network code relies on.

This layer is deliberately boring. That is a compliment. If shape handling,
memory ownership, and numerical operations are unreliable here, an autograd
engine can only make the resulting bugs harder to find.

It is also where performance starts to matter. A tensor library does not need
to be the fastest implementation in the world to be useful, but it does need
to have predictable behavior and avoid turning every higher-level operation
into an accidental memory and allocation problem.

## Layer 1: the autograd engine

The next layer is a general way to implement backpropagation.

Instead of writing a separate backward pass for an entire model, Tensorlib
records the operations that produced each tensor and connects them into a
computation graph. Each operation knows how to compute its local gradients.
When a loss is produced, the autograd engine can walk that graph in reverse,
propagating gradients back to the parameters that contributed to the result.

The important part is the separation of concerns:

- tensor operations define their forward computation and local derivative;
- the graph keeps track of how those operations were composed;
- the backward pass applies the chain rule across the whole computation.

That makes autograd useful beyond a transformer. A new differentiable tensor
operation should not require writing a new backward pass for every model that
uses it. It only needs a correct local gradient and the right bookkeeping.

## Layers 2 and 3: modules and a decoder architecture

Once tensors and gradients work, neural-network code can become ordinary
composition again.

The module layer gives the model a structure: parameters can be registered,
modules can contain other modules, and the whole model can switch between
training and evaluation behavior. Linear layers, embeddings, activations,
normalization, and attention are useful not because they are individually
surprising, but because they provide a vocabulary for describing a network.

On top of those modules, Tensorlib can express a decoder-only transformer:
token embeddings, positional information, masked self-attention, a feed-forward
block, residual connections, normalization, and a language-model head. The
architecture is familiar; the interesting part is that every piece of it is
running on infrastructure I built from the bottom up.

That is the point where the project stops being a tensor exercise. A complete
decoder has to deal with real model concerns: keeping dimensions consistent,
preserving the causal mask, sharing parameters correctly, producing logits,
and turning those logits into a loss that can flow through the entire stack.

## Testing and benchmarking: more than a proof of concept

I did not want Tensorlib to be just another proof of concept that can run one
happy-path example. A from-scratch project is only useful if it can tell me
when it is wrong.

Testing therefore happens at several levels. Small tensor operations need
shape and value checks. The autograd engine needs numerical gradient checks.
Modules need tests that verify parameter registration and gradient flow. The
decoder needs integration tests that exercise the full forward and backward
passes together.

Benchmarking has a similar role. Benchmarks are valuable because they show
where the implementation spends its time, whether an optimization actually
helped, and which trade-offs are being made in the name of simplicity.

The standard I am aiming for is modest but meaningful: Tensorlib should be
correct enough to trust, complete enough to train a small language model, and
fast enough that experimentation is possible.

## What Tensorlib is for

Tensorlib is an attempt to make the machinery behind language-model training
visible again. The final transformer is only a few layers of code, but those
layers rest on decisions about memory, graphs, gradients, parameters, and
numerical behavior.

Building all of that from scratch is slower than importing a framework, but
that is part of the appeal. Tensorlib is mostly a technical flex and a way to
learn the architecture underneath the abstractions. Every layer is something
I can inspect, question, break, and improve.

I am trying to understand how the pieces fit together, and to make the result
useful enough to train a small language model from the ground up. Tensorlib is
the result.
