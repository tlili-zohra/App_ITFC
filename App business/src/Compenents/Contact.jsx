import { Info, Mail, MapPin, Phone } from "lucide-react";
import React from "react";

const Contact = () => {
  const formulaire = "https://getform.io/f/bpjnwvyb";
  return (
    <section
      id="contact"
      className="py-20 px-6 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div>
          <h2 className="text-4xl font-bold mb-6">Contactez-nous</h2>
          <p className="mb-6 text-gray-600 dark:text-gray-300">
            Nous sommes à votre disposition pour toute question, demande de
            formation ou collaboration.
          </p>
          <ul className="space-y-4 text-gray-700 dark:text-gray-300">
            <li className="flex items-center">
              <MapPin className="mr-3 text-yellow-500" />
              Zaghouan, Tunisie
            </li>
            <li className="flex items-center">
              <Phone className="mr-3 text-yellow-500" />
              +216 23 474 836
            </li>
            <li className="flex items-center">
              <Phone className="mr-3 text-yellow-500" />
              +216 23 474 496
            </li>
            <li className="flex items-center">
              <Mail className="mr-3 text-yellow-500" />
              contact@itfc.tn
            </li>
          </ul>
        </div>

        {/* Contact Form */}
        <form
          action={formulaire}
          method="POST"
          className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg space-y-6"
        >
          <div>
            <label className="block text-sm font-medium mb-1">Nom</label>
            <input
              name="name"
              type="text"
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Votre nom"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              name="email"
              type="email"
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Votre email"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea
              name="message"
              rows="5"
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Votre message"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            name="submit"
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-2 rounded"
          >
            Envoyer
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
