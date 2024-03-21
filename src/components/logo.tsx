"use client";
import { motion } from "framer-motion";
import React from "react";
import Image from "next/image";

function Logo() {
    return (
        <motion.div
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.3 }}
            transition={{
                stiffness: 170,
                damping: 17,
            }}
        >
            <Image
                className="h-10 w-10"
                src="/horizon.svg"
                alt="horizon-logo"
                width={150}
                height={150}
            ></Image>
        </motion.div>
    );
}

export default Logo;
