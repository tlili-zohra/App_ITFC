import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    // Dummy registration logic
    alert("Inscription réussie !");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Inscription
        </h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-gray-600 mb-1">Nom</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-yellow-500"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-yellow-500"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Mot de passe</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-yellow-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black py-2 rounded-md font-semibold"
          >
            S'inscrire
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Vous avez déjà un compte ?{" "}
          <Link to="/login" className="text-yellow-600 hover:underline">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
}
