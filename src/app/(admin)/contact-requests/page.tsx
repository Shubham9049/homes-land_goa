"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Trash2 } from "lucide-react";

interface Contact {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

export default function ContactAdmin() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [expandedMessages, setExpandedMessages] = useState<string[]>([]); // track expanded messages

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/contacts`
      );
      setContacts(res.data.data);
    } catch (error) {
      console.error("Failed to fetch contacts", error);
    }
  };

  const handleDelete = async (_id: string) => {
    if (!confirm("Are you sure you want to delete this contact?")) return;
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/contacts/${_id}`
      );
      setContacts(contacts.filter((p) => p._id !== _id));
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  const toggleMessage = (_id: string) => {
    if (expandedMessages.includes(_id)) {
      setExpandedMessages(expandedMessages.filter((id) => id !== _id));
    } else {
      setExpandedMessages([...expandedMessages, _id]);
    }
  };

  const truncateText = (text: string, maxLength = 80) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Contact Requests</h1>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-700 rounded-lg">
          <thead className="bg-gray-900 text-white ">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Subject</th>
              <th className="p-3">Message</th>
              <th className="p-3">Created At</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.length > 0 ? (
              contacts.map((contact) => {
                const isExpanded = expandedMessages.includes(contact._id);
                return (
                  <tr key={contact._id} className="border-t border-gray-300">
                    <td className="p-3 text-center">{contact.name}</td>
                    <td className="p-3 text-center">{contact.email}</td>
                    <td className="p-3 text-center">{contact.subject}</td>
                    <td className="p-3 text-center">
                      <div className="text-left">
                        {isExpanded
                          ? contact.message
                          : truncateText(contact.message, 80)}
                        {contact.message.length > 80 && (
                          <button
                            onClick={() => toggleMessage(contact._id)}
                            className="text-blue-500 ml-1 underline"
                          >
                            {isExpanded ? "View Less" : "View More"}
                          </button>
                        )}
                      </div>
                    </td>
                    <td className="p-3 text-center">
                      {new Date(contact.createdAt).toLocaleString()}
                    </td>
                    <td className="p-3 flex gap-3 justify-center">
                      <button
                        onClick={() => handleDelete(contact._id)}
                        className="p-2 bg-red-500 hover:bg-red-600 rounded-lg text-white"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="text-center p-4 text-gray-500 italic"
                >
                  No contact request found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
