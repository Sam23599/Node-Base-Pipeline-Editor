// conditionalNode.js

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const ConditionalNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Conditional"
      style={{ 
        borderColor: '#06b6d4',
        borderLeftWidth: '4px',
        backgroundColor: '#ecfeff'
      }}
      handles={[
        {
          type: 'target',
          position: Position.Left,
          id: `${id}-condition`,
          label: 'Condition'
        },
        {
          type: 'target',
          position: Position.Left,
          id: `${id}-value`,
          style: { top: '50%' },
          label: 'Value'
        },
        {
          type: 'source',
          position: Position.Right,
          id: `${id}-true`,
          style: { top: '30%' },
          label: 'True'
        },
        {
          type: 'source',
          position: Position.Right,
          id: `${id}-false`,
          style: { top: '70%' },
          label: 'False'
        }
      ]}
      fields={[
        {
          key: 'operator',
          label: 'Operator',
          type: 'select',
          defaultValue: 'equals',
          options: [
            { value: 'equals', label: 'Equals' },
            { value: 'greater', label: 'Greater Than' },
            { value: 'less', label: 'Less Than' },
            { value: 'contains', label: 'Contains' }
          ]
        }
      ]}
    >
      <div style={{ fontSize: '12px', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
        Routes data based on condition
      </div>
    </BaseNode>
  );
};

