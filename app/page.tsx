"use client";

import React, { useEffect, useMemo, useState, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { track } from "@vercel/analytics";
import {
  Home, FolderKanban, Trophy, Mail, MapPin, Phone, Linkedin, FileText,
  GraduationCap, Briefcase, Database, BarChart3, Truck, Search, Cpu,
  Award, Workflow, Code2, Bot, Factory, LayoutDashboard, Music4, Contact,
  Sparkles, ChevronRight, ExternalLink, BadgeCheck, ArrowUpRight, X, Moon, Sun, Github,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

type SectionId = "home" | "skills" | "education" | "experience" | "projects" | "achievements" | "contact";
type Project = { id: string; title: string; subtitle: string; description: string; detail: string; tags: string[]; image?: string; icon: React.ReactNode; insights?: string[]; };
type Experience = { company: string; title: string; period: string; location: string; promoted?: boolean; bullets: string[]; };
type Certification = { title: string; issuer: string; issued: string; file: string; };

// ── Animated counter ──────────────────────────────────────────────────────────
function AnimatedCounter({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 60, damping: 20 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) motionVal.set(target);
  }, [inView, target, motionVal]);

  useEffect(() => {
    return spring.on("change", (v) => setDisplay(Math.round(v)));
  }, [spring]);

  return <span ref={ref}>{prefix}{display}{suffix}</span>;
}

// ── Typewriter ────────────────────────────────────────────────────────────────
function Typewriter({ words }: { words: string[] }) {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[idx];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(current.slice(0, text.length + 1));
        if (text.length + 1 === current.length) setTimeout(() => setDeleting(true), 1800);
      } else {
        setText(current.slice(0, text.length - 1));
        if (text.length - 1 === 0) { setDeleting(false); setIdx((i) => (i + 1) % words.length); }
      }
    }, deleting ? 40 : 80);
    return () => clearTimeout(timeout);
  }, [text, deleting, idx, words]);

  return (
    <span className="text-cyan-300">
      {text}<span className="animate-pulse">|</span>
    </span>
  );
}

// ── Reveal ────────────────────────────────────────────────────────────────────
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

// ── Glass card ────────────────────────────────────────────────────────────────
function GlassCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }} className={`rounded-3xl border border-white/50 bg-white/60 backdrop-blur-sm shadow-[0_18px_40px_rgba(15,23,42,0.08)] ${className}`}>
      {children}
    </motion.div>
  );
}

// ── Dark card ─────────────────────────────────────────────────────────────────
function DarkCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }} className={`rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-950 text-white shadow-[0_18px_40px_rgba(15,23,42,0.24)] ${className}`}>
      {children}
    </motion.div>
  );
}

// ── Skill bar ─────────────────────────────────────────────────────────────────
function SkillBar({ name, icon, level }: { name: string; icon: React.ReactNode; level: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="group flex flex-col gap-2 rounded-2xl border border-black/10 bg-white/65 px-4 py-4 transition hover:shadow-md">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-100 text-cyan-800 transition group-hover:bg-cyan-700 group-hover:text-white">
          {icon}
        </div>
        <span className="text-sm font-semibold text-slate-800">{name}</span>
        <span className="ml-auto text-xs font-bold text-cyan-700">{level}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
        <motion.div className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-sky-600" initial={{ width: 0 }} animate={inView ? { width: `${level}%` } : {}} transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }} />
      </div>
    </div>
  );
}

// ── Project visual ────────────────────────────────────────────────────────────
function ProjectVisual({ image, alt, icon, title, subtitle }: { image?: string; alt: string; icon: React.ReactNode; title: string; subtitle: string }) {
  const [imgError, setImgError] = useState(false);
  if (image && !imgError) {
    return (
      <motion.div whileHover={{ scale: 1.02 }} className="group relative w-full max-w-[620px] overflow-hidden rounded-[2rem]">
        <img src={image} alt={alt} className="w-full rounded-[2rem] object-contain shadow-2xl transition duration-300 group-hover:brightness-90" onError={() => setImgError(true)} />
        <div className="absolute inset-0 flex items-end rounded-[2rem] bg-gradient-to-t from-slate-900/60 to-transparent p-6 opacity-0 transition duration-300 group-hover:opacity-100">
          <p className="text-sm font-semibold text-white">{subtitle}</p>
        </div>
      </motion.div>
    );
  }
  return (
    <GlassCard className="flex h-[360px] w-full max-w-[620px] flex-col items-center justify-center p-8">
      <div className="rounded-full bg-cyan-700/10 p-6 text-cyan-800">{icon}</div>
      <h4 className="mt-6 text-center text-2xl font-black md:text-3xl">{title}</h4>
      <p className="mt-3 max-w-md text-center text-base leading-7 text-slate-700 md:text-lg">{subtitle}</p>
    </GlassCard>
  );
}

// ── Project explainer tabs ────────────────────────────────────────────────────
function ProjectExplainer({ businessValue, technicalApproach, interviewVersion }: { businessValue: string; technicalApproach: string; interviewVersion: string }) {
  const [tab, setTab] = useState<"business" | "technical" | "interview">("business");
  const contentMap = { business: businessValue, technical: technicalApproach, interview: interviewVersion };
  return (
    <div className="mt-8 rounded-3xl border border-white/50 bg-white/70 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
      <div className="mb-4 flex flex-wrap gap-3">
        {(["business", "technical", "interview"] as const).map((t) => (
          <button key={t} onClick={() => { setTab(t); track("project_explainer_tab", { tab: t }); }} className={`rounded-full px-4 py-2 text-sm font-semibold transition ${tab === t ? "bg-cyan-700 text-white" : "bg-slate-100 text-slate-800 hover:bg-slate-200"}`}>
            {t === "business" ? "Business Perspective" : t === "technical" ? "Approach" : "Interview Version"}
          </button>
        ))}
      </div>
      <motion.p key={tab} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="text-base leading-8 text-slate-700 md:text-lg">{contentMap[tab]}</motion.p>
    </div>
  );
}

// ── Spotify dashboard preview ─────────────────────────────────────────────────
function DashboardPreview() {
  const [view, setView] = useState<"overview" | "engagement" | "trends">("overview");
  const cards = view === "overview" ? [{ label: "Top Artist Score", value: "92" }, { label: "Average Engagement", value: "78%" }, { label: "Listener Growth", value: "+14%" }] : view === "engagement" ? [{ label: "Playlist Adds", value: "12.4K" }, { label: "Skip Rate", value: "18%" }, { label: "Save Rate", value: "41%" }] : [{ label: "Weekly Trend", value: "+9.3%" }, { label: "Top Region", value: "United States" }, { label: "Momentum", value: "High" }];
  return (
    <div className="mt-8 rounded-[2rem] border border-white/50 bg-white/70 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
      <div className="mb-5 flex flex-wrap gap-3">
        {(["overview", "engagement", "trends"] as const).map((item) => (
          <button key={item} onClick={() => { setView(item); track("spotify_preview_view", { view: item }); }} className={`rounded-full px-4 py-2 text-sm font-semibold capitalize transition ${view === item ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-800 hover:bg-slate-200"}`}>{item}</button>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {cards.map((card) => (
          <motion.div key={card.label} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }} className="rounded-2xl border border-black/10 bg-gradient-to-br from-cyan-50 to-sky-50 p-5">
            <p className="text-sm font-medium text-slate-600">{card.label}</p>
            <p className="mt-2 text-3xl font-black text-slate-900">{card.value}</p>
          </motion.div>
        ))}
      </div>
      <div className="mt-6 rounded-2xl border border-black/10 bg-slate-950 p-5 text-white">
        <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Preview Insight</p>
        <p className="mt-3 text-base leading-7 text-slate-200">This preview reflects how I think about dashboards: keep the structure simple, focus on the measures that matter, and help a user understand the story quickly without being overwhelmed by too many visuals.</p>
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function Page() {
  const [activeSection, setActiveSection] = useState<SectionId>("home");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showFloatingCTA, setShowFloatingCTA] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [ctaDismissed, setCtaDismissed] = useState(false);

  const stats = [
    { value: 15, suffix: "+", label: "Analytics Solutions Delivered" },
    { value: 35, suffix: "%", label: "Faster Decision-Making" },
    { value: 4, suffix: ".0", label: "GPA (MS Business Analytics)" },
    { value: 3, suffix: ".5 yrs", label: "Industry Experience" },
  ];

  const projects: Project[] = [
    {
      id: "patent",
      title: "Student Patent Novelty Check",
      subtitle: "Full-stack AI patent analysis platform",
      description: "Built a full-stack AI-powered patent analysis platform that takes a natural language idea description, classifies it using CPC codes, retrieves live patents from Google Patents via SerpAPI, and re-ranks results using semantic embeddings, returning the top 3 to 5 most similar patents with explainable similarity scores and matched concept reasoning.",
      detail: "The technical challenge was building a production-grade system: async job queues (Redis + RQ) for long-running ranking tasks, PBKDF2 session auth with role-based access, a user feedback loop for continuous model improvement, and SQL logging capturing every search request. Designed to be scalable, interpretable, and genuinely useful.",
      tags: ["FastAPI", "Python", "Next.js", "Redis + RQ", "SQLite", "Semantic Search", "Embeddings", "SerpAPI", "Full-Stack", "Auth System"],
      image: "/patent-project.png",
      icon: <Search className="h-12 w-12" />,
      insights: ["Multi-stage retrieval pipeline: CPC classification, live patent fetch, semantic re-ranking", "Production-grade architecture: async queues, role-based auth, feedback logging", "Explainable AI outputs: similarity scores and matched concept reasoning per result", "Designed for real users: pilot launch with UMass Boston students and faculty"],
    },
    {
      id: "bestbuy",
      title: "Best Buy Laptop Pricing Analytics",
      subtitle: "Pricing, discount, and product-positioning analysis",
      description: "Built an end-to-end analytics pipeline to identify what drives laptop pricing and discounting across Best Buy's catalog. Collected raw product listings, structured them into a SQLite database, and applied machine learning segmentation to surface how product attributes, specs, and visibility signals correlate with price positioning and discount behaviour.",
      detail: "The analysis uncovered meaningful patterns: premium specs alone do not determine price. Visibility, review volume, and category positioning all play a role. The project moves from raw web data to a structured business insight workflow, the kind of analysis a retail analyst or category manager would actually use.",
      tags: ["Pricing Analysis", "Business Insight", "Web Data", "Python", "Machine Learning", "SQLite"],
      image: "/bestbuy-project.png",
      icon: <Database className="h-12 w-12" />,
      insights: ["Built a full data pipeline from raw web collection to structured SQLite database", "Applied ML segmentation to identify pricing tiers and discount drivers", "Discovered that visibility and review signals influence discounting as much as specs", "Produced category-level insights on positioning strategy across laptop segments"],
    },
    {
      id: "spotify",
      title: "Spotify Dashboard",
      subtitle: "Business intelligence storytelling through dashboard design",
      description: "Designed a Power BI dashboard analyzing the top-performing songs of 2023 using the Onyx Data dataset. Built KPIs for energy, popularity, and stream counts benchmarked against genre averages to surface listening trends and outliers.",
      detail: "The design challenge was metric selection and visual hierarchy, deciding which KPIs tell the real story and structuring the layout so a user reaches insight without hunting for it. Built using DAX, Power Query, and custom visuals. Published on LinkedIn.",
      tags: ["Business Intelligence", "Dashboard Design", "Storytelling", "Power BI", "Data Modeling"],
      image: "/spotify.png",
      icon: <Music4 className="h-12 w-12" />,
      insights: ["Prioritized clarity over visual overload", "Focused on how users consume information, not just how data looks", "Demonstrated business storytelling through dashboard structure"],
    },
  ];

  const experience: Experience[] = [
    {
      company: "University of Massachusetts Boston",
      title: "Graduate Research Assistant – Data Engineering & Analytics",
      period: "Sep 2025 – Present",
      location: "Boston, MA",
      bullets: [
        "Architected a full-stack patent analysis platform from the ground up using FastAPI, Python, Next.js, SQLite, and Redis, enabling structured intake of 10+ idea attributes and real-time semantic similarity analysis.",
        "Engineered a multi-stage retrieval pipeline: a CPC classification layer converts natural language inputs into targeted patent queries, live data fetched via SerpAPI (Google Patents), then re-ranked using embedding-based semantic similarity with explainable scores and matched concept reasoning per result.",
        "Built queue-based async processing (Redis + RQ) for long-running ranking tasks; implemented session-based auth (PBKDF2), role-based access (student and admin), user feedback voting, and SQL logging capturing 100% of search requests.",
        "Collaborated with the Dean of the College of Management to align the platform with real faculty and student needs, preparing for a pilot launch across the college.",
      ],
    },
    {
      company: "Cypress Atlantic",
      title: "Data & Business Analytics Intern",
      period: "Jun 2025 – Sep 2025",
      location: "Boston, MA",
      bullets: [
        "Engineered automated ETL pipelines integrating POS sales data, OCR invoice extraction, and Google Drive API to process 24+ months of transactional records with over 95% structured data accuracy.",
        "Streamlined ingestion of 10 to 20 vendor invoices per month, eliminating manual data entry.",
        "Built 6+ Power BI dashboards tracking revenue, COGS, labor costs, and operating expenses, surfacing margin drivers and cost leakage for SMB acquisition decisions.",
        "Applied reconciliation logic across POS and reporting systems to identify a 0.5 to 1% revenue variance, giving leadership a clearer picture of true business performance.",
      ],
    },
    {
      company: "Thorogood",
      title: "Manager – Data and Analytics Consulting",
      period: "Jun 2023 – Jun 2024",
      location: "Bangalore, India",
      promoted: true,
      bullets: [
        "Promoted to Manager after 2.5 years as Consultant, recognized for consistently high delivery standards and client impact across supply chain and finance engagements.",
        "Led a cross-functional India and U.S. team to design a scalable supply chain data pipeline, reducing logistics bottlenecks by 20% through optimized distribution routes and operational insights.",
        "Introduced 8+ new supply chain KPIs that improved real-time visibility into SKU movement, fulfillment lag, and shelf performance for client leadership teams.",
        "Supervised and mentored 3 junior analysts across 5 to 10 Power BI dashboard projects; conducted quarterly performance reviews and training sessions, improving team retention by 15%.",
      ],
    },
    {
      company: "Thorogood",
      title: "Data and Analytics Consultant",
      period: "Dec 2020 – Jun 2023",
      location: "Bangalore, India",
      bullets: [
        "Delivered 15+ scalable analytics solutions across supply chain and finance clients, including ETL pipelines, data warehouses, and Power BI dashboards, enabling up to 35% faster decision-making.",
        "Conducted end-to-end business analysis for global clients: gathered stakeholder requirements, performed root cause analysis, and translated findings into KPI frameworks and data models; introduced 8+ new KPIs improving visibility into SKU movement, inventory planning, and demand fulfillment.",
        "Led migration of 6 complex Tableau dashboards into scalable Power BI reports; recognized in the Unilever client newsletter for outstanding contribution to this initiative.",
        "Represented Thorogood at 3 international events showcasing analytics solutions to 150+ professionals, securing 10+ qualified leads per event; optimized 5+ client proposals supporting new business engagements.",
      ],
    },
  ];

  const skillGroups = [
    {
      title: "Business Intelligence & Analysis",
      items: [
        { name: "Power BI", icon: <BarChart3 className="h-5 w-5" />, level: 95 },
        { name: "Excel & DAX", icon: <FileText className="h-5 w-5" />, level: 90 },
        { name: "Tableau", icon: <LayoutDashboard className="h-5 w-5" />, level: 85 },
        { name: "Dashboard Design", icon: <LayoutDashboard className="h-5 w-5" />, level: 90 },
        { name: "Requirements Gathering", icon: <Briefcase className="h-5 w-5" />, level: 88 },
        { name: "Root Cause Analysis", icon: <Search className="h-5 w-5" />, level: 85 },
      ],
    },
    {
      title: "Data Engineering & Automation",
      items: [
        { name: "Python", icon: <Code2 className="h-5 w-5" />, level: 88 },
        { name: "SQL", icon: <Database className="h-5 w-5" />, level: 92 },
        { name: "Azure Data Factory", icon: <Factory className="h-5 w-5" />, level: 80 },
        { name: "FastAPI", icon: <Code2 className="h-5 w-5" />, level: 82 },
        { name: "Redis & RQ", icon: <Workflow className="h-5 w-5" />, level: 75 },
        { name: "ETL & Pipelines", icon: <Bot className="h-5 w-5" />, level: 88 },
        { name: "Databricks", icon: <Workflow className="h-5 w-5" />, level: 78 },
        { name: "Alteryx", icon: <Bot className="h-5 w-5" />, level: 80 },
      ],
    },
    {
      title: "Supply Chain & Advanced Analytics",
      items: [
        { name: "Supply Chain Analytics", icon: <Truck className="h-5 w-5" />, level: 90 },
        { name: "Machine Learning", icon: <Cpu className="h-5 w-5" />, level: 78 },
        { name: "Demand Forecasting", icon: <BarChart3 className="h-5 w-5" />, level: 85 },
        { name: "S&OP Planning", icon: <Truck className="h-5 w-5" />, level: 82 },
        { name: "KPI Design", icon: <BarChart3 className="h-5 w-5" />, level: 92 },
        { name: "Semantic Search", icon: <Search className="h-5 w-5" />, level: 78 },
      ],
    },
  ];

  const certifications: Certification[] = [
    { title: "Salesforce Certified Platform Administrator", issuer: "Salesforce", issued: "Issued March 2026", file: "/salesforce-platform-admin.png" },
    { title: "Microsoft Certified: Power BI Data Analyst Associate", issuer: "Microsoft", issued: "Credential", file: "/powerbi-cert.pdf" },
    { title: "Python Essential Training", issuer: "LinkedIn Learning", issued: "Issued March 2024", file: "/python-essential-training.pdf" },
    { title: "Six Sigma Foundations", issuer: "LinkedIn Learning", issued: "Issued January 2025", file: "/six-sigma-foundations.pdf" },
    { title: "R for Data Science: Analysis and Visualization", issuer: "LinkedIn Learning", issued: "Issued September 2024", file: "/r-data-science-analysis-visualization.pdf" },
  ];

  const sections = useMemo(() => [
    { id: "home" as SectionId, label: "Home", icon: <Home className="h-4 w-4" /> },
    { id: "skills" as SectionId, label: "Skills", icon: <Sparkles className="h-4 w-4" /> },
    { id: "education" as SectionId, label: "Education", icon: <GraduationCap className="h-4 w-4" /> },
    { id: "experience" as SectionId, label: "Experience", icon: <Briefcase className="h-4 w-4" /> },
    { id: "projects" as SectionId, label: "Projects", icon: <FolderKanban className="h-4 w-4" /> },
    { id: "achievements" as SectionId, label: "Achievements", icon: <Trophy className="h-4 w-4" /> },
    { id: "contact" as SectionId, label: "Contact", icon: <Contact className="h-4 w-4" /> },
  ], []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);
      setShowFloatingCTA(scrollTop > 600);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) setActiveSection(visible[0].target.id as SectionId);
      },
      { threshold: [0.2, 0.4, 0.6], rootMargin: "-20% 0px -35% 0px" }
    );
    sections.forEach((s) => { const el = document.getElementById(s.id); if (el) observer.observe(el); });
    return () => { window.removeEventListener("scroll", handleScroll); observer.disconnect(); };
  }, [sections]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className={"min-h-screen transition-colors duration-300 " + (darkMode ? "bg-slate-950 text-slate-100" : "bg-[radial-gradient(circle_at_top_left,_#f8fbff,_#dbeafe_22%,_#c4b5fd_58%,_#bfdbfe_78%,_#e2e8f0_100%)] text-slate-900")}>

      {/* Scroll progress */}
      <div className="fixed left-0 top-0 z-[60] h-1 bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600 transition-all duration-150" style={{ width: `${scrollProgress}%` }} />

      {/* Floating CTA */}
      {showFloatingCTA && !ctaDismissed && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
          <motion.a whileHover={{ scale: 1.05 }} href="mailto:adarshsathya27@gmail.com" onClick={() => track("floating_cta_email")} className="flex items-center gap-2 rounded-2xl bg-cyan-700 px-5 py-3 text-sm font-bold text-white shadow-[0_8px_30px_rgba(8,145,178,0.4)] transition hover:bg-cyan-600">
            <Mail className="h-4 w-4" /> Let&apos;s Connect
          </motion.a>
          <button onClick={() => setCtaDismissed(true)} className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800/80 text-white backdrop-blur-sm transition hover:bg-slate-700">
            <X className="h-4 w-4" />
          </button>
        </motion.div>
      )}

      {/* Ambient blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <motion.div animate={{ y: [0, -12, 0], x: [0, 8, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute left-[-6rem] top-16 h-72 w-72 rounded-full bg-cyan-400/30 blur-3xl" />
        <motion.div animate={{ y: [0, 10, 0], x: [0, -10, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} className="absolute right-[-4rem] top-48 h-80 w-80 rounded-full bg-fuchsia-400/20 blur-3xl" />
        <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-10 left-1/3 h-72 w-72 rounded-full bg-indigo-400/20 blur-3xl" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-black/10 bg-slate-950/82 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-black tracking-tight text-white md:text-3xl">Adarsh Sathyanarayanan</h1>
              <span className="hidden animate-pulse rounded-full bg-green-500/20 px-2.5 py-1 text-xs font-bold text-green-400 ring-1 ring-green-500/30 md:inline-flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-green-400"></span>Open to Work</span>
            </div>
            <p className="mt-0.5 text-sm text-slate-400 md:text-base">
              <Typewriter words={["Data Engineer", "Business Analyst", "Supply Chain Analytics", "ETL Pipeline Builder", "Power BI Expert"]} />
            </p>
          </div>
          <nav className="flex flex-wrap items-center gap-2 text-sm font-semibold">
            <button onClick={() => setDarkMode(!darkMode)} className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-cyan-500/15" aria-label="Toggle dark mode">{darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}</button>
            {sections.map((section) => {
              const isActive = activeSection === section.id;
              return (
                <button key={section.id} onClick={() => scrollToSection(section.id)} className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition md:px-4 md:py-2 md:text-sm ${isActive ? "border-cyan-300/50 bg-cyan-400/20 text-white shadow-[0_0_20px_rgba(34,211,238,0.18)]" : "border-white/10 bg-white/5 text-white hover:bg-cyan-500/15"}`}>
                  {section.icon}{section.label}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* ── HERO ── */}
      <section id="home" className="relative mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-2 md:items-center md:py-24">
        <Reveal>
          <div className="flex justify-center">
            <div className="relative h-[300px] w-[300px] overflow-hidden rounded-full shadow-[0_30px_70px_rgba(0,0,0,0.18)] ring-4 ring-white/25 md:h-[480px] md:w-[480px]">
              <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-br from-white/15 to-transparent" />
              <img src="/profile.png" alt="Adarsh Sathyanarayanan" className="block h-full w-full scale-[1.03] object-cover object-top" />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-cyan-700">Available from May 2026 · Boston, MA</p>
            <h2 className="text-4xl font-black leading-tight tracking-tight text-slate-950 md:text-6xl">
              Consultant-turned-engineer.
              <span className="block bg-gradient-to-r from-cyan-600 via-sky-700 to-indigo-700 bg-clip-text text-transparent">Pipelines, not just dashboards.</span>
            </h2>
            <p className={"mt-6 max-w-2xl text-lg leading-9 md:text-xl md:leading-10 " + (darkMode ? "text-slate-300" : "text-slate-700")}>
              I bridge the gap between business problems and data infrastructure. 3.5 years delivering end-to-end analytics across supply chain, logistics, and financial operations for global clients. MS in Business Analytics (GPA 4.0) at UMass Boston.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <motion.a whileHover={{ y: -2, scale: 1.02 }} href="/Resume.pdf" target="_blank" rel="noreferrer" onClick={() => track("resume_click", { location: "hero" })} className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-6 py-3 text-base font-semibold text-white shadow-lg transition hover:bg-slate-800">
                <FileText className="h-5 w-5" /> Download Resume
              </motion.a>
              <motion.a whileHover={{ y: -2, scale: 1.02 }} href="https://www.linkedin.com/in/adarshsathyanarayanan/" target="_blank" rel="noreferrer" onClick={() => track("linkedin_click", { location: "hero_button" })} className="inline-flex items-center gap-2 rounded-2xl border-2 border-slate-900 px-6 py-3 text-base font-semibold transition hover:bg-slate-900 hover:text-white">
                <ArrowUpRight className="h-5 w-5" /> View LinkedIn
              </motion.a>
            </div>
            <div className="mt-5 flex items-center gap-5">
              <a href="https://www.linkedin.com/in/adarshsathyanarayanan/" target="_blank" rel="noreferrer" onClick={() => track("linkedin_click", { location: "hero_icon" })} className="text-[#0A66C2] transition hover:scale-110" aria-label="LinkedIn"><Linkedin className="h-9 w-9" /></a>
              <a href="https://wa.me/18573399180" target="_blank" rel="noreferrer" onClick={() => track("whatsapp_click", { location: "hero" })} className="text-green-600 transition hover:scale-110" aria-label="WhatsApp"><FaWhatsapp className="h-9 w-9" /></a>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {["Data Engineering & Pipelines", "Business Analysis & KPIs", "Supply Chain Analytics"].map((item, idx) => (
                <Reveal key={item} delay={0.1 + idx * 0.05}>
                  <GlassCard className="p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-500">Focus Area</p>
                    <p className="mt-1.5 text-sm font-semibold text-slate-800">{item}</p>
                  </GlassCard>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── STAT COUNTER STRIP ── */}
      <section className="border-y border-white/30 bg-slate-900/90 backdrop-blur-sm">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px md:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08}>
              <div className="flex flex-col items-center px-8 py-10 text-center">
                <p className="text-4xl font-black text-white md:text-5xl">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-2 text-sm font-medium text-slate-400">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── SOCIAL PROOF STRIP ── */}
      <section className={"border-b border-white/20 backdrop-blur-sm " + (darkMode ? "bg-slate-900/80" : "bg-white/40")}>
        <div className="mx-auto max-w-7xl px-6 py-6">
          <p className="mb-5 text-center text-xs font-bold uppercase tracking-[0.25em] text-slate-500">Experience & Recognition</p>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {[
              { name: "Thorogood", note: "3.5 years · Manager" },
              { name: "UMass Boston", note: "GPA 4.0 · MS Analytics" },
              { name: "Unilever", note: "Client Newsletter Feature" },
              { name: "Cypress Atlantic", note: "Data & Analytics Intern" },
              { name: "Beta Gamma Sigma", note: "Academic Excellence Award" },
            ].map((org) => (
              <div key={org.name} className="flex flex-col items-center gap-1">
                <span className={"text-base font-black " + (darkMode ? "text-slate-200" : "text-slate-800")}>{org.name}</span>
                <span className="text-xs text-slate-500">{org.note}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" className="mx-auto max-w-7xl px-6 py-14 md:py-20">
        <Reveal>
          <h2 className="mb-3 text-5xl font-black tracking-tight md:text-6xl">Skills</h2>
          <p className={"mb-10 max-w-3xl text-lg leading-8 " + (darkMode ? "text-slate-400" : "text-slate-700")}>From ETL pipelines and cloud platforms to KPI design and supply chain analytics. These are the tools I use in production.</p>
        </Reveal>
        <div className="grid gap-8 lg:grid-cols-3">
          {skillGroups.map((group, gi) => (
            <Reveal key={group.title} delay={gi * 0.06}>
              <GlassCard className="p-6">
                <h3 className="mb-5 text-xl font-black text-slate-900">{group.title}</h3>
                <div className="grid gap-3">
                  {group.items.map((skill) => (
                    <SkillBar key={skill.name} name={skill.name} icon={skill.icon} level={skill.level} />
                  ))}
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── EDUCATION ── */}
      <section id="education" className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <Reveal>
          <div className="mb-10">
            <h2 className="text-5xl font-black tracking-tight md:text-6xl">Education</h2>
            <p className={"mt-4 max-w-3xl text-lg leading-8 " + (darkMode ? "text-slate-400" : "text-slate-700")}>4.0 GPA in Business Analytics with a supply chain specialization, built on an engineering foundation from RV College of Engineering.</p>
          </div>
        </Reveal>
        <div className="space-y-6">
          <Reveal>
            <GlassCard className="p-8">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="flex items-center gap-3">
                  <GraduationCap className="h-7 w-7 shrink-0 text-cyan-800" />
                  <div>
                    <h3 className="text-2xl font-black md:text-3xl">University of Massachusetts Boston</h3>
                    <p className="text-lg font-bold">Master of Science in Business Analytics</p>
                    <p className="text-base italic text-slate-600">Supply Chain Management · GPA: 4.0 / 4.0</p>
                  </div>
                </div>
                <span className="shrink-0 rounded-full bg-cyan-700/10 px-4 py-1.5 text-sm font-bold text-cyan-800">2024 – 2026</span>
              </div>
              <div className="mt-6">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Relevant Coursework</p>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                  {["Machine Learning", "Supply Chain Management", "Operational Risk Management", "Linear Programming", "Business Programming", "Project Management", "Big Data – AWS", "Business Intelligence", "Management Decision Model", "Multivariate and Regression"].map((course) => (
                    <div key={course} className="rounded-xl border border-cyan-100 bg-cyan-50/80 px-3 py-2 text-xs font-semibold text-slate-700">{course}</div>
                  ))}
                </div>
              </div>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.06}>
            <GlassCard className="p-8">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-3">
                  <GraduationCap className="h-7 w-7 shrink-0 text-cyan-800" />
                  <div>
                    <h3 className="text-2xl font-black md:text-3xl">RV College of Engineering</h3>
                    <p className="text-lg font-bold">BE in Electrical & Electronics Engineering</p>
                    <p className="text-base italic text-slate-600">Best Final Project Award</p>
                  </div>
                </div>
                <span className="shrink-0 rounded-full bg-cyan-700/10 px-4 py-1.5 text-sm font-bold text-cyan-800">2016 – 2020</span>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      {/* ── EXPERIENCE TIMELINE ── */}
      <section id="experience" className="mx-auto max-w-7xl px-6 py-14 md:py-20">
        <Reveal>
          <div className="mb-12">
            <h2 className="text-5xl font-black tracking-tight md:text-6xl">Experience</h2>
            <p className={"mt-4 max-w-3xl text-lg leading-8 " + (darkMode ? "text-slate-400" : "text-slate-700")}>3.5 years delivering across consulting, internships, and applied research — pipelines, dashboards, and frameworks for global clients.</p>
          </div>
        </Reveal>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 hidden h-full w-0.5 bg-gradient-to-b from-cyan-400 via-sky-500 to-indigo-500 md:left-8 lg:block" />

          <div className="space-y-8">
            {experience.map((role, idx) => (
              <Reveal key={`${role.company}-${role.title}`} delay={idx * 0.06}>
                <div className="relative lg:pl-20">
                  {/* Timeline dot */}
                  <div className="absolute left-4 top-8 hidden h-5 w-5 -translate-x-1/2 rounded-full border-4 border-cyan-400 bg-white shadow-[0_0_0_4px_rgba(34,211,238,0.2)] lg:block" />

                  <DarkCard className="p-7">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-2xl font-black">{role.company}</h3>
                          {role.promoted && (
                            <span className="rounded-full bg-cyan-400/20 px-3 py-0.5 text-xs font-bold text-cyan-300 ring-1 ring-cyan-400/30">↑ Promoted</span>
                          )}
                        </div>
                        <p className="mt-1 text-lg italic text-slate-300">{role.title}</p>
                        <p className="mt-1 flex items-center gap-2 text-sm text-slate-400">
                          <MapPin className="h-3.5 w-3.5" />{role.location}
                        </p>
                      </div>
                      <span className="shrink-0 rounded-full bg-white/10 px-4 py-1.5 text-sm font-bold text-cyan-300">{role.period}</span>
                    </div>
                    <ul className="mt-5 space-y-2.5">
                      {role.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-3 text-sm leading-7 text-slate-200 md:text-base">
                          <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </DarkCard>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="mx-auto max-w-7xl px-6 py-14 md:py-20">
        <Reveal>
          <div className="mb-12">
            <h2 className="text-5xl font-black tracking-tight md:text-7xl">Projects</h2>
            <p className={"mt-4 max-w-3xl text-lg leading-8 " + (darkMode ? "text-slate-400" : "text-slate-700")}>Full-stack AI system design, retail pricing analytics, and BI storytelling. Each starts with a real business question.</p>
          </div>
        </Reveal>
        <div className="space-y-24">
          {projects.map((project, index) => (
            <div key={project.id} className={`grid items-center gap-12 md:grid-cols-2 ${index % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}>
              <Reveal delay={0.03}>
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-800">Featured Project</p>
                  <h3 className="mt-3 text-4xl font-black leading-tight md:text-5xl">{project.title}</h3>
                  <p className="mt-2 text-xl italic text-slate-600">{project.subtitle}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-cyan-700/10 px-3 py-1 text-xs font-semibold text-cyan-800">{tag}</span>
                    ))}
                  </div>
                  <p className="mt-7 text-lg leading-9 text-slate-800 md:text-xl">{project.description}</p>
                  <p className="mt-4 text-base leading-8 text-slate-600">{project.detail}</p>

                  {project.id === "patent" && <ProjectExplainer businessValue="Patent research is overwhelming for non-experts. Most students and early-stage founders give up before they even start. This platform reduces that friction dramatically. You describe your idea in plain English and get back structured, ranked, explainable results. The goal is confident early-stage decision-making, not replacing a patent attorney." technicalApproach="Four-stage pipeline: (1) natural language input parsed and mapped to CPC classification codes, (2) live patent data fetched via SerpAPI hitting Google Patents in real time, (3) results re-ranked using embedding-based semantic similarity between the idea and each patent abstract, (4) an explainability layer surfaces matched concepts and similarity reasoning per result. Backend runs async via Redis + RQ so ranking jobs do not block the API. Auth is session-based with PBKDF2 hashing and role support." interviewVersion="I built a full-stack AI platform for patent novelty analysis. The core technical challenge was the retrieval and ranking pipeline: converting free-text ideas into CPC-classified queries, fetching live patent data, then applying semantic embeddings to re-rank by relevance. I also built the production infrastructure: async job queues, session auth, feedback collection, and logging. End goal was a tool that a non-expert could actually use and trust." />}
                  {project.id === "bestbuy" && <ProjectExplainer businessValue="Retailers and brands constantly ask: why are our products discounted more than competitors? This project builds the analytical foundation to answer that. By structuring raw product data and applying segmentation, it surfaces the attributes and signals that correlate with price positioning, useful for category management, competitive analysis, and pricing strategy." technicalApproach="Raw product listings collected and cleaned into a structured SQLite database. Features engineered from specs, pricing, review counts, and category metadata. A machine learning segmentation model then groups products by pricing behaviour, producing segment profiles showing which attribute combinations correlate with different discount levels." interviewVersion="I built a pricing analytics pipeline for retail product data. Starting from raw web-collected listings, I engineered features, built a SQLite data model, and applied ML segmentation to understand discount and pricing patterns. The key finding was that visibility metrics like review volume and ranking position predict discounting behaviour as reliably as product specs. That is the kind of insight a category manager or pricing analyst would act on." />}
                  {project.id === "spotify" && (<><DashboardPreview /><ProjectExplainer businessValue="This project is about making data easy to consume. The business value was not just showing numbers, but helping a user quickly understand performance, trends, and comparisons without getting lost in the dashboard." technicalApproach="I focused on layout, metric selection, flow, and visual hierarchy. The challenge was deciding what to include, what to simplify, and how to guide the user naturally through the information." interviewVersion="I would explain this as a dashboard design and business storytelling project. The complexity was in turning dense information into something simple, relevant, and genuinely useful for decision-making." /></>)}

                  {project.insights && (
                    <div className="mt-8">
                      <h4 className="text-xl font-black text-slate-900">Key Takeaways</h4>
                      <ul className="mt-4 space-y-2.5">
                        {project.insights.map((item) => (
                          <li key={item} className="flex gap-3 text-base leading-7 text-slate-700">
                            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-cyan-600" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </Reveal>
              <Reveal delay={0.08}>
                <div className="flex justify-center md:justify-end">
                  <ProjectVisual image={project.image} alt={project.title} icon={project.icon} title={project.title} subtitle={project.subtitle} />
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </section>

      {/* ── ACHIEVEMENTS ── */}
      <section id="achievements" className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <Reveal><h2 className="mb-10 text-5xl font-black tracking-tight md:mb-14 md:text-6xl">Achievements</h2></Reveal>
        <Reveal>
          <GlassCard className="mb-10 p-8">
            <div className="mb-5 flex items-center gap-3">
              <Trophy className="h-7 w-7 text-cyan-800" />
              <h3 className="text-3xl font-black">Beta Gamma Sigma Certificate</h3>
            </div>
            <div className="flex justify-center">
              <img src="/bgs.png" alt="Beta Gamma Sigma Certificate" className="max-h-[650px] w-full max-w-3xl rounded-2xl border border-black/10 object-contain shadow-md" />
            </div>
            <p className="mt-4 text-center text-sm text-slate-500">Beta Gamma Sigma – University of Massachusetts Boston</p>
          </GlassCard>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2">
          <Reveal>
            <DarkCard className="p-8">
              <div className="mb-4 flex items-center gap-3"><Trophy className="h-7 w-7" /><h3 className="text-2xl font-black">Academic & Professional</h3></div>
              <ul className="mt-4 space-y-3 text-base leading-8">
                {["Passion Award – Thorogood (2022) for leading an automated end-to-end supply chain analytics system", "Beta Gamma Sigma – University of Massachusetts Boston", "4.0 GPA – Master of Science in Business Analytics", "Salesforce Certified Platform Administrator", "Microsoft Certified: Power BI Data Analyst Associate", "Best Final Project Award – Electrical & Electronics Engineering"].map((item) => (
                  <li key={item} className="flex gap-3"><ChevronRight className="mt-1 h-4 w-4 shrink-0 text-cyan-400" /><span>{item}</span></li>
                ))}
              </ul>
            </DarkCard>
          </Reveal>
          <Reveal delay={0.05}>
            <DarkCard className="p-8">
              <div className="mb-4 flex items-center gap-3"><Award className="h-7 w-7" /><h3 className="text-2xl font-black">Thorogood Recognition</h3></div>
              <ul className="mt-4 space-y-3 text-base leading-8">
                {["Thorogood Star Award – November 2022", "Thorogood Star Award – January 2023", "Thorogood Star Award – June 2023", "Featured in the Unilever client newsletter for outstanding work on the Tableau-to-Power BI migration initiative."].map((item) => (
                  <li key={item} className="flex gap-3"><ChevronRight className="mt-1 h-4 w-4 shrink-0 text-cyan-400" /><span>{item}</span></li>
                ))}
              </ul>
            </DarkCard>
          </Reveal>
        </div>

        <Reveal delay={0.08}>
          <div className="mt-10">
            <h3 className="mb-6 text-3xl font-black">Certifications</h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {certifications.map((cert) => (
                <motion.a key={cert.title} whileHover={{ y: -4, scale: 1.01 }} href={cert.file} target="_blank" rel="noreferrer" onClick={() => track("certificate_click", { title: cert.title })} className="rounded-2xl border border-white/60 bg-white/55 p-5 shadow-sm transition hover:shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="rounded-xl bg-cyan-700/10 p-3 text-cyan-800"><BadgeCheck className="h-5 w-5" /></div>
                    <div>
                      <h4 className="text-sm font-black leading-6 text-slate-900">{cert.title}</h4>
                      <p className="mt-0.5 text-xs font-medium text-slate-600">{cert.issuer}</p>
                      <p className="text-xs text-slate-500">{cert.issued}</p>
                      <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-800">Open Certificate <ExternalLink className="h-3.5 w-3.5" /></p>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <Reveal><h2 className="mb-10 text-5xl font-black tracking-tight md:mb-14 md:text-6xl">Get in Touch</h2></Reveal>
        <div className="grid gap-10 md:grid-cols-2">
          <Reveal>
            <div>
              <p className="text-lg leading-8 text-slate-700">Open to full-time roles in data engineering, business analytics, and supply chain analytics. Based in Boston, MA and available from May 2026. Feel free to reach out about opportunities, collaborations, or just to talk data.</p>
              <div className="mt-10 space-y-6">
                <div>
                  <h3 className="text-xl font-bold">Phone</h3>
                  <a href="tel:+18573399180" className="mt-1 flex items-center gap-2 text-lg text-slate-800 hover:text-cyan-700"><Phone className="h-4 w-4" />+1 (857) 339-9180</a>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Email</h3>
                  <a href="mailto:adarshsathya27@gmail.com" className="mt-1 flex items-center gap-2 text-lg text-slate-800 hover:text-cyan-700"><Mail className="h-4 w-4" />adarshsathya27@gmail.com</a>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Connect Instantly</h3>
                  <div className="mt-3 flex flex-wrap gap-3">
                    <a href="https://www.linkedin.com/in/adarshsathyanarayanan/" target="_blank" rel="noreferrer" onClick={() => track("linkedin_click", { location: "contact" })} className="inline-flex items-center gap-2 rounded-xl bg-[#0A66C2] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0958a8]"><Linkedin className="h-4 w-4" />LinkedIn</a>
                    <a href="https://wa.me/18573399180" target="_blank" rel="noreferrer" onClick={() => track("whatsapp_click", { location: "contact" })} className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"><FaWhatsapp className="h-4 w-4" />WhatsApp</a>
                    <a href="/Resume.pdf" target="_blank" rel="noreferrer" onClick={() => track("resume_click", { location: "contact" })} className="inline-flex items-center gap-2 rounded-xl bg-slate-800 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"><FileText className="h-4 w-4" />Resume</a>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <GlassCard className="p-6">
              {formStatus === "success" ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center gap-4 py-16 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <BadgeCheck className="h-8 w-8" />
                  </div>
                  <h4 className="text-2xl font-black text-slate-900">Message sent!</h4>
                  <p className="text-slate-600">Thanks for reaching out. I will get back to you within 24 hours.</p>
                  <button onClick={() => setFormStatus("idle")} className="mt-2 rounded-xl border border-slate-300 px-6 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">Send another</button>
                </motion.div>
              ) : (
                <form className="grid gap-5" onSubmit={async (e) => {
                  e.preventDefault();
                  setFormStatus("sending");
                  track("contact_form_submit", { source: "formspree" });
                  try {
                    const res = await fetch("https://formspree.io/f/xlgaowlk", {
                      method: "POST",
                      headers: { "Accept": "application/json" },
                      body: new FormData(e.currentTarget),
                    });
                    if (res.ok) {
                      setFormStatus("success");
                    } else {
                      setFormStatus("error");
                    }
                  } catch {
                    setFormStatus("error");
                  }
                }}>
                  <div className="grid gap-5 md:grid-cols-2">
                    <div><label className="mb-2 block text-sm font-bold">First Name</label><input type="text" name="firstName" required className="w-full rounded-xl border-2 border-black/70 bg-transparent px-4 py-3 outline-none focus:border-cyan-600" /></div>
                    <div><label className="mb-2 block text-sm font-bold">Last Name</label><input type="text" name="lastName" className="w-full rounded-xl border-2 border-black/70 bg-transparent px-4 py-3 outline-none focus:border-cyan-600" /></div>
                  </div>
                  <div className="grid gap-5 md:grid-cols-2">
                    <div><label className="mb-2 block text-sm font-bold">Your Email</label><input type="email" name="email" required className="w-full rounded-xl border-2 border-black/70 bg-transparent px-4 py-3 outline-none focus:border-cyan-600" /></div>
                    <div><label className="mb-2 block text-sm font-bold">Subject</label><input type="text" name="subject" className="w-full rounded-xl border-2 border-black/70 bg-transparent px-4 py-3 outline-none focus:border-cyan-600" /></div>
                  </div>
                  <div><label className="mb-2 block text-sm font-bold">Message</label><textarea rows={5} name="message" required className="w-full rounded-xl border-2 border-black/70 bg-transparent px-4 py-3 outline-none focus:border-cyan-600" /></div>
                  {formStatus === "error" && (
                    <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">Something went wrong. Please email me directly at adarshsathya27@gmail.com</p>
                  )}
                  <button type="submit" disabled={formStatus === "sending"} className="w-fit rounded-xl bg-cyan-700 px-8 py-3 text-base font-bold text-white transition hover:bg-cyan-600 hover:shadow-lg disabled:opacity-60">
                    {formStatus === "sending" ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </GlassCard>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="mt-12 border-t border-black/10 bg-slate-900 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 md:grid-cols-3">
          <div>
            <h3 className="text-xl font-black">Adarsh Sathyanarayanan</h3>
            <p className="mt-3 text-sm leading-7 text-slate-400">Consultant-turned-engineer. Building the pipelines, KPI frameworks, and AI-driven analytics systems that turn raw data into decisions that actually get made.</p>
          </div>
          <div>
            <h4 className="text-base font-bold">Contact</h4>
            <div className="mt-4 space-y-2.5 text-sm text-slate-400">
              <p className="flex items-center gap-2"><Mail className="h-4 w-4" />adarshsathya27@gmail.com</p>
              <p className="flex items-center gap-2"><Phone className="h-4 w-4" />+1 857-339-9180</p>
              <p className="flex items-center gap-2"><MapPin className="h-4 w-4" />Boston, MA · Available May 2026</p>
            </div>
          </div>
          <div>
            <h4 className="text-base font-bold">Links</h4>
            <div className="mt-4 flex flex-wrap gap-3">
              <a href="https://www.linkedin.com/in/adarshsathyanarayanan/" target="_blank" rel="noreferrer" onClick={() => track("linkedin_click", { location: "footer" })} className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold transition hover:bg-white/20"><Linkedin className="h-4 w-4" />LinkedIn</a>
              <a href="/Resume.pdf" target="_blank" rel="noreferrer" onClick={() => track("resume_click", { location: "footer" })} className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold transition hover:bg-white/20"><FileText className="h-4 w-4" />Resume</a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 px-6 py-4 text-center text-xs text-slate-600">
          © {new Date().getFullYear()} Adarsh Sathyanarayanan · Boston, MA
        </div>
      </footer>
    </div>
  );
}
