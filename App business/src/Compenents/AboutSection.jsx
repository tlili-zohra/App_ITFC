/*export default function AboutSection() {
  return (
    <section className="py-20 px-6 bg-white text-blue-900">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-yellow-500 mb-6">
          À propos de ITFC
        </h2>
        <p className="text-lg mb-12 max-w-3xl mx-auto">
          ITFC est une entreprise de formation et de conseil qui accompagne les
          professionnels à développer leurs compétences et atteindre leurs
          objectifs stratégiques.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="border-l-4 border-yellow-500 p-6 text-left shadow hover:shadow-lg transition duration-300 rounded-md bg-gray-50">
            <h3 className="text-xl font-semibold mb-3">Définition</h3>
            <p>
              ITFC est spécialisée dans l'accompagnement des entreprises à
              travers des programmes de formation adaptés et des conseils
              stratégiques personnalisés.
            </p>
          </div>

          <div className="border-l-4 border-yellow-500 p-6 text-left shadow hover:shadow-lg transition duration-300 rounded-md bg-gray-50">
            <h3 className="text-xl font-semibold mb-3">Notre mission</h3>
            <p>
              Offrir des formations innovantes et un accompagnement de qualité
              pour améliorer la performance des entreprises et l’épanouissement
              des équipes.
            </p>
          </div>

          <div className="border-l-4 border-yellow-500 p-6 text-left shadow hover:shadow-lg transition duration-300 rounded-md bg-gray-50">
            <h3 className="text-xl font-semibold mb-3">Notre vision</h3>
            <p>
              Devenir un leader reconnu dans le domaine de la formation et du
              conseil en aidant les organisations à évoluer dans un monde en
              constante mutation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
*/
// src/components/AboutSection.jsx
import React from "react";
import logo from "../assets/ITFC_LOGO.ico";
import { BookOpen, Download } from "lucide-react";
import catalogue from "../assets/Catalogue ITFC 2025 V00 .pdf";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 px-6 bg-white text-gray-800 mt-5">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-5">À propos ITFC</h2>
        <div className="w-24 h-1 bg-yellow-500 mx-auto mb-6"></div>
        <div className="flex items-center max-w-max mb-5">
          <img
            src={logo}
            alt="ITFC Logo"
            className="h-40 w-80 hover:translate-x-5 duration-500"
          />
          <p className="text-lg">
            ITFC est une entreprise de formation et de conseil qui accompagne
            les professionnels à développer leurs compétences et atteindre leurs
            objectifs stratégiques.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {["Définition", "Notre mission", "Notre vision"].map(
            (title, index) => (
              <div
                key={index}
                className="relative h-64 p-6 flex flex-col justify-center items-center text-center shadow hover:shadow-lg transition duration-300 rounded-md bg-gray-50 group overflow-hidden border-b-4 border-yellow-500 hover:border-blue-600"
              >
                <h3 className="text-xl text-blue-800 font-semibold mb-6 transition-all duration-500 transform group-hover:-translate-y-12">
                  {title}
                </h3>
                <p className="absolute px-6 opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-2 transition-all duration-500 ease-in-out">
                  {index === 0 &&
                    "ITFC est spécialisée dans l'accompagnement des entreprises à travers des programmes de formation adaptés et des conseils stratégiques personnalisés."}
                  {index === 1 &&
                    "Offrir des formations innovantes et un accompagnement de qualité pour améliorer la performance des entreprises et l’épanouissement des équipes."}
                  {index === 2 &&
                    "Devenir un leader reconnu dans le domaine de la formation et du conseil en aidant les organisations à évoluer dans un monde en constante mutation."}
                </p>
              </div>
            )
          )}
        </div>
        <div className="mt-10 flex justify-center gap-5">
          <a
            href={catalogue}
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center px-6 py-3 text-white font-bold rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 shadow-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-300"
            download
          >
            <Download className="w-5 h-5 mr-2" />
            Télécharger le catalogue
            <span className="absolute -top-3 -right-3 bg-red-500 text-xs px-2 py-0.5 rounded-full rotate-12 shadow">
              PDF
            </span>
          </a>

          <a
            href={catalogue}
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center px-6 py-3 text-white font-bold rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 shadow-lg hover:from-purple-600 hover:to-indigo-700 transition-all duration-300"
          >
            <BookOpen className="w-5 h-5 mr-2" />
            Lire le catalogue
            <span className="absolute -top-3 -right-3 bg-yellow-400 text-xs px-2 py-0.5 rounded-full rotate-12 shadow">
              Lire PDF
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
