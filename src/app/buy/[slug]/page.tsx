"use client";

import { useParams } from "next/navigation";
import propertiesData from "../../../../data/properties.json";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";

// ✅ Interfaces
interface PropertyDetails {
  images?: string[];
  videos?: string[];
  googleMapUrl?: string;
  highlights?: string[];
  features?: string[];
  nearby?: string[];
  description?: string;
}

interface Property {
  title: string;
  type: string;
  location: string;
  price: number | string;
  details: PropertyDetails;
}

interface PropertiesData {
  rent: Property[];
  buy: Property[];
  upcoming: Property[];
}

export default function BuyDetailsPage() {
  const { slug } = useParams();
  const properties = (propertiesData as PropertiesData).buy || [];

  const toSlug = (title: string) => title.toLowerCase().replace(/\s+/g, "-");
  const property = properties.find((p) => toSlug(p.title) === slug);

  if (!property) {
    return (
      <div className="p-12 text-center text-red-500 font-semibold">
        Property not found
      </div>
    );
  }

  const { details } = property;

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 pt-28 pb-12">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold">{property.title}</h1>
          <p className="text-gray-600 mt-1">
            {property.type} • {property.location}
          </p>
          <p className="text-2xl font-semibold mt-2 text-red-600">
            ₹{" "}
            {typeof property.price === "number"
              ? property.price.toLocaleString()
              : property.price}
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column - Images, Video, Map */}
          <div className="md:col-span-2 space-y-6">
            {/* Images */}
            {details.images && details.images.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {details.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`${property.title} ${idx + 1}`}
                    className="rounded-lg w-full h-auto object-cover shadow-md"
                  />
                ))}
              </div>
            )}

            {/* Video */}
            {details.videos && details.videos.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-2">Video Tour</h2>
                <video
                  src={details.videos[0]}
                  controls
                  className="w-full rounded-lg shadow-md"
                />
              </div>
            )}

            {/* Google Map */}
            {details.googleMapUrl && (
              <div>
                <h2 className="text-xl font-semibold mb-2">Location</h2>
                <iframe
                  src={details.googleMapUrl}
                  width="100%"
                  height="350"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  className="rounded-lg shadow-md"
                ></iframe>
              </div>
            )}
          </div>

          {/* Right Column - Highlights, Features, Nearby */}
          <div className="space-y-6">
            {details.highlights && (
              <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold mb-2">Highlights</h2>
                <ul className="list-disc list-inside text-sm space-y-1">
                  {details.highlights.map((h, idx) => (
                    <li key={idx}>{h}</li>
                  ))}
                </ul>
              </div>
            )}

            {details.features && (
              <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold mb-2">Features</h2>
                <ul className="list-disc list-inside text-sm space-y-1">
                  {details.features.map((f, idx) => (
                    <li key={idx}>{f}</li>
                  ))}
                </ul>
              </div>
            )}

            {details.nearby && (
              <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold mb-2">Nearby</h2>
                <ul className="list-disc list-inside text-sm space-y-1">
                  {details.nearby.map((n, idx) => (
                    <li key={idx}>{n}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        {details.description && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-3">About this property</h2>
            <p className="text-gray-700 leading-relaxed">
              {details.description}
            </p>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
