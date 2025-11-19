import React, { useState, useEffect } from "react";
import "./Thunderbolts.css";
import { Helmet } from "react-helmet-async";
import SEO from "./components/SEO";
const ADMIN_EMAIL = "admin@thunderbolts.local";
const ADMIN_PASS = "supersecret";
import PlayerCard from "./components/PlayerCard";
import PlayerPage from "./components/PlayerPage";
export default function ThunderboltsSite() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [adminMode, setAdminMode] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  // ----- TEAM DATA -----
  const players = [
    {
      id: 1,
      name: "RASIKH ALI",
      role: "Captain / All-rounder",
      bio: "Rasikh Ali is a strategic and composed captain known for his calm leadership and unpredictable performances.",
      photo: "Ras.jpg",
    },
    {
      id: 2,
      name: "HAMZA NAEEM",
      role: "Vice Captain / All-rounder",
      bio: "Hamza Naeem is a talented all-rounder whose presence brings a strong impact to the Thunderbolts team.",
      photo: "WhatsApp Image 2025-10-25 at 12.34.53_e9bacc3a.jpg",
    },
    {
      id: 3,
      name: "AUN ABBAS",
      role: "All-rounder",
      bio: "Aun Abbas is a dynamic power-hitter known for his aggressive batting style and ability to turn games around in crucial moments.",
      photo: "Aun.jpg",
    },
    {
      id: 4,
      name: "MUJTABA",
      role: "Wicketkeeper-Batsman",
      bio: "Mujtaba is known as the defensive wall of the Thunderbolts. His consistency and patience make him one of the most reliable batsmen on the team.",
      photo: "WhatsApp Image 2025-10-25 at 12.03.12_dd2f6cee.jpg",
    },
  ];

  // ----- MATCH DATA -----
  const matches = [
    { id: 1, date: "1", opponent: "Rasikh Ali", runs: "776", wickets: "38", result: "5-22", topPerformer: "81 Runs" },
    { id: 2, date: "2", opponent: "Aun Abbas", runs: "1081", wickets: "25", result: "3-25", topPerformer: "110 Runs" },
    { id: 3, date: "3", opponent: "Hamza Naeem", runs: "581", wickets: "27", result: "5-31", topPerformer: "67 Runs" },
    { id: 4, date: "4", opponent: "Ali", runs: "733", wickets: "6", result: "3-38", topPerformer: "82 Runs" },
    { id: 5, date: "5", opponent: "Mujtaba", runs: "807", wickets: "6", result: "3-27", topPerformer: "88 Runs" },
    { id: 6, date: "6", opponent: "Hanzla", runs: "289", wickets: "66", result: "5-28", topPerformer: "72 Runs" },
    { id: 7, date: "7", opponent: "Zain", runs: "139", wickets: "33", result: "4-36", topPerformer: "51 Runs" },
    { id: 8, date: "8", opponent: "Saad Khan", runs: "647", wickets: "7", result: "3-19", topPerformer: "69 Runs" },
    { id: 9, date: "9", opponent: "Hafiz Hamza", runs: "774", wickets: "27", result: "4-34", topPerformer: "100* Runs" },
    { id: 10, date: "10", opponent: "Furqan", runs: "79", wickets: "14", result: "3-38", topPerformer: "28 Runs" },
    { id: 11, date: "11", opponent: "Ahad", runs: "84", wickets: "20", result: "3-28", topPerformer: "21 Runs", }, { id: 12, date: "12", opponent: "Ahmed", runs: "4", wickets: "13", result: "3-32", topPerformer: "2 Runs", }, { id: 13, date: "13", opponent: "Hamza Jnr", runs: "175", wickets: "-", result: "-", topPerformer: "70 Runs", }, { id: 14, date: "14", opponent: "Azan", runs: "33", wickets: "5", result: "2-44", topPerformer: "22 Runs", }, { id: 15, date: "15", opponent: "Umair", runs: "189", wickets: "17", result: "3-29", topPerformer: "42 Runs", }, { id: 16, date: "16", opponent: "Haseeb", runs: "356", wickets: "4", result: "2-28", topPerformer: "72 Runs", }, { id: 17, date: "17", opponent: "Yashfa", runs: "92", wickets: "13", result: "3-27", topPerformer: " Runs", }, { id: 18, date: "18", opponent: "Tanzeel khokhar", runs: "142", wickets: "11", result: "3-34", topPerformer: "34 Runs", }, { id: 19, date: "19", opponent: "Tayyab", runs: "61", wickets: "8", result: "3-26", topPerformer: "36 Runs", }, { id: 20, date: "20", opponent: "Saad Jnr", runs: "68", wickets: "-", result: "-", topPerformer: "50* Runs", },
  ];

  const topPerformers = [
    { id: 1, name: "Aun Abbas", stat: "Most Runs (1081)" },
    { id: 2, name: "Mujtaba", stat: "Most Runs (807)" },
    { id: 3, name: "Hanzla", stat: "Most Wickets (66)" },
    { id: 4, name: "Rasikh", stat: "Most Wickets (38)" },
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
    return <AdminPage onExit={() => setAdminMode(false)} />;
  }

  return (
    <div className="site">
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
    "Thunderbolts club updates"
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
            {players.map((p) => (
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
      {matches.map((m) => (
        <tr key={m.id}>
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
                onClick={() =>
                  setSelectedPlayer(players.find((p) => m.topPerformer.includes(p.name)))
                }
              >
                {m.topPerformer}
              </span>
            ) : (
              m.topPerformer
            )}
          </td>
        </tr>
      ))}
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
  title="Thunderbolts Cricket Ground Location"
  src="https://www.google.com/maps/embed?pb=..."
  width="100%"
  height="250"
  style={{ border: 0 }}
  allowFullScreen=""
  loading="lazy"
></iframe>

          </div>
        </section>

        <footer className="footer">
          © {new Date().getFullYear()} Thunderbolts Cricket Team
        </footer>
      </main>
    </div>
  );
}

function Logo() {
  return <a href="#home" className="logo">⚡ Thunderbolts</a>;
}

function AnimatedBall() {
  return <div className="animated-ball">🏏</div>;
}

function AdminPage({ onExit }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [auth, setAuth] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (auth) loadMessages();
  }, [auth]);

  const tryLogin = (e) => {
    e.preventDefault();
    if (email === ADMIN_EMAIL && pass === ADMIN_PASS) {
      setAuth(true);
      loadMessages();
    } else alert("Invalid admin credentials");
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
      <div className="admin-root container">
        <h2>Admin Login</h2>
        <form onSubmit={tryLogin}>
          <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input placeholder="Password" type="password" value={pass} onChange={(e) => setPass(e.target.value)} required />
          <button type="submit" className="btn primary">Login</button>
          <button onClick={onExit} className="btn secondary" type="button">Back</button>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-root container">
      <h2>Admin — Contact Messages</h2>
      <div className="admin-controls">
        <button onClick={loadMessages} className="btn primary">Refresh</button>
        <button onClick={clearAll} className="btn">Clear All</button>
        <button onClick={onExit} className="btn secondary">Back to Site</button>
      </div>

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
  );
}
