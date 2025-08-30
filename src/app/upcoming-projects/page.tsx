"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { properties } from "../../../data/property";
import { MapPin, Home } from "lucide-react";
import banner from "../../../assets/buybanner.webp";
import featuredImage from "../../../assets/luxury_and_rich_home_exterior_side_view.png";

// Import your layout components
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import HelpSection from "../../../components/HelpSection";

export default function UpcomingPage() {
  const [selectedType, setSelectedType] = useState("All");

  const filtered =
    selectedType === "All"
      ? properties
      : properties.filter((p) => p.type === selectedType);

  const buyRef = useRef<HTMLDivElement | null>(null);
  const scrollToNext = () => {
    if (buyRef.current) {
      const yOffset = -50;
      const y =
        buyRef.current.getBoundingClientRect().top + window.scrollY + yOffset;

      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-[80vh] bg-black text-white flex items-center justify-center">
        <Image
          src={banner}
          alt="Goa Homes"
          fill
          className="object-cover opacity-70"
        />
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold">
            Find Your Dream Home in Goa
          </h1>
          <p className="mt-4 text-lg">Apartments • Villas • Plots</p>
          <button
            onClick={scrollToNext}
            className="mt-10 animate-bounce border rounded-full w-fit px-1 py-2 mx-auto cursor-pointer"
          >
            <span className="text-3xl">↓</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="sticky top-0 bg-white shadow-md z-20 flex gap-4 p-4 justify-center">
        {["All", "Apartment", "Villa", "Penthouse"].map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
              selectedType === type
                ? "bg-[var(--title)] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Masonry Layout */}
      <div ref={buyRef} className="py-12 bg-[var(--bg-color)]">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 p-6 flex-grow w-11/12 md:w-5/6 mx-auto ">
          {filtered.map((p) => (
            <div
              key={p.id}
              className="mb-6 break-inside-avoid rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition"
            >
              <div className="relative">
                <Image
                  src={p.image}
                  alt={p.title}
                  className="w-full h-64 object-cover"
                />
                <span className="absolute top-3 right-3 bg-[var(--title)] text-white px-3 py-1 text-sm rounded-full">
                  ₹ {p.price.toLocaleString()}
                </span>
              </div>
              <div className="p-4 bg-white">
                <h3 className="font-bold text-[var(--title)] text-lg">
                  {p.title}
                </h3>
                <p className="flex items-center text-[var(--primary-color)] text-sm mt-1">
                  <MapPin size={16} className="mr-1" /> {p.location}
                </p>
                <p className="flex items-center text-[var(--primary-color)] text-sm mt-1">
                  <Home size={16} className="mr-1" /> {p.type} • {p.bedrooms}{" "}
                  BHK
                </p>
                <button className="mt-3 w-full bg-[var(--title)] text-white py-2 rounded-lg hover:bg-gray-800">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <HelpSection />
      {/* Footer */}
      <Footer />
    </div>
  );
}
