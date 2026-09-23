// Fills in the embedding for every chatbot answer that does not have one yet.
//
//   node scripts/embed-knowledge.mjs [path]      (default: src/data/knowledge_embeddings.json)
//
// To add or change an answer, edit its topic, text, and short in the JSON and
// set its "embedding" to [], then run this. The "text" field is what gets
// embedded, with the same model and settings the browser uses in
// src/lib/chatEngine.js, so new answers score exactly like the existing ones.
//
// The file is written back in its original compact, ASCII-escaped form, so an
// edit shows up as a small diff instead of rewriting every stored number.
import fs from 'node:fs'
import { pipeline } from '@huggingface/transformers'

const path = process.argv[2] ?? 'src/data/knowledge_embeddings.json'
const raw = fs.readFileSync(path, 'utf8')
const kb = JSON.parse(raw)

const missing = kb.filter((c) => !Array.isArray(c.embedding) || c.embedding.length === 0)
if (missing.length) {
  const embed = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2')
  for (const chunk of missing) {
    const out = await embed(chunk.text, { pooling: 'mean', normalize: true })
    chunk.embedding = Array.from(out.data)
  }
}

// Match Python's json.dumps(separators=(',', ':')), which produced the file:
// non-ASCII characters escaped as \uXXXX, and floats in Python's repr form
// (scientific notation below 1e-4, with a two-digit exponent).
function pyFloat(n) {
  if (Number.isInteger(n)) return `${n}.0`
  const abs = Math.abs(n)
  if (abs < 1e-4 || abs >= 1e16) {
    return n.toExponential().replace(/e([+-])(\d)$/, 'e$10$2')
  }
  return String(n)
}

function dump(value) {
  if (Array.isArray(value)) return `[${value.map(dump).join(',')}]`
  if (value && typeof value === 'object') {
    return `{${Object.entries(value).map(([k, v]) => `${dump(k)}:${dump(v)}`).join(',')}}`
  }
  if (typeof value === 'number') return pyFloat(value)
  if (typeof value === 'string') {
    return JSON.stringify(value).replace(/[\u007f-￿]/g, (c) => `\\u${c.charCodeAt(0).toString(16).padStart(4, '0')}`)
  }
  return JSON.stringify(value)
}

fs.writeFileSync(path, dump(kb))
console.log(`${missing.length} embedded, ${kb.length} answers total`)
