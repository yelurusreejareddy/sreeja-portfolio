# Sreeja Reddy Yeluru — Portfolio

Personal portfolio site built with React, Vite, Tailwind CSS, and Framer Motion.

## Stack

- React 19 + Vite
- Tailwind CSS v4
- Framer Motion for animation
- `@huggingface/transformers` (transformers.js) for the in-browser chatbot

## The chatbot

The "Ask about me" chatbot answers visitor questions about my background, research, and
projects — entirely client-side, no backend or paid API.

**How it works:** questions are embedded in-browser with `Xenova/all-MiniLM-L6-v2`
(via transformers.js, running as ONNX/WASM) and matched against a small set of
pre-written, fact-checked answers using a hybrid of cosine similarity and an
IDF-weighted keyword score (`src/lib/chatEngine.js`). The keyword layer exists because
raw embedding similarity alone misranks some short or ambiguous phrasings — e.g. a
jargon-heavy answer can score lower on cosine similarity than an unrelated one for a
casual query, so keyword overlap (weighted by how rare/specific each word is across
the whole topic set) corrects for that.

**Why not a generative model?** I evaluated swapping this for a small LLM running
in-browser (`Qwen2.5-0.5B` / `1.5B-Instruct` via transformers.js) that would read
retrieved context and write a real answer instead of picking a pre-written one. In
testing, free-form generation fabricated specifics that were never in the provided
context (e.g. inventing file formats a project never used) even with explicit
grounding instructions — a known failure mode of small instruction-tuned models, not
specific to that model choice. A constrained "pick the best existing answer" variant
avoided fabrication but wasn't more accurate than the tuned retrieval system on the
same test set. Since the chatbot represents real professional background to
recruiters, I kept retrieval-only: it's fully accurate to the underlying facts, has
no hallucination risk, and is faster and free to run for every visitor regardless of
their device.
