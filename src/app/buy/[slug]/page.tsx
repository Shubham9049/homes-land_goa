"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "yet-another-react-lightbox/styles.css";

import Lightbox from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";

import { MapPin, BedDouble, Home, Phone } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import HelpSection from "../../../../components/HelpSection";
import AOS from "aos";
import "aos/dist/aos.css";
import ContactInfo from "../../../../components/ContactInfo";

interface Property {
  _id: string;
  title: string;
  slug: string;
  type?: string;
  videoLink?: string;
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

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, offset: 100 });
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!slug) return;
    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/property/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setProperty(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading)
    return <p className="text-center mt-20 text-xl">Loading property...</p>;
  if (!property)
    return <p className="text-center mt-20 text-xl">Property not found</p>;

  const displayedImages = property.images.slice(0, 7);
  const extraCount = property.images.length - displayedImages.length;

  function getYouTubeEmbedUrl(url: string) {
    try {
      const parsedUrl = new URL(url);
      if (parsedUrl.hostname.includes("youtu.be")) {
        return `https://www.youtube.com/embed/${parsedUrl.pathname.slice(1)}`;
      } else if (parsedUrl.hostname.includes("youtube.com")) {
        return `https://www.youtube.com/embed/${parsedUrl.searchParams.get(
          "v"
        )}`;
      }
      return null;
    } catch {
      return null;
    }
  }

  return (
    <div className="bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
      <Navbar />

      {/* Hero with overlay */}
      <section className="relative h-[100vh]">
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          autoplay={{ delay: 4000 }}
          loop
          className="h-full"
        >
          {property.images.map((img, idx) => (
            <SwiperSlide key={idx}>
              <div className="relative w-full h-full">
                <Image
                  src={img}
                  alt={`Property Image ${idx + 1}`}
                  fill
                  priority={idx === 0} // optimize first image
                  className="object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Split Layout */}
      <section className="grid md:grid-cols-2 gap-10 w-11/12 md:w-5/6 mx-auto py-16">
        {/* Gallery - Left Side */}
        <div className="columns-2 gap-4 space-y-4">
          {displayedImages.map((img, idx) => (
            <div
              key={idx}
              onClick={() => {
                setPhotoIndex(idx);
                setIsOpen(true);
              }}
              className="relative overflow-hidden  shadow cursor-pointer"
            >
              <Image
                src={img}
                alt={`Gallery ${idx}`}
                width={600}
                height={400}
                className=" hover:scale-105 transition"
              />
            </div>
          ))}
          {extraCount > 0 && (
            <div
              className="relative h-40 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-xl text-2xl font-bold cursor-pointer"
              onClick={() => {
                setPhotoIndex(10);
                setIsOpen(true);
              }}
            >
              +{extraCount} more
            </div>
          )}
        </div>

        {/* Info + Description - Right Side */}
        <div className="sticky top-24 self-start space-y-6">
          {/* Title + Location + Price */}
          <h1 className="text-3xl font-bold">{property.title}</h1>
          {property.location && (
            <p className="flex items-center gap-2 text-lg text-gray-600 dark:text-gray-300">
              <MapPin size={18} /> {property.location}
            </p>
          )}
          {property.price && (
            <p className="text-2xl font-semibold text-[var(--title)]">
              ₹ {property.price.toLocaleString()}
            </p>
          )}

          {/* Badges */}
          <div className="flex flex-wrap gap-3">
            {property.type && (
              <span className="px-4 py-2 bg-gray-100 dark:bg-gray-900 rounded-lg shadow flex items-center gap-2">
                <Home size={18} /> {property.type}
              </span>
            )}
            {property.bedrooms && (
              <span className="px-4 py-2 bg-gray-100 dark:bg-gray-900 rounded-lg shadow flex items-center gap-2">
                <BedDouble size={18} /> {property.bedrooms} Beds
              </span>
            )}
            {property.bathrooms && (
              <span className="px-4 py-2 bg-gray-100 dark:bg-gray-900 rounded-lg shadow flex items-center gap-2">
                🛁 {property.bathrooms} Baths
              </span>
            )}
            {property.areaSqft && (
              <span className="px-4 py-2 bg-gray-100 dark:bg-gray-900 rounded-lg shadow flex items-center gap-2">
                📐 {property.areaSqft} Sqft
              </span>
            )}
          </div>

          {/* Description */}
          <h2 className="text-xl font-semibold mt-6">About this Property</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            {property.description}
          </p>

          {/* Highlights */}
          {property.highlights.length > 0 && (
            <>
              <h3 className="text-lg font-semibold mt-6">Highlights</h3>
              <div className="flex flex-wrap gap-3">
                {property.highlights.map((h, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 bg-[var(--bg-color)] rounded-full shadow text-sm"
                  >
                    {h}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Video Tour */}
      {property.videoLink && (
        <section className="w-11/12 md:w-5/6 mx-auto py-12">
          <h2 className="text-2xl font-semibold mb-6 text-[var(--primary-color)]">
            Virtual Tour
          </h2>
          <div className="w-full h-[500px] overflow-hidden rounded-xl shadow">
            {property.videoLink.includes("youtube") ||
            property.videoLink.includes("youtu.be") ? (
              <iframe
                src={getYouTubeEmbedUrl(property.videoLink)!}
                width="100%"
                height="100%"
                allowFullScreen
              />
            ) : (
              <video
                src={property.videoLink}
                controls
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </section>
      )}

      {/* Features */}
      {property.featuresAmenities.length > 0 && (
        <section className="w-11/12 md:w-5/6 mx-auto py-12">
          <h2 className="text-2xl font-semibold mb-6 text-[var(--primary-color)]">
            Features & Amenities
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {property.featuresAmenities.map((f, idx) => (
              <div
                key={idx}
                className="p-4 bg-[var(--bg-color)] rounded-lg shadow text-center"
              >
                ⭐ {f}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Nearby */}
      {property.nearby.length > 0 && (
        <section className="w-11/12 md:w-5/6 mx-auto py-12">
          <h2 className="text-2xl font-semibold mb-6 text-[var(--primary-color)]">
            Nearby Places
          </h2>
          <div className="flex flex-wrap gap-3">
            {property.nearby.map((n, idx) => (
              <span
                key={idx}
                className="px-5 py-2 bg-[var(--bg-color)] rounded-full"
              >
                {n}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Map */}
      {property.googleMapUrl && (
        <section className="w-11/12 md:w-5/6 mx-auto py-12">
          <h2 className="text-2xl font-semibold mb-6 text-[var(--primary-color)]">
            Location
          </h2>
          <iframe
            src={property.googleMapUrl}
            width="100%"
            height="450"
            loading="lazy"
            className="rounded-xl shadow border-0"
          />
        </section>
      )}

      {/* Floating Contact Widget */}
      <div className="fixed bottom-6 right-6 bg-[var(--primary-color)] text-white p-4 rounded-full shadow-xl flex items-center gap-2 cursor-pointer hover:scale-105 transition">
        <Phone /> Enquire
      </div>

      <ContactInfo />
      <HelpSection />
      <Footer />

      {/* Lightbox */}
      {isOpen && (
        <Lightbox
          open={isOpen}
          close={() => setIsOpen(false)}
          slides={property.images.map((img) => ({ src: img }))}
          index={photoIndex}
          plugins={[Fullscreen, Slideshow]}
        />
      )}
    </div>
  );
}
