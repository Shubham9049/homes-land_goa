"use client";

import { MapPin, BedDouble, Ruler } from "lucide-react";

const residences = [
  {
    id: 1,
    image: "/house1.jpg",
    location: "San Francisco, California",
    rooms: 4,
    size: "3,500 sq ft",
    price: "$2,500,000",
  },
  {
    id: 2,
    image: "/house2.jpg",
    location: "Beverly Hills, California",
    rooms: 3,
    size: "1,500 sq ft",
    price: "$850,000",
  },
  {
    id: 3,
    image: "/house3.jpg",
    location: "Palo Alto, California",
    rooms: 6,
    size: "4,000 sq ft",
    price: "$3,700,000",
  },
];

const PopularResidences = () => {
  return (
    <section className="py-16 px-6 bg-white">
      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-extrabold text-center text-[#3d2a20] mb-12">
        Our Popular Residences
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {residences.map((house) => (
          <div
            key={house.id}
            className="bg-[#e6cfc2] rounded-2xl shadow-lg overflow-hidden flex flex-col"
          >
            {/* Image */}
            <img
              src={house.image}
              alt={house.location}
              className="w-full h-60 object-cover"
            />

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow">
              {/* Location */}
              <div className="flex items-center text-[#3d2a20] font-semibold mb-3">
                <MapPin className="w-5 h-5 mr-2" />
                {house.location}
              </div>

              {/* Details */}
              <div className="flex items-center justify-between text-[#3d2a20] mb-4 text-sm">
                <div className="flex items-center gap-1">
                  <BedDouble className="w-5 h-5" />
                  <span>{house.rooms} Rooms</span>
                </div>
                <div className="flex items-center gap-1">
                  <Ruler className="w-5 h-5" />
                  <span>{house.size}</span>
                </div>
              </div>

              {/* Price + Button */}
              <div className="mt-auto flex items-center justify-between">
                <button className="bg-[#3d2a20] text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-[#2a1b13] transition">
                  Sign up
                </button>
                <p className="text-lg font-bold text-[#3d2a20]">
                  {house.price}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularResidences;
