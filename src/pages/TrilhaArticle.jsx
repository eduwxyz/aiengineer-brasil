import React, { useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { getModule, getArticle, getAdjacentArticles } from '../data/modules';
import { articleContent } from '../content';
import Icon from '../components/Icon';
import TrilhaSidebar from '../components/trilha/TrilhaSidebar';
import YouTubeEmbed from '../components/trilha/YouTubeEmbed';
import FlowStack from '../components/trilha/FlowStack';
import ExcalidrawDiagram from '../components/trilha/ExcalidrawDiagram';
import SEO from '../components/SEO';

function TrilhaArticle() {
  const { moduleSlug, articleSlug } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const module = getModule(moduleSlug);
  const article = getArticle(moduleSlug, articleSlug);
  const { prev, next } = getAdjacentArticles(moduleSlug, articleSlug);

  // Get article content
  const content = articleContent[moduleSlug]?.[articleSlug];

  if (!module || !article) {
    return <Navigate to="/trilha" replace />;
  }

  return (
    <>
      <SEO
        title={article.title}
        description={article.description}
        keyword={article.keyword}
        canonicalUrl={`https://aiengineer.com.br/trilha/${module.slug}/${article.slug}`}
        type="article"
        article={{
          datePublished: '2024-01-01',
          dateModified: new Date().toISOString().split('T')[0]
        }}
        wikipediaUrl={article.wikipediaUrl}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Trilha', url: '/trilha' },
          { name: module.title, url: `/trilha/${module.slug}` },
          { name: article.title }
        ]}
      />
      <div className="pt-20">
      {/* Mobile sidebar toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed bottom-6 right-6 z-50 lg:hidden w-14 h-14 rounded-full bg-[var(--sunset-500)] text-white shadow-lg flex items-center justify-center"
      >
        <Icon name={sidebarOpen ? 'x' : 'menu'} className="w-6 h-6" />
      </button>

      <div className="flex">
        {/* Sidebar */}
        <TrilhaSidebar
          currentModule={moduleSlug}
          currentArticle={articleSlug}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main Content */}
        <main className="flex-1 min-w-0 lg:ml-72">
          <div className="max-w-3xl mx-auto px-6 py-12">
            {/* Breadcrumb */}
            <motion.nav
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-8"
            >
              <ol className="flex items-center gap-2 text-sm text-[var(--text-muted)] flex-wrap">
                <li>
                  <Link to="/trilha" className="hover:text-[var(--text-primary)] transition-colors">
                    Trilha
                  </Link>
                </li>
                <li>
                  <Icon name="chevronRight" className="w-4 h-4" />
                </li>
                <li>
                  <Link to={`/trilha/${module.slug}`} className="hover:text-[var(--text-primary)] transition-colors">
                    {module.title}
                  </Link>
                </li>
                <li>
                  <Icon name="chevronRight" className="w-4 h-4" />
                </li>
                <li className="text-[var(--text-primary)]">
                  {article.title}
                </li>
              </ol>
            </motion.nav>

            {/* Article Header */}
            <motion.header
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h1 className="heading-lg mb-4">{article.title}</h1>
              <p className="text-xl text-[var(--text-secondary)]">
                {article.description}
              </p>
            </motion.header>

            {/* Video Embed */}
            {content?.video && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-10"
              >
                <YouTubeEmbed url={content.video} />
              </motion.div>
            )}

            {/* Article Content */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="prose prose-invert prose-lg max-w-none"
            >
              {content?.body ? (
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    code({ node, inline, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || '');
                      const content = String(children).replace(/\n$/, '');

                      // Check if it's an Excalidraw diagram
                      if (!inline && match && match[1] === 'excalidraw') {
                        return <ExcalidrawDiagram data={content} />;
                      }

                      // Check if it's a flow/stack diagram (contains ↓ arrows and no language)
                      if (!inline && !match && content.includes('↓')) {
                        const lines = content.split('\n').filter(line => line.trim() && !line.includes('↓'));
                        return <FlowStack items={lines} />;
                      }

                      return !inline && match ? (
                        <SyntaxHighlighter
                          style={oneDark}
                          language={match[1]}
                          PreTag="div"
                          className="rounded-lg !bg-[var(--bg-card)] !mt-4 !mb-4"
                          {...props}
                        >
                          {content}
                        </SyntaxHighlighter>
                      ) : (
                        <code className="bg-[var(--bg-card)] px-1.5 py-0.5 rounded text-[var(--sunset-400)]" {...props}>
                          {children}
                        </code>
                      );
                    },
                    a({ href, children }) {
                      return (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[var(--sunset-400)] hover:text-[var(--sunset-300)] underline"
                        >
                          {children}
                        </a>
                      );
                    },
                    h2({ children }) {
                      return <h2 className="heading-md mt-10 mb-4 text-[var(--text-primary)]">{children}</h2>;
                    },
                    h3({ children }) {
                      return <h3 className="font-semibold text-xl mt-8 mb-3 text-[var(--text-primary)]">{children}</h3>;
                    },
                    p({ children }) {
                      return <p className="text-[var(--text-secondary)] leading-relaxed mb-4">{children}</p>;
                    },
                    ul({ children }) {
                      return <ul className="list-disc list-inside space-y-2 text-[var(--text-secondary)] mb-4">{children}</ul>;
                    },
                    ol({ children }) {
                      return <ol className="list-decimal list-inside space-y-2 text-[var(--text-secondary)] mb-4">{children}</ol>;
                    },
                    blockquote({ children }) {
                      return (
                        <blockquote className="border-l-4 border-[var(--sunset-500)] pl-4 italic text-[var(--text-muted)] my-4">
                          {children}
                        </blockquote>
                      );
                    },
                    table({ children }) {
                      return (
                        <div className="overflow-x-auto my-6">
                          <table>{children}</table>
                        </div>
                      );
                    },
                    thead({ children }) {
                      return <thead>{children}</thead>;
                    },
                    tbody({ children }) {
                      return <tbody>{children}</tbody>;
                    },
                    tr({ children }) {
                      return <tr>{children}</tr>;
                    },
                    th({ children }) {
                      return <th>{children}</th>;
                    },
                    td({ children }) {
                      return <td>{children}</td>;
                    }
                  }}
                >
                  {content.body}
                </ReactMarkdown>
              ) : (
                <div className="glass-card p-8 text-center">
                  <Icon name="book" className="w-12 h-12 mx-auto mb-4 text-[var(--text-muted)]" />
                  <h3 className="heading-md mb-2">Conteúdo em breve</h3>
                  <p className="text-[var(--text-secondary)]">
                    Este artigo ainda está sendo escrito. Volte em breve!
                  </p>
                </div>
              )}
            </motion.article>

            {/* Navigation */}
            <nav className="flex justify-between items-center mt-16 pt-8 border-t border-[var(--glass-border)]">
              {prev ? (
                <Link
                  to={`/trilha/${prev.module.slug}/${prev.article.slug}`}
                  className="flex items-center gap-3 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors group max-w-[45%]"
                >
                  <Icon name="arrow" className="w-5 h-5 rotate-180 flex-shrink-0 group-hover:-translate-x-1 transition-transform" />
                  <div className="text-right min-w-0">
                    <span className="text-xs text-[var(--text-muted)] block">Anterior</span>
                    <span className="font-medium truncate block">{prev.article.title}</span>
                  </div>
                </Link>
              ) : <div />}

              {next ? (
                <Link
                  to={`/trilha/${next.module.slug}/${next.article.slug}`}
                  className="flex items-center gap-3 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors group max-w-[45%]"
                >
                  <div className="min-w-0">
                    <span className="text-xs text-[var(--text-muted)] block">Próximo</span>
                    <span className="font-medium truncate block">{next.article.title}</span>
                  </div>
                  <Icon name="arrow" className="w-5 h-5 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                </Link>
              ) : <div />}
            </nav>
          </div>
        </main>
      </div>
    </div>
    </>
  );
}

export default TrilhaArticle;
