import React, { ReactNode } from 'react';
import "./globals.css";
import type { Metadata } from "next";
import { Lexend, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import ClientWrap from './Appwrap';

const lexend = Lexend({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-lexend",
});
const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-sans",
});
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
});

export const metadata: Metadata = {
  title: "Skiller App",
  description: "Skiller App",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html className={`${lexend.variable} ${plexSans.variable} ${plexMono.variable}`}>
      <body className={plexSans.className}>
        <ClientWrap>
          {children}
        </ClientWrap>
      </body>
    </html>
  );
}
