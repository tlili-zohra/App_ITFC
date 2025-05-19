import React from "react";

export default function Footer({ titles }) {
  const tags = [
    "advance",
    "analysis",
    "benefice",
    "consulting",
    "link",
    "marketing",
    "project",
    "sells",
    "seo",
    "statistics",
    "trainer",
    "training",
  ];
  return (
    <footer className="bg-violet-950 text-white px-6 py-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About Us */}
        <div>
          <h3 className="text-lg font-semibold border-b-2 border-yellow-500 inline-block mb-4">
            About Us
          </h3>
          <p className="text-sm leading-6">
            ITFC est une entreprise de formation et de conseil qui accompagne
            les professionnels à développer leurs compétences et atteindre leurs
            objectifs stratégiques.
            <span className="block mt-3 pl-4 border-l-4 border-yellow-500 italic text-gray-300 transition-opacity animate-pulse ">
              "We support you to embrace the future by upskilling yourself and
              expanding your knowledge in different learning opportunities."
            </span>
          </p>
        </div>

        {/* Tags */}
        <div>
          <h3 className="text-lg font-semibold border-b-2 border-yellow-500 inline-block mb-4">
            Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-gray-300 text-violet-950 px-3 py-1 text-xs rounded-full hover:-translate-1 hover:shadow-2xl hover:bg-yellow-500"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-lg font-semibold border-b-2 border-yellow-500 inline-block mb-4">
            Categories
          </h3>
          <ul className="text-sm space-y-2">
            <li>Analysis</li>
            <li>Business</li>
            <li>Marketing</li>
          </ul>
        </div>

        {/* Recent Posts */}
        <div>
          <h3 className="text-lg font-semibold border-b-2 border-yellow-500 inline-block mb-4">
            Recent Posts
          </h3>
          <ul className="text-sm space-y-2">
            {titles &&
              titles.map((title, index) => (
                <li key={index} className="text-lg">
                  <a href="#blog" className="hover:text-yellow-500">
                    {title}
                  </a>
                </li>
              ))}
            {/* <li>Découvrez le nouveau pole de développement humain</li>
            <li>Mise en place des systèmes de management agile</li>
            <li>Comment booster votre attractivité RH en 2023</li>*/}
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-yellow-600 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
        <p>&copy; {new Date().getFullYear()} ITFC. All rights reserved.</p>
        <div className="mt-4 md:mt-0">
          <ul className="flex space-x-6">
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Privacy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Terms
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Cookies
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
