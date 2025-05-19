import { useNavigate } from "react-router-dom";

export function Login() {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    localStorage.setItem("isLoggedIn", "true");

    const videoId = localStorage.getItem("videoToResume");
    const paidVideos = JSON.parse(localStorage.getItem("paidVideos") || "[]");

    console.log("videoToResume =", videoId);
    console.log("paidVideos =", paidVideos);

    if (videoId) {
      if (!paidVideos.includes(videoId)) {
        navigate(`/payment/${videoId}`);
      } else {
        navigate("/services/formation");
        // window.location.href = `/videos/${videoId}`;
      }
      //localStorage.removeItem("videoToResume");
    } else {
      navigate("/services/formation");
    }
  };

  return (
    <div>
      {/* Ton formulaire de connexion ici */}
      <button onClick={handleLoginSuccess}>Se connecter</button>
    </div>
  );
}
