"use client";

import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import { MapPin, BedDouble, Ruler, Home } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Property {
  _id: string;
  title: string;
  slug: string;
  type?: string;
  location?: string;
  price?: number | null;
  images: string[];
  purpose?: string;
  bedrooms?: number;
  size?: string; // Optional, you can modify based on your real schema
}

const PopularResidences = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
      easing: "ease-in-out",
    });

    const fetchProperties = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/property`);
        const data = await res.json();

        // Optionally filter to show only "buy" purpose properties
        const buyProperties = data.filter(
          (p: Property) => p.purpose?.toLowerCase() === "buy"
        );

        setProperties(buyProperties);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500">
        Loading properties...
      </div>
    );
  }

  return (
    <section className="py-12 bg-white">
      {/* Heading */}
      <h2
        className="text-3xl md:text-5xl font-bold text-center text-[var(--title)] mb-12"
        data-aos="fade-up"
      >
        Our Popular Residences
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-11/12 md:w-5/6 mx-auto">
        {properties.map((house, index) => (
          <Link href={`/buy/${house.slug}`} scroll={true}>
            <div
              key={house._id}
              className="bg-[#e6cfc2] rounded-2xl shadow-lg overflow-hidden flex flex-col cursor-pointer"
              data-aos="zoom-in-up"
              data-aos-delay={index * 200}
            >
              {/* Image */}
              <div className="relative h-60 w-full">
                {house.images?.[0] ? (
                  <Image
                    src={house.images[0]}
                    alt={house.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="h-60 flex items-center justify-center bg-gray-100 text-gray-400">
                    No Image
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-semibold text-[var(--title)] text-lg line-clamp-1">
                  {house.title}
                </h3>

                {house.location && (
                  <div className="flex items-center text-[var(--title)] font-semibold mb-3">
                    <MapPin className="w-5 h-5 mr-2" />
                    {house.location}
                  </div>
                )}

                <div className="flex items-center justify-between text-[var(--title)] text-sm">
                  {house.bedrooms && (
                    <div className="flex items-center gap-1">
                      <BedDouble className="w-5 h-5" />
                      <span>{house.bedrooms} Rooms</span>
                    </div>
                  )}
                  {house.size && (
                    <div className="flex items-center gap-1">
                      <Ruler className="w-5 h-5" />
                      <span>{house.size}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default PopularResidences;
