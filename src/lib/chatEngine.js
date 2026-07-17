import knowledgeData from '../data/knowledge_embeddings.json'

export const SIMILARITY_FLOOR = 0.35
export const FALLBACK =
  "I don't have detail on that. Feel free to email Sreeja directly at yeluru.sreeja@gmail.com, or check her projects at huggingface.co/Sreeja-reddy."

export const EXAMPLES = [
  'What is she researching?',
  'Tell me about the AI Policy RAG project',
  'What was her role at Accenture?',
  "What's her tech stack?",
]

let embedderPromise = null
export function getEmbedder() {
  if (!embedderPromise) {
    embedderPromise = import('@huggingface/transformers').then(({ pipeline }) =>
      pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2')
    )
  }
  return embedderPromise
}

export function isEmbedderLoaded() {
  return embedderPromise !== null
}

function cosineSim(a, b) {
  let dot = 0
  for (let i = 0; i < a.length; i++) dot += a[i] * b[i]
  return dot
}

const STOPWORDS = new Set([
  'the', 'and', 'for', 'she', 'her', 'with', 'about', 'is', 'was', 'to', 'of', 'at', 'in', 'a',
  'an', 'what', 'how', 'who', 'me', 'do', 'does', 'did',
])

function keywordBoost(query, topic) {
  const queryLower = query.toLowerCase()
  const topicWords = (topic.toLowerCase().match(/[a-z0-9]+/g) || []).filter(
    (w) => w.length > 2 && !STOPWORDS.has(w)
  )
  let overlap = 0
  for (const w of topicWords) if (queryLower.includes(w)) overlap++
  return overlap > 0 ? 0.28 * overlap : 0
}

export function findAnswer(question, queryEmbedding) {
  const scored = knowledgeData
    .map((chunk) => ({
      score: cosineSim(queryEmbedding, chunk.embedding) + keywordBoost(question, chunk.topic),
      text: chunk.text,
    }))
    .sort((a, b) => b.score - a.score)

  if (!scored.length || scored[0].score < SIMILARITY_FLOOR) return FALLBACK

  const topScore = scored[0].score
  const relevant = scored.filter((s) => s.score >= topScore * 0.9).slice(0, 2)
  return relevant.map((s) => s.text).join('\n\n')
}

export async function answerQuestion(question) {
  const embedder = await getEmbedder()
  const output = await embedder(question, { pooling: 'mean', normalize: true })
  const queryEmbedding = Array.from(output.data)
  return findAnswer(question, queryEmbedding)
}
