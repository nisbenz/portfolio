import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
};

const projects = [
  {
    name: "TensorLib",
    url: "https://github.com/nisbenz/TensorLib",
    stack: "C · SIMD (AVX2/FMA) · CMake · OpenMP",
    desc: "A from-scratch, pure-C deep learning library for CPU-only training with zero external ML dependencies (~6,000 lines, 33 unit tests).",
    points: [
      "Dynamic reverse-mode autograd engine spanning 23 differentiable operations, with stale-graph detection and broadcast-gradient reduction.",
      "Composable neural network module system (Linear, LayerNorm, Multi-Head Causal Attention) culminating in a full GPT-style Transformer decoder — trained a 2M-parameter model on Tiny Shakespeare end-to-end.",
      "AdamW/SGD optimizers with gradient clipping and versioned, transaction-safe checkpointing for save/resume training.",
      "Blocked AVX2+FMA SIMD matmul kernel with packed-RHS tiling, benchmarked directly against OpenBLAS.",
    ],
  },
  {
    name: "mAIcro",
    url: "https://github.com/MicroClub-USTHB/mAIcro",
    stack: "Python · FastAPI · Gemini · Qdrant · Docker",
    desc: "Stateless, open-source AI knowledge-management service that centralizes organizational information — open-sourced and extended by community contributors.",
    points: [
      "RAG pipeline with Google Gemini and Qdrant Cloud, using hybrid Vector + BM25 search optimized by Reciprocal Rank Fusion.",
      "Real-time sync via the Discord Gateway API.",
    ],
  },
  {
    name: "GPT-2 Inference Engine",
    url: "https://github.com/nisbenz/GPT-2-Inference-Engine",
    stack: "C++ · ggml · CUDA · CMake",
    desc: "Pure C++ inference engine for GPT-2 (GGUF format) built on ggml.",
    points: [
      "Weight parsing, BPE tokenization, and the full Transformer architecture.",
      "CUDA GPU acceleration with customizable dynamic sampling (temperature, top-k).",
    ],
  },
  {
    name: "I-JEPA From Scratch",
    url: "https://github.com/nisbenz/I-JEPA_From_Scratch",
    stack: "Python · PyTorch",
    desc: "Educational implementation of I-JEPA (Image-based Joint-Embedding Predictive Architecture), a self-supervised vision model trained on CIFAR-10.",
    points: [
      "Full pipeline: multi-block context/target masking, a ViT context encoder, an EMA-updated target encoder, and a latent-space predictor.",
      "Validated with a linear probe well above the random baseline.",
    ],
  },
  {
    name: "Mini-Transformer",
    url: "https://github.com/nisbenz/Mini-Transformer",
    stack: "Python · PyTorch",
    desc: "Lightweight English → Darija translator, trained on ~16k sentence pairs, built to learn the Transformer architecture from the inside.",
    points: [],
  },
  {
    name: "ScratchNet",
    url: "https://github.com/nisbenz/ScratchNet",
    stack: "C++",
    desc: "Neural network implemented from scratch in C++.",
    points: [],
  },
];

export default function ProjectsPage() {
  return (
    <div>
      <h1>Projects</h1>
      <p className="muted">
        Things I built to understand how they actually work.
      </p>
      {projects.map((project) => (
        <section key={project.name} className="section-entry">
          <h3>
            <a href={project.url} target="_blank" rel="noreferrer">
              {project.name}
            </a>
          </h3>
          <p className="stack">{project.stack}</p>
          <p>{project.desc}</p>
          {project.points.length > 0 && (
            <ul>
              {project.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </div>
  );
}
