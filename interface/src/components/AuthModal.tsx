import React, { useState } from 'react';
import '../styles/AuthModal.css';

interface AuthModalProps {
  onAuthenticate: (apiKey: string) => Promise<boolean>;
}

const AuthModal: React.FC<AuthModalProps> = ({ onAuthenticate }) => {
  const [apiKey, setApiKey] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const success = await onAuthenticate(apiKey);
      if (!success) {
        setError('Invalid API key. Please try again.');
      }
    } catch (err) {
      setError('Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-modal-overlay">
      <div className="auth-modal">
        <h2>Authentication Required</h2>
        <p>Please enter your API key to access the gallery</p>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter API Key"
            className="auth-input"
            disabled={isLoading}
            autoFocus
          />
          {error && <div className="auth-error">{error}</div>}
          <button type="submit" className="auth-submit" disabled={isLoading}>
            {isLoading ? 'Authenticating...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
