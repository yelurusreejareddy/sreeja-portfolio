# Sreeja Reddy Yeluru — Portfolio

Personal portfolio site built with React, Vite, Tailwind CSS, and Framer Motion.

## Stack

- React 19 + Vite
- Tailwind CSS v4
- Framer Motion for animation
- `@huggingface/transformers` (transformers.js) for the in-browser chatbot

## The chatbot

The "Ask about me" chatbot answers visitor questions about my background, research, and
projects entirely client-side, no backend or paid API.

**How it works:** questions are embedded in-browser with `Xenova/all-MiniLM-L6-v2`
(via transformers.js, running as ONNX/WASM) and matched against a small set of
pre-written, fact-checked answers using a hybrid of cosine similarity and an
IDF-weighted keyword score (`src/lib/chatEngine.js`). The keyword layer exists because
raw embedding similarity alone misranks some short or ambiguous phrasings e.g. a
jargon-heavy answer can score lower on cosine similarity than an unrelated one for a
casual query, so keyword overlap (weighted by how rare/specific each word is across
the whole topic set) corrects for that.
