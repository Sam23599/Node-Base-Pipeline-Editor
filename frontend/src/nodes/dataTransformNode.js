// dataTransformNode.js

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const DataTransformNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Data Transform"
      style={{ 
        borderColor: '#f97316',
        borderLeftWidth: '4px',
        backgroundColor: '#fff7ed'
      }}
      handles={[
        {
          type: 'target',
          position: Position.Left,
          id: `${id}-input`
        },
        {
          type: 'source',
          position: Position.Right,
          id: `${id}-output`
        }
      ]}
      fields={[
        {
          key: 'transformType',
          label: 'Transform',
          type: 'select',
          defaultValue: 'uppercase',
          options: [
            { value: 'uppercase', label: 'Uppercase' },
            { value: 'lowercase', label: 'Lowercase' },
            { value: 'reverse', label: 'Reverse' },
            { value: 'trim', label: 'Trim Whitespace' },
            { value: 'capitalize', label: 'Capitalize' }
          ]
        },
        {
          key: 'prefix',
          label: 'Prefix',
          type: 'text',
          defaultValue: ''
        },
        {
          key: 'suffix',
          label: 'Suffix',
          type: 'text',
          defaultValue: ''
        }
      ]}
    >
      <div style={{ fontSize: '12px', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
        Transforms input data
      </div>
    </BaseNode>
  );
};

