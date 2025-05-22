import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("admin");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Error parsing user from localStorage:", error);
      return null;
    }
  });

  // Sync localStorage if currentUser changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("admin", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("admin");
    }
  }, [currentUser]);

  // Login: set user and token
  const login = (userData) => {
    setCurrentUser(userData);
    localStorage.setItem("admin", JSON.stringify(userData));
  };

  // Logout: clear user and token
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("admin");
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
