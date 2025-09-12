"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  author: string;
  datePublished: string;
}

export default function TopBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/blog/viewblog`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Fetched blogs:", data);
        if (Array.isArray(data)) {
          setBlogs(data.slice(0, 3)); // Take top 3 blogs
        } else {
          console.error("API response is not an array", data);
          setError("Invalid data format from API");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching top blogs:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading blogs...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">Error: {error}</div>;
  }

  if (blogs.length === 0) {
    return <div className="text-center py-10">No blogs available</div>;
  }

  return (
    <section className="w-11/12 md:w-5/6 mx-auto py-12 tracking-widest">
      {/* Centered Heading */}
      <h2 className="text-3xl md:text-4xl font-bold text-center text-[var(--title)] mb-4 tracking-widest">
        Latest Blogs
      </h2>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white  shadow hover:shadow-lg transition p-5 flex flex-col"
          >
            {blog.coverImage && (
              <Image
                src={blog.coverImage}
                alt={blog.title}
                width={1200}
                height={600}
                className="object-cover "
              />
            )}

            <h3 className="text-xl font-semibold mb-2 mt-4">{blog.title}</h3>
            <p className="text-sm text-gray-600 mb-3 line-clamp-3">
              {blog.excerpt}
            </p>
            <p className="text-xs text-gray-400 mb-4">
              By {blog.author} • {new Date(blog.datePublished).toUTCString()}
            </p>

            <Link
              href={`/blogs/${blog.slug}`}
              className="mt-auto text-[var(--primary-color)] hover:underline font-medium"
            >
              Read More →
            </Link>
          </div>
        ))}
      </div>

      {/* View More Button */}
      <div className="text-center mt-10">
        <Link href="/blogs">
          <button
            className="relative px-6 py-3  bg-[#E50E0B] text-white font-semibold 
                overflow-hidden group cursor-pointer transition-all duration-300"
          >
            <span className="relative z-10 tracking-widest">
              View More Blogs
            </span>
            <span
              className="absolute inset-0 w-full h-full bg-gradient-to-r from-black/20 to-transparent 
                  translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"
            ></span>
          </button>
        </Link>
      </div>
    </section>
  );
}
