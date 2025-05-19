import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Payment({ videos }) {
  const { videoId } = useParams();
  const navigate = useNavigate();

  const video = videos.find((v) => v.id === videoId);

  const [form, setForm] = useState({
    name: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePayment = (e) => {
    e.preventDefault();

    // Validation simple
    if (
      form.name &&
      form.cardNumber.length === 16 &&
      form.expiry &&
      form.cvv.length === 3
    ) {
      // Simuler paiement
      /*const paidVideos = JSON.parse(localStorage.getItem("paidVideos") || "[]");
      if (!paidVideos.includes(videoId)) {
        paidVideos.push(videoId);
        localStorage.setItem("paidVideos", JSON.stringify(paidVideos));
      }*/
      // Simuler paiement
      const paidVideos = JSON.parse(localStorage.getItem("paidVideos") || "[]");
      localStorage.setItem(
        "paidVideos",
        JSON.stringify([...new Set([...paidVideos, videoId])])
      );
      const videoToResume = localStorage.getItem("videoToResume");
      alert("Paiement réussi !");
      navigate("/services/formation");
      //window.location.href = `/services/formation?resume=${videoToResume}`;
      //navigate(`/services/formation?resume=${videoToResume}`);
    } else {
      alert("Veuillez remplir le formulaire correctement.");
    }
  };

  if (!video) {
    return <p className="text-center text-red-500">Vidéo introuvable.</p>;
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Paiement requis</h2>
      <div className="bg-white rounded shadow p-4 mb-6">
        <h3 className="text-xl font-semibold">{video.title}</h3>
        <p className="text-gray-600 mb-2">
          Prix : {video.price || "Gratuit"} €
        </p>
        <img
          src={video.thumbnail}
          alt={video.title}
          className="rounded-md w-full h-48 object-cover mb-4"
        />
      </div>

      <form
        onSubmit={handlePayment}
        className="space-y-4 bg-white p-4 rounded shadow"
      >
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Nom sur la carte
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-yellow-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Numéro de carte
          </label>
          <input
            type="text"
            name="cardNumber"
            value={form.cardNumber}
            onChange={handleChange}
            required
            maxLength="16"
            placeholder="1234 5678 9012 3456"
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-yellow-500"
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-gray-700 font-medium mb-1">
              Date d'expiration
            </label>
            <input
              type="text"
              name="expiry"
              value={form.expiry}
              onChange={handleChange}
              required
              placeholder="MM/AA"
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-yellow-500"
            />
          </div>
          <div className="w-1/3">
            <label className="block text-gray-700 font-medium mb-1">CVV</label>
            <input
              type="text"
              name="cvv"
              value={form.cvv}
              onChange={handleChange}
              required
              maxLength="3"
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-yellow-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 rounded"
        >
          Payer {video.price || "0"} €
        </button>
      </form>
    </div>
  );
}
