import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import roadmapData from '../data/roadmap.json';

// Status Icons
const StatusIcon = ({ status }) => {
  const icons = {
    published: (
      <span className="text-xl" title="Publicado">✅</span>
    ),
    'in-progress': (
      <span className="text-xl" title="Em Produção">🔨</span>
    ),
    planned: (
      <span className="text-xl" title="Planejado">📅</span>
    ),
  };
  return icons[status] || null;
};

// Arrow Icon
const Icon = ({ name, className = "" }) => {
  const icons = {
    'chevron-left': (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="15 18 9 12 15 6"></polyline>
      </svg>
    ),
    'chevron-right': (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="9 18 15 12 9 6"></polyline>
      </svg>
    ),
  };
  return icons[name] || null;
};

const ModuleCard = ({ module, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15 }}
      className="flex-shrink-0 w-80 md:w-96"
    >
      <div
        className={`sketch-border-${module.color} p-6 cursor-pointer transition-all hover:scale-105`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Module Header */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span
              className="font-display font-bold text-sm uppercase tracking-wide"
              style={{ color: `var(--color-${module.color})` }}
            >
              Módulo {module.id}
            </span>
            <div className="flex gap-1">
              {module.topics.map((topic, i) => (
                <StatusIcon key={i} status={topic.status} />
              ))}
            </div>
          </div>
          <h3 className="font-display font-black text-2xl md:text-3xl">
            {module.title}
          </h3>
        </div>

        {/* Topics List */}
        <motion.div
          initial={false}
          animate={{
            height: isExpanded ? 'auto' : '0px',
            opacity: isExpanded ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="space-y-3 pt-4 border-t-2 border-dark">
            {module.topics.map((topic, i) => (
              <div key={i} className="flex items-start gap-3">
                <StatusIcon status={topic.status} />
                <p className="font-body text-sm leading-relaxed flex-1">
                  {topic.title}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Expand Indicator */}
        <div className="mt-4 text-center">
          <span className="font-body text-xs text-gray uppercase tracking-wide">
            {isExpanded ? 'Clique para recolher' : 'Clique para expandir'}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

const ConnectorLine = () => (
  <motion.div
    initial={{ scaleX: 0 }}
    whileInView={{ scaleX: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="flex-shrink-0 w-16 flex items-center justify-center"
  >
    <svg width="64" height="8" viewBox="0 0 64 8" fill="none">
      <motion.path
        d="M 0 4 L 56 4 L 52 0 M 56 4 L 52 8"
        stroke="var(--color-dark)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      />
    </svg>
  </motion.div>
);

const RoadmapSection = () => {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const newScrollPosition = scrollContainerRef.current.scrollLeft +
        (direction === 'left' ? -scrollAmount : scrollAmount);

      scrollContainerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-20 px-4 md:px-8 bg-paper">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl mb-6">
            Roadmap de <span className="text-blue">AI Engineering</span>
          </h2>
          <p className="font-body text-xl text-gray max-w-3xl mx-auto mb-8">
            Do zero ao deploy em produção. Conteúdo progressivo e prático.
          </p>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 justify-center items-center">
            <div className="flex items-center gap-2">
              <StatusIcon status="published" />
              <span className="font-body text-sm text-gray">Publicado</span>
            </div>
            <div className="flex items-center gap-2">
              <StatusIcon status="in-progress" />
              <span className="font-body text-sm text-gray">Em Produção</span>
            </div>
            <div className="flex items-center gap-2">
              <StatusIcon status="planned" />
              <span className="font-body text-sm text-gray">Planejado</span>
            </div>
          </div>
        </motion.div>

        {/* Roadmap Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={() => scroll('left')}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 items-center justify-center sketch-btn-outline rounded-full bg-white shadow-lg hover:scale-110 transition-transform"
            aria-label="Scroll para esquerda"
          >
            <Icon name="chevron-left" className="w-6 h-6" />
          </button>

          <button
            onClick={() => scroll('right')}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 items-center justify-center sketch-btn-outline rounded-full bg-white shadow-lg hover:scale-110 transition-transform"
            aria-label="Scroll para direita"
          >
            <Icon name="chevron-right" className="w-6 h-6" />
          </button>

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="overflow-x-auto pb-8 hide-scrollbar"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            <div className="flex items-center gap-4 px-4 min-w-max">
              {roadmapData.modules.map((module, index) => (
                <React.Fragment key={module.id}>
                  <ModuleCard module={module} index={index} />
                  {index < roadmapData.modules.length - 1 && <ConnectorLine />}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Scroll Hint */}
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-center mt-8 md:hidden"
          >
            <p className="font-body text-sm text-gray">
              ← Deslize para navegar →
            </p>
          </motion.div>
        </div>

        {/* Progress Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="handwritten text-2xl md:text-3xl text-coral">
            {roadmapData.modules.length} módulos • {roadmapData.modules.reduce((acc, m) => acc + m.topics.length, 0)} aulas
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default RoadmapSection;
