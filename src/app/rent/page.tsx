"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { MapPin, Home } from "lucide-react";
import banner from "../../../assets/buybanner.webp";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import HelpSection from "../../../components/HelpSection";
import { useRouter } from "next/navigation";

interface Property {
  _id: string;
  title: string;
  slug: string;
  type?: string;
  location?: string;
  price?: number | null;
  images: string[];
  purpose?: string;
}

export default function BuyPage() {
  const [selectedType, setSelectedType] = useState("All");
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const buyRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  // Fetch properties from backend
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/property`)
      .then((res) => res.json())
      .then((data) => {
        // filter only BUY properties
        const buyProperties = data.filter(
          (p: Property) => p.purpose?.toLowerCase() === "rent"
        );
        setProperties(buyProperties);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

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
          <h1 className="text-4xl md:text-5xl font-bold tracking-widest">
            Find Your Dream Home in Goa
          </h1>
          <p className="mt-4 text-lg tracking-widest">
            Apartments • Villas • Penthouses
          </p>
          <button
            onClick={scrollToNext}
            className="mt-10 animate-bounce border rounded-full w-fit px-1 py-2 mx-auto cursor-pointer"
          >
            <span className="text-3xl">↓</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="sticky top-0 bg-white shadow-md z-20 flex gap-4 p-4 justify-center tracking-widest">
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
        {loading ? (
          <p className="text-center py-20 text-gray-500">
            Loading properties...
          </p>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-500 col-span-full">
            <h2 className="text-2xl font-semibold mb-2">
              No properties available
            </h2>
            <p>
              Currently, we don’t have any{" "}
              <span className="font-medium">Buy</span> properties listed for{" "}
              <span className="font-medium">{selectedType}</span>.
              <br />
              Please check back soon or explore other categories.
            </p>
          </div>
        ) : (
          <div className="w-11/12 md:w-5/6 mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <div
                key={p._id}
                className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition bg-white"
              >
                {/* Image */}
                <div className="relative h-64 w-full">
                  {p.images?.[0] ? (
                    <Image
                      src={p.images[0]}
                      alt={p.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="h-64 flex items-center justify-center bg-gray-100 text-gray-400">
                      No Image
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3 className="font-bold text-[var(--title)] text-lg line-clamp-1">
                    {p.title}
                  </h3>
                  {p.location && (
                    <p className="flex items-center text-[var(--primary-color)] text-sm mt-1">
                      <MapPin size={16} className="mr-1" /> {p.location}
                    </p>
                  )}
                  {p.price !== null && (
                    <p className="mt-1 font-semibold text-gray-800">
                      ₹ {p.price?.toLocaleString()}
                    </p>
                  )}
                  {p.type && (
                    <p className="mt-1 text-sm text-gray-600 flex items-center">
                      <Home size={16} className="mr-1" /> {p.type}
                    </p>
                  )}

                  <button
                    onClick={() => router.push(`/upcoming-projects/${p.slug}`)}
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

      <HelpSection />
      <Footer />
    </div>
  );
}
