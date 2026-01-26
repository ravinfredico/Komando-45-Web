import type { Metadata } from 'next';
import './globals.css';
import Auth0ProviderWrapper from '@/components/auth/Auth0Provider';

export const metadata: Metadata = {
  title: "Komando'45  Home",
  description: 'Menjadi wadah bagi mahasiswa Indonesia untuk berinteraksi, berkolaborasi, dan berkontribusi di Taylors University.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-brand-bg text-muted antialiased">
        <Auth0ProviderWrapper>
          {children}
        </Auth0ProviderWrapper>
      </body>
    </html>
  );
}
