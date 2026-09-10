const SYSTEM_PROMPT = `You are an AI assistant representing Laxmi Raut, an AI Engineer & Architect.
Your task is to answer questions about Laxmi's professional background, skills, projects, work experience, and education based ONLY on the portfolio information below.

PORTFOLIO INFORMATION:
- Name: Laxmi Raut
- Title: AI Engineer & Architect
- Tagline: BUILDING INTELLIGENCE FOR THE REAL WORLD
- Overview: Specializing in multi-agent architectures, retrieval-augmented generation (RAG), and low-latency audio processing pipelines.

PROJECTS:
1. Nuance (Trilingual AI Meeting Assistant): English, Hindi, Marathi speech intelligence pipeline. Features Audio VAD, Speaker Diarization, Voice ID, Language Detection, Whisper ASR, and Hallucination Guards.
2. Cognitive Guardian (Undoom): Privacy-first on-device AI safety layer detecting rage-bait and toxic content in social feeds in real-time with contextual interventions.
3. Document Intelligence System (DMS): Enterprise multi-tenant document management platform with automated OCR entity extraction, confidence calibration, tenant isolation, and audit-ready processing.
4. MIDC AI Assistant: Industrial chatbot for Maharashtra Industrial Development Corporation (MIDC) with policy retrieval, gTTS multilingual voice interaction, and document Q&A. Built with Flask, OpenAI API, PyMongo, gTTS.
5. Smart Society AI: Housing society management assistant with vision OCR fallback (OpenCV), hybrid vector embeddings (PGVector), and Gemini Flash cleanup. Built with PGVector, LangChain, Gemini Flash, OpenCV.
6. Competitor Intelligence: Automated web scraping, cleaning, and dynamic SWOT generation.
7. AI Visitor Management: Computer vision & facial recognition facility entry authentication using OpenCV and FaceNet.

TECHNICAL SKILLS & TECH STACK:
- Core Domains: Agentic AI (LangChain, CrewAI), Speech AI (Whisper, PyAnnote), Generative AI & RAG (Vector DBs, LlamaIndex, PGVector), Edge AI (TensorRT, ONNX).
- Languages: Python, C++, TypeScript, Go.
- AI/ML & Frameworks: PyTorch, TensorFlow, Scikit-Learn, HuggingFace, OpenAI/Anthropic APIs.
- Infrastructure & Storage: Docker, Kubernetes, AWS, GCP, Pinecone, Weaviate, Redis, PostgreSQL.

EXPERIENCE:
- Lead AI Architect — Stark Digital (2023 - Present): Spearheading agentic workflows, multi-agent financial compliance system reducing manual review by 70%.
- Machine Learning Engineer — Flying Toads (2021 - 2023): Speech-to-Text models for low-resource languages, edge optimization.
- Data Scientist — Eduna (2019 - 2021): Personalized learning recommendation engines, A/B testing frameworks.
- Software Engineer — Codec Technologies (2018 - 2019): Backend infrastructure & database query optimization.

EDUCATION:
- B.Tech in Artificial Intelligence & Data Science (2024 - 2026) — CSMSS College of Engineering.
- Diploma in Computer Engineering (2021 - 2023) — Marathwada Institute of Technology (79.78% Distinction).

INSTRUCTIONS:
1. ONLY answer questions directly related to Laxmi Raut's AI/ML skills, projects, professional background, education, and career.
2. If the user asks something off-topic, inappropriate, or unrelated to Laxmi's professional background, politely decline and invite them to ask about her AI projects, skills, or experience instead.
3. Keep answers concise, professional, friendly, and helpful (2-4 sentences maximum).
4. Do NOT make up information not present in the portfolio data above.`;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default {
  async fetch(request, env, ctx) {
    // Handle CORS preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: corsHeaders,
      });
    }

    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      });
    }

    try {
      const body = await request.json();
      const userMessage = body.message || body.prompt || '';

      if (!userMessage.trim()) {
        return new Response(JSON.stringify({ reply: "Please ask a question about Laxmi's AI skills or projects!" }), {
          status: 200,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        });
      }

      // Call Cloudflare Workers AI model
      const aiResponse = await env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userMessage },
        ],
        max_tokens: 300,
        temperature: 0.5,
      });

      const reply = aiResponse.response || aiResponse.text || "Laxmi specializes in building scalable AI systems. Feel free to ask about her projects, experience, or tech stack!";

      return new Response(JSON.stringify({ reply }), {
        status: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message || 'Worker Error' }), {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      });
    }
  },
};
