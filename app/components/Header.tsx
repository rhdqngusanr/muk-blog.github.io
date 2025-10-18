"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Header({ onSearch }: { onSearch?: (q: string) => void }) {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => (typeof window !== 'undefined' && localStorage.getItem('theme') === 'dark') ? 'dark' : 'light');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('theme-dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand" href="/">재미난사람들</Link>
        <nav className="nav">
          <Link href="/">Home</Link>
          <Link href="/posts/classes">직업 모음</Link>
          <a href="#posts">Blog</a>
          <a href="#about">Team</a>
          <a href="#contact">Contact</a>
          <a href="https://github.com/" target="_blank" rel="noopener">GitHub</a>
        </nav>
        <div className="header-actions">
          {onSearch && (
            <input
              className="search"
              type="search"
              placeholder="검색 (제목/태그)"
              aria-label="검색"
              onChange={(e) => onSearch?.(e.target.value)}
            />
          )}
          <button className="icon-button" aria-label="테마 전환" title="테마 전환" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            <span className="icon">{theme === 'dark' ? '🌙' : '☀️'}</span>
          </button>
          <button className="icon-button mobile-menu-button" aria-label="메뉴" title="메뉴" onClick={() => setMenuOpen(v => !v)}>
            <span className="icon">☰</span>
          </button>
        </div>
      </div>
      {/* mobile dropdown menu */}
      <div className={`mobile-nav ${menuOpen ? 'open' : ''}`}>
        <div className="container">
          <nav className="mobile-nav-inner" onClick={() => setMenuOpen(false)}>
            <Link href="/">Home</Link>
            <Link href="/posts/classes">직업 모음</Link>
            <a href="#posts">Blog</a>
            <a href="#about">Team</a>
            <a href="#contact">Contact</a>
            <a href="https://github.com/" target="_blank" rel="noopener">GitHub</a>
          </nav>
        </div>
      </div>
    </header>
  );
}