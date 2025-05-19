import React, { useEffect, useState } from "react";

const images = [
  "https://images.unsplash.com/photo-1522199755839-a2bacb67c546",
  "https://images.unsplash.com/photo-1508830524289-0adcbe822b40",
  "https://images.unsplash.com/photo-1542744173-05336fcc7ad4",
];

export default function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true); // تبدأ الحركة
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
        setIsFading(false); // تُنهي الحركة بعد تغيير الصورة
      }, 500); // نصف ثانية لـ Fade Out قبل تغيير الصورة
    }, 5000); // كل 5 ثواني

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[95vh] overflow-hidden">
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
          isFading ? "opacity-0" : "opacity-100"
        }`}
        style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      <section
        id="home"
        className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 text-white"
      >
        <h2 className="text-5xl font-extrabold mb-4 drop-shadow-lg">
          Empowering Your Business Through Training & Consulting
        </h2>
        <p className="text-xl mb-8 max-w-2xl drop-shadow-lg">
          Join us to elevate your team's skills and drive organizational
          success.
        </p>
        <div className="flex gap-6">
          <button className="border border-white px-6 py-3 rounded hover:bg-white hover:text-black transition">
            Connexion
          </button>
          <button className="bg-yellow-500 text-black px-6 py-3 rounded hover:bg-yellow-600 hover:text-white transition">
            Start Now
          </button>
        </div>
      </section>
    </div>
  );
}
