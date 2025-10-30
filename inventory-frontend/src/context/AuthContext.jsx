import React, {createContext, useState, useEffect} from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      // Decode token to get user info (simplified)
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUser({id: payload.id, role: payload.role});
      } catch (error) {
        logout();
      }
    }
    setLoading(false);
  }, [token]);

  const login = (newToken, userData) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{user, token, login, logout, loading}}>
      {children}
    </AuthContext.Provider>
  );
};
