"use client";
import { useState, useEffect } from "react";
import { FiMenu } from "react-icons/fi";
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

import logo from "../assets/logo.png";
import LanguageSelector from "./LanguageSelector";

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: any;
  }
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const navItems = [
    { label: "Buy", path: "/buy" },
    { label: "Rent", path: "/rent" },
    { label: "Sell", path: "/sell" },
    { label: "Upcoming Projects", path: "/upcoming_properties" },
    { label: "Blogs", path: "/blog" },
    { label: "About Us", path: "/about" },
    { label: "Contact Us", path: "/contact" },
  ];

  useEffect(() => {
    const googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        { pageLanguage: "en", autoDisplay: false },
        "google_translate_element"
      );
    };

    if (!window.googleTranslateElementInit) {
      const script = document.createElement("script");
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
      window.googleTranslateElementInit = googleTranslateElementInit;
    }
  }, []);

  return (
    <nav className="bg-[var(--bg-color)] text-black  fixed w-full top-0 z-50  transition-colors">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex justify-between h-20 items-center">
          {/* Logo (Always visible) */}
          <Link href="/" className="flex items-center">
            <Image
              src={logo}
              alt="Mondus Logo"
              width={100}
              height={100}
              className="w-full"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.path}
                onClick={() => setActiveItem(item.label)}
                className={`relative pb-1 text-lg transition-colors hover:text-[var(--primary-color)] ${
                  activeItem === item.label
                    ? "text-[var(--title)]"
                    : "text-[var(--primary-color)]"
                }`}
              >
                {item.label}
                {activeItem === item.label && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--primary-color)]"></span>
                )}
              </Link>
            ))}
            <div className="notranslate">
              <LanguageSelector />
            </div>
          </div>

          <div className="md:hidden notranslate">
            <LanguageSelector />
          </div>
          {/* Mobile Hamburger */}
          <div className="md:hidden">
            {/* Language Selector Centered */}

            <button
              aria-label="Toggle menu"
              onClick={() => setIsOpen(!isOpen)}
              className="text-2xl"
            >
              <FiMenu />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-white z-[9999] flex flex-col items-center p-6 transform transition-transform duration-300 ease-in-out 
        ${isOpen ? "translate-x-0" : "translate-x-full"} md:hidden`}
      >
        {/* Header with Logo + Close button */}
        <div className="flex justify-between items-center w-full mb-6 border-b">
          <Image
            src={logo}
            alt="Mondus Logo"
            width={80}
            height={80}
            className="w-auto"
          />
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
            className="text-2xl"
          >
            ✕
          </button>
        </div>

        {/* Links Centered */}
        <div className="flex flex-col gap-6  w-full">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              onClick={() => {
                setActiveItem(item.label);
                setIsOpen(false);
              }}
              className={`text-lg transition-colors hover:text-[var(--primary-color)] ${
                activeItem === item.label
                  ? "text-[var(--primary-color)] font-medium"
                  : "text-black"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Social Icons (Bottom) */}
        <div className="mt-auto flex gap-6 justify-center pt-8 text-xl text-gray-600">
          <a href="#" aria-label="Facebook">
            <FaFacebook />
          </a>
          <a href="#" aria-label="Instagram">
            <FaInstagram />
          </a>
          <a href="#" aria-label="YouTube">
            <FaYoutube />
          </a>
          <a href="#" aria-label="Twitter">
            <FaTwitter />
          </a>
          <a href="#" aria-label="WhatsApp">
            <FaWhatsapp />
          </a>
        </div>
      </div>

      {/* Google Translate (Hidden container) */}
      <div id="google_translate_element" className="hidden" />
    </nav>
  );
};

export default Navbar;
