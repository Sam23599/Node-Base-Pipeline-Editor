// draggableNode.js

import './draggableNode.css';

// Node type color mapping
const nodeColors = {
  customInput: { bg: '#3b82f6', hover: '#2563eb' },
  llm: { bg: '#8b5cf6', hover: '#7c3aed' },
  customOutput: { bg: '#10b981', hover: '#059669' },
  text: { bg: '#f59e0b', hover: '#d97706' },
  conditional: { bg: '#06b6d4', hover: '#0891b2' },
  calculator: { bg: '#ec4899', hover: '#db2777' },
  dataTransform: { bg: '#f97316', hover: '#ea580c' },
  logger: { bg: '#14b8a6', hover: '#0d9488' },
  merge: { bg: '#a855f7', hover: '#9333ea' },
};

export const DraggableNode = ({ type, label }) => {
    const colors = nodeColors[type] || { bg: '#6366f1', hover: '#4f46e5' };
    
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.target.style.opacity = '0.5';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };
  
    const onDragEnd = (event) => {
      event.target.style.cursor = 'grab';
      event.target.style.opacity = '1';
    };
  
    return (
      <div
        className={`draggable-node draggable-node-${type}`}
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={onDragEnd}
        style={{ 
          '--node-bg': colors.bg,
          '--node-hover': colors.hover,
        }}
        draggable
      >
          <span className="draggable-node-label">{label}</span>
      </div>
    );
  };
  