import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { BackgroundBeams } from "@/components/ui/background-beams";
import Header from "@/components/header";
import { ThemeProvider } from "@/components/provider/theme-provider";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Horizon",
  description: "Horizon: Human Resource Information System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        disableTransitionOnChange
      >
        <body
          className={`${GeistSans.variable} ${GeistMono.variable} font-mono bg-neutral-900 text-white min-h-80`}
        >
          <Header />
          {children}
          <div>
            <BackgroundBeams />
          </div>
        </body>
      </ThemeProvider>
    </html>
  );
}
