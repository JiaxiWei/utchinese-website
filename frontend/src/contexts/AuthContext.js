import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated on initial load
    const checkAuth = () => {
      const adminAuth = localStorage.getItem('adminAuthenticated');
      const adminToken = localStorage.getItem('adminToken');
      
      if (adminAuth === 'true' && adminToken) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  // Log in the admin user
  const login = () => {
    setIsAuthenticated(true);
  };

  // Log out the admin user
  const logout = () => {
    localStorage.removeItem('adminAuthenticated');
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
  };

  // Check if admin is authenticated
  const checkAuthentication = () => {
    return isAuthenticated;
  };

  const value = {
    isAuthenticated,
    isLoading,
    login,
    logout,
    checkAuthentication,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext; 