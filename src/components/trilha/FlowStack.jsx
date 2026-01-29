import React from 'react';
import Icon from '../Icon';

function FlowStack({ items }) {
  return (
    <div className="my-6 p-6 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-xl">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <div className="flex items-center gap-4 p-4 bg-[rgba(255,255,255,0.03)] border border-[var(--glass-border)] rounded-lg hover:bg-[var(--bg-card-hover)] hover:border-[var(--glass-border-hover)] transition-all">
            <div className="w-8 h-8 rounded-lg bg-[var(--accent-soft)] flex items-center justify-center text-sm font-semibold text-[var(--sunset-400)] flex-shrink-0">
              {index + 1}
            </div>
            <span className="text-[var(--text-primary)]">{item}</span>
          </div>
          {index < items.length - 1 && (
            <div className="flex justify-center py-2">
              <Icon name="chevronDown" className="w-5 h-5 text-[var(--sunset-400)]" />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export default FlowStack;
