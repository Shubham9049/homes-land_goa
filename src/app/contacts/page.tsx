"use client";

import { FaMapMarkerAlt, FaPhoneAlt, FaClock } from "react-icons/fa";
import { MdDeliveryDining, MdOutlineLocalDining } from "react-icons/md";
import { RiTakeawayFill } from "react-icons/ri";
import contactBanner from "../../../assets/contact.jpg";
import { useRef, useState } from "react";
import Navbar from "../../../components/Navbar";
import Image from "next/image";
import Footer from "../../../components/Footer";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const contactRef = useRef<HTMLDivElement | null>(null);
  const scrollToNext = () => {
    if (contactRef.current) {
      const yOffset = -50;
      const y =
        contactRef.current.getBoundingClientRect().top +
        window.scrollY +
        yOffset;

      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className=" text-black  transition-colors">
      {/* Toast container */}

      <Navbar />

      {/* Hero Banner */}
      <section className="relative w-full h-[80vh] flex items-center justify-center pt-32">
        <Image
          src={contactBanner}
          alt="Contact page"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg md:text-2xl max-w-2xl mx-auto">
            We&#39;d love to hear from you! Reach out with questions, feedback,
            or reservation inquiries.
          </p>
          <button
            onClick={scrollToNext}
            className="mt-10 animate-bounce border rounded-full w-fit px-1 py-2 mx-auto cursor-pointer"
          >
            <span className="text-3xl">↓</span>
          </button>
        </div>
      </section>

      {/* Main Section */}
      <section
        ref={contactRef}
        className="w-11/12 md:w-5/6 mx-auto py-16 grid md:grid-cols-2 gap-12 items-start"
      >
        {/* Left info */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-[var(--primary-color)]">
            Contact Information
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            Reach out to us for any queries, bookings, or collaborations.
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 p-3 rounded-lg bg-gray-100 dark:bg-[#1e1e1e] shadow">
              <MdOutlineLocalDining className="text-[var(--primary-color)] text-xl" />
              <span>Dine-in</span>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-lg bg-gray-100 dark:bg-[#1e1e1e] shadow">
              <RiTakeawayFill className="text-[var(--primary-color)] text-xl" />
              <span>Takeaway</span>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-lg bg-gray-100 dark:bg-[#1e1e1e] shadow">
              <MdDeliveryDining className="text-[var(--primary-color)] text-xl" />
              <span>No-contact Delivery</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <FaMapMarkerAlt className="mt-1 text-[var(--primary-color)]" />
            <span>
              123 Main Street, Downtown District, <br />
              Springfield, California 90210
              <br />
              <span className="text-sm text-gray-500">Near Central Plaza</span>
            </span>
          </div>
          <p className="flex items-center gap-3">
            <FaPhoneAlt className="text-[var(--primary-color)]" />
            +1 (555) 123-4567
          </p>
          <p className="flex items-center gap-3">
            <FaClock className="text-[var(--primary-color)]" />
            Open ⋅ Closes 9 pm
          </p>
        </div>

        {/* Right form */}
        <form className="space-y-6 bg-white dark:bg-[#1e1e1e] p-8 rounded-xl shadow-lg border dark:border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              className="border border-gray-300 dark:border-gray-700 p-3 rounded-md bg-white dark:bg-[#2c2c2c] text-black dark:text-white"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              //   onChange={handleChange}
              className="border border-gray-300 dark:border-gray-700 p-3 rounded-md bg-white dark:bg-[#2c2c2c] text-black dark:text-white"
              required
            />
          </div>
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            // onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-700 p-3 rounded-md bg-white dark:bg-[#2c2c2c] text-black dark:text-white"
          />
          <textarea
            name="message"
            rows={5}
            placeholder="Your Message"
            value={formData.message}
            // onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-700 p-3 rounded-md bg-white dark:bg-[#2c2c2c] text-black dark:text-white"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-[var(--primary-color)] text-white px-6 py-3 rounded-md hover:rounded-xl transition disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </section>

      <Footer />
    </div>
  );
}
