"use client";
import Footer from "../../components/Footer";
import Hero from "../../components/Hero";
import Navbar from "../../components/Navbar";
import Stats from "../../components/Stats";
import { MapPin, User, ClipboardList, Handshake } from "lucide-react";
const features = [
  {
    icon: <MapPin size={32} />,
    title: "Expert Guidance",
    description:
      "Benefit from our team's seasoned expertise for a smooth buying experience",
  },
  {
    icon: <User size={32} />,
    title: "Personalized Service",
    description:
      "Our services adapt to your unique needs, making your journey stress-free",
  },
  {
    icon: <ClipboardList size={32} />,
    title: "Transparent Process",
    description:
      "Stay informed with our clear and honest approach to buying your home",
  },
  {
    icon: <Handshake size={32} />,
    title: "Exceptional Support",
    description:
      "Providing peace of mind with our responsive and attentive customer service",
  },
];

function Landing() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Stats />
      <section className="py-12 w-11/12 md:w-5/6 mx-auto text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-[var(--title)]">
          Why Choose Us
        </h2>
        <p className="text-lg md:text-xl text-[var(--primary-color)] mb-12">
          Elevating Your Home Buying Experience with Expertise, Integrity,{" "}
          <br />
          and Unmatched Personalized Service
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-[#dec3b3] text-left p-6 rounded-2xl shadow-sm hover:shadow-md transition-all"
            >
              <div className="bg-[var(--bg-color)] p-3 rounded-md w-fit mb-4 text-[var(--title)]">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2 text-[var(--title)]">
                {feature.title}
              </h3>
              <p className="text-sm text-[var(--primary-color)]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Landing;
