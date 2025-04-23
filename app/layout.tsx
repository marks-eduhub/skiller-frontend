import React, { ReactNode } from 'react';
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ClientWrap from './Appwrap';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Skiller App",
  description: "Skiller App",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body className={inter.className}>
        <ClientWrap>
          {children}
        </ClientWrap>
      </body>
    </html>
  );
}
