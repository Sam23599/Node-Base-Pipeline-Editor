// outputNode.js

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const OutputNode = ({ id, data }) => {
  const defaultName = id.replace('customOutput-', 'output_');
  
  return (
    <BaseNode
      id={id}
      data={data}
      title="Output"
      style={{ 
        borderColor: '#10b981',
        borderLeftWidth: '4px',
        backgroundColor: '#ecfdf5'
      }}
      handles={[
        {
          type: 'target',
          position: Position.Left,
          id: `${id}-value`
        }
      ]}
      fields={[
        {
          key: 'outputName',
          label: 'Name',
          type: 'text',
          defaultValue: defaultName
        },
        {
          key: 'outputType',
          label: 'Type',
          type: 'select',
          defaultValue: 'Text',
          options: [
            { value: 'Text', label: 'Text' },
            { value: 'File', label: 'Image' }
          ]
        }
      ]}
    />
  );
}
