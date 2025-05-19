import React, { useEffect, useRef } from "react";
import "../index.css";
const NewSection = () => {
  const stripRef = useRef(null);
  useEffect(() => {
    const strip = stripRef.current;
    if (strip) {
      // Apply animation programmatically (optional, if you want to trigger it dynamically)
      strip.classList.add("marquee");
    }

    // Cleanup function to remove animation class when the component is unmounted
    return () => {
      if (strip) {
        strip.classList.remove("marquee");
      }
    };
  }, []);
  return (
    <div className="bg-violet-900 text-white py-2 overflow-hidden relative">
      <div ref={stripRef} className="text-sm md:text-base font-medium">
        <span className="mx-8">
          <a href="#">
            🎓 Nouvelle formation IA en ligne — Réservez votre place maintenant
            !
          </a>
        </span>
        <a href="#">
          <span className="mx-8">
            📅 Événement digital gratuit le 15 mai — Inscrivez-vous !
          </span>
        </a>
        <a href="#">
          <span className="mx-8">🎥 Découvrez nos vidéos de formations.</span>
        </a>
      </div>
    </div>
  );
};

export default NewSection;
