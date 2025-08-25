// app/components/Hero.tsx
"use client";
import Image from "next/image";
import hero from "../assets/hero image 1.png";

export default function Hero() {
  return (
    <section className="bg-[var(--bg-color)] w-full">
      <div className="w-11/12 md:w-5/6 mx-auto  pt-28 md:pt-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* ✅ Left Content */}
        <div className="space-y-10 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl  font-bold text-[var(--title)] leading-tight">
            Find Your <br />
            <span className="text-[#2d1c14]">Dream Home</span>
          </h1>
          <p className="text-base md:text-lg font-semibold text-[var(--primary-color)] ">
            Explore our curated selection of exquisite properties meticulously
            tailored to your unique dream home vision
          </p>

          <div>
            <button className="px-6 py-3 rounded-md bg-[var(--title)] text-white font-semibold hover:bg-[#3a2a20] transition">
              Contact Us
            </button>
          </div>
        </div>

        {/* ✅ Right Image */}
        <div className="relative w-full ">
          <Image
            src={hero} // 👉 place your house image in public/
            alt="Dream Home"
          />
        </div>
      </div>
    </section>
  );
}
