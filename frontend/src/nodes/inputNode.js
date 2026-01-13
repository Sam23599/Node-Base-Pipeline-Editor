// inputNode.js

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const InputNode = ({ id, data }) => {
  const defaultName = id.replace('customInput-', 'input_');
  
  return (
    <BaseNode
      id={id}
      data={data}
      title="Input"
      style={{ 
        borderColor: '#3b82f6',
        borderLeftWidth: '4px',
        backgroundColor: '#eff6ff'
      }}
      handles={[
        {
          type: 'source',
          position: Position.Right,
          id: `${id}-value`
        }
      ]}
      fields={[
        {
          key: 'inputName',
          label: 'Name',
          type: 'text',
          defaultValue: defaultName
        },
        {
          key: 'inputType',
          label: 'Type',
          type: 'select',
          defaultValue: 'Text',
          options: [
            { value: 'Text', label: 'Text' },
            { value: 'File', label: 'File' }
          ]
        }
      ]}
    />
  );
}
