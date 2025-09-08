"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { MapPin, Home } from "lucide-react";
import banner from "../../../assets/buybanner.webp";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import HelpSection from "../../../components/HelpSection";
import { useRouter } from "next/navigation";

// Import JSON directly
import propertiesData from "../../../data/properties.json";

interface Property {
  id: string;
  title: string;
  type: string;
  location: string;
  price: number | string;
  thumbnail: string;
  bedrooms?: number;
}

export default function BuyPage() {
  const [selectedType, setSelectedType] = useState("All");
  const buyRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  // 👇 only take "buy" properties from JSON
  const properties: Property[] = propertiesData.buy || [];

  const filtered =
    selectedType === "All"
      ? properties
      : properties.filter((p) => p.type === selectedType);

  const scrollToNext = () => {
    if (buyRef.current) {
      const yOffset = -50;
      const y =
        buyRef.current.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const handleRedirect = (title: string) => {
    const slug = title.toLowerCase().replace(/\s+/g, "-");
    router.push(`/buy/${slug}`);
  };

  return (
    <div className="w-full min-h-screen flex flex-col">
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
          <p className="mt-4 text-lg">Apartments • Villas • Penthouses</p>
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

      {/* Property List */}
      <div ref={buyRef} className="py-12 bg-[var(--bg-color)]">
        <div className="w-11/12 md:w-5/6 mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              <h2 className="text-2xl font-semibold mb-2">
                No properties available
              </h2>
              <p>
                Currently, we don’t have any properties listed for{" "}
                <span className="font-medium">{selectedType}</span>. <br />
                Please check back soon or explore other categories.
              </p>
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 p-6 flex-grow">
              {filtered.map((p) => (
                <div
                  key={p.id}
                  className="mb-6 break-inside-avoid rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition"
                >
                  <div className="relative">
                    <Image
                      src={p.thumbnail}
                      alt={p.title}
                      width={500}
                      height={400}
                      className="w-full h-64 object-cover"
                    />
                    <span className="absolute top-3 right-3 bg-[var(--title)] text-white px-3 py-1 text-sm rounded-full">
                      ₹{" "}
                      {typeof p.price === "number"
                        ? p.price.toLocaleString()
                        : p.price}
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
                      <Home size={16} className="mr-1" /> {p.type}{" "}
                      {p.bedrooms ? `• ${p.bedrooms} BHK` : ""}
                    </p>
                    <button
                      onClick={() => handleRedirect(p.title)}
                      className="mt-3 w-full bg-[var(--title)] text-white py-2 rounded-lg hover:bg-gray-800"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <HelpSection />
      <Footer />
    </div>
  );
}
