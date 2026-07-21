import knowledgeData from '../data/knowledge_embeddings.json'

export const SIMILARITY_FLOOR = 0.35
export const FALLBACK =
  "I don't have detail on that. Feel free to email Sreeja directly at yeluru.sreeja@gmail.com, or check her projects at huggingface.co/Sreeja-reddy."

export const SUGGESTION_POOL = [
  'Tell me about Sreeja?',
  "What's she working on?",
  'Her role at Accenture?',
  'What are her projects?',
  'What are her skills?',
  "What's her education?",
  'How can I reach her?',
]

export const SUGGESTIONS_PER_TURN = 3

const SMALL_TALK = [
  {
    pattern: /^\s*(hi|hello|hey|yo|sup|good morning|good afternoon|good evening)\s*(there)?\s*[!.,]*\s*$/i,
    reply: "Hello! How can I help you today? Ask me anything about Sreeja's background, research, or projects.",
  },
  {
    pattern: /^\s*how(?:'s| is| are)?\s*(you|it going|things)\s*[!.?,]*\s*$/i,
    reply: "I'm doing well, thanks for asking! I'm here to answer questions about Sreeja — what would you like to know?",
  },
  {
    pattern: /^\s*(thanks|thank you|thx|appreciate it)\s*[!.,]*\s*$/i,
    reply: "You're welcome! Let me know if you have any other questions about Sreeja.",
  },
  {
    pattern: /^\s*(bye|goodbye|see ya|see you|later)\s*[!.,]*\s*$/i,
    reply: 'Take care! Feel free to come back anytime you have questions about Sreeja.',
  },
  {
    pattern: /^\s*(ok|okay|cool|nice|great|got it|sounds good)\s*[.!]?\s*$/i,
    reply: 'Glad that helps! Anything else you want to know about Sreeja?',
  },
]

function matchSmallTalk(question) {
  const match = SMALL_TALK.find(({ pattern }) => pattern.test(question))
  return match?.reply ?? null
}

// A few phrasings are ambiguous enough (short, generic wording) that raw embedding
// similarity favors the wrong chunk even with keyword boosting. Route them directly.
const TOPIC_OVERRIDES = [
  {
    pattern: /working on|what.?s she (doing|up to)( now| currently| these days| right now)?\b|current project/i,
    topicKeyword: 'researching',
  },
]

function matchTopicOverride(question) {
  for (const { pattern, topicKeyword } of TOPIC_OVERRIDES) {
    if (pattern.test(question)) {
      const chunk = knowledgeData.find((c) => c.topic.includes(topicKeyword))
      if (chunk) return chunk.short
    }
  }
  return null
}

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

function extractTopicWords(topic) {
  return (topic.toLowerCase().match(/[a-z0-9]+/g) || []).filter(
    (w) => w.length > 2 && !STOPWORDS.has(w)
  )
}

// Words shared across many topics (e.g. "work") are weak signals; words unique to one
// or two topics (e.g. "relocate") are strong signals. Weight overlap by rarity so a
// generic word in a longer topic string can't outweigh a specific one elsewhere.
const topicWordDocFreq = (() => {
  const freq = new Map()
  for (const chunk of knowledgeData) {
    for (const w of new Set(extractTopicWords(chunk.topic))) {
      freq.set(w, (freq.get(w) || 0) + 1)
    }
  }
  return freq
})()

function keywordBoost(query, topic) {
  const queryLower = query.toLowerCase()
  let boost = 0
  for (const w of extractTopicWords(topic)) {
    if (queryLower.includes(w)) boost += 0.32 / (topicWordDocFreq.get(w) || 1)
  }
  return boost
}

export function findAnswer(question, queryEmbedding) {
  const scored = knowledgeData
    .map((chunk) => ({
      score: cosineSim(queryEmbedding, chunk.embedding) + keywordBoost(question, chunk.topic),
      text: chunk.short,
    }))
    .sort((a, b) => b.score - a.score)

  if (!scored.length || scored[0].score < SIMILARITY_FLOOR) return FALLBACK

  return scored[0].text
}

export async function answerQuestion(question) {
  const smallTalkReply = matchSmallTalk(question)
  if (smallTalkReply) return smallTalkReply

  const overrideReply = matchTopicOverride(question)
  if (overrideReply) return overrideReply

  const embedder = await getEmbedder()
  const output = await embedder(question, { pooling: 'mean', normalize: true })
  const queryEmbedding = Array.from(output.data)
  return findAnswer(question, queryEmbedding)
}
