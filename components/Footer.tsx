"use client";

import { Instagram, Facebook, Twitter } from "lucide-react";
import logo from "../assets/logo.png";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-[var(--bg-color)] text-[var(--title)]  py-12">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-10 w-11/12 md:w-5/6 mx-auto">
        {/* Brand Section */}
        <div className="md:col-span-1">
          <Image src={logo} alt="" width={200} />
        </div>

        {/* About */}
        <div>
          <h3 className="text-2xl font-bold mb-3">About</h3>
          <ul className="space-y-2 text-base font-medium">
            <li>
              <a href="#">Our Story</a>
            </li>
            <li>
              <a href="#">Careers</a>
            </li>
            <li>
              <a href="#">Our Team</a>
            </li>
            <li>
              <a href="#">Resources</a>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-2xl font-bold mb-3">Support</h3>
          <ul className="space-y-2 text-base font-medium">
            <li>
              <a href="#">FAQ</a>
            </li>
            <li>
              <a href="#">Contact Us</a>
            </li>
            <li>
              <a href="#">Help Center</a>
            </li>
            <li>
              <a href="#">Terms of Service</a>
            </li>
          </ul>
        </div>

        {/* Find Us */}
        <div>
          <h3 className="text-2xl font-bold mb-3">Find Us</h3>
          <ul className="space-y-2 text-base font-medium">
            <li>
              <a href="#">Events</a>
            </li>
            <li>
              <a href="#">Locations</a>
            </li>
            <li>
              <a href="#">Newsletter</a>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className=" text-2xl font-bold mb-3">Our Social</h3>
          <ul className="space-y-3 text-base font-medium">
            <li className="flex items-center gap-2">
              <Instagram size={18} /> Instagram
            </li>
            <li className="flex items-center gap-2">
              <Facebook size={18} /> Facebook
            </li>
            <li className="flex items-center gap-2">
              <Twitter size={18} /> Twitter (x)
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
