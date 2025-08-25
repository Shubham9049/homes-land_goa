"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import { MapPin, BedDouble, Ruler } from "lucide-react";
import img1 from "../assets/image (10) 2.png";
import img2 from "../assets/image (21) 2.png";
import img3 from "../assets/image 2.png";
import Image from "next/image";

const residences = [
  {
    id: 1,
    image: img1,
    location: "San Francisco, California",
    rooms: 4,
    size: "3,500 sq ft",
  },
  {
    id: 2,
    image: img2,
    location: "Beverly Hills, California",
    rooms: 3,
    size: "1,500 sq ft",
  },
  {
    id: 3,
    image: img3,
    location: "Palo Alto, California",
    rooms: 6,
    size: "4,000 sq ft",
  },
];

const PopularResidences = () => {
  useEffect(() => {
    AOS.init({
      duration: 900, // animation duration
      once: true, // run only once
      easing: "ease-in-out",
    });
  }, []);

  return (
    <section className="py-12 bg-white">
      {/* Heading */}
      <h2
        className="text-3xl md:text-5xl font-bold text-center text-[var(--title)] mb-12"
        data-aos="fade-up"
      >
        Our Popular Residences
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-11/12 md:w-5/6 mx-auto">
        {residences.map((house, index) => (
          <div
            key={house.id}
            className="bg-[#e6cfc2] rounded-2xl shadow-lg overflow-hidden flex flex-col"
            data-aos="zoom-in-up"
            data-aos-delay={index * 200} // stagger effect
          >
            {/* Image */}
            <Image
              src={house.image}
              alt={house.location}
              className="w-full h-60 object-cover"
            />

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow">
              {/* Location */}
              <div className="flex items-center text-[var(--title)] font-semibold mb-3">
                <MapPin className="w-5 h-5 mr-2" />
                {house.location}
              </div>

              {/* Details */}
              <div className="flex items-center justify-between text-[var(--title)] text-sm">
                <div className="flex items-center gap-1">
                  <BedDouble className="w-5 h-5" />
                  <span>{house.rooms} Rooms</span>
                </div>
                <div className="flex items-center gap-1">
                  <Ruler className="w-5 h-5" />
                  <span>{house.size}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularResidences;
