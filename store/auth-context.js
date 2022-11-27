import { createContext, useCallback, useState } from "react";

export const AuthContext = createContext({
  token: "",
  user: {},
  isAuthenticated: false,
  authenticate: () => {},
  logout: () => {},
});

function AuthContextProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState({});

  const authenticate = useCallback(async (token, user) => {
    setToken(token);
    setUser(user);
  }, []);
  function logout() {
    setToken(null);
    setUser(null);
  }
  return (
    <AuthContext.Provider
      value={{ user, token, isAuthenticated: !!token, logout, authenticate }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
