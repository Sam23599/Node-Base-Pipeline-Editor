// toolbar.js

import { DraggableNode } from './draggableNode';
import './toolbar.css';

export const PipelineToolbar = () => {

    return (
        <div className="toolbar-container">
            <div className="toolbar-header">
                <h2 className="toolbar-title">Node Palette</h2>
                <p className="toolbar-subtitle">Drag nodes onto the canvas to build your pipeline</p>
            </div>
            <div className="toolbar-nodes">
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                <DraggableNode type='conditional' label='Conditional' />
                <DraggableNode type='calculator' label='Calculator' />
                <DraggableNode type='dataTransform' label='Transform' />
                <DraggableNode type='logger' label='Logger' />
                <DraggableNode type='merge' label='Merge' />
            </div>
        </div>
    );
};
