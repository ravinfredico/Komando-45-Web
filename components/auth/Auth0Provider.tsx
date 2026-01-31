"use client";

import { Auth0Provider } from "@auth0/auth0-react";
import { ReactNode, useState, useEffect } from "react";

interface Auth0ProviderWrapperProps {
  children: ReactNode;
}

export default function Auth0ProviderWrapper({
  children,
}: Auth0ProviderWrapperProps) {
  const [isMounted, setIsMounted] = useState(false);
  const domain = process.env.NEXT_PUBLIC_AUTH0_DOMAIN!;
  const clientId = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID!;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Don't render Auth0Provider until client-side to avoid hydration mismatch
  if (!isMounted) {
    return <>{children}</>;
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      {children}
    </Auth0Provider>
  );
}
