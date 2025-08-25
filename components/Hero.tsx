// app/components/Hero.tsx
"use client";
import Image from "next/image";
import hero from "../assets/hero image 1.png";

export default function Hero() {
  return (
    <section className="bg-[#fef7f2] w-full">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* ✅ Left Content */}
        <div className="space-y-6 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#2d1c14] leading-tight">
            Find Your <br />
            <span className="text-[#2d1c14]">Dream Home</span>
          </h1>
          <p className="text-base md:text-lg text-[#4a3a32] max-w-md mx-auto md:mx-0">
            Explore our curated selection of exquisite properties meticulously
            tailored to your unique dream home vision
          </p>

          <div>
            <button className="px-6 py-3 rounded-md bg-[#2d1c14] text-white font-semibold hover:bg-[#3a2a20] transition">
              Sign up
            </button>
          </div>
        </div>

        {/* ✅ Right Image */}
        <div className="relative w-full h-[300px] md:h-[450px] lg:h-[550px]">
          <Image
            src={hero} // 👉 place your house image in public/
            alt="Dream Home"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
}
