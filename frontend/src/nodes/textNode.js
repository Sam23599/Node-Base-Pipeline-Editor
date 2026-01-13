// textNode.js

import { useState, useEffect, useRef, useCallback } from 'react';
import { Position } from 'reactflow';
import { useStore } from '../store';
import { BaseNode } from './BaseNode';

/**
 * Validates if a string is a valid JavaScript variable name
 */
const isValidVariableName = (name) => {
  // JavaScript variable name regex: starts with letter, $, or _, followed by letters, digits, $, or _
  const jsVarRegex = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/;
  return jsVarRegex.test(name.trim());
};

/**
 * Extracts variable names from text in the format {{ variableName }}
 */
const extractVariables = (text) => {
  if (!text) return [];
  const regex = /\{\{\s*([^}]+)\s*\}\}/g;
  const variables = new Set();
  let match;

  while ((match = regex.exec(text)) !== null) {
    const varName = match[1].trim();
    if (isValidVariableName(varName)) {
      variables.add(varName);
    }
  }

  return Array.from(variables).sort(); // Sort for consistent ordering
};

export const TextNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const updateNodeDimensions = useStore((state) => state.updateNodeDimensions);
  const textareaRef = useRef(null);
  
  const [text, setText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);

  // Initialize variables on mount
  useEffect(() => {
    const initialVars = extractVariables(data?.text || '{{input}}');
    setVariables(initialVars);
    if (initialVars.length > 0) {
      updateNodeField(id, 'variables', initialVars);
    }
  }, [id, updateNodeField]);

  // Extract variables from text whenever it changes
  useEffect(() => {
    const extractedVars = extractVariables(text);
    setVariables(extractedVars);
    updateNodeField(id, 'text', text);
    updateNodeField(id, 'variables', extractedVars);
  }, [text, id, updateNodeField]);

  // Auto-resize textarea height based on content
  const autoResizeTextarea = useCallback(() => {
    if (!textareaRef.current) return;
    const textarea = textareaRef.current;
    // Reset height to auto to get accurate scrollHeight
    textarea.style.height = 'auto';
    // Set height to scrollHeight to fit content
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, []);

  // Calculate node dimensions based on actual textarea measurements
  const calculateDimensions = useCallback(() => {
    if (!textareaRef.current) return;

    const textarea = textareaRef.current;
    
    // First, auto-resize the textarea itself
    autoResizeTextarea();
    
    // Get actual measurements after resize
    const textareaHeight = textarea.scrollHeight;
    
    // Calculate minimum dimensions
    const minWidth = 240;
    const minHeight = 100;
    const maxWidth = 600;
    
    // Calculate width based on longest line in text
    const lines = text.split('\n');
    const longestLine = lines.reduce((longest, line) => 
      line.length > longest.length ? line : longest, 
      ''
    );
    const charWidth = 7.5; // Approximate character width in pixels (monospace-ish)
    const padding = 48; // Horizontal padding (24px each side)
    const calculatedWidth = Math.min(
      Math.max(minWidth, longestLine.length * charWidth + padding), 
      maxWidth
    );
    
    // Calculate height based on actual content
    const titleHeight = 40; // Title section
    const labelHeight = 20; // Label height
    const textareaPadding = 0; // No extra padding since textarea auto-resizes
    const variableSectionHeight = variables.length > 0 ? 40 : 0; // Height for variable display
    const containerPadding = 24; // Total vertical padding (12px top + 12px bottom)
    const minTextareaHeight = 60;
    
    const actualTextareaHeight = Math.max(minTextareaHeight, textareaHeight);
    const calculatedHeight = Math.max(
      minHeight,
      titleHeight + labelHeight + actualTextareaHeight + textareaPadding + variableSectionHeight + containerPadding
    );
    
    // Update dimensions in store
    updateNodeDimensions(id, calculatedWidth, calculatedHeight);
  }, [text, variables.length, id, updateNodeDimensions, autoResizeTextarea]);

  // Auto-resize textarea on mount
  useEffect(() => {
    autoResizeTextarea();
    calculateDimensions();
  }, []); // Run once on mount

  // Recalculate dimensions when text or variables change
  useEffect(() => {
    // Use setTimeout to ensure DOM has updated
    const timeoutId = setTimeout(() => {
      autoResizeTextarea();
      calculateDimensions();
    }, 0);
    
    return () => clearTimeout(timeoutId);
  }, [text, variables.length, calculateDimensions, autoResizeTextarea]);

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);
  };

  // Get dimensions from data or use defaults
  const nodeWidth = data?.width || 240;
  const nodeHeight = data?.height || 100;
  
  // Generate handles for variables
  // Position handles evenly along the left side, starting below the title
  const variableHandles = variables.map((varName, index) => {
    const totalHandles = variables.length;
    const startPosition = 30; // Start at 30% from top (below title)
    const endPosition = 85; // End at 85% from top
    const spacing = totalHandles > 1 ? (endPosition - startPosition) / (totalHandles - 1) : 0;
    const topPosition = totalHandles === 1 ? 50 : startPosition + (index * spacing);
    
    return {
      type: 'target',
      position: Position.Left,
      id: `${id}-${varName}`,
      style: { 
        top: `${topPosition}%` 
      }
    };
  });

  // Always include the output handle
  const allHandles = [
    ...variableHandles,
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-output`
    }
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Text"
      style={{
        width: nodeWidth,
        minHeight: nodeHeight,
        borderColor: '#f59e0b',
        borderLeftWidth: '4px',
        backgroundColor: '#fffbeb',
        transition: 'width var(--transition-base), height var(--transition-base)',
      }}
      handles={allHandles}
    >
      {/* Text input field */}
      <label style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '4px' 
      }}>
        <span style={{ 
          fontSize: '12px',
          fontWeight: '500',
          color: 'var(--text-secondary)',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          Text
        </span>
        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleTextChange}
          onInput={(e) => {
            // Auto-resize textarea and recalculate node dimensions
            autoResizeTextarea();
            calculateDimensions();
          }}
          style={{ 
            padding: '8px 12px',
            border: '1px solid var(--border-color)',
            borderRadius: '6px',
            fontSize: '14px',
            backgroundColor: 'var(--bg-card)',
            color: 'var(--text-primary)',
            transition: 'border-color var(--transition-fast), box-shadow var(--transition-fast), height var(--transition-fast)',
            outline: 'none',
            resize: 'none',
            fontFamily: 'inherit',
            minHeight: '60px',
            lineHeight: '1.5',
            width: '100%',
            boxSizing: 'border-box',
            overflow: 'hidden' // Hide scrollbar, we'll auto-resize
          }}
          onFocus={(e) => {
            e.target.style.borderColor = 'var(--primary)';
            e.target.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.1)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = 'var(--border-color)';
            e.target.style.boxShadow = 'none';
            autoResizeTextarea();
            calculateDimensions(); // Recalculate on blur as well
          }}
          placeholder="Enter text with {{ variables }}"
        />
      </label>

      {/* Show detected variables */}
      {variables.length > 0 && (
        <div style={{
          fontSize: '11px',
          color: 'var(--text-secondary)',
          padding: '6px 8px',
          borderTop: '1px solid var(--border-color)',
          paddingTop: '8px',
          backgroundColor: 'rgba(99, 102, 241, 0.05)',
          borderRadius: '4px',
          marginTop: '4px'
        }}>
          <span style={{ fontWeight: '600', marginRight: '4px' }}>Variables:</span>
          <span style={{ fontStyle: 'italic' }}>{variables.join(', ')}</span>
        </div>
      )}
    </BaseNode>
  );
}
