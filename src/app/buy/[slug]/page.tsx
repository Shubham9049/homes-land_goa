"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import {
  MapPin,
  BedDouble,
  Home,
  X,
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import HelpSection from "../../../../components/HelpSection";

interface Property {
  _id: string;
  title: string;
  slug: string;
  type?: string;
  location?: string;
  price?: number | null;
  bedrooms?: number | null;
  bathrooms?: number | null;
  areaSqft?: number | null;
  images: string[];
  highlights: string[];
  nearby: string[];
  featuresAmenities: string[];
  extraHighlights: string[];
  description: string;
  googleMapUrl?: string;
}

export default function BuyDetails() {
  const { slug } = useParams();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [showGallery, setShowGallery] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  // Fetch property by slug
  useEffect(() => {
    if (!slug) return;
    fetch(`http://localhost:8000/property/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setProperty(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [slug]);

  if (loading)
    return <p className="text-center mt-20 text-xl">Loading property...</p>;
  if (!property)
    return <p className="text-center mt-20 text-xl">Property not found</p>;

  const nextImage = () =>
    setCurrentImage((prev) => (prev + 1) % property.images.length);
  const prevImage = () =>
    setCurrentImage(
      (prev) => (prev - 1 + property.images.length) % property.images.length
    );

  return (
    <div className="bg-white dark:bg-black text-black dark:text-white font-sans">
      <Navbar />

      {/* HERO IMAGE */}
      <div className="relative w-full h-[75vh]">
        {property.images[0] && (
          <Image
            src={property.images[0]}
            alt={property.title}
            fill
            className="object-cover"
          />
        )}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-black/50 px-6 py-3 rounded-xl text-center text-white">
          <h1 className="text-3xl md:text-4xl font-bold">{property.title}</h1>
          {property.location && (
            <p className="text-lg mt-1">{property.location}</p>
          )}
        </div>
      </div>

      <div className="w-11/12 md:w-5/6 mx-auto px-4 py-16 space-y-12">
        {/* PRICE + INFO */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {property.price && (
            <p className="text-3xl font-semibold text-[var(--title)]">
              ₹ {property.price.toLocaleString()}
            </p>
          )}
          <div className="flex flex-wrap gap-3">
            {property.type && (
              <span className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg shadow-sm">
                <Home size={18} /> {property.type}
              </span>
            )}
            {property.bedrooms && (
              <span className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg shadow-sm">
                <BedDouble size={18} /> {property.bedrooms} Bedrooms
              </span>
            )}
            {property.bathrooms && (
              <span className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg shadow-sm">
                🛁 {property.bathrooms} Bathrooms
              </span>
            )}
            {property.areaSqft && (
              <span className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg shadow-sm">
                📐 {property.areaSqft} Sqft
              </span>
            )}
          </div>
        </div>

        {/* IMAGE PREVIEW GALLERY */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {property.images.slice(1, 4).map((img, idx) => (
            <div
              key={idx}
              className="relative w-full h-44 rounded-xl overflow-hidden shadow-md"
            >
              <Image
                src={img}
                alt={`${property.title} ${idx + 2}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
          {property.images.length > 4 && (
            <button
              onClick={() => setShowGallery(true)}
              className="relative w-full h-44 rounded-xl overflow-hidden shadow-md bg-black text-white flex items-center justify-center text-lg font-medium"
            >
              + {property.images.length - 3} More
            </button>
          )}
        </div>

        {/* HIGHLIGHTS */}
        {property.highlights?.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">Highlights</h2>
            <div className="flex flex-wrap gap-3">
              {property.highlights.map((h, idx) => (
                <span
                  key={idx}
                  className="bg-[var(--title)] text-white px-4 py-2 rounded-lg shadow-md"
                >
                  {h}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* NEARBY */}
        {property.nearby?.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">Nearby</h2>
            <div className="flex flex-wrap gap-3">
              {property.nearby.map((n, idx) => (
                <span
                  key={idx}
                  className="bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg shadow-sm"
                >
                  {n}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* FEATURES + AMENITIES */}
        {property.featuresAmenities?.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">
              Features & Amenities
            </h2>
            <ul className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {property.featuresAmenities.map((f, idx) => (
                <li
                  key={idx}
                  className="bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg flex items-center gap-2"
                >
                  <Star size={16} className="text-yellow-500" /> {f}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* EXTRA HIGHLIGHTS */}
        {property.extraHighlights?.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">Extra Highlights</h2>
            <div className="flex flex-wrap gap-3">
              {property.extraHighlights.map((e, idx) => (
                <span
                  key={idx}
                  className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-lg"
                >
                  {e}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* DESCRIPTION */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Description</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {property.description}
          </p>
        </section>

        {/* GOOGLE MAP */}
        {property.googleMapUrl && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">Location</h2>
            <iframe
              src={property.googleMapUrl}
              width="100%"
              height="400"
              loading="lazy"
              className="rounded-xl shadow-md border-0"
            ></iframe>
          </section>
        )}
      </div>

      {/* GALLERY MODAL */}
      {showGallery && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col z-50 items-center justify-center">
          <button
            onClick={() => setShowGallery(false)}
            className="absolute top-4 right-4 text-white text-2xl"
          >
            <X size={32} />
          </button>
          <div className="flex items-center justify-center relative w-full max-w-6xl px-4">
            <button
              onClick={prevImage}
              className="absolute left-4 text-white bg-black/50 p-2 rounded-full"
            >
              <ChevronLeft size={28} />
            </button>
            <div className="relative w-full h-[70vh]">
              <Image
                src={property.images[currentImage]}
                alt={`Gallery ${currentImage + 1}`}
                fill
                className="object-contain"
              />
            </div>
            <button
              onClick={nextImage}
              className="absolute right-4 text-white bg-black/50 p-2 rounded-full"
            >
              <ChevronRight size={28} />
            </button>
          </div>
        </div>
      )}

      <HelpSection />
      <Footer />
    </div>
  );
}
