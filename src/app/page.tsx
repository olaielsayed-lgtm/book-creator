"use client";

import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [books, setBooks] = useState([
    { id: "1", title: "The Quantum Thief", lastEdited: "2 hours ago" },
    { id: "2", title: "Echoes of Eternity", lastEdited: "1 day ago" },
  ]);

  return (
    <main className="flex flex-col h-screen w-full" style={{ padding: "var(--spacing-8)" }}>
      <header className="flex justify-between items-center" style={{ marginBottom: "var(--spacing-12)" }}>
        <div className="flex items-center gap-4">
          <div style={{
            width: "40px",
            height: "40px",
            borderRadius: "var(--radius-md)",
            background: "linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            fontSize: "1.2rem"
          }}>
            B
          </div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 600 }}>Book Creator</h1>
        </div>
        <button style={{
          padding: "var(--spacing-3) var(--spacing-6)",
          borderRadius: "var(--radius-full)",
          backgroundColor: "var(--accent-primary)",
          color: "white",
          fontWeight: 500,
          transition: "background var(--transition-fast)"
        }}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--accent-primary-hover)'}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--accent-primary)'}
        >
          + New Book
        </button>
      </header>

      <section className="flex-1">
        <h2 style={{ fontSize: "1.25rem", color: "var(--text-secondary)", marginBottom: "var(--spacing-6)" }}>Your Books</h2>
        
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "var(--spacing-6)"
        }}>
          {books.map((book) => (
            <Link href={`/editor/${book.id}`} key={book.id}>
              <div className="glass-panel animate-fade-in" style={{
                padding: "var(--spacing-6)",
                borderRadius: "var(--radius-lg)",
                cursor: "pointer",
                transition: "transform var(--transition-fast), border-color var(--transition-fast)",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = 'var(--border-focus)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'var(--border-color)';
              }}
              >
                <h3 style={{ fontSize: "1.125rem", fontWeight: 500, marginBottom: "var(--spacing-2)" }}>{book.title}</h3>
                <p style={{ color: "var(--text-tertiary)", fontSize: "0.875rem" }}>Last edited {book.lastEdited}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
