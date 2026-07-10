"use client";

import { useState, useEffect } from "react";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [apiKey, setApiKey] = useState("");
  const [modelName, setModelName] = useState("gemini-1.5-flash");

  useEffect(() => {
    if (isOpen) {
      const storedKey = localStorage.getItem("gemini_api_key");
      const storedModel = localStorage.getItem("gemini_model");
      if (storedKey) setApiKey(storedKey);
      if (storedModel) setModelName(storedModel);
    }
  }, [isOpen]);

  const handleSave = () => {
    localStorage.setItem("gemini_api_key", apiKey.trim());
    localStorage.setItem("gemini_model", modelName.trim() || "gemini-1.5-flash");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: "fixed",
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      backdropFilter: "blur(4px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
    }}>
      <div className="glass-panel" style={{
        padding: "var(--spacing-8)",
        borderRadius: "var(--radius-lg)",
        width: "90%",
        maxWidth: "400px",
        display: "flex",
        flexDirection: "column",
        gap: "var(--spacing-4)"
      }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 600 }}>Settings</h2>
        
        <div>
          <label style={{ display: "block", marginBottom: "var(--spacing-2)", fontSize: "0.875rem", color: "var(--text-secondary)" }}>
            Gemini API Key
          </label>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="AIzaSy..."
            style={{
              width: "100%",
              padding: "var(--spacing-3)",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--border-color)",
              background: "var(--bg-base)",
              color: "var(--text-primary)",
              outline: "none"
            }}
            onFocus={(e) => e.target.style.borderColor = "var(--border-focus)"}
            onBlur={(e) => e.target.style.borderColor = "var(--border-color)"}
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "var(--spacing-2)", fontSize: "0.875rem", color: "var(--text-secondary)" }}>
            Gemini Model
          </label>
          <input
            type="text"
            value={modelName}
            onChange={(e) => setModelName(e.target.value)}
            placeholder="e.g. gemini-1.5-flash"
            style={{
              width: "100%",
              padding: "var(--spacing-3)",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--border-color)",
              background: "var(--bg-base)",
              color: "var(--text-primary)",
              outline: "none"
            }}
            onFocus={(e) => e.target.style.borderColor = "var(--border-focus)"}
            onBlur={(e) => e.target.style.borderColor = "var(--border-color)"}
          />
          <p style={{ fontSize: "0.75rem", color: "var(--text-tertiary)", marginTop: "var(--spacing-2)" }}>
            Your key and model preference are stored locally in your browser.
          </p>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: "var(--spacing-2)", marginTop: "var(--spacing-4)" }}>
          <button
            onClick={onClose}
            style={{
              padding: "var(--spacing-2) var(--spacing-4)",
              borderRadius: "var(--radius-md)",
              background: "transparent",
              color: "var(--text-primary)",
              border: "1px solid var(--border-color)"
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            style={{
              padding: "var(--spacing-2) var(--spacing-4)",
              borderRadius: "var(--radius-md)",
              background: "var(--accent-primary)",
              color: "white"
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
