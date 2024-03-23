"use client";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import React from "react";
import Image from "next/image";

function HeroSection() {
    return (
        <section className="relative flex w-full flex-col items-center justify-center antialiased">
            {/* <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                viewBox="0 0 600 600"
                animate={{
                    y: [0, -10, 0],
                    scale: [1, 1.05, 1],
                    rotate: [0, 5, -5, 0],
                    pathLength: [0, 0.3, 0.7, 0.3, 0],
                }}
                transition={{
                    y: {
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 6,
                        ease: "easeInOut",
                    },
                    scale: {
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 6,
                        ease: "easeInOut",
                    },
                    rotate: {
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 6,
                        ease: "easeInOut",
                    },
                    pathLength: {
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 6,
                        ease: "easeInOut",
                    },
                }}
                className="absolute -left-10 z-0 hidden  h-96 w-96 md:block"
            >
                <path
                    d="M233.6387154144761 329.8429171177731C196.59682749536805 319.3717142674313 167.8010129812079 170.15706506699183 199.08373799748392 150.78533807724574C230.36646301375995 131.41361108749965 415.57590260930033 183.76962533920863 421.33506551213236 213.61255517929652C427.0942284149644 243.4554850193844 270.68060333358414 340.3141199681149 233.6387154144761 329.8429171177731C196.59682749536805 319.3717142674313 167.8010129812079 170.15706506699183 199.08373799748392 150.78533807724574 "
                    fill='url("#SvgjsLinearGradient1000")'
                    strokeWidth="0"
                    stroke="hsl(340, 45%, 30%)"
                    transform="matrix(1.1422022536441518,0.41572762183824635,-0.41572762183824635,1.1422022536441518,52.40128704440667,-98.76559323178111)"
                />
                <defs>
                    <linearGradient id="SvgjsLinearGradient1000">
                        <stop stopColor="hsl(230, 55%, 50%)" offset="0" />
                        <stop stopColor="hsl(230, 55%, 70%)" offset="1" />
                    </linearGradient>
                </defs>
            </motion.svg> */}
            <div className="container z-20 mx-auto flex flex-col items-center justify-center px-5 py-24">
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
                                    Careers Curated For You!
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
                                Find Careers,
                                <br />
                                Connect With{" "}
                                <span className="underline decoration-highlight">
                                    Hyre
                                </span>
                                !
                            </span>
                        </h1>

                        <div className="mb-4 text-center text-lg font-black leading-relaxed tracking-tighter text-white md:text-2xl"></div>
                        <p className="text-md mx-auto mb-8 w-full font-mono  font-semibold leading-relaxed text-muted-foreground lg:w-3/5">
                            Discover your next opportunity effortlessly with
                            Hyre. The intuitive recruitment platform connecting
                            talent with great careers.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default HeroSection;
