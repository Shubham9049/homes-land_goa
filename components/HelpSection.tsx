"use client";

import { Mail, MessageCircle, HelpCircle } from "lucide-react";

const HelpSection = () => {
  return (
    <section className="bg-white py-16 px-6 text-center">
      {/* Heading */}
      <h2 className="text-3xl md:text-5xl font-bold text-[var(--title)] mb-4">
        Do You Have Any Questions?
        <br />
        Get Help From Us
      </h2>

      {/* Support Options */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-6 mb-10 text-[var(--primary-color)] font-medium">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5" />
          <span>
            <a href="/faq">Browse our FAQ</a>
          </span>
        </div>
      </div>

      {/* Newsletter / Email Form */}
      <form className="flex flex-col md:flex-row items-center justify-center gap-4 max-w-2xl mx-auto">
        <div className="flex items-center bg-[var(--bg-color)] text-[var(--primary-color)] rounded-md px-4 py-3 flex-grow shadow-sm w-full">
          <Mail className="w-5 h-5 mr-2" />
          <input
            type="email"
            placeholder="Enter your email address..."
            className="bg-transparent outline-none flex-grow placeholder-[var(--title)] text-base"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-[var(--title)] cursor-pointer text-white px-6 py-3 rounded-md font-semibold hover:bg-[#2a1b13] transition"
        >
          Submit
        </button>
      </form>
    </section>
  );
};

export default HelpSection;
