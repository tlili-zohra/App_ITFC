import React, { useState, useRef, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function Formation({ name, videos }) {
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const [openVideoId, setOpenVideoId] = useState(null);
  const videoRefs = useRef({});
  const [searchTerm, setSearchTerm] = useState("");
  const [showLogin, setShowLogin] = useState(false);

  // Track elapsed time per video ID
  const [elapsedTimes, setElapsedTimes] = useState({});
  // e.g. { vid1: 45, vid2: 300 }

  // Timer interval ref
  const timerRef = useRef(null);
  //login usenavigate
  const navigate = useNavigate();

  // Start timer when modal opens on a video
  useEffect(() => {
    if (openVideoId) {
      timerRef.current = setInterval(() => {
        setElapsedTimes((prev) => {
          const newTime = (prev[openVideoId] || 0) + 1;
          const updated = { ...prev, [openVideoId]: newTime };

          // Total accumulated time watching all videos:
          const totalTime = Object.values(updated).reduce((a, b) => a + b, 0);
          if (totalTime >= 120) {
            // 20 minutes
            setShowLogin(true);
            setOpenVideoId(null);
            clearInterval(timerRef.current);
          }
          return updated;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [openVideoId]);

  // Handle 1-minute limit on non-YouTube videos
  const handleTimeUpdate = (videoId) => {
    const paidVideos = JSON.parse(localStorage.getItem("paidVideos") || "[]");
    paidVideos.push(videoId); // ajoute la vidéo payée
    localStorage.setItem(
      "paidVideos",
      JSON.stringify([...new Set(paidVideos)])
    ); // évite doublons
    console.log("handleTimeUpdate for videoId:", videoId);
    console.log("paidVideos:", paidVideos);

    if (paidVideos.map(String).includes(String(videoId))) {
      console.log("Video paid, no blocking");
      return;
    }
    const videoEl = videoRefs.current[videoId];
    if (videoEl && videoEl.currentTime >= 60) {
      videoEl.pause();
      setOpenVideoId(null);
      alert("Lecture bloquée après 1 minute !");
    }
  };

  const closeVideo = () => {
    setOpenVideoId(null);
  };

  const handleVideoClick = (videoId) => {
    console.log("===> videoId clicked:", videoId);

    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const paidVideos = JSON.parse(localStorage.getItem("paidVideos") || "[]");

    // Calculate total watch time
    const totalTime = Object.values(elapsedTimes).reduce((a, b) => a + b, 0);
    localStorage.setItem("videoToResume", videoId);
    if (totalTime >= 1200) {
      // 20 minutes = 1200 seconds
      setShowLogin(true);
      //return;
      //}

      if (!isLoggedIn) {
        console.log("===> User not logged in, saving videoToResume:", videoId);
        // localStorage.setItem("videoToResume", videoId);
        // console.log("videoToResume", videoId);
        navigate("/login");
        return;
      }

      if (!paidVideos.includes(videoId)) {
        console.log(
          "===> Video not paid, saving and going to payment:",
          videoId
        );
        //localStorage.setItem("videoToResume", videoId); // ← ✅ AJOUTE ICI aussi
        navigate(`/payment/${videoId}`);
        return;
      }
    }
    //setOpenVideoId(videoId);
    setOpenVideoId(videoId);
    console.log("===> Opening paid video:", videoId);
    console.log(isLoggedIn);
    console.log(paidVideos);
  };

  // Filtering videos by search term (case insensitive)
  const filteredVideos = videos.filter((video) =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredVideos.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedVideos = filteredVideos.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Header and search input */}
      <h1 className="text-3xl font-bold text-center mb-6">
        Nos Services en {name}
      </h1>
      <div className="mb-8 flex justify-center">
        <input
          type="text"
          placeholder="Rechercher une vidéo..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="border border-gray-300 rounded-md px-4 py-2 w-full max-w-md focus:outline-yellow-500"
        />
      </div>

      {/* Videos list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {selectedVideos.length === 0 ? (
          <p className="text-center col-span-full text-gray-500">
            Aucune vidéo trouvée.
          </p>
        ) : (
          selectedVideos.map((video) => (
            <div
              key={video.id}
              className="bg-white p-4 rounded-lg shadow-lg cursor-pointer"
              onClick={() => handleVideoClick(video.id)}
            >
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                {video.title}
              </h3>
              <img
                src={video.thumbnail}
                alt={video.title}
                className="rounded-md w-full object-cover"
              />
              <p className="mt-2 text-gray-600">
                Temps écoulé: {elapsedTimes[video.id] || 0} secondes
              </p>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="mt-12 flex justify-center space-x-2">
        {[...Array(totalPages)].map((_, idx) => (
          <button
            key={idx}
            onClick={() => handlePageChange(idx + 1)}
            className={`px-4 py-2 rounded-full border ${
              currentPage === idx + 1
                ? "bg-yellow-500 text-white font-bold"
                : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {idx + 1}
          </button>
        ))}
      </div>

      {/* Video modal */}
      {openVideoId && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={() => closeVideo()}
        >
          <div
            className="bg-white rounded-lg p-4 max-w-3xl w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            {(() => {
              const video = videos.find((v) => v.id === openVideoId);
              if (!video) return null;

              if (video.type === "youtube") {
                return (
                  <div className="relative w-full h-0 pb-[56.25%]">
                    <iframe
                      className="absolute top-0 left-0 w-full h-full rounded-md"
                      src={video.src}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                );
              } else if (video.type === "mp4") {
                return (
                  <video
                    ref={(el) => (videoRefs.current[video.id] = el)}
                    controls
                    autoPlay
                    onTimeUpdate={() => handleTimeUpdate(video.id)}
                    className="w-full rounded-md"
                  >
                    <source src={video.src} type="video/mp4" />
                    Votre navigateur ne supporte pas la vidéo.
                  </video>
                );
              }

              return null;
            })()}
            <button
              onClick={() => closeVideo()}
              className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded mt-4"
            >
              Fermer
            </button>
          </div>
        </div>
      )}

      {/* Login dialog modal after total 20min watching */}
      {showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md text-center flex flex-col gap-2">
            <div className="flex justify-center gap-52">
              <h2 className="text-xl font-bold text-center ">
                Connexion requise
              </h2>
              <button
                onClick={() => setShowLogin(false)}
                className=" underline text-gray-600"
              >
                x
              </button>
            </div>
            <p>Veuillez vous connecter pour continuer à regarder les vidéos.</p>

            {/* TODO: Add login form/button */}
            <button
              onClick={() => navigate("/login")}
              className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2 rounded font-semibold"
            >
              Connexion
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
