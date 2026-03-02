"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-mono text-sm tracking-wider hover:text-white transition-colors">
          <span className="text-muted">@</span>aptsalt
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/#act-1" className="text-sm text-muted hover:text-white transition-colors">
            Projects
          </Link>
          <Link href="/#about" className="text-sm text-muted hover:text-white transition-colors">
            About
          </Link>
          <a
            href="https://github.com/aptsalt"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted hover:text-white transition-colors"
          >
            GitHub
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-muted hover:text-white"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden glass border-t border-border px-6 py-4 flex flex-col gap-4">
          <Link href="/#act-1" onClick={() => setOpen(false)} className="text-sm text-muted hover:text-white">
            Projects
          </Link>
          <Link href="/#about" onClick={() => setOpen(false)} className="text-sm text-muted hover:text-white">
            About
          </Link>
          <a href="https://github.com/aptsalt" target="_blank" rel="noopener noreferrer" className="text-sm text-muted hover:text-white">
            GitHub
          </a>
        </div>
      )}
    </nav>
  );
}
