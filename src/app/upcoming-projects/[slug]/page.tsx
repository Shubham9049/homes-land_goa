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
      <div className="relative w-full h-[70vh]">
        {property.images[0] && (
          <Image
            src={property.images[0]}
            alt={property.title}
            fill
            priority
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>
      </div>

      <div className="w-11/12 md:w-5/6 mx-auto px-4 py-16 space-y-16">
        {/* MAIN INFO SECTION */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* LEFT SIDE: TITLE + DETAILS */}
          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-[var(--primary-color)]">
              {property.title}
            </h1>
            {property.location && (
              <p className="flex items-center gap-2 text-lg text-gray-600 dark:text-gray-300">
                <MapPin size={18} /> {property.location}
              </p>
            )}

            <div className="flex flex-wrap gap-3">
              {property.type && (
                <span className="flex items-center gap-2 bg-gray-100 dark:bg-gray-900 px-4 py-2 rounded-lg shadow-sm">
                  <Home size={18} /> {property.type}
                </span>
              )}
              {property.price && (
                <span className="text-2xl font-semibold text-[var(--title)]">
                  ₹ {property.price.toLocaleString()}
                </span>
              )}
              {property.bedrooms && (
                <span className="flex items-center gap-2 bg-gray-100 dark:bg-gray-900 px-4 py-2 rounded-lg shadow-sm">
                  <BedDouble size={18} /> {property.bedrooms} Bedrooms
                </span>
              )}
              {property.bathrooms && (
                <span className="flex items-center gap-2 bg-gray-100 dark:bg-gray-900 px-4 py-2 rounded-lg shadow-sm">
                  🛁 {property.bathrooms} Bathrooms
                </span>
              )}
              {property.areaSqft && (
                <span className="flex items-center gap-2 bg-gray-100 dark:bg-gray-900 px-4 py-2 rounded-lg shadow-sm">
                  📐 {property.areaSqft} Sqft
                </span>
              )}
            </div>
          </div>

          {/* RIGHT SIDE: DESCRIPTION */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Description</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
              {property.description}
            </p>
          </div>
        </div>

        {/* IMAGE PREVIEW GALLERY */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {property.images.slice(1, 4).map((img, idx) => (
            <div
              key={idx}
              className="relative w-full h-48 rounded-xl overflow-hidden shadow-md"
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
              className="relative w-full h-48 rounded-xl overflow-hidden shadow-md bg-black/80 text-white flex items-center justify-center text-lg font-medium"
            >
              + {property.images.length - 3} More
            </button>
          )}
        </div>

        {/* HIGHLIGHTS */}
        {property.highlights?.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold mb-6">Highlights</h2>
            <div className="flex flex-wrap gap-3">
              {property.highlights.map((h, idx) => (
                <span
                  key={idx}
                  className="bg-[var(--title)] text-white px-5 py-2 rounded-full shadow-md"
                >
                  {h}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* FEATURES + AMENITIES */}
        {property.featuresAmenities?.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold mb-6">
              Features & Amenities
            </h2>
            <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {property.featuresAmenities.map((f, idx) => (
                <li
                  key={idx}
                  className="bg-gray-50 dark:bg-gray-900 px-4 py-3 rounded-lg flex items-center gap-2 shadow-sm"
                >
                  ⭐ {f}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* NEARBY */}
        {property.nearby?.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold mb-6">Nearby</h2>
            <div className="flex flex-wrap gap-3">
              {property.nearby.map((n, idx) => (
                <span
                  key={idx}
                  className="bg-gray-100 dark:bg-gray-800 px-5 py-2 rounded-full shadow-sm"
                >
                  {n}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* EXTRA HIGHLIGHTS */}
        {property.extraHighlights?.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold mb-6">Extra Highlights</h2>
            <div className="flex flex-wrap gap-3">
              {property.extraHighlights.map((e, idx) => (
                <span
                  key={idx}
                  className="bg-gray-200 dark:bg-gray-700 px-5 py-2 rounded-full"
                >
                  {e}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* GOOGLE MAP */}
        {property.googleMapUrl && (
          <section>
            <h2 className="text-2xl font-semibold mb-6">Location</h2>
            <iframe
              src={property.googleMapUrl}
              width="100%"
              height="450"
              loading="lazy"
              className="rounded-2xl shadow-md border-0"
            ></iframe>
          </section>
        )}
      </div>

      {/* GALLERY MODAL */}
      {showGallery && (
        <div className="fixed inset-0 bg-black/95 flex flex-col z-50 items-center justify-center">
          <button
            onClick={() => setShowGallery(false)}
            className="absolute top-6 right-6 text-white text-2xl"
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
