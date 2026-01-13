// mergeNode.js

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const MergeNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Merge"
      style={{ 
        borderColor: '#a855f7',
        borderLeftWidth: '4px',
        backgroundColor: '#faf5ff'
      }}
      handles={[
        {
          type: 'target',
          position: Position.Left,
          id: `${id}-input1`,
          style: { top: '25%' },
          label: 'Input 1'
        },
        {
          type: 'target',
          position: Position.Left,
          id: `${id}-input2`,
          style: { top: '50%' },
          label: 'Input 2'
        },
        {
          type: 'target',
          position: Position.Left,
          id: `${id}-input3`,
          style: { top: '75%' },
          label: 'Input 3'
        },
        {
          type: 'source',
          position: Position.Right,
          id: `${id}-merged`
        }
      ]}
      fields={[
        {
          key: 'mergeStrategy',
          label: 'Strategy',
          type: 'select',
          defaultValue: 'concat',
          options: [
            { value: 'concat', label: 'Concatenate' },
            { value: 'join', label: 'Join with Separator' },
            { value: 'array', label: 'Create Array' },
            { value: 'object', label: 'Create Object' }
          ]
        },
        {
          key: 'separator',
          label: 'Separator',
          type: 'text',
          defaultValue: ', '
        }
      ]}
    >
      <div style={{ fontSize: '12px', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
        Merges multiple inputs into one
      </div>
    </BaseNode>
  );
};

