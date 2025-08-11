import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { signIn as apiSignIn, signUp as apiSignUp } from '../lib/api';
import { setToken, removeToken, getToken } from '../lib/authUtils';

interface User {
  id: string;
  username: string;
  firstName?: string;
  profileImageUrl?: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const token = getToken();
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUser({
          id: payload.id,
          username: payload.username
        });
      } catch (err) {
        removeToken();
      }
    }
    setIsLoading(false);
  }, []);

  const signIn = async (username: string, password: string) => {
    try {
      setError(null);
      const { token } = await apiSignIn(username, password);
      setToken(token);
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUser({
        id: payload.id,
        username: payload.username
      });
      setLocation('/');
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to sign in'));
      throw err;
    }
  };

  const signUp = async (username: string, password: string) => {
    try {
      setError(null);
      const { token } = await apiSignUp(username, password);
      setToken(token);
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUser({
        id: payload.id,
        username: payload.username
      });
      setLocation('/');
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to sign up'));
      throw err;
    }
  };

  const signOut = () => {
    removeToken();
    setUser(null);
    setLocation('/');
  };

  return {
    user,
    isLoading,
    error,
    isAuthenticated: !!user,
    signIn,
    signUp,
    signOut
  };
}
