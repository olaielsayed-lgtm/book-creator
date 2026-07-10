"use client";

import Link from "next/link";
import { useState, use, useMemo } from "react";

export default function Editor({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [activeTab, setActiveTab] = useState("editor"); // 'editor' | 'codex'
  const [chapterContent, setChapterContent] = useState("");
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate generation delay
    setTimeout(() => {
      setChapterContent("The city skyline was a jagged teeth against the twilight. Neon bled into the fog, painting the streets in hues of electric cyan and violent magenta. Kael tightened his coat against the synthetic chill. He had one lead left, and it was waiting in the underbelly of Sector 4...");
      setIsGenerating(false);
      setPrompt("");
    }, 1500);
  };

  return (
    <div className="flex h-screen w-full bg-[#0f1115] text-[#f8fafc]">
      {/* Sidebar Navigation */}
      <nav style={{ width: "64px", borderRight: "1px solid var(--border-color)", display: "flex", flexDirection: "column", alignItems: "center", padding: "var(--spacing-4) 0" }}>
        <Link href="/" style={{
          width: "40px", height: "40px", borderRadius: "var(--radius-md)", background: "linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))",
          display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "1.2rem", marginBottom: "var(--spacing-8)"
        }}>
          B
        </Link>
        <button 
          onClick={() => setActiveTab('editor')}
          style={{ width: "40px", height: "40px", borderRadius: "var(--radius-sm)", marginBottom: "var(--spacing-4)", background: activeTab === 'editor' ? 'var(--bg-surface-elevated)' : 'transparent', color: activeTab === 'editor' ? 'var(--accent-primary)' : 'var(--text-secondary)' }}>
          ✎
        </button>
        <button 
          onClick={() => setActiveTab('codex')}
          style={{ width: "40px", height: "40px", borderRadius: "var(--radius-sm)", background: activeTab === 'codex' ? 'var(--bg-surface-elevated)' : 'transparent', color: activeTab === 'codex' ? 'var(--accent-primary)' : 'var(--text-secondary)' }}>
          📖
        </button>
      </nav>

      {/* Main Workspace */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header style={{ height: "64px", borderBottom: "1px solid var(--border-color)", display: "flex", alignItems: "center", padding: "0 var(--spacing-6)", justifyContent: "space-between" }}>
          <h2 style={{ fontSize: "1.125rem", fontWeight: 500 }}>Chapter 1: Neon Shadows <span style={{color: "var(--text-tertiary)", fontSize: "0.875rem", marginLeft: "8px"}}>(Book ID: {resolvedParams.id})</span></h2>
          <div className="flex gap-4">
            <button style={{ padding: "6px 12px", borderRadius: "var(--radius-full)", background: "var(--bg-surface-elevated)", color: "var(--text-primary)", fontSize: "0.875rem" }}>Export PDF</button>
            <button style={{ padding: "6px 12px", borderRadius: "var(--radius-full)", background: "var(--bg-surface-elevated)", color: "var(--text-primary)", fontSize: "0.875rem" }}>Export Word</button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 flex" style={{ overflow: "hidden" }}>
          
          {/* Editor Area */}
          {activeTab === 'editor' && (
            <div className="flex-1 flex flex-col relative" style={{ padding: "var(--spacing-8)", maxWidth: "800px", margin: "0 auto", width: "100%", overflowY: "auto" }}>
              {!chapterContent && (
                <div className="flex flex-col items-center justify-center h-full text-center animate-fade-in">
                  <h3 style={{ fontSize: "1.5rem", marginBottom: "var(--spacing-4)", color: "var(--text-secondary)" }}>Generate Next Chapter</h3>
                  <p style={{ color: "var(--text-tertiary)", marginBottom: "var(--spacing-6)", maxWidth: "400px" }}>
                    The Context Continuity Engine will automatically include summaries of previous chapters. Just tell Gemini what happens next.
                  </p>
                  <div style={{ width: "100%", maxWidth: "600px", position: "relative" }}>
                    <textarea 
                      placeholder="e.g. Kael investigates the lead in Sector 4 and runs into an ambush..."
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      style={{ width: "100%", minHeight: "120px", background: "var(--bg-surface)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-lg)", padding: "var(--spacing-4)", color: "var(--text-primary)", fontFamily: "inherit", resize: "none", outline: "none" }}
                      onFocus={(e) => e.target.style.borderColor = "var(--border-focus)"}
                      onBlur={(e) => e.target.style.borderColor = "var(--border-color)"}
                    />
                    <button 
                      onClick={handleGenerate}
                      disabled={isGenerating || !prompt}
                      style={{ position: "absolute", bottom: "16px", right: "16px", padding: "8px 16px", borderRadius: "var(--radius-full)", background: isGenerating ? "var(--bg-surface-elevated)" : "var(--accent-primary)", color: "white", fontWeight: 500, opacity: (!prompt || isGenerating) ? 0.5 : 1, cursor: (!prompt || isGenerating) ? "not-allowed" : "pointer" }}
                    >
                      {isGenerating ? "Generating..." : "Generate Chapter ⚡"}
                    </button>
                  </div>
                </div>
              )}

              {chapterContent && (
                <div className="animate-fade-in h-full flex flex-col">
                  <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "var(--spacing-4)" }}>
                     <button style={{ padding: "4px 12px", fontSize: "0.75rem", borderRadius: "4px", background: "rgba(99, 102, 241, 0.1)", color: "var(--accent-primary)", border: "1px solid rgba(99, 102, 241, 0.2)" }}>
                       ✦ AI Edit Mode
                     </button>
                  </div>
                  <textarea
                    value={chapterContent}
                    onChange={(e) => setChapterContent(e.target.value)}
                    style={{ flex: 1, width: "100%", background: "transparent", border: "none", color: "var(--text-primary)", fontSize: "1.125rem", lineHeight: 1.8, fontFamily: "var(--font-serif)", resize: "none", outline: "none" }}
                  />
                </div>
              )}
            </div>
          )}

          {/* Codex Area (Placeholder) */}
          {activeTab === 'codex' && (
            <div className="flex-1" style={{ padding: "var(--spacing-8)" }}>
              <h3 style={{ fontSize: "1.5rem", marginBottom: "var(--spacing-6)" }}>World & Character Codex</h3>
              <div className="glass-panel" style={{ padding: "var(--spacing-6)", borderRadius: "var(--radius-md)", marginBottom: "var(--spacing-4)" }}>
                <h4 style={{ color: "var(--accent-primary)", marginBottom: "var(--spacing-2)" }}>Kael</h4>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>Protagonist. Cynical detective. Prefers synthetic coffee.</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
