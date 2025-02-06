import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from '../lib/queyClient';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Skiller App",
  description: "Skiller App",
  icons: {
    icon: '/favicon.ico',
  },
};


export default function ClientWrap({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </>
  );
}
