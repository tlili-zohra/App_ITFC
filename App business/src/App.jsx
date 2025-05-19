import { Route, Router, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutSection from "./Compenents/AboutSection";
import ServicesSection from "./Compenents/ServicesSection";
import BlogSection from "./Compenents/BlogSection";
import BlogPage from "./pages/BlogPage";
import Navbar from "./Compenents/Navbar";
import { useEffect } from "react";
import Footer from "./Compenents/Footer";
import ServicesLayout from "./pages/Services/ServicesLayout";
import Formation from "./pages/Services/Formation";
import Management from "./pages/Services/Management";
import RH from "./pages/Services/RH";
import Audit from "./pages/Services/Audit";
import { Login } from "./pages/Login";
import Register from "./pages/Register";
import Payment from "./pages/Payment";
import PrivateRoute from "./private/PrivateRoute";

const App = () => {
  const blog = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1509395176047-4a66953fd231",
      title: "Découvrez le nouveau pôle de développement humain",
      date: "19-3-2023",
      author: "ITFC",
      excerpt:
        "Nous vous présentons notre tout nouveau pôle dédié au développement humain, visant à renforcer les compétences et le bien-être des collaborateurs par des formations innovantes.",
      link: "#",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      title: "Mise en place des systèmes de management agile",
      date: "07-04-2023",
      author: "ITFC",
      excerpt:
        "Adoptez des systèmes de management agiles pour optimiser la collaboration, la productivité et l'efficacité de vos équipes dans un environnement en évolution constante.",
      link: "#",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61",
      title: "Comment booster votre attractivité RH en 2023",
      date: "22-05-2023",
      author: "ITFC",
      excerpt:
        "Découvrez nos meilleures pratiques pour attirer et fidéliser les talents grâce à une marque employeur forte et des parcours de carrière personnalisés.",
      link: "#",
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1497493292307-31c376b6e479",
      title: "Formation digitale : cap sur l’innovation pédagogique",
      date: "2023-07-11",
      author: "ITFC",
      excerpt:
        "La digitalisation des parcours de formation est un levier stratégique...",
      link: "#",
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      title: "Optimisation de la gestion des talents",
      date: "2023-08-25",
      author: "ITFC",
      excerpt:
        "L’identification et le développement des talents internes sont clés...",
      link: "#",
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1531497865144-0464ef8fb9c4",
      title: "Les soft skills : moteur de performance collective",
      date: "2023-09-30",
      author: "ITFC",
      excerpt:
        "Les compétences comportementales deviennent essentielles dans un monde en mutation.",
      link: "#",
    },
    {
      id: 7,
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
      title: "L’importance du feedback en entreprise",
      date: "2023-10-10",
      author: "ITFC",
      excerpt:
        "Le feedback régulier améliore l’engagement et la performance collective.",
      link: "#",
    },
    {
      id: 8,
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
      title: "Leadership transformationnel : guide pratique",
      date: "2023-11-05",
      author: "ITFC",
      excerpt:
        "Adoptez un leadership transformationnel pour inspirer vos équipes vers l’excellence.",
      link: "#",
    },
    {
      id: 9,
      image: "https://images.unsplash.com/photo-1525182008055-f88b95ff7980",
      title: "Culture d’entreprise et performance durable",
      date: "2023-11-28",
      author: "ITFC",
      excerpt:
        "Une culture d’entreprise forte favorise l’innovation et la fidélité des talents.",
      link: "#",
    },
    {
      id: 10,
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
      title: "Développement des compétences en temps de crise",
      date: "2024-01-14",
      author: "ITFC",
      excerpt:
        "Même en période difficile, investir dans la formation est un avantage stratégique.",
      link: "#",
    },
    {
      id: 11,
      image: "https://images.unsplash.com/photo-1507209696998-3c532be9b2b1",
      title: "Manager à distance : bonnes pratiques",
      date: "2023-02-20",
      author: "ITFC",
      excerpt:
        "Télétravail ou équipes hybrides ? Adoptez les réflexes managériaux adaptés.",
      link: "#",
    },
    {
      id: 12,
      image: "https://images.unsplash.com/photo-1543269865-cbf427effbad",
      title: "L’intelligence émotionnelle en entreprise",
      date: "2024-04-05",
      author: "ITFC",
      excerpt:
        "Favoriser l’intelligence émotionnelle améliore la communication et le climat au travail.",
      link: "#",
    },
  ];
  const services = [
    {
      title: "Ingénierie de la formation",
      description:
        "Conception et déploiement de programmes de formation sur mesure adaptés aux besoins de votre organisation, intégrant les dernières méthodes pédagogiques et outils numériques pour maximiser l'engagement des apprenants.",
      link: "/services/formation",
    },
    {
      title: "Mise en place des systèmes de management et accompagnement",
      description:
        "Élaboration et implémentation de systèmes de management de la qualité et de la performance, accompagnement des équipes dans le changement, optimisation des processus et suivi des indicateurs clés pour assurer l'efficience organisationnelle.",
      link: "/services/management",
    },
    {
      title: "Développement RH",
      description:
        "Stratégies complètes de développement des ressources humaines : recrutement, gestion des compétences, formation continue et gestion des carrières pour renforcer le capital humain et l'engagement des collaborateurs.",
      link: "/services/rh",
    },
    {
      title: "Audit",
      description:
        "Audit interne et externe de vos processus, organisation et conformité réglementaire, suivi de plans d'action personnalisés pour garantir la fiabilité, la sécurité et l'excellence opérationnelle de votre entreprise.",
      link: "/services/audit",
    },
  ];
  const videosFormation = [
    {
      id: "vid1",
      title: "Introduction à React",
      type: "youtube",
      src: "https://www.youtube.com/embed/nbn",
      date: "2023-04-10",
      excerpt: "Une introduction complète à React.js pour débutants.",
      thumbnail: "https://img.youtube.com/vi/nbn/hqdefault.jpg",
      price: "10",
    },
    {
      id: "vid2",
      title: "Formation JavaScript Avancée",
      type: "mp4",
      src: "https://example.com/videos/js-avance.mp4",
      date: "2023-05-05",
      excerpt: "Approfondissement des concepts JS modernes.",
      thumbnail: "https://example.com/thumbnails/js-avance.jpg",
      price: "20",
    },
    {
      id: "vid3",
      title: "CSS Grid Tutorial",
      type: "youtube",
      src: "https://www.youtube.com/embed/jV8B24rSN5o",
      date: "2022-11-20",
      excerpt: "Comprendre et maîtriser CSS Grid Layout.",
      thumbnail: "https://img.youtube.com/vi/jV8B24rSN5o/hqdefault.jpg",
      price: "30",
    },
    {
      id: "vid4",
      title: "Node.js pour Débutants",
      type: "mp4",
      src: "https://example.com/videos/nodejs-debutants.mp4",
      date: "2023-01-15",
      excerpt: "Premiers pas avec Node.js et serveur backend.",
      thumbnail: "https://example.com/thumbnails/nodejs-debutants.jpg",
      price: "40",
    },
    {
      id: "vid5",
      title: "Introduction à l’Intelligence Artificielle",
      type: "youtube",
      src: "https://www.youtube.com/embed/aircAruvnKk",
      date: "2023-03-22",
      excerpt: "Concepts clés de l'IA expliqués simplement.",
      thumbnail: "https://img.youtube.com/vi/aircAruvnKk/hqdefault.jpg",
      price: "50",
    },
    {
      id: "vid6",
      title: "React Hooks Avancés",
      type: "youtube",
      src: "https://www.youtube.com/embed/f687hBjwFcM",
      date: "2023-06-05",
      excerpt: "Exploiter React Hooks pour des applications avancées.",
      thumbnail: "https://img.youtube.com/vi/f687hBjwFcM/hqdefault.jpg",
      price: "50",
    },
    {
      id: "vid7",
      title: "Docker Essentials",
      type: "mp4",
      src: "https://example.com/videos/docker-essentials.mp4",
      date: "2023-04-01",
      excerpt: "Bases de Docker pour containerisation.",
      thumbnail: "https://example.com/thumbnails/docker-essentials.jpg",
      price: "40",
    },
    {
      id: "hh",
      title: "Docker Essentials",
      type: "mp4",
      src: "https://podeduc.apps.education.fr/video/46074-formation-vrmp4/?is_iframe=true",
      date: "2023-04-01",
      excerpt: "Bases de Docker pour containerisation.",
      thumbnail: "https://example.com/thumbnails/docker-essentials.jpg",
      price: "30",
    },
  ];
  // Trier par date (la plus récente en premier)
  const sortedBlog = [...blog].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  //  // Trier par date (la plus récente en premier)
  const sortedvideoForamation = [...videosFormation].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  //const latest = sortedBlog[0]; // Le plus récent
  const lastThree = sortedBlog.slice(0, 3); // Les 3 derniers
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 100); // Wait a bit for rendering
      }
    }
  }, []);
  useEffect(() => {
    if (window.location.hash) {
      const el = document.getElementById(window.location.hash.slice(1));
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 100); // wait for DOM to load
      }
    }
  }, []);
  return (
    <div>
      <style>{`::-webkit-scrollbar { display: none; }`}</style>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<HomePage blog={lastThree} services={services} />}
        />
        {/* <Route path="/about" element={<AboutPage />} /> */}
        <Route path="/blog" element={<BlogPage blog={blog} />} />
        <Route path="/services" element={<ServicesLayout />}>
          <Route
            path="formation"
            element={
              <Formation name={"Formation"} videos={sortedvideoForamation} />
            }
          />
          <Route
            path="management"
            element={<Management name={"Management"} />}
          />
          <Route path="rh" element={<RH name={"RH"} />} />
          <Route path="audit" element={<Audit name={"Audit"} />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/payment/:videoId"
          element={<Payment videos={videosFormation} />}
        />
      </Routes>
      {/* Footer section  */}
      <Footer titles={lastThree.map((block) => block.title)} />
    </div>
  );
};

export default App;
