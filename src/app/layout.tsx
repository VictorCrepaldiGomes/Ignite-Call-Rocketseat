'use client'
import "./globals.css";
import { Toaster } from 'sonner'
import { SessionProvider } from "next-auth/react";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased bg-[var(--foreground)]">
        <SessionProvider>

        {children}
        </SessionProvider>
        <Toaster />
      </body>
    </html>
  );
}
