"use client"

import React, { ReactNode } from 'react';
import ClientWrap from './clientwrap';
import AuthProvider from "../components/AuthProvider/AuthProvider";


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body>
        <AuthProvider>
        <ClientWrap>
          {children}
        </ClientWrap>
        </AuthProvider>
      </body>
    </html>
  );
}


