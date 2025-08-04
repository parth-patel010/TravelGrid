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
// ... baaki imports same

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

const updateUser = (updatedData) => {
  const normalizedUser = { ...updatedData, id: updatedData.id || updatedData._id };
  setUser(normalizedUser);
  localStorage.setItem("travelgrid_user", JSON.stringify(normalizedUser));
};


  useEffect(() => {
  const storedUser = localStorage.getItem("travelgrid_user");
  const token = localStorage.getItem("token");

  if (storedUser && token) {
    try {
      const parsedUser = JSON.parse(storedUser);
      const normalizedUser = { ...parsedUser, id: parsedUser.id || parsedUser._id }; // <-- normalize here
      setUser(normalizedUser);
    } catch {
      localStorage.removeItem("travelgrid_user");
      localStorage.removeItem("token");
    }
  }
  setIsLoading(false);
}, []);


  // --- Normal Login ---
  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.user) {
        // Ensure ID consistency
        const normalizedUser = { ...data.user, id: data.user.id || data.user._id };
        setUser(normalizedUser);
        localStorage.setItem("travelgrid_user", JSON.stringify(normalizedUser));
        localStorage.setItem("token", data.token);
        return { success: true };
      } else {
        return { success: false, error: data.error || data.message };
      }
    } catch (err) {
      return { success: false, error: "Something went wrong" };
    } finally {
      setIsLoading(false);
    }
  };

  // --- Google Login ---
  const googleLogin = async (token) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      const data = await res.json();

      if (res.ok && data.user && data.token) {
        const normalizedUser = { ...data.user, id: data.user.id || data.user._id };
        setUser(normalizedUser);
        localStorage.setItem("travelgrid_user", JSON.stringify(normalizedUser));
        localStorage.setItem("token", data.token);
        toast.success("Successfully logged in with Google! 🎉");
        return { success: true };
      } else {
        return { success: false, error: data.error || "Google login failed" };
      }
    } catch (err) {
      return { success: false, error: "Something went wrong with Google authentication" };
    } finally {
      setIsLoading(false);
    }
  };

  // --- Logout ---
  const logout = () => {
    setUser(null);
    localStorage.removeItem("travelgrid_user");
    localStorage.removeItem("token");
    toast.success("Logged out successfully 👋");
  };

  // --- Signup remains same ---
  const signup = async (userData) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await res.json();

      if (!res.ok) {
        return { success: false, error: data.message };
      }

      return await login(userData.email, userData.password);
    } catch (err) {
      return { success: false, error: "Something went wrong during signup" };
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    login,
    signup,
    googleLogin,
    logout,
    isLoading,
    updateUser,
    isAuthenticated: !!user && !!localStorage.getItem("token"),
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
