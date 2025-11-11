
export type Project = {
  title: string;
  description: string;
  repo: string;
  repoUrl: string;
  starsBadgeUrl: string;
  links?: { label: string; href: string }[];
};

export const featuredProjects: Project[] = [
  {
    title: "PocketLLM",
    description: "Cross-platform LLM chat with Flutter client + FastAPI backend; local model support and BYO API keys.",
    repo: "PocketLLM/PocketLLM",
    repoUrl: "https://github.com/PocketLLM/PocketLLM",
    starsBadgeUrl: "https://img.shields.io/github/stars/PocketLLM/PocketLLM?label=Stars&style=social",
  },
  {
    title: "EchoGen.ai",
    description: "Flutter app for image generation with queueing and job tracking.",
    repo: "PocketLLM/EchoGen.ai",
    repoUrl: "https://github.com/PocketLLM/EchoGen.ai",
    starsBadgeUrl: "https://img.shields.io/github/stars/PocketLLM/EchoGen.ai?label=Stars&style=social",
  },
];

export const projects: Project[] = [
  {
    title: "WriteAI",
    description: "Full-stack content generator (React + FastAPI) with multi-provider support.",
    repo: "pschoudhary-dot/WriteAI",
    repoUrl: "https://github.com/pschoudhary-dot/WriteAI",
    starsBadgeUrl: "https://img.shields.io/github/stars/pschoudhary-dot/WriteAI?label=Stars&style=social",
  },
  {
    title: "NeoLM",
    description: "NotebookLM-style notes + RAG prototype with Supabase backend.",
    repo: "pschoudhary-dot/NeoLM",
    repoUrl: "https://github.com/pschoudhary-dot/NeoLM",
    starsBadgeUrl: "https://img.shields.io/github/stars/pschoudhary-dot/NeoLM?label=Stars&style=social",
  },
  {
    title: "streamlit-tldraw",
    description: "Diagram editor embedded in Streamlit using tldraw; export to image/JSON.",
    repo: "Mr-Dark-debug/streamlit-tldraw",
    repoUrl: "https://github.com/Mr-Dark-debug/streamlit-tldraw",
    starsBadgeUrl: "https://img.shields.io/github/stars/Mr-Dark-debug/streamlit-tldraw?label=Stars&style=social",
  },
  {
    title: "hiVPN",
    description: "Flutter template for a branded VPN client with server picker and speed test.",
    repo: "Mr-Dark-debug/hivpn",
    repoUrl: "https://github.com/Mr-Dark-debug/hivpn",
    starsBadgeUrl: "https://img.shields.io/github/stars/Mr-Dark-debug/hivpn?label=Stars&style=social",
  },
  {
    title: "SPOPITT",
    description: "Context-aware music recommendations using Spotify data and Flask.",
    repo: "Mr-Dark-debug/Spopitt",
    repoUrl: "https://github.com/Mr-Dark-debug/Spopitt",
    starsBadgeUrl: "https://img.shields.io/github/stars/Mr-Dark-debug/Spopitt?label=Stars&style=social",
  },
  {
    title: "Literna Bot",
    description: "Telegram assistant for coding/summarization on Gemini.",
    repo: "Mr-Dark-debug/Literna-Bot",
    repoUrl: "https://github.com/Mr-Dark-debug/Literna-Bot",
    starsBadgeUrl: "https://img.shields.io/github/stars/Mr-Dark-debug/Literna-Bot?label=Stars&style=social",
  },
  {
    title: "Multifunc Streamlit App",
    description: "Multi-tool Streamlit suite (scraper, auto-dashboard, sentiment, multimodal chat).",
    repo: "pschoudhary-dot/Multifunc-Streamlit-APP",
    repoUrl: "https://github.com/pschoudhary-dot/Multifunc-Streamlit-APP",
    starsBadgeUrl: "https://img.shields.io/github/stars/pschoudhary-dot/Multifunc-Streamlit-APP?label=Stars&style=social",
  },
  {
    title: "Face Recognition System",
    description: "Real-time face detection/recognition demo with OpenCV + Streamlit.",
    repo: "Mr-Dark-debug/face_recog_streamlit",
    repoUrl: "https://github.com/Mr-Dark-debug/face_recog_streamlit",
    starsBadgeUrl: "https://img.shields.io/github/stars/Mr-Dark-debug/face_recog_streamlit?label=Stars&style=social",
  },
  {
    title: "PDF Chat App",
    description: "Chat with PDFs using Gemini via Streamlit; quick demo app.",
    repo: "Mr-Dark-debug/PDF-chatapp",
    repoUrl: "https://github.com/Mr-Dark-debug/PDF-chatapp",
    starsBadgeUrl: "https://img.shields.io/github/stars/Mr-Dark-debug/PDF-chatapp?label=Stars&style=social",
  },
  {
    title: "cogito.ai",
    description: "TypeScript playground for AI-assisted coding utilities.",
    repo: "pschoudhary-dot/cogito.ai",
    repoUrl: "https://github.com/pschoudhary-dot/cogito.ai",
    starsBadgeUrl: "https://img.shields.io/github/stars/pschoudhary-dot/cogito.ai?label=Stars&style=social",
  },
];
