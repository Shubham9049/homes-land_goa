"use client";

import { useRef, useState } from "react";
import axios from "axios";
import {
  Phone,
  Mail,
  Home,
  ClipboardList,
  DollarSign,
  CheckCircle,
} from "lucide-react";

import Footer from "../../../components/Footer";
import Navbar from "../../../components/Navbar";
import banner from "../../../assets/sell-banner.jpg";
import Image from "next/image";

function Sell() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    title: "",
    description: "",
    purpose: "Buy",
    type: "",
    location: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    areaSqft: "",
    highlights: "[]",
    featuresAmenities: "[]",
    nearby: "[]",
    googleMapUrl: "",
    videoLink: "",
    extraHighlights: "[]",
  });

  const [images, setImages] = useState<FileList | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImages(e.target.files);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      title: "",
      description: "",
      purpose: "Buy",
      type: "",
      location: "",
      price: "",
      bedrooms: "",
      bathrooms: "",
      areaSqft: "",
      highlights: "[]",
      featuresAmenities: "[]",
      nearby: "[]",
      googleMapUrl: "",
      videoLink: "",
      extraHighlights: "[]",
    });
    setImages(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      for (const key in formData) {
        data.append(key, formData[key as keyof typeof formData]);
      }

      if (images) {
        Array.from(images).forEach((file) => {
          data.append("images", file);
        });
      }

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE}/sellproperty/addsell`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      alert(
        "Thank you! Your property is under review. We’ll get back to you soon."
      );
      resetForm();
    } catch (error) {
      console.error(error);
      alert("Failed to submit listing. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const sellRef = useRef<HTMLDivElement | null>(null);
  const scrollToNext = () => {
    if (sellRef.current) {
      const yOffset = -50;
      const y =
        sellRef.current.getBoundingClientRect().top + window.scrollY + yOffset;

      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-[100vh] bg-black flex flex-col justify-center items-center text-center px-6 tracking-widest">
        <Image
          src={banner}
          alt="Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative text-white">
          <h1 className="text-3xl md:text-5xl font-bold tracking-widest">
            Sell Your Property With Us
          </h1>
          <button
            onClick={scrollToNext}
            className="mt-10 animate-bounce border rounded-full w-fit px-1 py-2 mx-auto cursor-pointer"
          >
            <span className="text-3xl">↓</span>
          </button>
        </div>
      </div>

      {/* Sell Form */}
      <section
        ref={sellRef}
        className="py-16 bg-white w-11/12 md:w-5/6 mx-auto text-[var(--primary-color)]"
      >
        <h2 className="text-3xl font-bold text-center mb-12 tracking-widest">
          Submit Your Property Details
        </h2>
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="p-3 border rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="p-3 border rounded"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Your Phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="p-3 border rounded"
          />
          <input
            type="text"
            name="title"
            placeholder="Property Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="p-3 border rounded"
          />
          <textarea
            name="description"
            placeholder="Property Description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="p-3 border rounded"
          ></textarea>
          <input
            type="text"
            name="type"
            placeholder="Type (Apartment, Land, etc.)"
            value={formData.type}
            onChange={handleChange}
            className="p-3 border rounded"
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="p-3 border rounded"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="p-3 border rounded"
          />
          <input
            type="number"
            name="bedrooms"
            placeholder="Bedrooms"
            value={formData.bedrooms}
            onChange={handleChange}
            className="p-3 border rounded"
          />
          <input
            type="number"
            name="bathrooms"
            placeholder="Bathrooms"
            value={formData.bathrooms}
            onChange={handleChange}
            className="p-3 border rounded"
          />
          <input
            type="number"
            name="areaSqft"
            placeholder="Area (sq ft)"
            value={formData.areaSqft}
            onChange={handleChange}
            className="p-3 border rounded"
          />
          <input
            type="text"
            name="googleMapUrl"
            placeholder="Google Map URL"
            value={formData.googleMapUrl}
            onChange={handleChange}
            className="p-3 border rounded"
          />
          <input
            type="text"
            name="videoLink"
            placeholder="Video Link"
            value={formData.videoLink}
            onChange={handleChange}
            className="p-3 border rounded"
          />
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="p-3 border rounded"
          />

          <button
            type="submit"
            disabled={loading}
            className="col-span-full bg-[var(--primary-color)] text-white p-4 rounded cursor-pointer"
          >
            {loading ? "Submitting..." : "Submit Property"}
          </button>
        </form>
      </section>

      <Footer />
    </div>
  );
}

export default Sell;
