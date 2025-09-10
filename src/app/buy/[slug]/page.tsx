"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "yet-another-react-lightbox/styles.css";

import Lightbox from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";

import { MapPin, BedDouble, Home } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

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

  // Lightbox state
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

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

  const displayedImages = property.images.slice(0, 7);
  const extraCount = property.images.length - displayedImages.length;

  return (
    <div className="bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
      <Navbar />

      {/* Hero Swiper */}
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop
        className="h-[100vh]"
      >
        {property.images.map((img, idx) => (
          <SwiperSlide key={idx}>
            <div className="relative w-full h-full">
              <Image
                src={img}
                alt={`Property Image ${idx + 1}`}
                fill
                className="object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Property Info */}
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {property.title}
          </h1>

          {property.location && (
            <p className="flex items-center gap-2 text-lg text-gray-600 dark:text-gray-300">
              <MapPin size={18} /> {property.location}
            </p>
          )}

          <div className="flex flex-wrap gap-3 mt-4">
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

        <div>
          <h2 className="text-2xl font-semibold mb-4">Description</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
            {property.description}
          </p>
        </div>
      </div>

      {/* Highlights */}
      {property.highlights.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-semibold mb-6 text-[var(--primary-color)]">
            Highlights
          </h2>
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

      {/* Image Gallery */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-semibold mb-6 text-[var(--primary-color)]">
          Image Gallery
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {displayedImages.map((img, idx) => (
            <div
              key={idx}
              className="relative w-full h-48 rounded-lg shadow-md overflow-hidden cursor-pointer"
              onClick={() => {
                setPhotoIndex(idx);
                setIsOpen(true);
              }}
            >
              <Image
                src={img}
                alt={`Property Image ${idx + 1}`}
                fill
                className="object-cover hover:scale-105 transition"
              />
            </div>
          ))}

          {extraCount > 0 && (
            <div
              className="relative w-full h-48 rounded-lg shadow-md bg-gray-300 flex items-center justify-center text-3xl font-bold cursor-pointer"
              onClick={() => {
                setPhotoIndex(10);
                setIsOpen(true);
              }}
            >
              +{extraCount}
            </div>
          )}
        </div>

        {isOpen && (
          <Lightbox
            open={isOpen}
            close={() => setIsOpen(false)}
            slides={property.images.map((img) => ({ src: img }))}
            index={photoIndex}
            plugins={[Fullscreen, Slideshow]}
          />
        )}
      </section>

      {/* Features & Amenities */}
      {property.featuresAmenities.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-semibold mb-6 text-[var(--primary-color)]">
            Features & Amenities
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {property.featuresAmenities.map((f, idx) => (
              <div
                key={idx}
                className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow"
              >
                ⭐ {f}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Nearby Places */}
      {property.nearby.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-semibold mb-6 text-[var(--primary-color)]">
            Nearby Places
          </h2>
          <div className="flex flex-wrap gap-3">
            {property.nearby.map((n, idx) => (
              <span
                key={idx}
                className="bg-gray-200 dark:bg-gray-700 px-5 py-2 rounded-full"
              >
                {n}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Extra Highlights */}
      {property.extraHighlights.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-semibold mb-6 text-[var(--primary-color)]">
            Extra Highlights
          </h2>
          <div className="flex flex-wrap gap-3">
            {property.extraHighlights.map((e, idx) => (
              <span
                key={idx}
                className="bg-gray-300 dark:bg-gray-600 px-5 py-2 rounded-full"
              >
                {e}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Google Map */}
      {property.googleMapUrl && (
        <section className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-semibold mb-6 text-[var(--primary-color)]">
            Location
          </h2>
          <iframe
            src={property.googleMapUrl}
            width="100%"
            height="450"
            loading="lazy"
            className="rounded-lg shadow-md border-0"
          />
        </section>
      )}

      <HelpSection />
      <Footer />
    </div>
  );
}
