import React, { useState } from 'react';
import Icon from '../Icon';

function YouTubeEmbed({ url, title = 'Vídeo do YouTube' }) {
  const [isLoaded, setIsLoaded] = useState(false);

  // Extract video ID from various YouTube URL formats
  const getVideoId = (url) => {
    if (!url) return null;

    const patterns = [
      /(?:youtube\.com\/watch\?v=)([^&]+)/,
      /(?:youtu\.be\/)([^?]+)/,
      /(?:youtube\.com\/embed\/)([^?]+)/,
      /(?:youtube\.com\/v\/)([^?]+)/
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }

    return null;
  };

  const videoId = getVideoId(url);

  if (!videoId) {
    return null;
  }

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  // Facade pattern: show thumbnail first, load iframe on click
  if (!isLoaded) {
    return (
      <button
        onClick={() => setIsLoaded(true)}
        className="relative w-full rounded-xl overflow-hidden glass-card group cursor-pointer"
        style={{ aspectRatio: '16/9' }}
        aria-label={`Reproduzir vídeo: ${title}`}
      >
        <img
          src={thumbnailUrl}
          alt={title}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[var(--sunset-500)] flex items-center justify-center group-hover:scale-110 transition-transform">
            <Icon name="play" className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" />
          </div>
        </div>
      </button>
    );
  }

  return (
    <div
      className="relative w-full rounded-xl overflow-hidden glass-card"
      style={{ aspectRatio: '16/9' }}
    >
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}

export default YouTubeEmbed;
