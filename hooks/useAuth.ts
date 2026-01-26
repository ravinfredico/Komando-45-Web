'use client';

import { useAuth0 } from '@auth0/auth0-react';

export function useAuth() {
  const {
    user,
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    logout,
    getAccessTokenSilently,
  } = useAuth0();

  const handleLogin = () => loginWithRedirect();
  
  const handleLogout = () => logout({ 
    logoutParams: { returnTo: window.location.origin } 
  });

  return {
    user,
    isAuthenticated,
    isLoading,
    login: handleLogin,
    logout: handleLogout,
    getAccessToken: getAccessTokenSilently,
  };
}
