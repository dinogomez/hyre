"use client";

import Image from "next/image";
import { BentoGridSection } from "./_components/bento-grid-section";

import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className=" w-full relative flex flex-col items-center justify-center antialiased">
      <section className="">
        <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
          <div className="text-center w-full">
            <div className="flex justify-center space-x-2">
              <Badge className="bg-purple-600 hover:bg-purple-400">
                Find Work
              </Badge>
              <Badge className="bg-blue-600 hover:bg-blue-400">
                Find Workers
              </Badge>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
            >
              <h1 className="md:text-7xl text-4xl mb-4 font-black leading-relaxed tracking-tighter ">
                <span className="bg-gradient-to-b from-neutral-300 to-neutral-100 bg-clip-text text-transparent">
                  Opportunities
                  <br />
                  Over The{" "}
                </span>
                <span className="underline decoration-highlight">Horizon</span>!
              </h1>
            </motion.div>
            <div className="md:text-2xl text-center text-lg mb-4 font-black leading-relaxed tracking-tighter text-white"></div>
            <p className="lg:w-3/5 w-full mb-8 leading-relaxed mx-auto  font-semibold text-md text-neutral-400">
              Discover your next opportunity effortlessly with Horizon. The
              intuitive recruitment platform connecting talent with great
              careers.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
