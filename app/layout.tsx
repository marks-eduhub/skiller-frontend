"use client";

import React, { ReactNode } from 'react';
import ClientWrap from './clientwrap';
import AuthProvider from "../components/AuthProvider/AuthProvider";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a QueryClient instance
const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <ClientWrap>
              {children}
            </ClientWrap>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
