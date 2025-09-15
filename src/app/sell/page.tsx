"use client";

import { useRef, useState } from "react";
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
  const [step, setStep] = useState<"form" | "otp">("form");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    purpose: "sell",
    message: "",
  });

  const [otp, setOtp] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

  // Dummy submit handlers (replace with API later)
  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("otp");
    }, 1000);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("OTP Verified! (Demo only)");
    }, 1000);
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
          <p className="mt-4 max-w-2xl text-lg md:text-xl text-white mx-auto">
            Get the best value for your property with our seamless selling
            process, expert guidance, and trusted network of buyers.
          </p>
          <button
            onClick={scrollToNext}
            className="mt-10 animate-bounce border rounded-full w-fit px-1 py-2 mx-auto cursor-pointer"
          >
            <span className="text-3xl">↓</span>
          </button>
        </div>
      </div>

      {/* Process Section */}
      <section
        ref={sellRef}
        className="py-12 bg-white w-11/12 md:w-5/6 text-[var(--primary-color)] mx-auto tracking-widest"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 tracking-widest">
          Our Selling Process
        </h2>
        <div className="grid md:grid-cols-3 gap-10 ">
          <div className="flex flex-col items-center text-center p-6 rounded-2xl shadow-lg hover:shadow-xl transition bg-[var(--bg-color)]">
            <ClipboardList size={40} className="text-[var(--title)] mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-[var(--title)]">
              Step 1: Share Your Details
            </h3>
            <p className="text-[var(--primary-color)]">
              Fill out our form or call us directly to provide basic information
              about your property.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6 rounded-2xl shadow-lg hover:shadow-xl transition bg-[var(--bg-color)]">
            <Home size={40} className="text-[var(--title)] mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-[var(--title)]">
              Step 2: Property Evaluation
            </h3>
            <p className="text-[var(--primary-color)]">
              Our experts will evaluate your property and suggest the best
              market price.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6 rounded-2xl shadow-lg hover:shadow-xl transition bg-[var(--bg-color)]">
            <DollarSign size={40} className="text-[var(--title)] mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-[var(--title)]">
              Step 3: Close the Deal
            </h3>
            <p className="text-[var(--primary-color)]">
              We connect you with genuine buyers and ensure a hassle-free
              closing process.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 bg-[var(--bg-color)] text-[var(--primary-color)] tracking-widest">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 tracking-widest">
          Why Sell With Us?
        </h2>
        <div className="grid md:grid-cols-3 gap-10 w-11/12 md:w-5/6 mx-auto">
          {[
            {
              title: "Trusted Network",
              desc: "Access to genuine buyers & investors.",
            },
            {
              title: "Best Market Price",
              desc: "Get accurate valuation and maximum returns.",
            },
            {
              title: "Hassle-Free Process",
              desc: "We handle the legal and documentation work.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-6 rounded-xl bg-white shadow"
            >
              <CheckCircle className="text-[var(--title)]" size={32} />
              <div>
                <h3 className="text-lg font-semibold text-[var(--title)]">
                  {item.title}
                </h3>
                <p className="text-[var(--primary-color)]">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form with OTP */}
      <section className="py-16 bg-white w-11/12 md:w-5/6 mx-auto text-[var(--primary-color)]">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 tracking-widest ">
          Get In Touch With Us
        </h2>
        <div className="grid md:grid-cols-2 gap-10 items-center tracking-widest">
          {/* Contact Info */}
          <div className="space-y-6">
            <p className="text-lg text-gray-600">
              Want to sell your property quickly and easily? Fill out the form
              or contact us directly.
            </p>
            <div className="flex items-center gap-3">
              <Phone className="text-[var(--title)]" />
              <span className="text-lg">+91 96238 58108</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="text-[var(--title)]" />
              <span className="text-lg">info@homesandlandgoa.com</span>
            </div>
          </div>

          {/* OTP Form */}
          {step === "form" ? (
            <form
              className="bg-[#f9f9f9] p-8 rounded-2xl shadow-md space-y-4"
              onSubmit={handleSendOtp}
            >
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#c9a368] outline-none"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#c9a368] outline-none"
                required
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Your Phone"
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#c9a368] outline-none"
                required
              />

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your property"
                rows={4}
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--primary-color)] outline-none text-black"
                required
              ></textarea>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[var(--primary-color)] text-white font-semibold py-3 rounded-lg hover:opacity-90 transition"
              >
                {loading ? "Sending OTP..." : "Submit & Get OTP"}
              </button>
            </form>
          ) : (
            <form
              className="bg-[#f9f9f9] p-8 rounded-2xl shadow-md space-y-4"
              onSubmit={handleVerifyOtp}
            >
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--primary-color)] outline-none"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[var(--primary-color)] text-white font-semibold py-3 rounded-lg hover:opacity-90 transition"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Sell;
