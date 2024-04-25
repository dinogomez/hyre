import { ReactNode } from "react";
import { SessionProvider } from "./session-provider";
import { getUser } from "@/lib/auth";
import { ThemeProvider } from "./theme-provider";
import { ViewTransitions } from "next-view-transitions";

interface ProviderProps {
    children: ReactNode;
}

const Provider: React.FC<ProviderProps> = async ({ children }) => {
    const session = await getUser();
    return (
        <SessionProvider value={session}>
            <ThemeProvider
                attribute="class"
                storageKey="theme"
                defaultTheme="light"
            >
                {children}
            </ThemeProvider>
        </SessionProvider>
    );
};

export default Provider;
