import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from './Icon';

function Layout({ children }) {
  const location = useLocation();
  const isTrilha = location.pathname.startsWith('/trilha');

  return (
    <div className="min-h-screen relative">
      {/* Background Effects */}
      <div className="bg-mesh" />
      <div className="gradient-blob" />
      <div className="noise" />

      {/* ==================== HEADER ==================== */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="container py-4">
          <div className="glass-card-static px-6 py-3 flex justify-between items-center">
            <Link to="/" className="font-semibold text-[var(--sunset-300)] hover:text-[var(--sunset-200)] transition-colors">
              AI Engineer BR
            </Link>
            <nav className="flex items-center gap-6">
              <Link
                to="/trilha"
                className={`text-sm font-medium px-4 py-1.5 rounded-lg transition-all ${
                  isTrilha
                    ? 'bg-[var(--sunset-500)] text-white'
                    : 'bg-[var(--sunset-500)]/20 text-[var(--sunset-400)] hover:bg-[var(--sunset-500)]/30'
                }`}
              >
                Trilha
              </Link>
              <a
                href="https://twitter.com/eduwxyz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                @eduwxyz
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {children}
      </main>

      {/* ==================== FOOTER ==================== */}
      <footer className="py-12 border-t border-[var(--glass-border)]">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <Link to="/" className="font-semibold text-lg text-[var(--sunset-300)] mb-1 block hover:text-[var(--sunset-200)] transition-colors">
                AI Engineer Brasil
              </Link>
              <p className="text-sm text-[var(--text-muted)]">
                @eduwxyz • Est. 2024
              </p>
            </div>

            <div className="flex gap-3">
              {[
                { icon: 'youtube', href: 'https://youtube.com/@eduwxyz', label: 'YouTube' },
                { icon: 'twitter', href: 'https://twitter.com/eduwxyz', label: 'Twitter' },
                { icon: 'github', href: 'https://github.com/eduwxyz', label: 'GitHub' }
              ].map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-[var(--glass-bg)] border border-[var(--glass-border)] flex items-center justify-center hover:bg-[var(--bg-card-hover)] hover:border-[var(--glass-border-hover)] transition-all"
                  aria-label={link.label}
                >
                  <Icon name={link.icon} className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
