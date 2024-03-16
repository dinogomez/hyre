"use client";
import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";

interface ProviderProps {
  children: ReactNode;
}

const Provider: React.FC<ProviderProps> = ({ children }) => {
  return (
    <ThemeProvider attribute="class" storageKey="theme" defaultTheme="dark">
      {children}
    </ThemeProvider>
  );
};

export default Provider;
