import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getToken = async () => {
      const savedToken = await AsyncStorage.getItem('token');
      console.log(savedToken);
      setToken(savedToken);
      setLoading(false);
    };
    getToken();
  }, []);

  const login = async (newToken) => {
    setToken(newToken);
    await AsyncStorage.setItem('token', newToken);
  };

  const logout = async () => {
    setToken(null);
    await AsyncStorage.removeItem('token');
  };

  if (loading) {
    return null; // or a loading indicator
  }

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };