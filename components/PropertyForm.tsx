"use client";

import { useState, useEffect } from "react";
import axios from "axios";

interface PropertyFormProps {
  property?: PropertyData; // For edit, undefined for new add
  onClose: () => void;
  onSuccess: () => void;
}

interface PropertyData {
  title: string;
  slug: string;
  description: string;
  type: string;
  purpose: string;
  location: string;
  price: number | string;
  bedrooms: number | string;
  bathrooms: number | string;
  areaSqft: number | string;
  highlights: string[];
  featuresAmenities: string[];
  nearby: string[];
  extraHighlights: string[];
  googleMapUrl: string;
  videoLink: string;
  images: File[] | string[];
}

export default function PropertyForm({
  property,
  onClose,
  onSuccess,
}: PropertyFormProps) {
  const [formData, setFormData] = useState<PropertyData>({
    title: "",
    slug: "",
    description: "",
    type: "",
    purpose: "",
    location: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    areaSqft: "",
    highlights: [],
    featuresAmenities: [],
    nearby: [],
    extraHighlights: [],
    googleMapUrl: "",
    videoLink: "",
    images: [],
  });

  useEffect(() => {
    if (property) {
      setFormData({
        ...property,
        price: property.price || "",
        bedrooms: property.bedrooms || "",
        bathrooms: property.bathrooms || "",
        areaSqft: property.areaSqft || "",
        images: [], // New images to be uploaded
      });
    }
  }, [property]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof Omit<PropertyData, "images">,
    index: number
  ) => {
    const newArray = [...(formData[field] as string[])];
    newArray[index] = e.target.value;
    setFormData((prev) => ({ ...prev, [field]: newArray }));
  };

  const addArrayField = (field: keyof Omit<PropertyData, "images">) => {
    const newArray = [...(formData[field] as string[]), ""];
    setFormData((prev) => ({ ...prev, [field]: newArray }));
  };

  const removeArrayField = (
    field: keyof Omit<PropertyData, "images">,
    index: number
  ) => {
    const newArray = [...(formData[field] as string[])];
    newArray.splice(index, 1);
    setFormData((prev) => ({ ...prev, [field]: newArray }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setFormData((prev) => ({ ...prev, images: Array.from(files) }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = new FormData();

      for (const key in formData) {
        const value = formData[key as keyof PropertyData];

        if (Array.isArray(value)) {
          if (key === "images") {
            (value as File[]).forEach((file) => data.append("images", file));
          } else {
            (value as string[]).forEach((item) => data.append(key, item));
          }
        } else {
          data.append(key, value as string);
        }
      }

      if (property) {
        await axios.put(
          `http://localhost:8000/property/${property.slug}`,
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        await axios.post("http://localhost:8000/property", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error("Failed to submit property", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full rounded p-2 border border-gray-300"
          required
        />
      </div>

      <div>
        <label className="block">Slug</label>
        <input
          type="text"
          name="slug"
          value={formData.slug}
          onChange={handleChange}
          className="w-full rounded p-2 border border-gray-300"
          required
        />
      </div>

      <div>
        <label className="block">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full rounded p-2 border border-gray-300"
          rows={4}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="type"
          value={formData.type}
          onChange={handleChange}
          placeholder="Type"
          className="rounded p-2 border border-gray-300"
        />
        <input
          type="text"
          name="purpose"
          value={formData.purpose}
          onChange={handleChange}
          placeholder="Purpose"
          className="rounded p-2 border border-gray-300"
        />
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          className="rounded p-2 border border-gray-300"
        />
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          className="rounded p-2 border border-gray-300"
        />
        <input
          type="number"
          name="bedrooms"
          value={formData.bedrooms}
          onChange={handleChange}
          placeholder="Bedrooms"
          className="rounded p-2 border border-gray-300"
        />
        <input
          type="number"
          name="bathrooms"
          value={formData.bathrooms}
          onChange={handleChange}
          placeholder="Bathrooms"
          className="rounded p-2 border border-gray-300"
        />
        <input
          type="number"
          name="areaSqft"
          value={formData.areaSqft}
          onChange={handleChange}
          placeholder="Area (sqft)"
          className="rounded p-2 border border-gray-300"
        />
      </div>

      <div>
        <label className="block">Images</label>
        <input type="file" multiple onChange={handleFileChange} />
      </div>

      {["highlights", "featuresAmenities", "nearby", "extraHighlights"].map(
        (field) => (
          <div key={field}>
            <label className="block font-medium mt-4">{field}</label>

            {(
              formData[field as keyof Omit<PropertyData, "images">] as string[]
            ).map((item, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) =>
                    handleArrayChange(
                      e,
                      field as keyof Omit<PropertyData, "images">,
                      index
                    )
                  }
                  className="rounded p-2 flex-1 border border-gray-300"
                />
                <button
                  type="button"
                  onClick={() =>
                    removeArrayField(
                      field as keyof Omit<PropertyData, "images">,
                      index
                    )
                  }
                  className="bg-red-500 text-white px-3 rounded"
                >
                  Remove
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={() =>
                addArrayField(field as keyof Omit<PropertyData, "images">)
              }
              className="bg-blue-500 text-white px-3 rounded mt-2"
            >
              + Add {field}
            </button>
          </div>
        )
      )}

      <div className="flex justify-end gap-4 mt-6">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-500 text-white rounded"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          {property ? "Update" : "Add"} Property
        </button>
      </div>
    </form>
  );
}
