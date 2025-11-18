import { useEffect, useMemo } from "react";

function setOrCreate(tagName, id, attrs) {
  let el = document.head.querySelector(`#${id}`);
  if (!el) {
    el = document.createElement(tagName);
    el.id = id;
    document.head.appendChild(el);
  }
  Object.entries(attrs || {}).forEach(([k, v]) => {
    if (v === undefined || v === null) return;
    if (k === "text") {
      el.textContent = v;
    } else {
      el.setAttribute(k, v);
    }
  });
  return el;
}

export default function SEO({
  title,
  description,
  keywords = [],
  image = "/thunderbolts-logo.jpg",
  canonicalPath = "",
  noindex = false,
  structuredData,
  googleSiteVerification,
}) {
  const keywordsKey = useMemo(
    () => (Array.isArray(keywords) ? keywords.join(",") : String(keywords || "")),
    [keywords]
  );
  const structuredKey = useMemo(() => JSON.stringify(structuredData || null), [structuredData]);

  useEffect(() => {
    const siteName = "Thunderbolts Cricket Team";
    const resolvedTitle = title ? `${title}` : siteName;
    const desc =
      description ||
      "Official Thunderbolts Cricket Team — match stats, players, highlights, and cricket updates.";
    const kw =
      Array.isArray(keywords)
        ? keywords.join(", ")
        : String(keywords || "") ||
          "Thunderbolts, cricket, Pakistan, Rawalpindi cricket team, Rasikh Ali, Aun Abbas, Mujtaba, Hamza Naeem";
    
    const origin = "https://thunderboltscricket.vercel.app"; // Fixed to your Vercel deployment
    const url = origin + (canonicalPath || (typeof window !== "undefined" ? window.location.pathname : ""));

    // Basic Meta
    document.title = resolvedTitle;
    setOrCreate("meta", "seo-description", { name: "description", content: desc });
    setOrCreate("meta", "seo-keywords", { name: "keywords", content: kw });
    setOrCreate("link", "seo-canonical", { rel: "canonical", href: url });

    // Robots
    setOrCreate("meta", "seo-robots", { name: "robots", content: noindex ? "noindex, nofollow" : "index, follow" });

    // Open Graph
    setOrCreate("meta", "og-title", { property: "og:title", content: resolvedTitle });
    setOrCreate("meta", "og-desc", { property: "og:description", content: desc });
    setOrCreate("meta", "og-type", { property: "og:type", content: "sports_team" });
    setOrCreate("meta", "og-url", { property: "og:url", content: url });
    setOrCreate("meta", "og-image", { property: "og:image", content: image });

    // Twitter
    setOrCreate("meta", "tw-card", { name: "twitter:card", content: "summary_large_image" });
    setOrCreate("meta", "tw-title", { name: "twitter:title", content: resolvedTitle });
    setOrCreate("meta", "tw-desc", { name: "twitter:description", content: desc });
    setOrCreate("meta", "tw-image", { name: "twitter:image", content: image });

    // Structured data (JSON-LD)
    document.head.querySelectorAll('script[id^="seo-ld-"]').forEach((n) => n.remove());
    const payloads = Array.isArray(structuredData)
      ? structuredData
      : structuredData
      ? [structuredData]
      : [];
    payloads.forEach((obj, i) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = `seo-ld-${i}`;
      script.text = JSON.stringify(obj);
      document.head.appendChild(script);
    });

    if (googleSiteVerification) {
      setOrCreate("meta", "seo-google-verification", {
        name: "google-site-verification",
        content: googleSiteVerification,
      });
    }

    return () => {
      document.head.querySelectorAll('script[id^="seo-ld-"]').forEach((n) => n.remove());
    };
  }, [
    title,
    description,
    keywords,
    keywordsKey,
    image,
    canonicalPath,
    noindex,
    structuredData,
    structuredKey,
    googleSiteVerification,
  ]);

  return null;
}
