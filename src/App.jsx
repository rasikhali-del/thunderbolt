import React, { useState, useEffect, useRef} from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import "./Thunderbolts.css";
import { Helmet } from "react-helmet-async";
import SEO from "./components/SEO";
import { db, collection, doc, setDoc, getDoc, getDocs, updateDoc, deleteDoc, onSnapshot } from "./firebase";
const ADMIN_EMAIL = "admin@thunderbolts.local";
const ADMIN_PASS = "supersecret";
const ADMIN_USERNAME = "thunderadmin";
import PlayerCard from "./components/PlayerCard";
import PlayerPage from "./components/PlayerPage";
import PlayerStatsPage from "./components/PlayerStatsPage";
export default function ThunderboltsSite() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [adminMode, setAdminMode] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // First, try to load from localStorage (admin changes)
    const savedMatches = localStorage.getItem("admin_matches");
    if (savedMatches) {
      try {
        const parsedMatches = JSON.parse(savedMatches);
        console.log("Loading matches from localStorage:", parsedMatches);
        setMatches(parsedMatches);
        setLoading(false);
        return; // Don't proceed to Firebase if we have localStorage data
      } catch (error) {
        console.error("Error parsing localStorage matches:", error);
      }
    }

    // Set a timeout to ensure loading state doesn't persist
    const timeout = setTimeout(() => {
      console.log("Setting loading to false due to timeout");
      setLoading(false);
      // Use hardcoded data if Firebase takes too long
      const fallbackMatches = [
         { id: 1, date: "1", opponent: "Rasikh Ali", runs: "870", wickets: "51", result: "5-22", topPerformer: "81 Runs" },
            { id: 2, date: "2", opponent: "Aun Abbas", runs: "1272", wickets: "26", result: "3-25", topPerformer: "110 Runs" },
            { id: 3, date: "3", opponent: "Hamza Naeem", runs: "667", wickets: "34", result: "5-31", topPerformer: "67 Runs" },
            { id: 4, date: "4", opponent: "Ali", runs: "938", wickets: "6", result: "3-38", topPerformer: "82 Runs" },
            { id: 5, date: "5", opponent: "Mujtaba", runs: "979", wickets: "6", result: "3-27", topPerformer: "88 Runs" },
            { id: 6, date: "6", opponent: "Hanzla", runs: "368", wickets: "82", result: "5-28", topPerformer: "72 Runs" },
            { id: 7, date: "7", opponent: "Zain", runs: "158", wickets: "39", result: "4-36", topPerformer: "51 Runs" },
            { id: 8, date: "8", opponent: "Saad Khan", runs: "655", wickets: "8", result: "3-19", topPerformer: "69 Runs" },
            { id: 9, date: "9", opponent: "Hafiz Hamza", runs: "774", wickets: "29", result: "4-34", topPerformer: "100* Runs" },
            { id: 10, date: "10", opponent: "Furqan", runs: "85", wickets: "17", result: "3-38", topPerformer: "28 Runs" },
            { id: 11, date: "11", opponent: "Ahad", runs: "139", wickets: "27", result: "3-28", topPerformer: "21 Runs" }, 
            { id: 12, date: "12", opponent: "Ahmed", runs: "4", wickets: "13", result: "3-32", topPerformer: "2 Runs" }, 
            { id: 13, date: "13", opponent: "Hamza Jnr", runs: "322", wickets: "-", result: "-", topPerformer: "70 Runs" }, 
            { id: 14, date: "14", opponent: "Azan", runs: "52", wickets: "7", result: "2-44", topPerformer: "22 Runs" }, 
            { id: 15, date: "15", opponent: "Umair", runs: "198", wickets: "22", result: "3-29", topPerformer: "42 Runs" }, 
            { id: 16, date: "16", opponent: "Haseeb", runs: "380", wickets: "4", result: "2-28", topPerformer: "72 Runs" }, 
            { id: 17, date: "17", opponent: "Yashfa", runs: "92", wickets: "13", result: "3-27", topPerformer: " 32 Runs" }, 
            { id: 18, date: "18", opponent: "Tanzeel khokhar", runs: "142", wickets: "11", result: "3-34", topPerformer: "34 Runs" },
             { id: 19, date: "19", opponent: "Tayyab", runs: "63", wickets: "12", result: "3-26", topPerformer: "36 Runs" }, 
             { id: 20, date: "20", opponent: "Saad Jnr", runs: "68", wickets: "-", result: "-", topPerformer: "50* Runs" },
             { id: 21, date: "21", opponent: "Abdullah", runs: "28", wickets: "-", result: "-", topPerformer: "16* Runs" },
             { id: 22, date: "22", opponent: "Muhammad Haider", runs: "-", wickets: "3", result: "-", topPerformer: "-" },
             { id: 23, date: "23", opponent: "Awais", runs: "-", wickets: "-", result: "-", topPerformer: "-" },
      ];
      setMatches(fallbackMatches);
    }, 3000); // 3 second timeout

    // Load matches from Firebase (only if no localStorage data)
    const loadMatchesFromFirebase = async () => {
      try {
        console.log("Loading matches from Firebase...");
        const matchesDoc = await getDoc(doc(db, "data", "matches"));
        if (matchesDoc.exists()) {
          const matchesData = matchesDoc.data().matches || [];
          console.log("Matches loaded from Firebase:", matchesData);
          setMatches(matchesData);
          clearTimeout(timeout);
        } else {
          console.log("No data in Firebase, using default data...");
          const defaultMatches = [
            { id: 1, date: "1", opponent: "Rasikh Ali", runs: "870", wickets: "51", result: "5-22", topPerformer: "81 Runs" },
            { id: 2, date: "2", opponent: "Aun Abbas", runs: "1272", wickets: "26", result: "3-25", topPerformer: "110 Runs" },
            { id: 3, date: "3", opponent: "Hamza Naeem", runs: "667", wickets: "34", result: "5-31", topPerformer: "67 Runs" },
            { id: 4, date: "4", opponent: "Ali", runs: "938", wickets: "6", result: "3-38", topPerformer: "82 Runs" },
            { id: 5, date: "5", opponent: "Mujtaba", runs: "979", wickets: "6", result: "3-27", topPerformer: "88 Runs" },
            { id: 6, date: "6", opponent: "Hanzla", runs: "368", wickets: "82", result: "5-28", topPerformer: "72 Runs" },
            { id: 7, date: "7", opponent: "Zain", runs: "158", wickets: "39", result: "4-36", topPerformer: "51 Runs" },
            { id: 8, date: "8", opponent: "Saad Khan", runs: "655", wickets: "8", result: "3-19", topPerformer: "69 Runs" },
            { id: 9, date: "9", opponent: "Hafiz Hamza", runs: "774", wickets: "29", result: "4-34", topPerformer: "100* Runs" },
            { id: 10, date: "10", opponent: "Furqan", runs: "85", wickets: "17", result: "3-38", topPerformer: "28 Runs" },
            { id: 11, date: "11", opponent: "Ahad", runs: "139", wickets: "27", result: "3-28", topPerformer: "21 Runs" }, 
            { id: 12, date: "12", opponent: "Ahmed", runs: "4", wickets: "13", result: "3-32", topPerformer: "2 Runs" }, 
            { id: 13, date: "13", opponent: "Hamza Jnr", runs: "322", wickets: "-", result: "-", topPerformer: "70 Runs" }, 
            { id: 14, date: "14", opponent: "Azan", runs: "52", wickets: "7", result: "2-44", topPerformer: "22 Runs" }, 
            { id: 15, date: "15", opponent: "Umair", runs: "198", wickets: "22", result: "3-29", topPerformer: "42 Runs" }, 
            { id: 16, date: "16", opponent: "Haseeb", runs: "380", wickets: "4", result: "2-28", topPerformer: "72 Runs" }, 
            { id: 17, date: "17", opponent: "Yashfa", runs: "92", wickets: "13", result: "3-27", topPerformer: " 32 Runs" }, 
            { id: 18, date: "18", opponent: "Tanzeel khokhar", runs: "142", wickets: "11", result: "3-34", topPerformer: "34 Runs" },
             { id: 19, date: "19", opponent: "Tayyab", runs: "63", wickets: "12", result: "3-26", topPerformer: "36 Runs" }, 
             { id: 20, date: "20", opponent: "Saad Jnr", runs: "68", wickets: "-", result: "-", topPerformer: "50* Runs" },
             { id: 21, date: "21", opponent: "Abdullah", runs: "28", wickets: "-", result: "-", topPerformer: "16* Runs" },
             { id: 22, date: "22", opponent: "Muhammad Haider", runs: "-", wickets: "3", result: "-", topPerformer: "-" },
             { id: 23, date: "23", opponent: "Awais", runs: "-", wickets: "-", result: "-", topPerformer: "-" },
          ];
          setMatches(defaultMatches);
          console.log("Setting default matches:", defaultMatches);
          clearTimeout(timeout);
          // Save default data to Firebase
          await setDoc(doc(db, "data", "matches"), { matches: defaultMatches });
        }
      } catch (error) {
        console.error("Error loading matches from Firebase:", error);
        console.log("Firebase connection failed, using hardcoded data...");
        // Use hardcoded data if Firebase fails
        const fallbackMatches = [
          { id: 1, date: "1", opponent: "Rasikh Ali", runs: "870", wickets: "51", result: "5-22", topPerformer: "81 Runs" },
          { id: 2, date: "2", opponent: "Aun Abbas", runs: "1272", wickets: "26", result: "3-25", topPerformer: "110 Runs" },
          { id: 3, date: "3", opponent: "Hamza Naeem", runs: "667", wickets: "28", result: "5-31", topPerformer: "67 Runs" },
          { id: 4, date: "4", opponent: "Ali", runs: "938", wickets: "6", result: "3-38", topPerformer: "82 Runs" },
          { id: 5, date: "5", opponent: "Mujtaba", runs: "979", wickets: "6", result: "3-27", topPerformer: "88 Runs" },
          { id: 6, date: "6", opponent: "Hanzla", runs: "368", wickets: "82", result: "5-28", topPerformer: "72 Runs" },
          { id: 7, date: "7", opponent: "Zain", runs: "158", wickets: "39", result: "4-36", topPerformer: "51 Runs" },
          { id: 8, date: "8", opponent: "Saad Khan", runs: "655", wickets: "8", result: "3-19", topPerformer: "69 Runs" },
          { id: 9, date: "9", opponent: "Hafiz Hamza", runs: "774", wickets: "29", result: "4-34", topPerformer: "100* Runs" },
          { id: 10, date: "10", opponent: "Furqan", runs: "85", wickets: "17", result: "3-38", topPerformer: "28 Runs" },
          { id: 11, date: "11", opponent: "Ahad", runs: "139", wickets: "27", result: "3-28", topPerformer: "21 Runs" }, 
          { id: 12, date: "12", opponent: "Ahmed", runs: "4", wickets: "13", result: "3-32", topPerformer: "2 Runs" }, 
          { id: 13, date: "13", opponent: "Hamza Jnr", runs: "322", wickets: "-", result: "-", topPerformer: "70 Runs" }, 
          { id: 14, date: "14", opponent: "Azan", runs: "52", wickets: "7", result: "2-44", topPerformer: "22 Runs" }, 
          { id: 15, date: "15", opponent: "Umair", runs: "198", wickets: "22", result: "3-29", topPerformer: "42 Runs" }, 
          { id: 16, date: "16", opponent: "Haseeb", runs: "380", wickets: "4", result: "2-28", topPerformer: "72 Runs" }, 
          { id: 17, date: "17", opponent: "Yashfa", runs: "92", wickets: "13", result: "3-27", topPerformer: " 32 Runs" }, 
          { id: 18, date: "18", opponent: "Tanzeel khokhar", runs: "142", wickets: "11", result: "3-34", topPerformer: "34 Runs" },
           { id: 19, date: "19", opponent: "Tayyab", runs: "63", wickets: "12", result: "3-26", topPerformer: "36 Runs" }, 
           { id: 20, date: "20", opponent: "Saad Jnr", runs: "68", wickets: "-", result: "-", topPerformer: "50* Runs" },
           { id: 21, date: "21", opponent: "Abdullah", runs: "28", wickets: "-", result: "-", topPerformer: "16* Runs" },
           { id: 22, date: "22", opponent: "Muhammad Haider", runs: "-", wickets: "3", result: "-", topPerformer: "-" },
           { id: 23, date: "23", opponent: "Awais", runs: "-", wickets: "-", result: "-", topPerformer: "-" },
        ];
        setMatches(fallbackMatches);
        clearTimeout(timeout);
      } finally {
        setLoading(false);
      }
    };

    loadMatchesFromFirebase();

    return () => clearTimeout(timeout);
  }, []);
  // ----- TEAM DATA -----
  const players = [
    {
      id: 1,
      name: "RASIKH ALI",
      role: "Captain / All-rounder",
      bio: "Rasikh Ali is a strategic and composed captain known for his calm leadership and unpredictable performances.",
      photo: "/Ras.jpg",
    },
    {
      id: 2,
      name: "HAMZA NAEEM",
      role: "Vice Captain / All-rounder",
      bio: "Hamza Naeem is a talented all-rounder whose presence brings a strong impact to the Thunderbolts team.",
      photo: "/WhatsApp Image 2025-10-25 at 12.34.53_e9bacc3a.jpg",
    },
    {
      id: 3,
      name: "AUN ABBAS",
      role: "All-rounder",
      bio: "Aun Abbas is a dynamic power-hitter known for his aggressive batting style and ability to turn games around in crucial moments.",
      photo: "/Aun.jpg",
    },
    {
      id: 4,
      name: "MUJTABA",
      role: "Wicketkeeper-Batsman",
      bio: "Mujtaba is known as the defensive wall of the Thunderbolts. His consistency and patience make him one of the most reliable batsmen on the team.",
      photo: "/Muj.jpg",
    },
    {
      id: 5,
      name: "ALI",
      role: "Batsman",
      bio: "Ali is a consistent batsman who contributes valuable runs to the team.",
      photo: "/Unknown.jfif",
    },
    {
      id: 6,
      name: "HANZLA",
      role: "Bowler",
      bio: "Hanzla is a skilled bowler known for taking crucial wickets.",
      photo: "/Hanzla.jpg",
    },
    {
      id: 7,
      name: "ZAIN",
      role: "All-rounder",
      bio: "Zain is a versatile player contributing with both bat and ball.",
      photo: "/zain.jpeg",
    },
    {
      id: 8,
      name: "SAAD KHAN",
      role: "Batsman",
      bio: "Saad Khan is a reliable batsman who builds solid innings.",
      photo: "/Unknown.jfif",
    },
    {
      id: 9,
      name: "HAFIZ HAMZA",
      role: "Batsman",
      bio: "Hafiz Hamza is a technically sound batsman with good temperament.",
      photo: "/Unknown.jfif",
    },
    {
      id: 10,
      name: "FURQAN",
      role: "All-rounder",
      bio: "Furqan is a hardworking all-rounder who gives his best for the team.",
      photo: "/furqan.jpeg",
    },
    {
      id: 11,
      name: "AHAD",
      role: "Bowler",
      bio: "Ahad is a dedicated bowler who maintains good line and length.",
      photo: "/ahad.jpeg",
    },
    {
      id: 12,
      name: "AHMED",
      role: "Batsman",
      bio: "Ahmed is a promising young batsman with great potential.",
      photo: "/Unknown.jfif",
    },
    {
      id: 13,
      name: "HAMZA JNR",
      role: "All-rounder",
      bio: "Hamza Jnr is an emerging talent with good all-round skills.",
      photo: "/hamza jnr.jpeg",
    },
    {
      id: 14,
      name: "AZAN",
      role: "Bowler",
      bio: "Azan is a accurate bowler who hits the right areas consistently.",
      photo: "/azan.jpeg",
    },
    {
      id: 15,
      name: "UMAIR",
      role: "Batsman",
      bio: "Umair is a solid batsman who plays according to the situation.",
      photo: "/umair.jpeg",
    },
    {
      id: 16,
      name: "HASEEB",
      role: "All-rounder",
      bio: "Haseeb is a consistent performer in both batting and bowling.",
      photo: "/Unknown.png",
    },
    {
      id: 17,
      name: "YASHFA",
      role: "Bowler",
      bio: "Yashfa is a skillful bowler who can contain batsmen effectively.",
      photo: "/Unknown.jfif",
    },
    {
      id: 18,
      name: "TANZEEL KHOKHAR",
      role: "All-rounder",
      bio: "Tanzeel Khokhar is a hardworking all-rounder who contributes in all departments.",
      photo: "/Unknown.jfif",
    },
    {
      id: 19,
      name: "TAYYAB",
      role: "Bowler",
      bio: "Tayyab is a dedicated bowler who always gives his best effort.",
      photo: "/Tayyab.jpeg",
    },
    {
      id: 20,
      name: "SAAD JNR",
      role: "Batsman",
      bio: "Saad Jnr is a young talent with good batting technique.",
      photo: "/Unknown.jfif",
    },
    {
      id: 21,
      name: "ABDULLAH",
      role: "Batsman",
      bio: "Abdullah is a composed batsman who plays sensible cricket.",
      photo: "/Unknown.jfif",
    },
    {
      id: 22,
      name: "MUHAMMAD HAIDER",
      role: "Bowler",
      bio: "Muhammad Haider is a promising bowler with good control.",
      photo: "/haider.jpeg",
    },
  ];
  const imageSizes = {
    "Ras.jpg": { w: 720, h: 887 },
    "WhatsApp Image 2025-10-25 at 12.34.53_e9bacc3a.jpg": { w: 1200, h: 1600 },
    "Aun.jpg": { w: 1080, h: 1100 },
    "WhatsApp Image 2025-10-25 at 12.03.12_dd2f6cee.jpg": { w: 904, h: 1280 },
  };

  // ----- MATCH DATA -----
  // Matches are now stored in state and loaded from localStorage

  const topPerformers = [
    { id: 1, name: "Aun Abbas", stat: "Most Runs (1272)" },
    { id: 2, name: "Mujtaba", stat: "Most Runs (979)" },
    { id: 3, name: "Hanzla", stat: "Most Wickets (82)" },
    { id: 4, name: "Rasikh", stat: "Most Wickets (51)" },
  ];

  const highlights = [
    {
      id: 1,
      title: "Thunderbolts Secure Dramatic Win!",
      desc: "On 14th August 2022, the Thunderbolts Cricket Club achieved one of its greatest victories by defeating the region’s top-ranked club team.",
      date: "August 14, 2025",
    },
    {
      id: 2,
      title: "Memorable Wins",
      desc: "Our second dramatic victory came against a team that had approached the series with great confidence.",
      date: "July 21, 2024",
    },
    {
      id: 3,
      title: "Record-Breaking Matches",
      desc: "The Thunderbolts bowled out the Stallions for just 90 runs, securing a comprehensive 10-wicket win.",
      date: "Feb 8, 2025",
    },
  ];

  // ----- CONTACT FORM -----
  const submitContact = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const msg = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      name: form.get("name"),
      email: form.get("email"),
      message: form.get("message"),
    };

    const old = JSON.parse(localStorage.getItem("tb_messages") || "[]");
    old.push(msg);
    localStorage.setItem("tb_messages", JSON.stringify(old));

    alert("✅ Message sent successfully!");
    e.target.reset();
  };

  // ----- ADMIN MODE -----
  if (adminMode) {
    return <AdminPage onExit={() => setAdminMode(false)} matches={matches} setMatches={setMatches} />;
  }

  return (
    <div className="site">
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/player/:playerName" element={<PlayerStatsPage matches={matches} players={players} />} />
      </Routes>
    </div>
  );

  function MainContent() {
    const navigate = useNavigate();
    
    return (
      <>
        <ChatBot players={players} matches={matches} highlights={highlights} />

      {/* SEO META TAGS */}
      <Helmet>
  <title>Thunderbolts Cricket Team — Power. Passion. Precision.</title>
  <meta
    name="description"
    content="Official Thunderbolts Cricket Team — stats, players, and match results."
  />
  <meta
    name="keywords"
    content="Thunderbolts, cricket, Pakistan, Rasikh Ali, Aun Abbas, Mujtaba, Hamza Naeem"
  />
  <link rel="preload" as="image" href="/team-banner.webp" />
</Helmet>
<SEO
  title="Thunderbolts Cricket Team — Power. Passion. Precision."
  description="Official Thunderbolts Cricket Team — stats, players, match highlights, and results. Based in Rawalpindi, Pakistan."
  keywords={[
    "Thunderbolts Cricket",
    "Thunderbolts team Pakistan",
    "Rawalpindi cricket team",
    "cricket in Rawalpindi",
    "Rasikh Ali cricket",
    "Aun Abbas cricket",
    "Mujtaba cricket",
    "Hamza Naeem cricket",
    "local cricket club Pakistan",
    "cricket match results Rawalpindi",
    "Pakistan club cricket",
    "senior cricket players Pakistan",
    "cricket highlights Rawalpindi",
    "Thunderbolts match stats",
    "top cricket performers",
    "Thunderbolts fixtures",
    "Rawalpindi cricket league",
    "Thunderbolts club news",
    "youth cricket Pakistan",
    "all-rounder cricket players",
    "wicketkeeper batsman Pakistan",
    "cricket team profile",
    "Thunderbolts captain",
    "cricket club schedule",
    "Thunderbolts club updates",
    "Thunderbolts"

  ]}
  image="https://thunderboltscricket.vercel.app/team-banner.jpg"
  canonicalPath="https://thunderboltscricket.vercel.app/"
  googleSiteVerification="OREHeffV0YDRL5GUhC49gV2yetSPMADbIenN2pup_Jw"
  structuredData={[
    {
      "@context": "https://schema.org",
      "@type": "SportsTeam",
      name: "Thunderbolts Cricket Team",
      sport: "Cricket",
      url: "https://thunderboltscricket.vercel.app",
      logo: "https://thunderboltscricket.vercel.app/team-banner.jpg",
      member: [
        { "@type": "Person", name: "Rasikh Ali", jobTitle: "Captain" },
        { "@type": "Person", name: "Hamza Naeem", jobTitle: "Vice Captain" },
        { "@type": "Person", name: "Aun Abbas", jobTitle: "All-rounder" },
        { "@type": "Person", name: "Mujtaba", jobTitle: "Wicketkeeper-Batsman" }
      ],
      location: {
        "@type": "Place",
        name: "Rawalpindi",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Rawalpindi",
          addressCountry: "PK"
        }
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Thunderbolts Cricket Team",
      url: "https://thunderboltscricket.vercel.app",
      inLanguage: "en"
    }
  ]}
/>



      {/* HEADER */}
      <header className="header">
        <div className="container nav-container">
          <Logo />
          <nav className={`nav ${menuOpen ? "open" : ""}`}>
            <a href="#home">Home</a>
            <a href="#seniors">Seniors</a>
            <a href="#scores">Scores</a>
            <a href="#contact">Contact</a>
            <button className="admin-btn" onClick={() => setAdminMode(true)}>Admin</button>
          </nav>
          <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main>
        <section id="home" className="hero-section">
          <div className="hero-bg"></div>
          <div className="container hero-content">
            <div className="hero-text">
              <h1>Thunderbolts Cricket Team</h1>
              <h3>Power. Passion. Precision.</h3>
              <p>
                The Thunderbolts bring high-voltage energy to every match — representing our city with spirit, teamwork, and unstoppable drive.
              </p>
              <div className="hero-buttons">
                <a href="#seniors" className="btn primary">Meet the Squad</a>
                <a href="#scores" className="btn secondary">View Match Results</a>
              </div>
            </div>
            <div className="hero-image">
            <img
    src="WhatsApp Image 2025-09-05 at 15.51.33_1a3ae2aa.jpg"
    alt="Thunderbolts Cricket Team Group Photo"
    title="Thunderbolts Cricket Team"
    width="500"
    height="500"
    loading="lazy"
  />

              <div className="featured">
                <p className="highlight">Featured</p>
                <p>Rasikh Ali — Leading the Charge</p>
                <AnimatedBall />
              </div>
            </div>
          </div>
        </section>

        <section className="about-section container">
          <h2>About the Thunderbolts</h2>
          <p>Established in 2022, the Thunderbolts Cricket Club was built on unity, respect, and fearless cricket. Known for unpredictable, bold play and unmatched team spirit.</p>
          <p>Our team consists of experienced seniors, rising talents, and management that values teamwork above all.</p>
        </section>

        <section className="news-section container">
          <h2>Historic Matches</h2>
       
          <div className="news-grid">
            {highlights.map((n) => (
              <article key={n.id} className="news-card">
                <h3>{n.title}</h3>
                <p className="news-date">{n.date}</p>
                <p>{n.desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="seniors" className="container players-section">
          <h2>Senior Players</h2>
          <p>
  Learn more about our <a href="#seniors">senior players</a> or check out the 
  <a href="#scores">latest match stats</a> from our recent tournaments.
</p>
          <h3>Team Leadership</h3>
          <div className="players-grid">
            {players.slice(0, 4).map((p) => (
              <article key={p.id} className="player-card">
                <img
  src={p.photo}
  alt={`${p.name} — ${p.role}`}
  title={p.name}
  loading="lazy"
  width="300"
  height="auto"
/>
                <h3>{p.name}</h3>
                <p className="role">{p.role}</p>
                <p>{p.bio}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="scores" className="container scores-section">
  <h2>Match Stats</h2>

  {loading ? (
    <p>Loading match data...</p>
  ) : (
    <>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Opponent</th>
            <th>Runs</th>
            <th>Wickets</th>
            <th>Result</th>
            <th>Top Performer</th>
          </tr>
        </thead>
        <tbody>
          {matches.map((m) => {
            // Find if there's a matching player for this opponent
            const matchingPlayer = players.find(p => 
              m.opponent.toLowerCase() === p.name.toLowerCase()
            );
            
            return (
              <tr 
                key={m.id} 
                className={matchingPlayer ? "clickable-row" : ""}
                onClick={() => {
                  if (matchingPlayer) {
                    // Navigate to player stats page
                    const playerName = matchingPlayer.name.replace(/\s+/g, '-').toLowerCase();
                    navigate(`/player/${playerName}`);
                  }
                }}
                style={matchingPlayer ? { cursor: "pointer" } : {}}
              >
                <td>{m.id}</td>
                <td>{m.opponent}</td>
                <td>{m.runs}</td>
                <td>{m.wickets}</td>
                <td>{m.result}</td>
                <td>
                  {/* Find the player object for this top performer */}
                  {players.find((p) => m.topPerformer.includes(p.name)) ? (
                    <span
                      style={{ cursor: "pointer", color: "#7c3aed", textDecoration: "underline" }}
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent row click
                        const player = players.find((p) => m.topPerformer.includes(p.name));
                        const playerName = player.name.replace(/\s+/g, '-').toLowerCase();
                        navigate(`/player/${playerName}`);
                      }}
                    >
                      {m.topPerformer}
                    </span>
                  ) : (
                    m.topPerformer
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="top-performers">
        <h3>Top Performers</h3>
        <ul className="performers">
          {topPerformers.map((tp) => {
            const player = players.find((p) => p.name.includes(tp.name));
            return (
              <li
                key={tp.id}
                onClick={() => setSelectedPlayer(player)}
                style={{ cursor: "pointer" }}
              >
                {tp.name} — <span>{tp.stat}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  )}

  {/* Player Stats Card Modal */}
  {selectedPlayer && (
    <PlayerCard player={selectedPlayer} onClose={() => setSelectedPlayer(null)} />
  )}
</section>


        <section id="contact" className="container contact-section">
          <h2>Contact the Team</h2>
          <p>Want to join or schedule a friendly match? Drop us a message — we’ll get back soon!</p>
          <p>
  Don’t miss our <a href="#contact">contact section</a> if you’d like to schedule a friendly match.
</p>
          <form onSubmit={submitContact}>
            <input name="name" placeholder="Name" required />
            <input name="email" type="email" placeholder="Email" required />
            <textarea name="message" placeholder="Message" required />
            <button type="submit" className="btn primary">Send Message</button>
          </form>

          <div className="contact-info">
            <p>Email: <strong>thunderboltscc@gmail.com</strong></p>
            <p>Phone: <strong>+92 346 2641229</strong></p>
            <p>
              Follow us:
              <a href="#"> Facebook </a>|
              <a href="#"> Instagram </a>|
              <a href="#"> Twitter</a>
            </p>
          </div>

          <div className="map"> 
          <iframe
  title="Rawalpindi Pakistan Location"
   src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d332626.8860729869!2d73.04262!3d33.57589!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38df95ccc1234567%3A0x0000000000000000!2sHarley%20Street%2C%20Rawalpindi%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1700000000000"
  width="100%"
  height="250"
  style={{ border: 0 }}
  allowFullScreen
  loading="lazy"
></iframe>

          </div>
        </section>

        <footer className="footer">
          © {new Date().getFullYear()} Thunderbolts Cricket Team
        </footer>
      </main>
      </>
    );
  }
}

function Logo() {
  return <a href="#home" className="logo">⚡ Thunderbolts</a>;
}

function AnimatedBall() {
  return <div className="animated-ball">🏏</div>;
}
function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hi! I’m ThunderBot ⚡ Ask me about the team, players, matches, or schedule!" }
  ]);
  const [input, setInput] = useState("");
  const chatRef = useRef(null);

  const matches = [
    { id: 1, date: "1", opponent: "Rasikh Ali", runs: "824", wickets: "42", result: "5-22", topPerformer: "81 Runs" },
    { id: 2, date: "2", opponent: "Aun Abbas", runs: "1090", wickets: "26", result: "3-25", topPerformer: "110 Runs" },
    { id: 3, date: "3", opponent: "Hamza Naeem", runs: "611", wickets: "28", result: "5-31", topPerformer: "67 Runs" },
    { id: 4, date: "4", opponent: "Ali", runs: "747", wickets: "6", result: "3-38", topPerformer: "82 Runs" },
    { id: 5, date: "5", opponent: "Mujtaba", runs: "879", wickets: "6", result: "3-27", topPerformer: "88 Runs" },
    { id: 6, date: "6", opponent: "Hanzla", runs: "318", wickets: "71", result: "5-28", topPerformer: "72 Runs" },
    { id: 7, date: "7", opponent: "Zain", runs: "145", wickets: "36", result: "4-36", topPerformer: "51 Runs" },
    { id: 8, date: "8", opponent: "Saad Khan", runs: "652", wickets: "8", result: "3-19", topPerformer: "69 Runs" },
    { id: 9, date: "9", opponent: "Hafiz Hamza", runs: "774", wickets: "29", result: "4-34", topPerformer: "100* Runs" },
    { id: 10, date: "10", opponent: "Furqan", runs: "85", wickets: "15", result: "3-38", topPerformer: "28 Runs" },
    { id: 11, date: "11", opponent: "Ahad", runs: "95", wickets: "23", result: "3-28", topPerformer: "21 Runs", }, 
    { id: 12, date: "12", opponent: "Ahmed", runs: "4", wickets: "13", result: "3-32", topPerformer: "2 Runs", }, 
    { id: 13, date: "13", opponent: "Hamza Jnr", runs: "231", wickets: "-", result: "-", topPerformer: "70 Runs", }, 
    { id: 14, date: "14", opponent: "Azan", runs: "33", wickets: "5", result: "2-44", topPerformer: "22 Runs", }, 
    { id: 15, date: "15", opponent: "Umair", runs: "189", wickets: "17", result: "3-29", topPerformer: "42 Runs", }, 
    { id: 16, date: "16", opponent: "Haseeb", runs: "380", wickets: "4", result: "2-28", topPerformer: "72 Runs", }, 
    { id: 17, date: "17", opponent: "Yashfa", runs: "92", wickets: "13", result: "3-27", topPerformer: " 32 Runs", }, 
    { id: 18, date: "18", opponent: "Tanzeel khokhar", runs: "142", wickets: "11", result: "3-34", topPerformer: "34 Runs", },
     { id: 19, date: "19", opponent: "Tayyab", runs: "61", wickets: "8", result: "3-26", topPerformer: "36 Runs", }, 
     { id: 20, date: "20", opponent: "Saad Jnr", runs: "68", wickets: "-", result: "-", topPerformer: "50* Runs", },
     { id: 21, date: "21", opponent: "Abdullah", runs: "16", wickets: "-", result: "-", topPerformer: "16* Runs", },
     { id: 22, date: "22", opponent: "Muhammad Haider", runs: "-", wickets: "2", result: "-", topPerformer: "-", },
    // ... باقی data
  ];

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = () => {
    if (!input) return;

    const userMsg = input;
    const lower = input.toLowerCase();
    let reply = "I’m not sure. Try asking about Captain, Vice Captain, Ground, T20, or any player's stats.";

    const player = matches.find(p => input.toLowerCase().includes(p.opponent.toLowerCase()));

if (player) {
  reply = `
Stats for ${player.opponent} 📊
Runs: ${player.runs}
Wickets: ${player.wickets}
Best Bowling: ${player.result}
Top Performer: ${player.topPerformer}
      `;
    } else if (lower.includes("sunday") || lower.includes("available")) {
      reply = "You can send a message; the match or event is on Sunday.";
    } else if (lower.includes("whatsapp") || lower.includes("whatsapp")) {
      reply = "Contact me on whatsapp: +92 346 2641229";
    } else if (lower.includes("banana eater") || lower.includes("banana eater")) {
      reply = "Ahad";
    } 
    else if (lower.includes("fucki") || lower.includes("fucki")) {
      reply = "Furqan";
    } 
    else if (lower.includes("runs") || lower.includes("runs")) {
      reply = "chal bhag bsdk";
    } else if (lower.includes("captain") && lower.includes("vice")) {
      reply = "Rasikh Ali is Captain ⚡, Hamza Naeem is Vice Captain 🏏.";
    } else if (lower.includes("captain")) {
      reply = "Rasikh Ali is the Captain of Thunderbolts ⚡.";
    } else if (lower.includes("vice captain")) {
      reply = "Hamza Naeem is the Vice Captain 🏏.";
    } else if (lower.includes("ground") || lower.includes("stadium")) {
      reply = "The Thunderbolts play at Morgah Ground.";
    } else if (lower.includes("format") || lower.includes("type of cricket")) {
      reply = "They play T20 matches.";
    }

    setMessages([...messages, { role: "user", text: userMsg }, { role: "bot", text: reply }]);
    setInput("");
  };

  return (
    <>
      <div className={`chat-container ${open ? "open" : ""}`}>
        {!open && (
          <div className="chat-circle" onClick={() => setOpen(true)}>
            Ask Questions 💬
          </div>
        )}

        {open && (
          <div className="chat-panel">
            <div className="chat-header">
              <span>ThunderBot ⚡</span>
              <button onClick={() => setOpen(false)}>✖</button>
            </div>
            <div className="chat-messages" ref={chatRef}>
              {messages.map((m, i) => (
                <div key={i} className={`msg ${m.role}`}>{m.text}</div>
              ))}
            </div>
            <div className="chat-input">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask ThunderBot..."
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button onClick={sendMessage}>Send</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

function AdminPage({ onExit, matches, setMatches }) {
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [auth, setAuth] = useState(false);
  const [messages, setMessages] = useState([]);
  const [editingMatch, setEditingMatch] = useState(null);

  useEffect(() => {
    if (auth) {
      loadMessages();
      loadMatches();
    }
  }, [auth]);

  const tryLogin = (e) => {
    e.preventDefault();
    if (username === ADMIN_USERNAME && pass === ADMIN_PASS) {
      setAuth(true);
    } else {
      alert("Invalid admin credentials");
    }
  };

  const loadMatches = async () => {
    // First, try to load from localStorage (admin changes)
    const savedMatches = localStorage.getItem("admin_matches");
    if (savedMatches) {
      try {
        const parsedMatches = JSON.parse(savedMatches);
        setMatches(parsedMatches);
        return; // Don't proceed to Firebase if we have localStorage data
      } catch (error) {
        console.error("Error parsing localStorage matches:", error);
      }
    }

    // If no localStorage data, try Firebase
    try {
      const matchesDoc = await getDoc(doc(db, "data", "matches"));
      if (matchesDoc.exists()) {
        setMatches(matchesDoc.data().matches || []);
      } else {
        // Use fallback data if no Firebase data exists
        const fallbackMatches = [
          { id: 1, date: "1", opponent: "Rasikh Ali", runs: "824", wickets: "42", result: "5-22", topPerformer: "81 Runs" },
          { id: 2, date: "2", opponent: "Aun Abbas", runs: "1090", wickets: "26", result: "3-25", topPerformer: "110 Runs" },
          { id: 3, date: "3", opponent: "Hamza Naeem", runs: "611", wickets: "28", result: "5-31", topPerformer: "67 Runs" },
          { id: 4, date: "4", opponent: "Ali", runs: "747", wickets: "6", result: "3-38", topPerformer: "82 Runs" },
          { id: 5, date: "5", opponent: "Mujtaba", runs: "879", wickets: "6", result: "3-27", topPerformer: "88 Runs" },
          { id: 6, date: "6", opponent: "Hanzla", runs: "318", wickets: "71", result: "5-28", topPerformer: "72 Runs" },
          { id: 7, date: "7", opponent: "Zain", runs: "145", wickets: "36", result: "4-36", topPerformer: "51 Runs" },
          { id: 8, date: "8", opponent: "Saad Khan", runs: "652", wickets: "8", result: "3-19", topPerformer: "69 Runs" },
          { id: 9, date: "9", opponent: "Hafiz Hamza", runs: "774", wickets: "29", result: "4-34", topPerformer: "100* Runs" },
          { id: 10, date: "10", opponent: "Furqan", runs: "85", wickets: "15", result: "3-38", topPerformer: "28 Runs" },
          { id: 11, date: "11", opponent: "Ahad", runs: "95", wickets: "23", result: "3-28", topPerformer: "21 Runs" }, 
          { id: 12, date: "12", opponent: "Ahmed", runs: "4", wickets: "13", result: "3-32", topPerformer: "2 Runs" }, 
          { id: 13, date: "13", opponent: "Hamza Jnr", runs: "231", wickets: "-", result: "-", topPerformer: "70 Runs" }, 
          { id: 14, date: "14", opponent: "Azan", runs: "33", wickets: "5", result: "2-44", topPerformer: "22 Runs" }, 
          { id: 15, date: "15", opponent: "Umair", runs: "189", wickets: "17", result: "3-29", topPerformer: "42 Runs" }, 
          { id: 16, date: "16", opponent: "Haseeb", runs: "380", wickets: "4", result: "2-28", topPerformer: "72 Runs" }, 
          { id: 17, date: "17", opponent: "Yashfa", runs: "92", wickets: "13", result: "3-27", topPerformer: " 32 Runs" }, 
          { id: 18, date: "18", opponent: "Tanzeel khokhar", runs: "142", wickets: "11", result: "3-34", topPerformer: "34 Runs" },
           { id: 19, date: "19", opponent: "Tayyab", runs: "61", wickets: "8", result: "3-26", topPerformer: "36 Runs" }, 
           { id: 20, date: "20", opponent: "Saad Jnr", runs: "68", wickets: "-", result: "-", topPerformer: "50* Runs" },
           { id: 21, date: "21", opponent: "Abdullah", runs: "16", wickets: "-", result: "-", topPerformer: "16* Runs" },
           { id: 22, date: "22", opponent: "Muhammad Haider", runs: "-", wickets: "2", result: "-", topPerformer: "-" },
        ];
        setMatches(fallbackMatches);
      }
    } catch (error) {
      console.error("Error loading matches from Firebase:", error);
      // Use fallback data if Firebase fails
      const fallbackMatches = [
        { id: 1, date: "1", opponent: "Rasikh Ali", runs: "824", wickets: "42", result: "5-22", topPerformer: "81 Runs" },
        { id: 2, date: "2", opponent: "Aun Abbas", runs: "1090", wickets: "26", result: "3-25", topPerformer: "110 Runs" },
        { id: 3, date: "3", opponent: "Hamza Naeem", runs: "611", wickets: "28", result: "5-31", topPerformer: "67 Runs" },
        { id: 4, date: "4", opponent: "Ali", runs: "747", wickets: "6", result: "3-38", topPerformer: "82 Runs" },
        { id: 5, date: "5", opponent: "Mujtaba", runs: "879", wickets: "6", result: "3-27", topPerformer: "88 Runs" },
        { id: 6, date: "6", opponent: "Hanzla", runs: "318", wickets: "71", result: "5-28", topPerformer: "72 Runs" },
        { id: 7, date: "7", opponent: "Zain", runs: "145", wickets: "36", result: "4-36", topPerformer: "51 Runs" },
        { id: 8, date: "8", opponent: "Saad Khan", runs: "652", wickets: "8", result: "3-19", topPerformer: "69 Runs" },
        { id: 9, date: "9", opponent: "Hafiz Hamza", runs: "774", wickets: "29", result: "4-34", topPerformer: "100* Runs" },
        { id: 10, date: "10", opponent: "Furqan", runs: "85", wickets: "15", result: "3-38", topPerformer: "28 Runs" },
        { id: 11, date: "11", opponent: "Ahad", runs: "95", wickets: "23", result: "3-28", topPerformer: "21 Runs" }, 
        { id: 12, date: "12", opponent: "Ahmed", runs: "4", wickets: "13", result: "3-32", topPerformer: "2 Runs" }, 
        { id: 13, date: "13", opponent: "Hamza Jnr", runs: "231", wickets: "-", result: "-", topPerformer: "70 Runs" }, 
        { id: 14, date: "14", opponent: "Azan", runs: "33", wickets: "5", result: "2-44", topPerformer: "22 Runs" }, 
        { id: 15, date: "15", opponent: "Umair", runs: "189", wickets: "17", result: "3-29", topPerformer: "42 Runs" }, 
        { id: 16, date: "16", opponent: "Haseeb", runs: "380", wickets: "4", result: "2-28", topPerformer: "72 Runs" }, 
        { id: 17, date: "17", opponent: "Yashfa", runs: "92", wickets: "13", result: "3-27", topPerformer: " 32 Runs" }, 
        { id: 18, date: "18", opponent: "Tanzeel khokhar", runs: "142", wickets: "11", result: "3-34", topPerformer: "34 Runs" },
         { id: 19, date: "19", opponent: "Tayyab", runs: "61", wickets: "8", result: "3-26", topPerformer: "36 Runs" }, 
         { id: 20, date: "20", opponent: "Saad Jnr", runs: "68", wickets: "-", result: "-", topPerformer: "50* Runs" },
         { id: 21, date: "21", opponent: "Abdullah", runs: "16", wickets: "-", result: "-", topPerformer: "16* Runs" },
         { id: 22, date: "22", opponent: "Muhammad Haider", runs: "-", wickets: "2", result: "-", topPerformer: "-" },
      ];
      setMatches(fallbackMatches);
    }
  };

  const saveMatches = async (updatedMatches) => {
    try {
      await setDoc(doc(db, "data", "matches"), { matches: updatedMatches });
      setMatches(updatedMatches);
    } catch (error) {
      console.error("Error saving matches to Firebase:", error);
      alert("Firebase connection failed. Changes will only be saved locally for this session.");
      // Still update local state even if Firebase fails
      setMatches(updatedMatches);
    }
  };

  const updateMatch = async (id, field, value) => {
    // Update local state immediately for responsive UI
    const updatedMatches = matches.map(m => 
      m.id === id ? { ...m, [field]: value } : m
    );
    setMatches(updatedMatches);
    
    // Save to localStorage for persistence
    localStorage.setItem("admin_matches", JSON.stringify(updatedMatches));
    
    // Try to save to Firebase in background
    try {
      await setDoc(doc(db, "data", "matches"), { matches: updatedMatches });
      console.log("Successfully saved to Firebase");
    } catch (error) {
      console.error("Firebase save failed, but localStorage worked:", error);
    }
  };

  const deleteMatch = async (id) => {
    if (confirm("Are you sure you want to delete this match?")) {
      const updatedMatches = matches.filter(m => m.id !== id);
      await saveMatches(updatedMatches);
    }
  };

  const loadMessages = () => {
    const raw = localStorage.getItem("tb_messages");
    setMessages(raw ? JSON.parse(raw) : []);
  };

  const deleteMessage = (id) => {
    const updated = messages.filter((m) => m.id !== id);
    setMessages(updated);
    localStorage.setItem("tb_messages", JSON.stringify(updated));
  };

  const clearAll = () => {
    if (confirm("Clear all messages?")) {
      localStorage.removeItem("tb_messages");
      setMessages([]);
    }
  };

  if (!auth) {
    return (
      <div className="admin-root">
        <div className="admin-login-container">
          <h2>Admin Login</h2>
          <form onSubmit={tryLogin} className="admin-login-form">
            <input 
              placeholder="Username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
            />
            <input 
              placeholder="Password" 
              type="password" 
              value={pass} 
              onChange={(e) => setPass(e.target.value)} 
              required 
            />
            <div className="admin-login-buttons">
              <button type="submit" className="btn primary">Login</button>
              <button onClick={onExit} className="btn secondary" type="button">Back</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-root container">
      <h2>Admin Panel</h2>
      <div className="admin-controls">
        <button onClick={loadMessages} className="btn primary">Refresh Messages</button>
        <button onClick={clearAll} className="btn">Clear All Messages</button>
        <button onClick={onExit} className="btn secondary">Back to Site</button>
      </div>

      <div className="admin-section">
        <h3>Match Stats Management</h3>
        <table className="admin-matches-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Opponent</th>
              <th>Runs</th>
              <th>Wickets</th>
              <th>Result</th>
              <th>Top Performer</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {matches.map((m) => (
              <tr key={m.id}>
                <td>{m.id}</td>
                <td>
                  <input 
                    type="text" 
                    value={m.date} 
                    onChange={(e) => updateMatch(m.id, 'date', e.target.value)}
                    className="admin-input"
                  />
                </td>
                <td>
                  <input 
                    type="text" 
                    value={m.opponent} 
                    onChange={(e) => updateMatch(m.id, 'opponent', e.target.value)}
                    className="admin-input"
                  />
                </td>
                <td>
                  <input 
                    type="text" 
                    value={m.runs} 
                    onChange={(e) => updateMatch(m.id, 'runs', e.target.value)}
                    className="admin-input"
                  />
                </td>
                <td>
                  <input 
                    type="text" 
                    value={m.wickets} 
                    onChange={(e) => updateMatch(m.id, 'wickets', e.target.value)}
                    className="admin-input"
                  />
                </td>
                <td>
                  <input 
                    type="text" 
                    value={m.result} 
                    onChange={(e) => updateMatch(m.id, 'result', e.target.value)}
                    className="admin-input"
                  />
                </td>
                <td>
                  <input 
                    type="text" 
                    value={m.topPerformer} 
                    onChange={(e) => updateMatch(m.id, 'topPerformer', e.target.value)}
                    className="admin-input"
                  />
                </td>
                <td>
                  <button 
                    onClick={() => deleteMatch(m.id)} 
                    className="btn danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="admin-section">
        <h3>Contact Messages</h3>
        {messages.length === 0 ? (
          <p>No messages yet.</p>
        ) : (
          messages.map((m) => (
            <div key={m.id} className="msg-card">
              <p><strong>{m.name}</strong> — <a href={`mailto:${m.email}`}>{m.email}</a></p>
              <p>{m.message}</p>
              <small>{new Date(m.timestamp).toLocaleString()}</small>
              <button className="btn" onClick={() => deleteMessage(m.id)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
