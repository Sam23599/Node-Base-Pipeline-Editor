// calculatorNode.js

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const CalculatorNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Calculator"
      style={{ 
        borderColor: '#ec4899',
        borderLeftWidth: '4px',
        backgroundColor: '#fdf2f8'
      }}
      handles={[
        {
          type: 'target',
          position: Position.Left,
          id: `${id}-a`,
          style: { top: '30%' },
          label: 'A'
        },
        {
          type: 'target',
          position: Position.Left,
          id: `${id}-b`,
          style: { top: '70%' },
          label: 'B'
        },
        {
          type: 'source',
          position: Position.Right,
          id: `${id}-result`
        }
      ]}
      fields={[
        {
          key: 'operation',
          label: 'Operation',
          type: 'select',
          defaultValue: 'add',
          options: [
            { value: 'add', label: 'Add (+)', },
            { value: 'subtract', label: 'Subtract (-)' },
            { value: 'multiply', label: 'Multiply (×)' },
            { value: 'divide', label: 'Divide (÷)' }
          ]
        }
      ]}
    >
      <div style={{ fontSize: '12px', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
        Performs mathematical operations
      </div>
    </BaseNode>
  );
};

