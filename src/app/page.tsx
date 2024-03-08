"use client";

import { BackgroundBeams } from "@/components/ui/background-beams";
import { Button } from "@/components/ui/button";
import GradientButton from "@/components/ui/gradient-button";
import { motion } from "framer-motion";
import Image from "next/image";
import { LoginForm } from "./_components/login-form";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-800 w-full relative flex flex-col items-center justify-center antialiased">
      <LoginForm />
      <BackgroundBeams />
    </div>
  );
}
