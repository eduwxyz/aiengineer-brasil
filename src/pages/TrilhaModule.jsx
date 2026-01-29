import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getModule, modules } from '../data/modules';
import Icon from '../components/Icon';
import SEO from '../components/SEO';

function TrilhaModule() {
  const { moduleSlug } = useParams();
  const module = getModule(moduleSlug);

  if (!module) {
    return <Navigate to="/trilha" replace />;
  }

  const moduleIndex = modules.findIndex(m => m.slug === moduleSlug);
  const prevModule = moduleIndex > 0 ? modules[moduleIndex - 1] : null;
  const nextModule = moduleIndex < modules.length - 1 ? modules[moduleIndex + 1] : null;

  return (
    <>
      <SEO
        title={module.title}
        description={module.description}
        keyword={module.keyword}
        canonicalUrl={`https://aiengineer.com.br/trilha/${module.slug}`}
        wikipediaUrl={module.wikipediaUrl}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Trilha', url: '/trilha' },
          { name: module.title }
        ]}
      />
      <div className="pt-28 pb-16">
      <div className="container">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8"
        >
          <ol className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
            <li>
              <Link to="/trilha" className="hover:text-[var(--text-primary)] transition-colors">
                Trilha
              </Link>
            </li>
            <li>
              <Icon name="chevronRight" className="w-4 h-4" />
            </li>
            <li className="text-[var(--text-primary)]">
              {module.title}
            </li>
          </ol>
        </motion.nav>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="icon-container">
              <Icon name={module.icon} className="w-6 h-6" />
            </div>
            <span className="text-sm text-[var(--text-muted)] font-mono">
              Módulo {String(module.order).padStart(2, '0')}
            </span>
          </div>
          <h1 className="heading-lg mb-4">{module.title}</h1>
          <p className="text-xl text-[var(--text-secondary)] max-w-2xl">
            {module.description}
          </p>
        </motion.div>

        {/* Articles List */}
        <div className="space-y-4 mb-12">
          {module.articles.map((article, i) => (
            <motion.div
              key={article.slug}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                to={`/trilha/${module.slug}/${article.slug}`}
                className="glass-card p-6 flex items-center gap-6 hover:border-[var(--sunset-500)]/50 transition-all group block"
              >
                <span className="w-10 h-10 rounded-lg bg-[var(--accent-soft)] flex items-center justify-center text-sm font-semibold text-[var(--sunset-400)] flex-shrink-0">
                  {String(article.order).padStart(2, '0')}
                </span>

                <div className="flex-1 min-w-0">
                  <h2 className="font-semibold text-lg mb-1 group-hover:text-[var(--sunset-400)] transition-colors">
                    {article.title}
                  </h2>
                  <p className="text-sm text-[var(--text-secondary)] truncate">
                    {article.description}
                  </p>
                </div>

                <Icon name="chevronRight" className="w-5 h-5 text-[var(--text-muted)] group-hover:text-[var(--sunset-400)] group-hover:translate-x-1 transition-all flex-shrink-0" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Module Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-[var(--glass-border)]">
          {prevModule ? (
            <Link
              to={`/trilha/${prevModule.slug}`}
              className="flex items-center gap-3 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors group"
            >
              <Icon name="arrow" className="w-5 h-5 rotate-180 group-hover:-translate-x-1 transition-transform" />
              <div className="text-right">
                <span className="text-xs text-[var(--text-muted)] block">Anterior</span>
                <span className="font-medium">{prevModule.title}</span>
              </div>
            </Link>
          ) : <div />}

          {nextModule ? (
            <Link
              to={`/trilha/${nextModule.slug}`}
              className="flex items-center gap-3 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors group"
            >
              <div>
                <span className="text-xs text-[var(--text-muted)] block">Próximo</span>
                <span className="font-medium">{nextModule.title}</span>
              </div>
              <Icon name="arrow" className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          ) : <div />}
        </div>
      </div>
    </div>
    </>
  );
}

export default TrilhaModule;
