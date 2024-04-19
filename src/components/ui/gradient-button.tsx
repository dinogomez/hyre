import { cn } from "@/lib/utils";
import { Link } from "next-view-transitions";
import React from "react";

interface GradientButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    href: string;
}

function GradientButton({
    className,
    text,
    href,
    ...props
}: GradientButtonProps) {
    return (
        <Link href={href}>
            <button
                className={cn(
                    className,
                    "group relative inline-block cursor-pointer rounded-full bg-slate-800 p-px text-center text-xs font-semibold  leading-6 text-white no-underline  shadow-2xl shadow-zinc-900"
                )}
            >
                <span className="absolute inset-0 overflow-hidden rounded-full">
                    <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </span>
                <div className="relative z-10 flex items-center justify-center space-x-2 rounded-full bg-zinc-950 px-4 py-0.5 text-center ring-1 ring-white/10 ">
                    <span>{text}</span>
                </div>
                <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
            </button>
        </Link>
    );
}

export default GradientButton;
