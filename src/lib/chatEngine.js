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
    reply: "I'm doing well, thanks for asking! I'm here to answer questions about Sreeja. What would you like to know?",
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
  'an', 'what', 'how', 'who', 'me', 'do', 'does', 'did', 'can', 'could', 'would', 'should',
  'will', 'tell', 'explain', 'want', 'need', 'please', 'you', 'your',
  'yourself', 'this', 'that', 'these', 'those', 'most', 'some', 'any', 'good', 'done',
])

// Light suffix stripping so "mainframes"/"mainframe" and "clients"/"client" match as the
// same word, without falling back to raw substring checks (which wrongly match "out"
// inside "about"). Only strips genuine inflectional endings, not arbitrary substrings.
function stem(word) {
  if (word.length > 5 && word.endsWith('ing')) return word.slice(0, -3)
  if (word.length > 4 && word.endsWith('ies')) return word.slice(0, -3) + 'y'
  if (word.length > 4 && word.endsWith('ed')) return word.slice(0, -2)
  // Plain "s" strip covers both "mainframes" -> "mainframe" (base already ends in "e")
  // and "clients" -> "client". A dedicated "es" rule would wrongly turn "mainframes"
  // into "mainfram" by stripping two characters from a base that only added one "s".
  if (word.length > 3 && word.endsWith('s') && !word.endsWith('ss')) return word.slice(0, -1)
  return word
}

function extractTopicWords(topic) {
  return (topic.toLowerCase().match(/[a-z0-9]+/g) || [])
    .filter((w) => w.length > 2 && !STOPWORDS.has(w))
    .map(stem)
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

function extractQueryWords(query) {
  return new Set((query.toLowerCase().match(/[a-z0-9]+/g) || []).map(stem))
}

// Must be exact (stemmed) word matches, not raw substring checks — otherwise a topic
// word like "out" spuriously matches inside an unrelated query word like "about".
function keywordBoost(queryWords, topic) {
  let boost = 0
  for (const w of extractTopicWords(topic)) {
    if (queryWords.has(w)) boost += 0.4 / (topicWordDocFreq.get(w) || 1)
  }
  return boost
}

// keywordText defaults to the question itself. For a follow-up, the embedding
// carries the earlier question as context, but keywords come from the new
// question alone, or a strong word from before ("try") drags every later
// answer back to the same place.
export function findAnswer(question, queryEmbedding, exclude = new Set(), keywordText = question) {
  const queryWords = extractQueryWords(keywordText)
  const scored = knowledgeData
    .filter((chunk) => !exclude.has(chunk.short))
    .map((chunk) => ({
      score: cosineSim(queryEmbedding, chunk.embedding) + keywordBoost(queryWords, chunk.topic),
      text: chunk.short,
    }))
    .sort((a, b) => b.score - a.score)

  if (!scored.length || scored[0].score < SIMILARITY_FLOOR) return FALLBACK

  return scored[0].text
}

// Each question is matched on its own, so "explain more about it" used to
// reach the fallback: "it" means nothing without the question before it. A
// short question that points back at something, or asks for more, is matched
// together with the previous question instead. "She" and "her" are left out
// on purpose, since in this chat they always mean Sreeja, not the last topic.
const POINTS_BACK = /\b(it|its|that|this|those|them|they|there)\b/i
const ASKS_FOR_MORE = /\b(more|else|elaborate|expand|further|details?|continue|go on)\b/i
const FOLLOW_UP_MAX_WORDS = 8

export function isFollowUp(question) {
  const words = question.trim().split(/\s+/).length
  return words <= FOLLOW_UP_MAX_WORDS && (POINTS_BACK.test(question) || ASKS_FOR_MORE.test(question))
}

// The query actually matched for this turn. Kept short so a run of follow-ups
// doesn't grow it without limit.
export function resolveQuery(question, previousQuery) {
  if (!previousQuery || !isFollowUp(question)) return question
  return `${previousQuery} ${question}`.slice(-240)
}

// Returns the answer plus the query it was matched on, which the chat passes
// back in as previousQuery on the next turn. shownAnswers are skipped only
// when the visitor explicitly asks for more, so "tell me more" brings
// something new instead of repeating the paragraph they just read.
export async function answerQuestion(question, { previousQuery = null, shownAnswers = [] } = {}) {
  const smallTalkReply = matchSmallTalk(question)
  if (smallTalkReply) return { text: smallTalkReply, query: previousQuery }

  const query = resolveQuery(question, previousQuery)

  const overrideReply = matchTopicOverride(question)
  if (overrideReply) return { text: overrideReply, query }

  const exclude = query !== question && ASKS_FOR_MORE.test(question) ? new Set(shownAnswers) : new Set()

  const embedder = await getEmbedder()
  const output = await embedder(query, { pooling: 'mean', normalize: true })
  const queryEmbedding = Array.from(output.data)
  return { text: findAnswer(query, queryEmbedding, exclude, question), query }
}
