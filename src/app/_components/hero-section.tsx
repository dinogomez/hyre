"use client";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import React from "react";

function HeroSection() {
    return (
        <section className="relative flex w-full flex-col items-center justify-center antialiased">
            <div className="container mx-auto flex flex-col items-center justify-center px-5 py-24">
                <div className="w-full text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20,
                            duration: 0.5,
                            delay: 0.25,
                        }}
                    >
                        <div className="flex justify-center space-x-2">
                            <motion.div
                                initial={{ scale: 1 }}
                                whileHover={{ scale: 1.1 }}
                                transition={{
                                    stiffness: 170,
                                    damping: 17,
                                }}
                            >
                                <Badge className="bg-highlight hover:bg-highlight ">
                                    Search your Horizon!
                                </Badge>
                            </motion.div>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20,
                        }}
                    >
                        <h1 className="mb-4 text-4xl font-black leading-relaxed tracking-tighter md:text-7xl ">
                            <span className="bg-gradient-to-b from-neutral-700 to-neutral-900 bg-clip-text text-transparent ">
                                Opportunities
                                <br />
                                Over The{" "}
                                <span className="underline decoration-highlight">
                                    Horizon
                                </span>
                                !
                            </span>
                        </h1>

                        <div className="mb-4 text-center text-lg font-black leading-relaxed tracking-tighter text-white md:text-2xl"></div>
                        <p className="text-md mx-auto mb-8 w-full font-mono  font-semibold leading-relaxed text-muted-foreground lg:w-3/5">
                            Discover your next opportunity effortlessly with
                            Horizon. The intuitive recruitment platform
                            connecting talent with great careers.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default HeroSection;
