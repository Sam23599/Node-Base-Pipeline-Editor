// llmNode.js

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="LLM"
      style={{ 
        borderColor: '#8b5cf6',
        borderLeftWidth: '4px',
        backgroundColor: '#faf5ff'
      }}
      handles={[
        {
          type: 'target',
          position: Position.Left,
          id: `${id}-system`,
          style: { top: `${100/3}%` }
        },
        {
          type: 'target',
          position: Position.Left,
          id: `${id}-prompt`,
          style: { top: `${200/3}%` }
        },
        {
          type: 'source',
          position: Position.Right,
          id: `${id}-response`
        }
      ]}
    >
      <div style={{ fontSize: '12px', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
        Large Language Model
      </div>
    </BaseNode>
  );
}
