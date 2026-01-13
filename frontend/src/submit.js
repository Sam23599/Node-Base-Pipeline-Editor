// submit.js

import { useState } from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import './submit.css';
import './alert.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const Alert = ({ isOpen, onClose, data }) => {
  if (!isOpen || !data) return null;

  const { num_nodes, num_edges, is_dag } = data;

  return (
    <div className="alert-overlay" onClick={onClose}>
      <div className="alert-container" onClick={(e) => e.stopPropagation()}>
        <div className="alert-header">
          <h2 className="alert-title">Pipeline Analysis</h2>
          <button className="alert-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        <div className="alert-content">
          <div className="alert-stat">
            <span className="alert-stat-label">Number of Nodes:</span>
            <span className="alert-stat-value">{num_nodes}</span>
          </div>
          <div className="alert-stat">
            <span className="alert-stat-label">Number of Edges:</span>
            <span className="alert-stat-value">{num_edges}</span>
          </div>
          <div className="alert-stat">
            <span className="alert-stat-label">Is DAG:</span>
            <span className={`alert-stat-value ${is_dag ? 'alert-success' : 'alert-error'}`}>
              {is_dag ? 'Yes ✓' : 'No ✗'}
            </span>
          </div>
          {!is_dag && (
            <div className="alert-warning">
              ⚠️ This pipeline contains cycles and is not a valid DAG.
            </div>
          )}
        </div>
        <div className="alert-footer">
          <button className="alert-button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export const SubmitButton = () => {
  const { nodes, edges } = useStore(
    (state) => ({
      nodes: state.nodes,
      edges: state.edges,
    }),
    shallow
  );

  const [isLoading, setIsLoading] = useState(false);
  const [alertData, setAlertData] = useState(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/pipelines/parse`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nodes: nodes,
          edges: edges,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      setAlertData(data);
      setIsAlertOpen(true);
    } catch (err) {
      setError(err.message || 'Failed to submit pipeline');
      alert(`Error: ${err.message || 'Failed to submit pipeline. Make sure the backend is running on ${API_URL}'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="submit-container">
        <button 
          className={`submit-button ${isLoading ? 'submit-button-loading' : ''}`}
          type="button"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span>Processing...</span>
              <div className="submit-spinner"></div>
            </>
          ) : (
            <>
              <span>Submit Pipeline</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 10H16M16 10L12 6M16 10L12 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </>
          )}
        </button>
      </div>
      <Alert 
        isOpen={isAlertOpen} 
        onClose={() => setIsAlertOpen(false)} 
        data={alertData}
      />
    </>
  );
}
