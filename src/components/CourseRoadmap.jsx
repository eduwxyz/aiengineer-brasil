import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const roadmapData = {
  modules: [
    {
      id: 'intro',
      num: '01',
      title: 'Introdução',
      topics: [
        'O que é um AI Engineer?',
        'AI Engineer vs ML Engineer',
        'O mercado em 2025',
        'Pré-requisitos'
      ]
    },
    {
      id: 'fundamentals',
      num: '02',
      title: 'Fundamentos',
      topics: [
        'Como LLMs funcionam',
        'Tokens e Tokenização',
        'Context Window',
        'Temperature e Sampling',
        'Embeddings'
      ]
    },
    {
      id: 'models',
      num: '03',
      title: 'Modelos & APIs',
      topics: [
        'OpenAI (GPT-4, o1)',
        'Anthropic (Claude)',
        'Google (Gemini)',
        'Open Source (Llama, Mistral)',
        'Comparando modelos'
      ]
    },
    {
      id: 'prompting',
      num: '04',
      title: 'Prompt Engineering',
      topics: [
        'Anatomia de um prompt',
        'Few-shot learning',
        'Chain of Thought',
        'System prompts',
        'Prompt injection & segurança'
      ]
    },
    {
      id: 'rag',
      num: '05',
      title: 'RAG',
      topics: [
        'O que é RAG',
        'Vector Databases',
        'Chunking strategies',
        'Retrieval techniques',
        'Hybrid search'
      ]
    },
    {
      id: 'agents',
      num: '06',
      title: 'AI Agents',
      topics: [
        'O que são Agents',
        'Tool Use / Function Calling',
        'ReAct pattern',
        'Multi-agent systems',
        'Frameworks (LangChain, CrewAI)'
      ]
    },
    {
      id: 'dev-tools',
      num: '07',
      title: 'Dev Tools',
      topics: [
        'Cursor',
        'Claude Code',
        'GitHub Copilot',
        'V0, Bolt, Lovable',
        'Vibe Coding na prática'
      ]
    },
    {
      id: 'production',
      num: '08',
      title: 'Produção',
      topics: [
        'Arquitetura de apps LLM',
        'Caching e otimização',
        'Observabilidade',
        'Custos e rate limits',
        'Eval e testes'
      ]
    }
  ]
};

const ModuleCard = ({ module, isExpanded, onToggle, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
    >
      <div
        onClick={onToggle}
        className={`glass-card p-6 cursor-pointer ${isExpanded ? 'border-[var(--sunset-500)]' : ''}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span
              className="text-3xl font-bold"
              style={{
                fontFamily: 'var(--font-display)',
                background: 'linear-gradient(135deg, var(--sunset-400), var(--sunset-600))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              {module.num}
            </span>
            <h3
              className="text-xl font-semibold"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
            >
              {module.title}
            </h3>
          </div>
          <motion.span
            className="text-xl text-[var(--sunset-400)]"
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </motion.span>
        </div>

        {/* Expanded Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="divider my-5" />
              <ul className="space-y-3">
                {module.topics.map((topic, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="text-sm flex items-center gap-3"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    <span className="text-[var(--sunset-400)]">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </span>
                    <span>{topic}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const CourseRoadmap = () => {
  const [expandedModule, setExpandedModule] = useState(null);

  const toggleModule = (moduleId) => {
    setExpandedModule(expandedModule === moduleId ? null : moduleId);
  };

  const totalTopics = roadmapData.modules.reduce((acc, m) => acc + m.topics.length, 0);

  return (
    <section className="section" id="roadmap">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="badge mb-6">
            <span className="badge-dot" />
            O Caminho Completo
          </span>
          <h2 className="heading-lg mb-6">
            Do zero ao <span className="text-gradient">deploy</span>
          </h2>
          <p className="text-lg mb-8" style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            Todo o caminho pra tu virar AI Engineer de verdade
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-sm" style={{ color: 'var(--text-secondary)' }}>
            <span>
              <strong className="text-[var(--sunset-400)]">{roadmapData.modules.length}</strong> módulos
            </span>
            <span>
              <strong className="text-[var(--sunset-400)]">{totalTopics}</strong> tópicos
            </span>
            <span>
              <strong className="text-gradient">100%</strong> gratuito
            </span>
          </div>
        </motion.div>

        {/* Modules Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {roadmapData.modules.map((module, index) => (
            <ModuleCard
              key={module.id}
              module={module}
              isExpanded={expandedModule === module.id}
              onToggle={() => toggleModule(module.id)}
              index={index}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 glass-card-static p-8 flex flex-col sm:flex-row items-center justify-between gap-8"
        >
          <div>
            <p className="text-lg font-medium mb-1" style={{ color: 'var(--text-primary)' }}>
              Bora começar?
            </p>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Se inscreve no canal pra não perder nenhum vídeo
            </p>
          </div>
          <a
            href="https://www.youtube.com/@eduwxyz?sub_confirmation=1"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            <span>Partiu</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default CourseRoadmap;
