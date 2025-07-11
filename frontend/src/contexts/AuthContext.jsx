import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../utils/api'; // Import the api utility

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('batiStockToken'));
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('batiStockToken'));
  const [loading, setLoading] = useState(false); // For UI feedback during API calls
  const [error, setError] = useState(null);     // For displaying auth errors

  useEffect(() => {
    // Check local storage for token on initial load
    const storedToken = localStorage.getItem('batiStockToken');
    const storedUser = localStorage.getItem('batiStockUser');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    // Could add a check here to validate token with backend if desired
  }, []);

  const storeAuthData = (responseData) => {
    localStorage.setItem('batiStockToken', responseData.token);
    localStorage.setItem('batiStockUser', JSON.stringify(responseData.user));
    setToken(responseData.token);
    setUser(responseData.user);
    setIsAuthenticated(true);
    setError(null); // Clear previous errors
  };

  const clearAuthData = () => {
    localStorage.removeItem('batiStockToken');
    localStorage.removeItem('batiStockUser');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  const signup = async (username, email, password) => {
    setLoading(true);
    setError(null);
    try {
      // Use the api utility, passing requiresAuth = false for public endpoints
      const response = await api.post('/auth/signup', { username, email, password }, false);

      if (response.ok) {
        const data = await response.json(); // api.js simulation already does this conceptually
        storeAuthData(data); // Assuming signup also logs in and returns token/user
        setLoading(false);
        return data; // Return data for potential use in component
      } else {
        // api.js simulation puts error in json body for non-ok responses
        const errorData = await response.json();
        throw errorData;
      }
    } catch (err) {
      console.error("Signup API call failed:", err);
      setError(err.error || "Signup failed. Please try again.");
      setLoading(false);
      throw err; // Re-throw for the component to catch if needed
    }
  };

  const login = async (emailOrUsername, password) => {
    setLoading(true);
    setError(null);
    try {
      // Use the api utility, requiresAuth = false
      const response = await api.post('/auth/login', { emailOrUsername, password }, false);

      if (response.ok) {
        const data = await response.json();
        storeAuthData(data);
        setLoading(false);
        return data; // Return user data for potential use in component
      } else {
        const errorData = await response.json();
        throw errorData;
      }
    } catch (err) {
      console.error("Login API call failed:", err);
      setError(err.error || "Invalid credentials or server error.");
      setLoading(false);
      throw err; // Re-throw for the component to catch
    }
  };

  const logout = async () => { // Made async in case backend logout is added
    setLoading(true);
    setError(null);
    try {
        // Optional: Call backend logout endpoint if it exists and requires auth
        // const response = await api.post('/auth/logout', null, true);
        // if (!response.ok) { /* Handle potential server-side logout error */ }
        console.log("Logout initiated. Clearing local data.");
    } catch (err) {
        console.error("Logout API call failed (if any):", err);
        // Still proceed to clear client-side data
    } finally {
        clearAuthData();
        setLoading(false);
        console.log("User logged out, local data cleared.");
    }
  };

  const value = {
    user,
    token,
    isAuthenticated,
    loading,
    error,
    signup,
    login,
    logout,
    setError // Allow components to clear errors manually if needed
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
