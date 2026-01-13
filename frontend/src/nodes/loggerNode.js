// loggerNode.js

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const LoggerNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Logger"
      style={{ 
        borderColor: '#14b8a6',
        borderLeftWidth: '4px',
        backgroundColor: '#f0fdfa'
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
          key: 'logLevel',
          label: 'Log Level',
          type: 'select',
          defaultValue: 'info',
          options: [
            { value: 'debug', label: 'Debug' },
            { value: 'info', label: 'Info' },
            { value: 'warn', label: 'Warning' },
            { value: 'error', label: 'Error' }
          ]
        },
        {
          key: 'logMessage',
          label: 'Message',
          type: 'text',
          defaultValue: 'Processing data...'
        }
      ]}
    >
      <div style={{ fontSize: '12px', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
        Logs data for debugging
      </div>
    </BaseNode>
  );
};

