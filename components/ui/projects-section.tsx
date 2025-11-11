"use client";

import React from "react";

export function ProjectsSection() {
  return (
    <>
      <style jsx>{`
        .section {
          padding: 3rem 1rem;
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 1.25rem;
        }
        .card {
          background: #111;
          color: #eee;
          border: 1px solid #2a2a2a;
          border-radius: 14px;
          padding: 1rem 1.125rem;
        }
        .card h3 {
          margin: 0 0 0.5rem;
          font-size: 1.1rem;
        }
        .card p {
          margin: 0.25rem 0;
          line-height: 1.45;
        }
      `}</style>
      <section id="projects" className="section">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 text-center text-gray-900 font-mono">Projects</h2>
          <div className="grid">
            <article className="card">
              <h3>PocketLLM</h3>
              <p>Cross-platform LLM chat with unified model catalogue, BYO keys, encrypted secrets, and streaming chat.</p>
              <p><strong>Stack:</strong> Flutter • FastAPI • Supabase</p>
              <p>
                <a href="https://github.com/PocketLLM/PocketLLM" target="_blank" rel="noopener noreferrer">Repository</a>
                · <a href="https://pocketllm-ai.vercel.app" target="_blank" rel="noopener noreferrer">Site</a>
              </p>
            </article>
            <article className="card">
              <h3>EchoGen.ai</h3>
              <p>Any URL → multi-speaker AI podcast. Background playback, cover-art generation, transcript view.</p>
              <p><strong>Stack:</strong> Flutter • Dart</p>
              <p><a href="https://github.com/PocketLLM/EchoGen.ai" target="_blank" rel="noopener noreferrer">Repository</a></p>
            </article>
            <article className="card">
              <h3>streamlit-tldraw</h3>
              <p>tldraw v2 inside Streamlit. Infinite canvas, live data, dark mode.</p>
              <p><strong>Stack:</strong> Python • TypeScript</p>
              <p>
                <a href="https://github.com/Mr-Dark-debug/streamlit-tldraw" target="_blank" rel="noopener noreferrer">Repository</a>
                · <a href="https://pypi.org/project/streamlit-tldraw/" target="_blank" rel="noopener noreferrer">PyPI</a>
              </p>
            </article>
            <article className="card">
              <h3>hiVPN</h3>
              <p>Open-source VPN client template with VPNGate integration, server selection, and speed test.</p>
              <p><strong>Stack:</strong> Flutter • Riverpod</p>
              <p><a href="https://github.com/Mr-Dark-debug/hivpn" target="_blank" rel="noopener noreferrer">Repository</a></p>
            </article>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold my-8 sm:my-12 text-center text-gray-900 font-mono">More Projects</h2>
          <div className="grid">
            <article className="card">
              <h3>WriteAI</h3>
              <p>Cross-platform content generator with templates and AI model routing.</p>
            </article>
            <article className="card">
              <h3>NeoLM</h3>
              <p>NotebookLM-style RAG notetaker with multimodal QA and memory.</p>
            </article>
            <article className="card">
              <h3>Delve</h3>
              <p>Live-web search assistant blending citations with LLM answers.</p>
            </article>
            <article className="card">
              <h3>AI Project Manager</h3>
              <p>LangGraph agent for dependency mapping, scheduling, and risk analysis.</p>
            </article>
            <article className="card">
              <h3>Proposal-Gen</h3>
              <p>Proposal generator conditioned on docs and company style.</p>
            </article>
            <article className="card">
              <h3>HR_Analysis</h3>
              <p>Resume screening and semantic candidate matching.</p>
            </article>
            <article className="card">
              <h3>Multi-Function Streamlit App</h3>
              <p>Summarization, sentiment analysis, dashboards, multimodal chat.</p>
            </article>
            <article className="card">
              <h3>AI Invoice Generator</h3>
              <p>Auto-generate invoices and PDFs via AI.</p>
            </article>
            <article className="card">
              <h3>PDF Chat App</h3>
              <p>Gemini-based PDF conversational interface.</p>
            </article>
            <article className="card">
              <h3>Face Recognition System</h3>
              <p>OpenCV face detection and recognition with Streamlit UI.</p>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
