import React, { useEffect, useState } from 'react';
import { exportToSvg } from '@excalidraw/excalidraw';

function ExcalidrawDiagram({ data }) {
  const [svgContent, setSvgContent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function renderSvg() {
      try {
        const parsed = typeof data === 'string' ? JSON.parse(data) : data;
        const elements = parsed.elements || parsed;

        const svg = await exportToSvg({
          elements,
          appState: {
            viewBackgroundColor: 'transparent',
            exportWithDarkMode: false,
          },
          files: null,
          exportPadding: 20,
        });

        // Style adjustments
        svg.style.width = '100%';
        svg.style.height = 'auto';
        svg.style.maxWidth = '100%';

        setSvgContent(svg.outerHTML);
      } catch (err) {
        console.error('Error rendering Excalidraw:', err);
        setError(err.message);
      }
    }

    renderSvg();
  }, [data]);

  if (error) {
    return (
      <div className="my-6 p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400">
        Erro ao renderizar diagrama: {error}
      </div>
    );
  }

  if (!svgContent) {
    return (
      <div className="my-6 p-8 rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] flex items-center justify-center min-h-[200px]">
        <span className="text-[var(--text-muted)]">Carregando diagrama...</span>
      </div>
    );
  }

  return (
    <div
      className="my-6 p-6 rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] flex items-center justify-center"
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
}

export default ExcalidrawDiagram;
