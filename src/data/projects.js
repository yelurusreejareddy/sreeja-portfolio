// `live` marks projects with a running Hugging Face demo. The free tier only
// keeps a few Spaces awake at once, so the rest link to their code on GitHub
// rather than a paused Space page.
// WanderWear is a live product rather than a coursework demo, so it has its
// own featured section above the project grid instead of a card inside it.
export const featuredProduct = {
  title: 'WanderWear',
  tagline: 'An AI travel planner and personal stylist, live on AWS.',
  description:
    'A multi-agent system that plans day-by-day trips and assembles outfits from your own wardrobe. Built full-stack and running in production, with per-user data isolation and push-to-deploy CI/CD.',
  tags: ['AI Agents', 'Full-Stack', 'AWS', 'FastAPI', 'Next.js'],
  liveUrl: 'https://main.d1xhj0as3larx1.amplifyapp.com',
  repoUrl: 'https://github.com/yelurusreejareddy/wanderwear',
  image: '/wanderwear.jpg',
}

export const projects = [
  {
    title: 'AI Policy RAG',
    emoji: '📜',
    description:
      'Retrieval-augmented question answering over 4 real AI policy documents, with cited source passages for every answer.',
    tags: ['LangChain', 'RAG', 'Chroma'],
    url: 'https://huggingface.co/spaces/Sreeja-reddy/ai-policy-rag',
    live: true,
  },
  {
    title: 'Malicious Prompt Detector',
    emoji: '🔍',
    description:
      'Classifies LLM prompts as benign or malicious using a stacked ensemble trained on 39k labeled prompts.',
    tags: ['NLP', 'AI Safety', 'scikit-learn'],
    url: 'https://huggingface.co/spaces/Sreeja-reddy/malicious-prompt-detector',
    live: true,
  },
  {
    title: 'Atari Pong DQN',
    emoji: '🏓',
    description:
      'A Deep Q-Network trained from raw pixels to play Pong, watchable frame by frame against a greedy policy.',
    tags: ['Deep RL', 'PyTorch'],
    url: 'https://huggingface.co/spaces/Sreeja-reddy/pong-dqn',
    live: true,
  },
  {
    title: 'Agentic RAG for CleanTech',
    emoji: '🤖',
    description:
      'A multi-tool retrieval agent for clean-technology questions, comparing a base RAG pipeline against an agent with paper-search and reasoning tools.',
    tags: ['Agents', 'LangChain', 'ChromaDB'],
    url: 'https://github.com/yelurusreejareddy/agentic-rag-cleantech',
    live: false,
  },
  {
    title: 'T5 Text Summarizer',
    emoji: '📝',
    description:
      'Abstractive summarization with T5-small, showing how a general-purpose transformer handles long text.',
    tags: ['NLP', 'Transformers'],
    url: 'https://github.com/yelurusreejareddy/nlp-foundations-to-transformers/blob/main/summarization_t5_finetuning.ipynb',
    live: false,
  },
  {
    title: 'Diabetic Retinopathy Detection',
    emoji: '👁️',
    description:
      'A classical ML pipeline (wavelets, PCA, SVM, Random Forest) that classifies retinal images for DR.',
    tags: ['Medical Imaging', 'Classical ML'],
    url: 'https://github.com/yelurusreejareddy/diabetic-retinopathy-detection',
    live: false,
  },
  {
    title: 'Eight Puzzle Solver',
    emoji: '🧩',
    description:
      'Five search algorithms (BFS, DFS, UCS, Greedy, A*) implemented from scratch and compared head to head.',
    tags: ['Search', 'Classic AI'],
    url: 'https://github.com/yelurusreejareddy/rl-fundamentals-to-rlhf/blob/main/eight_puzzle_search.ipynb',
    live: false,
  },
  {
    title: 'Snake Q-Learning',
    emoji: '🐍',
    description:
      'A tabular Q-learning agent that learns to play Snake, visualized playing a full episode with its trained Q-table.',
    tags: ['Reinforcement Learning'],
    url: 'https://github.com/yelurusreejareddy/rl-fundamentals-to-rlhf',
    live: false,
  },
  {
    title: 'FrozenLake Value Iteration',
    emoji: '❄️',
    description:
      'Dynamic programming value iteration solving FrozenLake, with the resulting policy and value function visualized.',
    tags: ['RL Fundamentals'],
    url: 'https://github.com/yelurusreejareddy/rl-fundamentals-to-rlhf/blob/main/frozen_lake_value_iteration.ipynb',
    live: false,
  },
  {
    title: 'K-Armed Bandit Explorer',
    emoji: '🎰',
    description:
      'An interactive epsilon-greedy bandit simulation showing the exploration versus exploitation tradeoff.',
    tags: ['RL Fundamentals'],
    url: 'https://huggingface.co/spaces/Sreeja-reddy/k-armed-bandit',
    live: false,
  },
  {
    title: 'Fruit & Vegetable Grader',
    emoji: '🍎',
    description:
      'A classical computer vision pipeline (HSV thresholding, edge density, entropy) that grades produce quality.',
    tags: ['Computer Vision', 'OpenCV'],
    url: 'https://github.com/yelurusreejareddy/fruit-veg-grading',
    live: false,
  },
]
