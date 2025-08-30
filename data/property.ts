import img1 from "../assets/image (10) 2.png";
import img2 from "../assets/image (21) 2.png";
import img3 from "../assets/image 2.png";
import { StaticImageData } from "next/image";
export interface Property {
  id: number;
  title: string;
  price: number;
  location: string;
  type: string;
  bedrooms: number;
  area: number; // in sqft
  image: string | StaticImageData;
}

export const properties: Property[] = [
  {
    id: 1,
    title: "Luxury 3BHK Apartment",
    price: 12000000,
    location: "Panaji, Goa",
    type: "Apartment",
    bedrooms: 3,
    area: 1800,
    image: img1,
  },
  {
    id: 2,
    title: "Beachside Villa",
    price: 35000000,
    location: "Calangute, Goa",
    type: "Villa",
    bedrooms: 5,
    area: 4200,
    image: img2,
  },
  {
    id: 3,
    title: "Modern 2BHK Penthouse",
    price: 18000000,
    location: "Mapusa, Goa",
    type: "Penthouse",
    bedrooms: 2,
    area: 2200,
    image: img3,
  },
];
