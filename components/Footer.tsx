"use client";

import { Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";
import logo from "../assets/logo.png";
import Image from "next/image";
import { SiX } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="bg-[var(--bg-color)] text-[var(--title)] pt-12">
      {/* Main Footer Content */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-10 w-11/12 mx-auto pb-10">
        {/* Brand Section */}
        <div className="md:col-span-1">
          <Image src={logo} alt="Company Logo" width={200} />
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-2xl font-bold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-base font-medium">
            <li>
              <a href="/buy">Buy</a>
            </li>
            <li>
              <a href="/rent">Rent</a>
            </li>
            <li>
              <a href="/sell">Sell</a>
            </li>
            <li>
              <a href="/upcoming-projects">Upcoming Projects</a>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-2xl font-bold mb-3">Support</h3>
          <ul className="space-y-2 text-base font-medium">
            <li>
              <a href="/faq">FAQ</a>
            </li>
            <li>
              <a href="/contact">Contact Us</a>
            </li>
            <li>
              <a href="/privacy-policy">Privacy Policy</a>
            </li>
            <li>
              <a href="/terms-of-service">Terms of Service</a>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className=" text-2xl font-bold mb-3">Our Social</h3>
          <ul className="space-y-3 text-base font-medium">
            <li>
              <a
                href="https://instagram.com/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 cursor-pointer hover:text-[var(--primary-color)]"
              >
                <Instagram size={18} /> Instagram
              </a>
            </li>
            <li>
              <a
                href="https://facebook.com/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 cursor-pointer hover:text-[var(--primary-color)]"
              >
                <Facebook size={18} /> Facebook
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 cursor-pointer hover:text-[var(--primary-color)]"
              >
                <SiX size={18} /> Twitter (X)
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-2xl font-bold mb-3">Contact</h3>
          <ul className="space-y-3 text-base font-medium">
            <li className="flex items-start gap-2">
              <MapPin size={18} className="mt-1" />
              Casa Lotus, H/No. 4/213 A, Porba Vaddo, <br /> Calangute 403516
            </li>
            <li className="flex items-center gap-2">
              <a
                href="mailto:info@homesandlandgoa.com"
                className="flex items-center gap-2 "
              >
                <Mail size={18} /> info@homesandlandgoa.com
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={18} /> +91 96238 58108
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-300 text-center py-4 text-sm md:text-base">
        <p>
          © {new Date().getFullYear()} HOMES & LAND GOA. All Rights Reserved.{" "}
          <br />
          Made & Marketed by{" "}
          <a
            href="https://www.bigwigmediadigital.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--primary-color)] font-semibold hover:underline"
          >
            Bigwig Media Digital
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
