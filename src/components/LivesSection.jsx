import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import livesData from '../data/lives.json';

// Icon Component
const Icon = ({ name, className = "" }) => {
  const icons = {
    search: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.35-4.35"></path>
      </svg>
    ),
    calendar: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
      </svg>
    ),
    play: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="5 3 19 12 5 21 5 3"></polygon>
      </svg>
    ),
    tag: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
        <line x1="7" y1="7" x2="7.01" y2="7"></line>
      </svg>
    ),
  };
  return icons[name] || null;
};

const LiveCard = ({ live, index }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const colors = ['blue', 'coral', 'mint', 'purple', 'yellow'];
  const borderColor = colors[index % colors.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`sketch-border-${borderColor} p-6 h-full flex flex-col`}
    >
      {/* Date Badge */}
      <div className="flex items-center gap-2 mb-4">
        <Icon name="calendar" className="w-4 h-4 text-gray" />
        <span className="font-body text-sm text-gray">
          {formatDate(live.date)}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-display font-bold text-xl mb-3 group-hover:text-blue transition-colors">
        {live.title}
      </h3>

      {/* Summary */}
      <p className="font-body text-gray mb-4 flex-grow line-clamp-3">
        {live.summary}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {live.tags.map((tag, i) => (
          <span
            key={i}
            className="sketch-badge badge-blue text-xs"
            style={{ border: '2px solid var(--color-blue)', padding: '4px 12px' }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* CTA Button */}
      <a
        href={live.videoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="sketch-btn sketch-btn-blue text-sm py-2 px-4 w-full justify-center"
      >
        <Icon name="play" className="w-4 h-4" />
        Assistir Live
      </a>
    </motion.div>
  );
};

const LivesSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);

  // Get all unique tags
  const allTags = useMemo(() => {
    const tags = new Set();
    livesData.lives.forEach(live => {
      live.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, []);

  // Filter lives based on search and tags
  const filteredLives = useMemo(() => {
    return livesData.lives.filter(live => {
      // Search filter
      const matchesSearch = searchQuery === '' ||
        live.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        live.summary.toLowerCase().includes(searchQuery.toLowerCase());

      // Tag filter
      const matchesTags = selectedTags.length === 0 ||
        selectedTags.some(tag => live.tags.includes(tag));

      return matchesSearch && matchesTags;
    }).sort((a, b) => new Date(b.date) - new Date(a.date)); // Most recent first
  }, [searchQuery, selectedTags]);

  const toggleTag = (tag) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <section className="py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl mb-6">
            Lives <span className="text-coral">Recentes</span>
          </h2>
          <p className="font-body text-xl text-gray max-w-3xl mx-auto">
            Sessões ao vivo onde exploramos tópicos avançados, tiramos dúvidas e codamos junto
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-6">
            <div className="relative">
              <Icon name="search" className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray" />
              <input
                type="text"
                placeholder="Buscar lives por título ou tema..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-6 py-4 text-lg font-body border-3 border-dark rounded-lg focus:outline-none focus:ring-4 focus:ring-blue focus:ring-opacity-30 transition-all"
                style={{ borderRadius: '30px 10px 30px 10px / 10px 30px 10px 30px' }}
              />
            </div>
          </div>

          {/* Tag Filters */}
          <div className="flex flex-wrap gap-3 justify-center">
            {allTags.map((tag, i) => (
              <button
                key={i}
                onClick={() => toggleTag(tag)}
                className={`sketch-badge transition-all ${
                  selectedTags.includes(tag)
                    ? 'badge-blue'
                    : 'badge-purple'
                } ${selectedTags.includes(tag) ? 'scale-110' : ''}`}
                style={{
                  background: selectedTags.includes(tag) ? 'var(--color-blue)' : 'white',
                  color: selectedTags.includes(tag) ? 'white' : 'var(--color-purple)',
                  cursor: 'pointer'
                }}
              >
                <Icon name="tag" className="w-3 h-3" />
                {tag}
              </button>
            ))}
          </div>

          {/* Active Filters Indicator */}
          {(searchQuery || selectedTags.length > 0) && (
            <div className="text-center mt-4">
              <p className="font-body text-sm text-gray">
                {filteredLives.length} {filteredLives.length === 1 ? 'live encontrada' : 'lives encontradas'}
                {selectedTags.length > 0 && (
                  <button
                    onClick={() => {
                      setSelectedTags([]);
                      setSearchQuery('');
                    }}
                    className="ml-2 text-coral underline hover:text-blue transition-colors"
                  >
                    Limpar filtros
                  </button>
                )}
              </p>
            </div>
          )}
        </motion.div>

        {/* Lives Grid */}
        {filteredLives.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLives.map((live, i) => (
              <LiveCard key={live.id} live={live} index={i} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="handwritten text-3xl text-gray mb-4">
              Nenhuma live encontrada
            </p>
            <p className="font-body text-gray">
              Tente ajustar seus filtros de busca
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default LivesSection;
