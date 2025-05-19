import React from "react";

export default function ServicesSection({ services }) {
  return (
    <section
      id="services"
      className="py-20 px-6 bg-cover bg-center"
      style={{
        backgroundImage:
          "url(https://www.itfc.tn/wp-content/uploads/2019/03/slider2.jpg)",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="relative max-w-6xl mx-auto text-center text-white px-6">
        <h2 className="text-4xl font-bold mb-5">Nos Services</h2>
        <div className="w-24 h-1 bg-yellow-500 mx-auto mb-6"></div>
        <p className="max-w-2xl mx-auto mb-12">
          Découvrez nos expertises pour accompagner la transformation et la
          performance de votre organisation.
        </p>

        {/* Flex layout with shaped cards */}
        <div className="flex flex-wrap justify-center gap-8">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="group bg-white text-black rounded-3xl overflow-hidden shadow-lg transition transform hover:-translate-y-2 hover:shadow-2xl w-full sm:w-80"
            >
              {/* Title Block */}
              <div className="bg-yellow-600 group-hover:bg-blue-600 p-6  ">
                <h3 className="text-xl font-semibold text-white transition-colors duration-300 ">
                  {service.title}
                </h3>
              </div>

              {/* Description Block */}
              <div className="p-6 text-left">
                <p className="text-base leading-relaxed text-gray-700">
                  {service.description}
                </p>
                <a
                  href={service.link}
                  className="text-yellow-500 hover:underline font-medium"
                >
                  Read More →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
