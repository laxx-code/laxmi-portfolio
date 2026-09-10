export const KNOWLEDGE_BASE = [
  {
    id: "who_is_laxmi",
    triggers: ["who is laxmi", "about laxmi", "tell me about laxmi", "who are you", "laxmi raut", "tagline", "bio", "introduction", "overview", "what does laxmi do"],
    answer: "Laxmi Raut is an AI Engineer & Architect specializing in building production-grade LLM applications, multi-agent systems, and low-latency Speech AI pipelines for real-world impact."
  },
  {
    id: "projects_overview",
    triggers: ["what did laxmi build", "projects", "built", "portfolio", "work", "selected work", "case studies", "apps", "systems"],
    answer: "Laxmi has built enterprise AI systems including Nuance (Trilingual Meeting Assistant), Cognitive Guardian (On-device AI safety), Document Intelligence (DMS), MIDC AI Assistant, Smart Society AI, Competitor Intelligence (SWOT), and AI Visitor Management."
  },
  {
    id: "nuance",
    triggers: ["nuance", "trilingual", "meeting assistant", "speaker diarization", "voice id", "whisper asr", "hallucination guards", "hindi", "marathi", "speech ai", "explain nuance"],
    answer: "Nuance is a trilingual meeting assistant handling English, Hindi, and Marathi. Its architecture includes Audio VAD, Speaker Diarization, Voice ID, Language Detection, Whisper ASR, and automated Hallucination Guards."
  },
  {
    id: "cognitive_guardian",
    triggers: ["cognitive guardian", "undoom", "on-device ai", "rage-bait", "toxic content", "safety layer", "intervention"],
    answer: "Cognitive Guardian (Undoom) is a privacy-first, on-device AI safety layer that detects rage-bait and toxic content in social feeds in real time, introducing contextual interventions before reaction."
  },
  {
    id: "dms",
    triggers: ["document intelligence", "dms", "document management", "ocr entity extraction", "confidence calibration", "tenant isolation"],
    answer: "DMS is an enterprise multi-tenant document management platform featuring automated OCR entity extraction, confidence calibration, tenant isolation, and audit-ready processing."
  },
  {
    id: "midc",
    triggers: ["midc", "industrial assistant", "midc chatbot", "policy retrieval", "gtts"],
    answer: "MIDC AI Assistant is an industrial chatbot built with Flask, OpenAI API, PyMongo, and gTTS, providing automated policy retrieval, multilingual voice interaction, and structured document Q&A."
  },
  {
    id: "smart_society",
    triggers: ["smart society", "society ai", "society chatbot", "pgvector", "pdfplumber", "housing society"],
    answer: "Smart Society AI is a housing management assistant combining vision OCR fallback (OpenCV), hybrid vector embeddings (PGVector), and Gemini Flash cleanup for automated resident Q&A."
  },
  {
    id: "other_projects",
    triggers: ["competitor intelligence", "swot", "ai visitor management", "facenet", "facility entry", "opencv"],
    answer: "Competitor Intelligence automates web scraping, cleaning, and dynamic SWOT generation. AI Visitor Management uses computer vision (OpenCV & FaceNet) for secure facility authentication."
  },
  {
    id: "skills",
    triggers: ["skills", "capabilities", "what are her ai skills", "agentic ai", "generative ai", "rag", "edge ai", "llms", "speech"],
    answer: "Laxmi's core technical capabilities span Agentic AI (LangChain, CrewAI), Speech AI (Whisper, PyAnnote), Generative AI & RAG (Vector DBs, LlamaIndex), and Edge AI (TensorRT, ONNX)."
  },
  {
    id: "tech_stack",
    triggers: ["tech stack", "languages", "technologies", "tools", "frameworks", "python", "pytorch", "c++", "typescript", "docker", "kubernetes", "aws", "gcp", "pinecone", "weaviate"],
    answer: "Laxmi's tech stack includes Python, C++, TypeScript, Go, PyTorch, TensorFlow, HuggingFace, OpenAI/Anthropic APIs, LangChain, LlamaIndex, Docker, Kubernetes, AWS/GCP, Vector DBs, and PostgreSQL."
  },
  {
    id: "experience",
    triggers: ["experience", "tell me about her experience", "work history", "stark digital", "flying toads", "eduna", "codec technologies", "roles", "career"],
    answer: "Laxmi is currently Lead AI Architect at Stark Digital (2023-Present). Previously she served as Machine Learning Engineer at Flying Toads (2021-2023), Data Scientist at Eduna (2019-2021), and Software Engineer at Codec Technologies (2018-2019)."
  },
  {
    id: "methodology",
    triggers: ["how i engineer ai", "engineering process", "methodology", "discover", "design", "build", "evaluate", "deploy", "red-teaming"],
    answer: "Laxmi engineers AI through a 5-stage methodology: 1. Discover data constraints, 2. Design low-latency pipelines, 3. Build & integrate agentic logic, 4. Evaluate with red-teaming & hallucination checks, 5. Deploy with edge optimization."
  },
  {
    id: "impact",
    triggers: ["impact", "stats", "results", "metrics", "uptime", "hallucination guard count", "review reduction"],
    answer: "Key achievements include architecting multi-agent systems with 70% manual review reduction, 4 automated hallucination guards, 3 mastered languages, and 99% uptime architecture."
  },
  {
    id: "education",
    triggers: ["education", "degree", "college", "university", "b.tech", "diploma", "csmss", "marathwada institute"],
    answer: "Laxmi is pursuing her B.Tech in Artificial Intelligence & Data Science at CSMSS College of Engineering (2024-2026) and holds a Diploma in Computer Engineering with Distinction from Marathwada Institute of Technology (2021-2023)."
  },
  {
    id: "contact",
    triggers: ["contact", "email", "linkedin", "github", "resume", "hire", "get in touch", "connect", "reach out"],
    answer: "You can reach out to Laxmi via email or connect with her on LinkedIn and GitHub using the buttons in the Contact section at the bottom of the page!"
  }
];

export const DEFLECTION_MESSAGES = [
  "I can only answer questions related to Laxmi's AI engineering work, projects, skills, and background. Feel free to ask about her experience, tech stack, or case studies!",
  "I'm dedicated to sharing information about Laxmi's portfolio and experience. Try asking about her projects like Nuance, her AI skills, or how to get in touch with her!",
  "I'm trained specifically on Laxmi's portfolio. You can ask me about her experience, education, AI projects, or engineering methodology!"
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
