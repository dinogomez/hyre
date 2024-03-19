import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Provider from "@/components/provider";
import Header from "@/components/header";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Horizon",
    description: "Horizon: Human Resource Information System",
    icons: {
        icon: "/horizon.ico",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${GeistSans.variable} ${GeistMono.variable} bg-neutral-900 font-mono`}
            >
                <Provider>
                    <Header />
                    {children}
                    <Toaster />
                    <div>
                        <BackgroundBeams />
                    </div>
                </Provider>
            </body>
        </html>
    );
}
