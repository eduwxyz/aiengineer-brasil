import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { modules } from '../data/modules';
import Icon from '../components/Icon';
import SEO from '../components/SEO';

function Trilha() {
  return (
    <>
      <SEO
        title="Trilha AI Engineer"
        description="Aprenda AI Engineering com conteúdo prático que evolui junto com a área. LLMs, RAG, Agents, Prompt Engineering e mais."
        keyword="trilha ai engineer aprender llm rag agents"
        canonicalUrl="https://aiengineer.com.br/trilha"
        type="course"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Trilha' }
        ]}
      />
      <div className="pt-28 pb-16">
      <div className="container">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h1 className="heading-xl mb-6">
            Trilha <span className="text-gradient">AI Engineer</span>
          </h1>
          <p className="text-xl text-[var(--text-secondary)]">
            Aprenda AI Engineering com conteúdo prático que evolui junto com a área.
          </p>
        </motion.div>

        {/* Modules Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {modules.map((module, i) => (
            <motion.div
              key={module.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                to={`/trilha/${module.slug}`}
                className="glass-card p-6 h-full flex flex-col hover:border-[var(--sunset-500)]/50 transition-all group block"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="icon-container">
                    <Icon name={module.icon} className="w-5 h-5" />
                  </div>
                  <span className="text-xs text-[var(--text-muted)] font-mono">
                    {String(module.order).padStart(2, '0')}
                  </span>
                </div>

                <h2 className="heading-md mb-2 group-hover:text-[var(--sunset-400)] transition-colors">
                  {module.title}
                </h2>

                <p className="text-sm text-[var(--text-secondary)] mb-4 flex-1">
                  {module.description}
                </p>

                <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
                  <span>{module.articles.length} artigos</span>
                  <Icon name="chevronRight" className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}

export default Trilha;
