import React, { useState } from "react";
import Navbar from "../Compenents/Navbar";

export default function BlogPage({ blog }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;

  // 🔎 Filter blogs
  const filteredBlogs = blog.filter((b) => {
    const matchSearch =
      b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchDate = selectedDate ? b.date.includes(selectedDate) : true;
    return matchSearch && matchDate;
  });

  // 📄 Pagination logic
  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedBlogs = filteredBlogs.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="py-10 px-6 bg-white min-h-screen">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6">Tous nos articles</h1>

          {/* 🔍 Search & Filter */}
          <div className="flex flex-col md:flex-row justify-center gap-6 mb-12">
            <input
              type="text"
              placeholder="Rechercher un article..."
              className="w-full md:w-1/2 px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-sm transition"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // reset page
              }}
            />
            <input
              type="text"
              placeholder="Filtrer par date (ex: 2023)"
              className="w-full md:w-1/3 px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-sm transition"
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                setCurrentPage(1); // reset page
              }}
            />
          </div>

          {/* 📰 Articles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {selectedBlogs.length > 0 ? (
              selectedBlogs.map((block) => (
                <div
                  key={block.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden transition transform hover:-translate-y-1 hover:shadow-2xl"
                >
                  <img
                    src={block.image}
                    alt={block.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6 text-left">
                    <div className="flex items-center text-gray-500 text-sm mb-3 space-x-4">
                      <span className="flex items-center">📅 {block.date}</span>
                      <span className="flex items-center">
                        👤 {block.author}
                      </span>
                    </div>
                    <h2 className="text-xl font-semibold mb-2 text-blue-900">
                      {block.title}
                    </h2>
                    <p className="text-gray-700 mb-4">{block.excerpt}</p>
                    <a
                      href={block.link}
                      className="text-yellow-500 hover:underline font-medium"
                    >
                      Lire l'article →
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center col-span-3">
                Aucun article trouvé.
              </p>
            )}
          </div>

          {/* 🔢 Pagination */}
          <div className="mt-12 flex justify-center space-x-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 rounded-full border ${
                  currentPage === index + 1
                    ? "bg-yellow-500 text-white font-bold"
                    : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
