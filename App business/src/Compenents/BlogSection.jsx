import React from "react";
import Footer from "./Footer";

export default function BlogSection({ blog }) {
  return (
    <section id="blog" className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-5">Our Blog Posts</h2>
        <div className="w-24 h-1 bg-yellow-500 mx-auto mb-6"></div>
        <p className="max-w-xl mx-auto text-gray-600 mb-12">
          Explorez nos articles pour rester informé des dernières tendances en
          formation, management et développement des ressources humaines.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {blog.map((block) => (
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
                  <span className="flex items-center">
                    <span className="mr-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        className="w-6 h-6"
                        viewBox="0 0 24 24"
                      >
                        <path d="M19 4h-1V2h-2v2H8V2H6v2H5C3.9 4 3 4.9 3 6v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z" />
                      </svg>
                    </span>
                    {block.date}
                  </span>
                  <span className="flex items-center">
                    <span className="mr-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        className="w-6 h-6"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
                      </svg>
                    </span>
                    {block.author}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-blue-900">
                  {block.title}
                </h3>
                <p className="text-gray-700 mb-4">{block.excerpt}</p>
                <a
                  href={block.link}
                  className="text-yellow-500 hover:underline font-medium"
                >
                  Read More →
                </a>
              </div>
            </div>
          ))}
        </div>
        {/* Lien vers tous les articles */}
        <div className="mt-12">
          <a
            href="/blog"
            className="inline-block px-6 py-3 text-white bg-yellow-500 hover:bg-yellow-600 rounded-lg font-semibold transition"
          >
            Voir tous les articles
          </a>
        </div>
      </div>
    </section>
  );
}
