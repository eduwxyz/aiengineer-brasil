import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { modules } from '../../data/modules';
import Icon from '../Icon';

function TrilhaSidebar({ currentModule, currentArticle, isOpen, onClose }) {
  const [expandedModules, setExpandedModules] = useState([currentModule]);

  const toggleModule = (slug) => {
    setExpandedModules(prev =>
      prev.includes(slug)
        ? prev.filter(s => s !== slug)
        : [...prev, slug]
    );
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-20 left-0 bottom-0 w-72
          bg-[var(--bg-primary)]/95 backdrop-blur-xl
          border-r border-[var(--glass-border)]
          overflow-y-auto
          z-40
          transition-transform duration-300
          lg:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <nav className="p-4">
          {/* Back to Trilha */}
          <Link
            to="/trilha"
            className="flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors mb-6 px-3"
          >
            <Icon name="arrow" className="w-4 h-4 rotate-180" />
            Todos os módulos
          </Link>

          {/* Modules */}
          <ul className="space-y-1">
            {modules.map((module) => {
              const isExpanded = expandedModules.includes(module.slug);
              const isCurrentModule = module.slug === currentModule;

              return (
                <li key={module.slug}>
                  <button
                    onClick={() => toggleModule(module.slug)}
                    className={`
                      w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-left text-sm
                      transition-colors
                      ${isCurrentModule
                        ? 'bg-[var(--accent-soft)] text-[var(--sunset-400)]'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--glass-bg)]'
                      }
                    `}
                  >
                    <span className="flex items-center gap-2 min-w-0">
                      <Icon name={module.icon} className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate font-medium">{module.title}</span>
                    </span>
                    <Icon
                      name="chevronDown"
                      className={`w-4 h-4 flex-shrink-0 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {/* Articles */}
                  {isExpanded && (
                    <ul className="ml-6 mt-1 space-y-1 border-l border-[var(--glass-border)] pl-3">
                      {module.articles.map((article) => {
                        const isCurrentArticle = module.slug === currentModule && article.slug === currentArticle;

                        return (
                          <li key={article.slug}>
                            <Link
                              to={`/trilha/${module.slug}/${article.slug}`}
                              onClick={onClose}
                              className={`
                                block px-3 py-1.5 rounded text-sm transition-colors
                                ${isCurrentArticle
                                  ? 'text-[var(--sunset-400)] bg-[var(--accent-soft)]'
                                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                                }
                              `}
                            >
                              {article.title}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
}

export default TrilhaSidebar;
