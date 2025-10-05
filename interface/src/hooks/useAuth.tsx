import { useState, useEffect } from 'react';
import { authenticateWithApiKey, checkAuthStatus } from '../utils/api';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const checkAuth = async () => {
    const authenticated = await checkAuthStatus();
    setIsAuthenticated(authenticated);
  };

  const authenticate = async (apiKey: string): Promise<boolean> => {
    const success = await authenticateWithApiKey(apiKey);
    if (success) {
      setIsAuthenticated(true);
    }
    return success;
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return {
    isAuthenticated,
    authenticate,
    checkAuth,
  };
};
