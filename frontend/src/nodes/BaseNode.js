// BaseNode.js
// Base abstraction for all node types

import { useState } from 'react';
import { Handle, Position } from 'reactflow';

/**
 * BaseNode - A flexible base component for creating custom nodes
 * 
 * @param {Object} props
 * @param {string} props.id - Node ID
 * @param {Object} props.data - Node data
 * @param {string} props.title - Node title/header text
 * @param {Array} props.handles - Array of handle configurations
 *   Each handle: { type: 'source'|'target', position: Position, id: string, style?: object, label?: string }
 * @param {Array} props.fields - Array of field configurations
 *   Each field: { key: string, label: string, type: 'text'|'select'|'number', 
 *                 options?: Array (for select), defaultValue?: any, onChange?: function }
 * @param {ReactNode} props.children - Custom content to render
 * @param {Object} props.style - Custom container styles (merged with defaults)
 * @param {Object} props.className - Custom CSS class name
 */
export const BaseNode = ({ 
  id, 
  data, 
  title = 'Node',
  handles = [],
  fields = [],
  children,
  style = {},
  className = ''
}) => {
  // Initialize state for all fields in a single object
  const initialFieldValues = {};
  fields.forEach(field => {
    initialFieldValues[field.key] = data?.[field.key] || field.defaultValue || '';
  });

  const [fieldValues, setFieldValues] = useState(initialFieldValues);

  // Handle field changes
  const handleFieldChange = (fieldKey, newValue) => {
    setFieldValues(prev => ({
      ...prev,
      [fieldKey]: newValue
    }));
    // Call custom onChange if provided
    const field = fields.find(f => f.key === fieldKey);
    if (field?.onChange) {
      field.onChange(newValue);
    }
  };

  // Extract borderLeftWidth and borderColor from style if provided
  const { borderLeftWidth, borderColor, backgroundColor, ...restStyle } = style;
  
  // Default container styles
  const defaultStyle = {
    width: 240,
    minHeight: 100,
    border: '2px solid var(--border-color)',
    borderTop: '2px solid var(--border-color)',
    borderRight: '2px solid var(--border-color)',
    borderBottom: '2px solid var(--border-color)',
    borderLeft: borderLeftWidth ? `${borderLeftWidth} solid ${borderColor || 'var(--border-color)'}` : '2px solid var(--border-color)',
    padding: '12px',
    backgroundColor: backgroundColor || 'var(--bg-card)',
    borderRadius: '12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    boxShadow: 'var(--shadow-lg)',
    transition: 'all var(--transition-base)',
    position: 'relative',
    ...restStyle
  };

  return (
    <div 
      style={defaultStyle} 
      className={className}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = 'var(--shadow-xl)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* Render handles */}
      {handles.map((handle, index) => (
        <Handle
          key={handle.id || index}
          type={handle.type}
          position={handle.position}
          id={handle.id}
          style={{
            width: '12px',
            height: '12px',
            border: '2px solid var(--bg-card)',
            backgroundColor: 'var(--primary)',
            ...handle.style
          }}
        />
      ))}

      {/* Title section */}
      {title && (
        <div style={{ 
          fontWeight: '600', 
          fontSize: '16px',
          color: 'var(--text-primary)',
          marginBottom: '4px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <div style={{
            width: '4px',
            height: '16px',
            backgroundColor: borderColor || 'var(--primary)',
            borderRadius: '2px'
          }} />
          <span>{title}</span>
        </div>
      )}

      {/* Fields section */}
      {fields.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {fields.map((field) => {
            const fieldValue = fieldValues[field.key] ?? '';

            return (
              <label 
                key={field.key} 
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '4px' 
                }}
              >
                <span style={{ 
                  fontSize: '12px',
                  fontWeight: '500',
                  color: 'var(--text-secondary)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  {field.label}
                </span>
                {field.type === 'select' ? (
                  <select
                    value={fieldValue}
                    onChange={(e) => handleFieldChange(field.key, e.target.value)}
                    style={{ 
                      padding: '8px 12px',
                      border: '1px solid var(--border-color)',
                      borderRadius: '6px',
                      fontSize: '14px',
                      backgroundColor: 'var(--bg-card)',
                      color: 'var(--text-primary)',
                      cursor: 'pointer',
                      transition: 'all var(--transition-fast)',
                      outline: 'none'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'var(--primary)';
                      e.target.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'var(--border-color)';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    {field.options?.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label || option.value}
                      </option>
                    ))}
                  </select>
                ) : field.type === 'number' ? (
                  <input
                    type="number"
                    value={fieldValue}
                    onChange={(e) => handleFieldChange(field.key, e.target.value)}
                    style={{ 
                      padding: '8px 12px',
                      border: '1px solid var(--border-color)',
                      borderRadius: '6px',
                      fontSize: '14px',
                      backgroundColor: 'var(--bg-card)',
                      color: 'var(--text-primary)',
                      transition: 'all var(--transition-fast)',
                      outline: 'none'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'var(--primary)';
                      e.target.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'var(--border-color)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                ) : (
                  <input
                    type="text"
                    value={fieldValue}
                    onChange={(e) => handleFieldChange(field.key, e.target.value)}
                    style={{ 
                      padding: '8px 12px',
                      border: '1px solid var(--border-color)',
                      borderRadius: '6px',
                      fontSize: '14px',
                      backgroundColor: 'var(--bg-card)',
                      color: 'var(--text-primary)',
                      transition: 'all var(--transition-fast)',
                      outline: 'none'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'var(--primary)';
                      e.target.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'var(--border-color)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                )}
              </label>
            );
          })}
        </div>
      )}

      {/* Custom children content */}
      {children}
    </div>
  );
};

