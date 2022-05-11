import React, { useCallback, useEffect, useState } from 'react';

type AuthContext = {
  userId: string;
  token: string;
  login: (userId: string, token: string, tokenTtl: number) => void;
  logout: () => void;
};

const AuthContext = React.createContext<AuthContext>({
  userId: '',
  token: '',
  login: () => {},
  logout: () => {},
});

let logoutTimeout: number | undefined;
const clearLoginTimeout = () => {
  if (logoutTimeout) {
    window.clearTimeout(logoutTimeout);
    logoutTimeout = undefined;
  }
};

export const AuthContextProvider = (props: { children?: React.ReactNode }) => {
  const [userId, setUserId] = useState(localStorage.getItem('userId') || '');
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [tokenTtl, setTokenTtl] = useState<number | null>(null);

  const loginHandler = (userId: string, token: string, tokenTtl: number) => {
    const ttl = tokenTtl * 1000;
    localStorage.setItem('userId', userId);
    localStorage.setItem('token', token);
    localStorage.setItem('tokenExpiration', (new Date().getTime() + ttl).toString());
    setUserId(userId);
    setToken(token);
    setTokenTtl(ttl);
  };
  const logoutHandler = useCallback(() => {
    setUserId('');
    setToken('');
    setTokenTtl(0);
  }, []);

  useEffect(() => {
    const tokenExpiration = parseInt(localStorage.getItem('tokenExpiration') || '');
    if (tokenExpiration) {
      setTokenTtl(tokenExpiration - new Date().getTime());
    }
  }, []);
  useEffect(() => {
    if (tokenTtl === 0) {
      clearLoginTimeout();
      localStorage.removeItem('tokenExpiration');
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
    } else if (tokenTtl) {
      const now = new Date().getTime();
      if (now < now + tokenTtl) {
        clearLoginTimeout();
        logoutTimeout = window.setTimeout(logoutHandler, tokenTtl);
      } else {
        logoutHandler();
      }
    }
  }, [tokenTtl, logoutHandler]);

  const contextValue = {
    userId,
    token,
    login: loginHandler,
    logout: logoutHandler,
  };
  return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>;
};

export default AuthContext;
