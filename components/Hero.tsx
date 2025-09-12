// app/components/Hero.tsx
"use client";
import Image from "next/image";
import hero from "../assets/hero image 1.png";
import { Home, Key } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="bg-[var(--bg-color)] w-full">
      <div className="w-11/12 md:w-5/6 mx-auto pt-28 md:pt-10 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* ✅ Left Content */}
        <div className="space-y-10 text-center md:text-left">
          <motion.h1
            className="text-3xl md:text-5xl font-bold text-[var(--title)] leading-tight space-y-2"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              className="flex items-center gap-2 justify-center md:justify-start uppercase"
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {/* <Key className="w-8 h-8 md:w-10 md:h-10 text-[#2d1c14]" /> */}
              Unlock !
            </motion.div>

            <motion.div
              className="flex items-center gap-2 justify-center md:justify-start"
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <span className="text-[#2d1c14] text-4xl">
                Your Ideal Living Space
              </span>
              <Home className="w-8 h-8 md:w-10 md:h-10 text-[#2d1c14]" />
            </motion.div>
          </motion.h1>

          <motion.p
            className="text-base md:text-lg font-semibold text-[var(--primary-color)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            Uncover elegant properties thoughtfully curated to reflect your
            aspirations.
          </motion.p>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <Link href="/contacts">
              <button
                className="relative px-6 py-3 rounded-md bg-[var(--title)] text-white font-semibold 
  overflow-hidden group cursor-pointer transition-all duration-300"
              >
                <span className="relative z-10">Contact Us</span>
                <span
                  className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/20 to-transparent 
    translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"
                ></span>
              </button>
            </Link>
          </motion.div>
        </div>

        {/* ✅ Right Image */}
        <motion.div
          className="relative w-full"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <Image src={hero} alt="Dream Home" priority />
        </motion.div>
      </div>
    </section>
  );
}
