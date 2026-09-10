export const KNOWLEDGE_BASE = [
  {
    id: "who_is_laxmi",
    triggers: ["who is laxmi", "about laxmi", "tell me about laxmi", "who are you", "laxmi raut", "tagline", "bio", "introduction", "overview", "what does laxmi do"],
    answer: "Laxmi Raut is an AI Engineer, Full Stack Developer, and LLMs & Automation Specialist. She specializes in building production-grade agentic AI, real-time speech systems, on-device inference, and document intelligence platforms."
  },
  {
    id: "projects_overview",
    triggers: ["what did laxmi build", "projects", "built", "portfolio", "work", "selected work", "case studies", "apps", "systems"],
    answer: "Laxmi has built major AI projects including Nuance (Trilingual AI Meeting Assistant), Competitor Intelligence Dashboard (Multi-Agent SWOT system), AI Visitor Management System (OCR & Multi-Provider LLM fallback), and Undoom (On-device content safety)."
  },
  {
    id: "nuance",
    triggers: ["nuance", "trilingual", "meeting assistant", "speaker diarization", "voice id", "whisper asr", "hallucination guards", "speechbrain", "hindi", "marathi", "speech ai", "explain nuance"],
    answer: "Nuance is a trilingual meeting assistant handling English, Hindi, and Marathi. Its architecture includes VAD segmentation, SpeechBrain ECAPA-TDNN voice embeddings for voice ID, per-segment language-restricted Whisper ASR, and 4 custom hallucination guards."
  },
  {
    id: "competitor_intelligence",
    triggers: ["competitor intelligence", "swot", "gap analysis", "scraper", "fastapi", "react dashboard", "multi-agent"],
    answer: "Competitor Intelligence Dashboard is a multi-agent system (scraper, cleaner, analyzer, comparison agents) built with FastAPI, PostgreSQL, and React that discovers companies and auto-generates SWOT/gap analysis across a 15+ section dashboard."
  },
  {
    id: "visitor_management",
    triggers: ["ai visitor management", "visitor management", "ocr", "sentiment analysis", "priority scoring", "openrouter", "ollama"],
    answer: "AI Visitor Management System features end-to-end OCR & handwritten extraction with confidence scoring, sentiment analysis, priority risk flagging, and a swappable multi-provider AI interface (OpenAI, Gemini, Ollama, OpenRouter)."
  },
  {
    id: "undoom",
    triggers: ["undoom", "on-device ai", "rage-bait", "toxic content", "safety layer", "gemini nano", "apple foundation"],
    answer: "Undoom is an on-device content-safety AI detecting rage-bait and toxic social feed content in real time across Android (Gemini Nano) and iOS (Apple Foundation Models)."
  },
  {
    id: "skills",
    triggers: ["skills", "capabilities", "what are her ai skills", "agentic ai", "generative ai", "rag", "edge ai", "llms", "speech"],
    answer: "Laxmi's core technical capabilities span LLM Integration & Orchestration (OpenAI, Gemini, Ollama, OpenRouter), Agentic & Multi-Agent Systems, Speech AI (Whisper, SpeechBrain), On-Device AI (Gemini Nano, Apple Foundation), Computer Vision, and RAG."
  },
  {
    id: "tech_stack",
    triggers: ["tech stack", "languages", "technologies", "tools", "frameworks", "python", "javascript", "typescript", "fastapi", "django", "react", "comfyui", "postgresql", "docker"],
    answer: "Laxmi's tech stack includes Python, JavaScript/TypeScript, SQL, FastAPI, Django, React.js, React Native, Midjourney, Stable Diffusion, ComfyUI, Zapier, n8n, PostgreSQL, MySQL, and MongoDB."
  },
  {
    id: "experience",
    triggers: ["experience", "tell me about her experience", "work history", "stark digital", "flying toads", "eduna", "codec technologies", "roles", "career"],
    answer: "Laxmi is currently an AI Engineer at Stark Digital (Jun 2026 – Present). Previously she worked as Jr. Generative AI Artist at Flying Toads Entertainment (May 2026 – Jun 2026), Frontend Engineering Intern at Eduna (Aug 2025 – Oct 2025), and Web Developer Intern at Codec Technologies (May 2025 – Jun 2025)."
  },
  {
    id: "certifications",
    triggers: ["certifications", "certificate", "claude code", "geeksforgeeks", "microsoft", "power bi"],
    answer: "Laxmi holds certifications in Claude Code in Action (Anthropic), Django Course (GeeksforGeeks), and Power BI Micro Course (Microsoft)."
  },
  {
    id: "education",
    triggers: ["education", "degree", "college", "university", "b.tech", "diploma", "csmss", "marathwada institute"],
    answer: "Laxmi is pursuing her B.Tech in Artificial Intelligence & Data Science at CSMSS College of Engineering, Chh. Sambhajinagar (2024 – 2026) and holds a Diploma in Computer Engineering with 79.78% (Distinction) from Marathwada Institute of Technology (2021 – 2023)."
  },
  {
    id: "contact",
    triggers: ["contact", "email", "linkedin", "github", "resume", "hire", "get in touch", "connect", "reach out"],
    answer: "You can reach out to Laxmi at laxmisraut@gmail.com, or connect on LinkedIn (linkedin.com/in/rautlaxmi) and GitHub (github.com/laxx-code)!"
  }
];

export const DEFLECTION_MESSAGES = [
  "I can only answer questions related to Laxmi's AI engineering work, projects, skills, and background. Feel free to ask about her experience at Stark Digital, tech stack, or projects like Nuance!",
  "I'm dedicated to sharing information about Laxmi's portfolio and experience. Try asking about her projects, her AI/LLM skills, or how to get in touch with her!",
  "I'm trained specifically on Laxmi's portfolio. You can ask me about her experience, education, AI meeting assistant (Nuance), or full-stack tech stack!"
];

let deflectionIndex = 0;

export function findBestTopic(queryText) {
  const normalized = queryText.toLowerCase().trim();
  if (!normalized) return null;

  let bestTopic = null;
  let maxScore = 0;

  for (const topic of KNOWLEDGE_BASE) {
    let score = 0;
    for (const trigger of topic.triggers) {
      const lowerTrigger = trigger.toLowerCase();
      if (normalized.includes(lowerTrigger)) {
        const wordCount = lowerTrigger.split(/\s+/).length;
        score += wordCount * 5;
      }
    }

    if (score > maxScore) {
      maxScore = score;
      bestTopic = topic;
    }
  }

  if (maxScore > 0 && bestTopic) {
    return bestTopic.answer;
  }

  return null;
}

export function getDeflection() {
  const msg = DEFLECTION_MESSAGES[deflectionIndex % DEFLECTION_MESSAGES.length];
  deflectionIndex++;
  return msg;
}
