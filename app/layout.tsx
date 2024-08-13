"use client";

import React, { ReactNode } from 'react';
import ClientWrap from './clientwrap';
import AuthProvider from "../components/AuthProvider/AuthProvider";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import queryClient from '@/lib/queyClient';


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
