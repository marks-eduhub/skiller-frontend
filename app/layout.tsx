"use client";

import React, { ReactNode } from 'react';
import ClientWrap from './clientwrap';
import AuthProvider from "../components/AuthProvider/AuthProvider";
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from '@/lib/queyClient';
import { CourseProvider } from '@/lib/CourseContext';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <CourseProvider>
              <ClientWrap>
                {children}
              </ClientWrap>
            </CourseProvider>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
