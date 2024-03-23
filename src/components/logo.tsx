"use client";
import { motion } from "framer-motion";
import React from "react";
import Image from "next/image";

function Logo() {
    return (
        <motion.div
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.17 }}
            transition={{
                damping: 17,
            }}
        >
            <Image
                className="h-12 w-12"
                src="/horizon.svg"
                alt="horizon-logo"
                width={150}
                height={150}
            ></Image>
        </motion.div>
    );
}

export default Logo;
