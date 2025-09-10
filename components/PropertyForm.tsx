"use client";

import { useState, useEffect } from "react";
import axios from "axios";

interface PropertyFormProps {
  property?: any; // For edit, undefined for add
  onClose: () => void;
  onSuccess: () => void;
}

export default function PropertyForm({
  property,
  onClose,
  onSuccess,
}: PropertyFormProps) {
  const [formData, setFormData] = useState({
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
    highlights: [] as string[],
    featuresAmenities: [] as string[],
    nearby: [] as string[],
    extraHighlights: [] as string[],
    googleMapUrl: "",
    videoLink: "",
    images: [] as File[],
  });

  useEffect(() => {
    if (property) {
      // Populate form for edit
      setFormData({
        ...property,
        price: property.price || "",
        bedrooms: property.bedrooms || "",
        bathrooms: property.bathrooms || "",
        areaSqft: property.areaSqft || "",
        images: [], // Images will be uploaded separately
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
    field: string,
    index: number
  ) => {
    const newArray = [...(formData as any)[field]];
    newArray[index] = e.target.value;
    setFormData((prev) => ({ ...prev, [field]: newArray }));
  };

  const addArrayField = (field: string) => {
    const newArray = [...(formData as any)[field], ""];
    setFormData((prev) => ({ ...prev, [field]: newArray }));
  };

  const removeArrayField = (field: string, index: number) => {
    const newArray = [...(formData as any)[field]];
    newArray.splice(index, 1);
    setFormData((prev) => ({ ...prev, [field]: newArray }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files: FileList | null = e.target.files;
    if (files) {
      setFormData((prev) => ({ ...prev, images: Array.from(files) }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = new FormData();
      for (const key in formData) {
        if (Array.isArray((formData as any)[key])) {
          ((formData as any)[key] as string[]).forEach((item) =>
            data.append(key, item)
          );
        } else if (key === "images") {
          (formData.images as File[]).forEach((file) =>
            data.append("images", file)
          );
        } else {
          data.append(key, (formData as any)[key]);
        }
      }

      if (property) {
        await axios.put(
          `http://localhost:8000/property/${property.slug}`,
          data,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
      } else {
        await axios.post("http://localhost:8000/property", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      onSuccess(); // refresh list
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
          className="rounded p-2 border border-gray-300 "
        />
      </div>

      <div>
        <label className="block">Images</label>
        <input type="file" multiple onChange={handleFileChange} />
      </div>

      {/* Arrays like highlights */}
      {["highlights", "featuresAmenities", "nearby", "extraHighlights"].map(
        (field) => (
          <div key={field}>
            <label className="block">{field}</label>
            {(formData as any)[field].map((item: string, index: number) => (
              <div key={index} className="flex gap-2 mb-1">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleArrayChange(e, field, index)}
                  className="rounded p-1 flex-1 border border-gray-300"
                />
                <button
                  type="button"
                  onClick={() => removeArrayField(field, index)}
                  className="bg-red-500 text-white px-2 rounded"
                >
                  X
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayField(field)}
              className="bg-blue-500 text-white px-2 rounded mt-1 border border-gray-300"
            >
              + Add
            </button>
          </div>
        )
      )}

      <div className="flex justify-end gap-2 mt-4">
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
