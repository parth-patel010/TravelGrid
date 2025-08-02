import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('travelgrid_user');
    const token = localStorage.getItem('token');

    if (storedUser && token) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem('travelgrid_user');
        localStorage.removeItem('token');
      }
    } else {
      setUser(null);
    }

    setIsLoading(false);
  }, []);

  // Login
  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setUser(data.user);
        localStorage.setItem('travelgrid_user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
        setIsLoading(false);
        return { success: true };
      } else {
        setIsLoading(false);
        return { success: false, error: data.message };
      }
    } catch (err) {
      setIsLoading(false);
      return { success: false, error: 'Something went wrong' };
    }
  };

  // Google Login
  const googleLogin = async (token) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });

      const data = await res.json();

      if (res.ok) {
        setUser(data.user);
        localStorage.setItem('travelgrid_user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
        setIsLoading(false);
        toast.success('Successfully logged in with Google! 🎉');
        return { success: true };
      } else {
        setIsLoading(false);
        return { success: false, error: data.error };
      }
    } catch (err) {
      setIsLoading(false);
      return { success: false, error: 'Something went wrong with Google authentication' };
    }
  };

  // Signup (register + auto-login)
  const signup = async (userData) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      const data = await res.json();

      if (!res.ok) {
        setIsLoading(false);
        return { success: false, error: data.message };
      }

      // Auto login after signup
      return await login(userData.email, userData.password);
    } catch (err) {
      setIsLoading(false);
      return { success: false, error: 'Something went wrong during signup' };
    }
  };

  // Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem('travelgrid_user');
    localStorage.removeItem('token');
    toast.success('Logged out successfully 👋');
  };

  // Update user
  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('travelgrid_user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    login,
    signup,
    googleLogin,
    logout,
    updateUser,
    isLoading,
    isAuthenticated: !!user && !!localStorage.getItem('token'), // token bhi check
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
