"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { track } from "@vercel/analytics";
import {
  Home,
  FolderKanban,
  Trophy,
  Mail,
  MapPin,
  Phone,
  Linkedin,
  FileText,
  GraduationCap,
  Briefcase,
  Database,
  BarChart3,
  Truck,
  Search,
  Cpu,
  Award,
  Workflow,
  Code2,
  Bot,
  Factory,
  LayoutDashboard,
  Music4,
  Contact,
  Sparkles,
  ChevronRight,
  ExternalLink,
  BadgeCheck,
  ArrowUpRight,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

type SectionId =
  | "home"
  | "skills"
  | "education"
  | "experience"
  | "projects"
  | "achievements"
  | "contact";

type Project = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  detail: string;
  tags: string[];
  image?: string;
  icon: React.ReactNode;
  insights?: string[];
};

type Experience = {
  company: string;
  title: string;
  period: string;
  bullets: string[];
};

type Certification = {
  title: string;
  issuer: string;
  issued: string;
  file: string;
};

function Reveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay }}
    >
      {children}
    </motion.div>
  );
}

function GlassCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={`rounded-3xl border border-white/50 bg-white/60 backdrop-blur-sm shadow-[0_18px_40px_rgba(15,23,42,0.08)] ${className}`}
    >
      {children}
    </motion.div>
  );
}

function DarkFeatureCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={`rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-950 text-white shadow-[0_18px_40px_rgba(15,23,42,0.24)] ${className}`}
    >
      {children}
    </motion.div>
  );
}

function ProjectVisual({
  image,
  alt,
  icon,
  title,
  subtitle,
}: {
  image?: string;
  alt: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  const [imgError, setImgError] = useState(false);

  if (image && !imgError) {
    return (
      <motion.div whileHover={{ scale: 1.02 }} className="w-full max-w-[620px]">
        <img
          src={image}
          alt={alt}
          className="w-full rounded-[2rem] object-contain shadow-2xl"
          onError={() => setImgError(true)}
        />
      </motion.div>
    );
  }

  return (
    <GlassCard className="flex h-[360px] w-full max-w-[620px] flex-col items-center justify-center p-8">
      <div className="rounded-full bg-cyan-700/10 p-6 text-cyan-800">{icon}</div>
      <h4 className="mt-6 text-center text-2xl font-black md:text-3xl">{title}</h4>
      <p className="mt-3 max-w-md text-center text-base leading-7 text-slate-700 md:text-lg">
        {subtitle}
      </p>
    </GlassCard>
  );
}

function ProjectExplainer({
  businessValue,
  technicalApproach,
  interviewVersion,
}: {
  businessValue: string;
  technicalApproach: string;
  interviewVersion: string;
}) {
  const [tab, setTab] = useState<"business" | "technical" | "interview">(
    "business"
  );

  const contentMap = {
    business: businessValue,
    technical: technicalApproach,
    interview: interviewVersion,
  };

  return (
    <div className="mt-8 rounded-3xl border border-white/50 bg-white/70 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
      <div className="mb-4 flex flex-wrap gap-3">
        <button
          onClick={() => {
            setTab("business");
            track("project_explainer_tab", { tab: "business" });
          }}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
            tab === "business"
              ? "bg-cyan-700 text-white"
              : "bg-slate-100 text-slate-800 hover:bg-slate-200"
          }`}
        >
          Business Perspective
        </button>

        <button
          onClick={() => {
            setTab("technical");
            track("project_explainer_tab", { tab: "technical" });
          }}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
            tab === "technical"
              ? "bg-cyan-700 text-white"
              : "bg-slate-100 text-slate-800 hover:bg-slate-200"
          }`}
        >
          Approach
        </button>

        <button
          onClick={() => {
            setTab("interview");
            track("project_explainer_tab", { tab: "interview" });
          }}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
            tab === "interview"
              ? "bg-cyan-700 text-white"
              : "bg-slate-100 text-slate-800 hover:bg-slate-200"
          }`}
        >
          Interview Version
        </button>
      </div>

      <p className="text-base leading-8 text-slate-700 md:text-lg">
        {contentMap[tab]}
      </p>
    </div>
  );
}

function DashboardPreview() {
  const [view, setView] = useState<"overview" | "engagement" | "trends">(
    "overview"
  );

  const cards =
    view === "overview"
      ? [
          { label: "Top Artist Score", value: "92" },
          { label: "Average Engagement", value: "78%" },
          { label: "Listener Growth", value: "+14%" },
        ]
      : view === "engagement"
      ? [
          { label: "Playlist Adds", value: "12.4K" },
          { label: "Skip Rate", value: "18%" },
          { label: "Save Rate", value: "41%" },
        ]
      : [
          { label: "Weekly Trend", value: "+9.3%" },
          { label: "Top Region", value: "United States" },
          { label: "Momentum", value: "High" },
        ];

  return (
    <div className="mt-8 rounded-[2rem] border border-white/50 bg-white/70 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
      <div className="mb-5 flex flex-wrap gap-3">
        {(["overview", "engagement", "trends"] as const).map((item) => (
          <button
            key={item}
            onClick={() => {
              setView(item);
              track("spotify_preview_view", { view: item });
            }}
            className={`rounded-full px-4 py-2 text-sm font-semibold capitalize transition ${
              view === item
                ? "bg-slate-950 text-white"
                : "bg-slate-100 text-slate-800 hover:bg-slate-200"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.label}
            className="rounded-2xl border border-black/10 bg-gradient-to-br from-cyan-50 to-sky-50 p-5"
          >
            <p className="text-sm font-medium text-slate-600">{card.label}</p>
            <p className="mt-2 text-3xl font-black text-slate-900">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-black/10 bg-slate-950 p-5 text-white">
        <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">
          Preview Insight
        </p>
        <p className="mt-3 text-base leading-7 text-slate-200">
          This preview reflects how I think about dashboards: keep the structure
          simple, focus on the measures that matter, and help a user understand
          the story quickly without being overwhelmed by too many visuals.
        </p>
      </div>
    </div>
  );
}

export default function Page() {
  const [activeSection, setActiveSection] = useState<SectionId>("home");
  const [scrollProgress, setScrollProgress] = useState(0);

  const projects: Project[] = [
    {
      id: "patent",
      title: "Student Patent Novelty Check",
      subtitle: "Early-stage innovation support platform",
      description:
        "Built a platform to help users assess whether an idea may already exist in the patent landscape by making a difficult research process more structured, interpretable, and decision-friendly.",
      detail:
        "The real value of this project was not just searching patents. It was simplifying a process that is usually overwhelming for students and early-stage innovators, and turning it into something clearer, more usable, and more actionable. I focused on how the user moves from uncertainty to a more informed decision.",
      tags: [
        "Product Thinking",
        "Research Workflow",
        "Decision Support",
        "Python",
        "FastAPI",
        "Structured Search",
      ],
      image: "/patent-project.png",
      icon: <Search className="h-12 w-12" />,
      insights: [
        "Made a complex research workflow easier to understand",
        "Focused on clarity, usability, and structured interpretation",
        "Connected backend logic with real user decision-making needs",
      ],
    },
    {
      id: "bestbuy",
      title: "Best Buy Laptop Pricing Analytics",
      subtitle: "Pricing, discount, and product-positioning analysis",
      description:
        "Built an analytics workflow to understand what drives laptop pricing and discounting, and to turn raw online product data into structured business insight.",
      detail:
        "What makes this project important is the business question behind it: why are some products priced or discounted differently from others? I used this project to move from raw product listings to insights around pricing logic, product segmentation, and the signals that may influence discount behaviour.",
      tags: [
        "Pricing Analysis",
        "Business Insight",
        "Web Data",
        "Python",
        "Machine Learning",
        "SQLite",
      ],
      image: "/bestbuy-project.png",
      icon: <Database className="h-12 w-12" />,
      insights: [
        "Linked technical product attributes to pricing patterns",
        "Explored how visibility and engagement may relate to discounting",
        "Turned unstructured online data into a business analysis workflow",
      ],
    },
    {
      id: "spotify",
      title: "Spotify Dashboard",
      subtitle: "Business intelligence storytelling through dashboard design",
      description:
        "Designed a dashboard experience that turns music performance data into simple, relevant, and user-friendly business insight.",
      detail:
        "The challenge in this project was not just building charts. It was deciding what mattered most, reducing clutter, and presenting the data in a way that felt intuitive. I wanted the dashboard to guide a user toward insight, not force them to search for it.",
      tags: [
        "Business Intelligence",
        "Dashboard Design",
        "Storytelling",
        "Power BI",
        "Data Modeling",
      ],
      image: "/spotify.png",
      icon: <Music4 className="h-12 w-12" />,
      insights: [
        "Prioritized clarity over visual overload",
        "Focused on how users consume information, not just how data looks",
        "Demonstrated business storytelling through dashboard structure",
      ],
    },
  ];

  const experience: Experience[] = [
    {
      company: "Thorogood",
      title: "Manager – Data and Analytics Consulting",
      period: "2023 – 2024",
      bullets: [
        "Led analytics initiatives for global clients by translating business problems into reporting structures, decision frameworks, and dashboard solutions.",
        "Designed key performance indicator frameworks to improve visibility across supply chain planning, inventory, demand, and forecasting.",
        "Managed delivery of multiple Power BI dashboards that improved reporting consistency and business visibility across teams.",
        "Recognized in the Unilever client newsletter for outstanding contribution to a major Tableau-to-Power BI migration initiative.",
      ],
    },
    {
      company: "Thorogood",
      title: "Data and Analytics Consultant",
      period: "2020 – 2023",
      bullets: [
        "Built end-to-end business intelligence solutions by combining data from multiple sources and turning it into decision-ready reporting.",
        "Designed dashboards and scorecards to monitor financial and supply chain performance for leadership teams.",
        "Led migration of six complex Tableau dashboards into scalable Power BI reports, improving usability, performance, and adoption.",
        "Worked closely with stakeholders to translate reporting requirements into usable business metrics and dashboard logic.",
      ],
    },
    {
      company: "Cypress Atlantic",
      title: "Data and Business Analytics Intern",
      period: "2025",
      bullets: [
        "Integrated point-of-sale, invoice, and cloud-based data into structured reporting workflows.",
        "Built business intelligence dashboards to track revenue, cost of goods sold, and operational performance.",
        "Used data analysis to highlight cost issues, trend shifts, and reporting inconsistencies that could affect decision-making.",
      ],
    },
    {
      company: "University of Massachusetts Boston",
      title: "Graduate Assistant – Analytics and Data Platforms",
      period: "2025 – Present",
      bullets: [
        "Supported the design of a platform that helps users work with patent-related data in a more structured and interpretable way.",
        "Worked on the logic, data flow, and analysis behind how users retrieve and interpret similar results.",
        "Focused on turning technical output into something more understandable for non-technical users.",
      ],
    },
  ];

  const skillGroups = [
    {
      title: "Business Intelligence and Analysis",
      items: [
        { name: "Power BI", icon: <BarChart3 className="h-6 w-6" /> },
        { name: "Excel", icon: <FileText className="h-6 w-6" /> },
        { name: "Tableau", icon: <LayoutDashboard className="h-6 w-6" /> },
        { name: "Structured Business Analysis", icon: <Briefcase className="h-6 w-6" /> },
        { name: "Dashboard Design", icon: <LayoutDashboard className="h-6 w-6" /> },
      ],
    },
    {
      title: "Data Engineering and Automation",
      items: [
        { name: "Python", icon: <Code2 className="h-6 w-6" /> },
        { name: "SQL", icon: <Database className="h-6 w-6" /> },
        { name: "Azure Data Factory", icon: <Factory className="h-6 w-6" /> },
        { name: "Databricks", icon: <Workflow className="h-6 w-6" /> },
        { name: "Alteryx and Power Automate", icon: <Bot className="h-6 w-6" /> },
      ],
    },
    {
      title: "Operations and Advanced Analytics",
      items: [
        { name: "Supply Chain Analytics", icon: <Truck className="h-6 w-6" /> },
        { name: "Machine Learning", icon: <Cpu className="h-6 w-6" /> },
        { name: "Web Data Collection", icon: <Search className="h-6 w-6" /> },
        { name: "Performance Measurement", icon: <BarChart3 className="h-6 w-6" /> },
        { name: "Decision Support", icon: <Briefcase className="h-6 w-6" /> },
      ],
    },
  ];

  const certifications: Certification[] = [
    {
      title: "Salesforce Certified Platform Administrator",
      issuer: "Salesforce",
      issued: "Issued March 2026",
      file: "/salesforce-platform-admin.png",
    },
    {
      title: "Microsoft Certified: Power BI Data Analyst Associate",
      issuer: "Microsoft",
      issued: "Credential",
      file: "/powerbi-cert.pdf",
    },
    {
      title: "Python Essential Training",
      issuer: "LinkedIn Learning",
      issued: "Issued March 2024",
      file: "/python-essential-training.pdf",
    },
    {
      title: "Six Sigma Foundations",
      issuer: "LinkedIn Learning",
      issued: "Issued January 2025",
      file: "/six-sigma-foundations.pdf",
    },
    {
      title: "R for Data Science: Analysis and Visualization",
      issuer: "LinkedIn Learning",
      issued: "Issued September 2024",
      file: "/r-data-science-analysis-visualization.pdf",
    },
  ];

  const sections = useMemo(
    () => [
      { id: "home" as SectionId, label: "Home", icon: <Home className="h-4 w-4" /> },
      { id: "skills" as SectionId, label: "Skills", icon: <Sparkles className="h-4 w-4" /> },
      { id: "education" as SectionId, label: "Education", icon: <GraduationCap className="h-4 w-4" /> },
      { id: "experience" as SectionId, label: "Experience", icon: <Briefcase className="h-4 w-4" /> },
      { id: "projects" as SectionId, label: "Projects", icon: <FolderKanban className="h-4 w-4" /> },
      { id: "achievements" as SectionId, label: "Achievements", icon: <Trophy className="h-4 w-4" /> },
      { id: "contact" as SectionId, label: "Contact", icon: <Contact className="h-4 w-4" /> },
    ],
    []
  );

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id as SectionId);
        }
      },
      {
        threshold: [0.2, 0.4, 0.6],
        rootMargin: "-20% 0px -35% 0px",
      }
    );

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, [sections]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#f8fbff,_#dbeafe_22%,_#c4b5fd_58%,_#bfdbfe_78%,_#e2e8f0_100%)] text-slate-900">
      <div
        className="fixed left-0 top-0 z-[60] h-1 bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <motion.div
          animate={{ y: [0, -12, 0], x: [0, 8, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[-6rem] top-16 h-72 w-72 rounded-full bg-cyan-400/30 blur-3xl"
        />
        <motion.div
          animate={{ y: [0, 10, 0], x: [0, -10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[-4rem] top-48 h-80 w-80 rounded-full bg-fuchsia-400/20 blur-3xl"
        />
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 left-1/3 h-72 w-72 rounded-full bg-indigo-400/20 blur-3xl"
        />
      </div>

      <header className="sticky top-0 z-50 border-b border-black/10 bg-slate-950/82 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-white md:text-4xl">
              Adarsh Sathyanarayanan
            </h1>
            <p className="mt-1 text-lg italic text-slate-200 md:text-2xl">
              Data Analyst / Business Analyst / Supply Chain Analyst
            </p>
            <p className="text-sm italic text-slate-300 md:text-lg">Boston, MA</p>
          </div>

          <nav className="flex flex-wrap gap-2 text-sm font-semibold md:text-base">
            {sections.map((section) => {
              const isActive = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 transition ${
                    isActive
                      ? "border-cyan-300/50 bg-cyan-400/20 text-white shadow-[0_0_20px_rgba(34,211,238,0.18)]"
                      : "border-white/10 bg-white/5 text-white hover:bg-cyan-500/15"
                  }`}
                >
                  {section.icon}
                  {section.label}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      <section
        id="home"
        className="relative mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-2 md:items-center md:py-24"
      >
        <Reveal>
          <div className="flex justify-center">
            <div className="relative h-[340px] w-[340px] overflow-hidden rounded-full shadow-[0_30px_70px_rgba(0,0,0,0.14)] ring-4 ring-white/25 md:h-[520px] md:w-[520px]">
              <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-br from-white/15 to-transparent" />
              <img
                src="/profile.png"
                alt="Adarsh Sathyanarayanan"
                className="block h-full w-full scale-[1.03] object-cover object-top"
              />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div>
            <h2 className="text-4xl font-black leading-tight tracking-tight text-slate-950 md:text-7xl">
              Turning data into
              <span className="block bg-gradient-to-r from-cyan-600 via-sky-700 to-indigo-700 bg-clip-text text-transparent">
                clearer business decisions
              </span>
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-9 text-slate-800 md:text-2xl md:leading-10">
              I am a Business Analytics graduate student at the University of Massachusetts Boston with consulting experience across reporting, performance measurement, and operational decision support. My work is centered on helping businesses understand what is happening, why it is happening, and what they should pay attention to next.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <motion.a
                whileHover={{ y: -2 }}
                href="/Resume.pdf"
                target="_blank"
                rel="noreferrer"
                onClick={() => track("resume_click", { location: "hero" })}
                className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-6 py-3 text-base font-semibold text-white transition hover:bg-slate-900 md:text-lg"
              >
                <FileText className="h-5 w-5" />
                Download Resume
              </motion.a>

              <motion.a
                whileHover={{ y: -2 }}
                href="https://www.linkedin.com/in/adarshsathyanarayanan/"
                target="_blank"
                rel="noreferrer"
                onClick={() => track("linkedin_click", { location: "hero_button" })}
                className="inline-flex items-center gap-2 rounded-2xl border-2 border-slate-900 px-6 py-3 text-base font-semibold transition hover:bg-slate-900 hover:text-white md:text-lg"
              >
                <ArrowUpRight className="h-5 w-5" />
                View LinkedIn
              </motion.a>
            </div>

            <div className="mt-6 flex items-center gap-5">
              <a
                href="https://www.linkedin.com/in/adarshsathyanarayanan/"
                target="_blank"
                rel="noreferrer"
                onClick={() => track("linkedin_click", { location: "hero_icon" })}
                className="text-[#0A66C2] transition hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-10 w-10" />
              </a>

              <a
                href="https://wa.me/18573399180"
                target="_blank"
                rel="noreferrer"
                onClick={() => track("whatsapp_click", { location: "hero" })}
                className="text-green-600 transition hover:scale-110"
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="h-10 w-10" />
              </a>
            </div>

            <div className="mt-8 grid gap-3 md:max-w-2xl md:grid-cols-3">
              {[
                "Business intelligence and reporting",
                "Business analysis and decision support",
                "Supply chain and operations analytics",
              ].map((item, idx) => (
                <Reveal key={item} delay={0.1 + idx * 0.05}>
                  <GlassCard className="p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-600">
                      Focus Area
                    </p>
                    <p className="mt-2 text-sm font-semibold md:text-base">{item}</p>
                  </GlassCard>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <section id="skills" className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <Reveal>
          <h2 className="mb-4 text-5xl font-black tracking-tight md:text-6xl">Skills</h2>
          <p className="mb-10 max-w-3xl text-lg leading-8 text-slate-700 md:text-xl">
            My skill set combines business thinking, reporting, analytics, automation, and data tools that support decision-making in a practical and business-friendly way.
          </p>
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-3">
          {skillGroups.map((group, groupIndex) => (
            <Reveal key={group.title} delay={groupIndex * 0.05}>
              <GlassCard className="p-6">
                <h3 className="mb-5 text-2xl font-black text-slate-900">{group.title}</h3>
                <div className="grid gap-4">
                  {group.items.map((skill) => (
                    <div
                      key={skill.name}
                      className="group flex items-center gap-4 rounded-2xl border border-black/10 bg-white/65 px-4 py-4 transition hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-100 text-cyan-800 transition group-hover:bg-cyan-700 group-hover:text-white">
                        {skill.icon}
                      </div>
                      <span className="text-lg font-semibold text-slate-800">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="education" className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <Reveal>
          <div className="mb-10">
            <h2 className="text-5xl font-black tracking-tight md:text-6xl">Education</h2>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-700 md:text-xl">
              My academic foundation combines analytics, supply chain thinking, quantitative modelling, and practical business problem solving.
            </p>
          </div>
        </Reveal>

        <div className="space-y-8">
          <Reveal>
            <GlassCard className="p-8">
              <div className="mb-4 flex items-center gap-3">
                <GraduationCap className="h-7 w-7 text-cyan-800" />
                <h3 className="text-3xl font-black md:text-4xl">
                  University of Massachusetts Boston
                </h3>
              </div>

              <p className="text-xl font-bold">Master of Science in Business Analytics</p>
              <p className="mt-1 text-lg italic">Supply Chain Management focus</p>
              <p className="mt-1 text-lg italic">GPA: 4.0 / 4.0</p>

              <div className="mt-6">
                <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-slate-600">
                  Relevant Coursework
                </p>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {[
                    "Machine Learning",
                    "Supply Chain Management",
                    "Operational Risk Management",
                    "Linear Programming",
                    "Business Programming",
                    "Project Management",
                    "Big Data – AWS",
                    "Business Intelligence",
                    "Management Decision Model",
                    "Multivariate and Regression",
                  ].map((course) => (
                    <div
                      key={course}
                      className="rounded-2xl border border-cyan-100 bg-cyan-50/80 px-4 py-3 text-sm font-semibold text-slate-800"
                    >
                      {course}
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.06}>
            <GlassCard className="p-8">
              <div className="mb-4 flex items-center gap-3">
                <GraduationCap className="h-7 w-7 text-cyan-800" />
                <h3 className="text-3xl font-black md:text-4xl">RV College of Engineering</h3>
              </div>

              <p className="text-xl font-bold">
                Bachelor of Engineering in Electrical and Electronics Engineering
              </p>
              <p className="mt-1 text-lg italic">
                Best Final Project Award in the department
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section id="experience" className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <Reveal>
          <div className="mb-10">
            <h2 className="text-5xl font-black tracking-tight md:text-6xl">Experience</h2>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-700 md:text-xl">
              My experience combines reporting, decision support, operational visibility, performance measurement, and stakeholder-facing analytics across consulting and academic environments.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-6 xl:grid-cols-2">
          {experience.map((role, idx) => (
            <Reveal key={`${role.company}-${role.title}`} delay={idx * 0.05}>
              <DarkFeatureCard className="p-8">
                <div className="mb-4 flex items-center gap-3">
                  <Briefcase className="h-7 w-7" />
                  <h3 className="text-3xl font-black">{role.company}</h3>
                </div>
                <p className="text-xl italic leading-8 md:text-2xl md:leading-9">
                  {role.title}
                </p>
                <p className="mt-2 text-lg text-white/90">{role.period}</p>
                <ul className="mt-6 space-y-3 text-base leading-8 md:text-lg">
                  {role.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3">
                      <ChevronRight className="mt-1 h-5 w-5 shrink-0 text-cyan-100" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </DarkFeatureCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="projects" className="mx-auto max-w-7xl px-6 py-14 md:py-20">
        <Reveal>
          <div className="mb-12">
            <h2 className="text-5xl font-black tracking-tight md:text-7xl">Projects</h2>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-700 md:text-xl">
              These projects are less about the technology itself and more about how structured analysis, clear reporting, and thoughtful design can help someone make a better decision.
            </p>
          </div>
        </Reveal>

        <div className="space-y-24">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`grid items-center gap-12 md:grid-cols-2 ${
                index % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              <Reveal delay={0.03}>
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-800">
                    Featured Project
                  </p>

                  <h3 className="mt-3 text-4xl font-black leading-tight md:text-5xl">
                    {project.title}
                  </h3>

                  <p className="mt-2 text-xl italic text-slate-700 md:text-2xl">
                    {project.subtitle}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-cyan-700/10 px-3 py-1 text-sm font-semibold text-cyan-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="mt-8 text-lg leading-9 text-slate-800 md:text-2xl md:leading-10">
                    {project.description}
                  </p>

                  <p className="mt-6 text-base leading-8 text-slate-700 md:text-xl md:leading-9">
                    {project.detail}
                  </p>

                  {project.id === "patent" && (
                    <ProjectExplainer
                      businessValue="This project is about reducing uncertainty early. Instead of forcing a student or innovator to manually search through a confusing patent process, it helps them get to a clearer first-level understanding of whether an idea may already exist in a similar form."
                      technicalApproach="I focused on creating a workflow that could retrieve and organize relevant information in a way that felt structured rather than overwhelming. The emphasis was not just search, but interpretation and usability."
                      interviewVersion="I would describe this as a decision-support project. The business value was in making a difficult research process more understandable, more efficient, and more useful for someone trying to evaluate an idea early."
                    />
                  )}

                  {project.id === "bestbuy" && (
                    <ProjectExplainer
                      businessValue="This project is about understanding how products are positioned in a market. I used it to explore what may influence pricing and discount behaviour, and how raw online product data can be turned into useful commercial insight."
                      technicalApproach="I built a workflow that collected product information, structured it into a usable dataset, and then used analysis to study patterns in price, discounting, and product characteristics."
                      interviewVersion="I would position this as a pricing and product analysis project. The value was in moving from unstructured online data to insights that could support better understanding of pricing behaviour and market positioning."
                    />
                  )}

                  {project.id === "spotify" && (
                    <>
                      <DashboardPreview />
                      <ProjectExplainer
                        businessValue="This project is about making data easy to consume. The business value was not just showing numbers, but helping a user quickly understand performance, trends, and comparisons without getting lost in the dashboard."
                        technicalApproach="I focused on layout, metric selection, flow, and visual hierarchy. The challenge was deciding what to include, what to simplify, and how to guide the user naturally through the information."
                        interviewVersion="I would explain this as a dashboard design and business storytelling project. The complexity was in turning dense information into something simple, relevant, and genuinely useful for decision-making."
                      />
                    </>
                  )}

                  {project.insights && (
                    <div className="mt-8">
                      <h4 className="text-xl font-black text-slate-900 md:text-2xl">
                        Key Takeaways
                      </h4>
                      <ul className="mt-4 space-y-3 text-base leading-8 text-slate-700 md:text-lg">
                        {project.insights.map((item) => (
                          <li key={item} className="flex gap-3">
                            <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-cyan-700" />
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
                  <ProjectVisual
                    image={project.image}
                    alt={project.title}
                    icon={project.icon}
                    title={project.title}
                    subtitle={project.subtitle}
                  />
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </section>

      <section id="achievements" className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <Reveal>
          <h2 className="mb-10 text-5xl font-black tracking-tight md:mb-14 md:text-6xl">
            Achievements
          </h2>
        </Reveal>

        <Reveal>
          <GlassCard className="mb-10 p-8">
            <div className="mb-5 flex items-center gap-3">
              <Trophy className="h-7 w-7 text-cyan-800" />
              <h3 className="text-3xl font-black">Beta Gamma Sigma Certificate</h3>
            </div>
            <div className="flex justify-center">
              <img
                src="/bgs.png"
                alt="Beta Gamma Sigma Certificate"
                className="max-h-[650px] w-full max-w-3xl rounded-2xl border border-black/10 object-contain shadow-md"
              />
            </div>
            <p className="mt-4 text-center text-sm text-slate-500">
              Beta Gamma Sigma – University of Massachusetts Boston
            </p>
          </GlassCard>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2">
          <Reveal>
            <DarkFeatureCard className="p-8">
              <div className="mb-4 flex items-center gap-3">
                <Trophy className="h-7 w-7" />
                <h3 className="text-3xl font-black">
                  Academic and Professional Recognition
                </h3>
              </div>
              <ul className="mt-6 space-y-4 text-lg leading-8 md:text-2xl md:leading-10">
                <li>Beta Gamma Sigma – University of Massachusetts Boston</li>
                <li>4.0 GPA – Master of Science in Business Analytics</li>
                <li>Salesforce Certified Platform Administrator</li>
                <li>Microsoft Certified: Power BI Data Analyst Associate</li>
                <li>
                  Best Final Project Award – Electrical and Electronics Engineering
                </li>
              </ul>
            </DarkFeatureCard>
          </Reveal>

          <Reveal delay={0.05}>
            <DarkFeatureCard className="p-8">
              <div className="mb-4 flex items-center gap-3">
                <Award className="h-7 w-7" />
                <h3 className="text-3xl font-black">Thorogood Recognition</h3>
              </div>
              <ul className="mt-6 space-y-4 text-lg leading-8 md:text-2xl md:leading-10">
                <li>Thorogood Star Award – November 2022</li>
                <li>Thorogood Star Award – January 2023</li>
                <li>Thorogood Star Award – June 2023</li>
                <li>
                  Featured in the Unilever client newsletter for outstanding work on
                  a major dashboard migration initiative from Tableau to Power BI.
                </li>
              </ul>
            </DarkFeatureCard>
          </Reveal>
        </div>

        <Reveal delay={0.08}>
          <div className="mt-10">
            <h3 className="mb-3 text-3xl font-black">Certifications</h3>
            <p className="mb-6 max-w-3xl text-base leading-7 text-slate-700 md:text-lg">
              These certifications strengthen my foundation across business
              intelligence, platform administration, process improvement, and
              analytical problem solving.
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              {certifications.map((cert) => (
                <motion.a
                  key={cert.title}
                  whileHover={{ y: -4 }}
                  href={cert.file}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => track("certificate_click", { title: cert.title })}
                  className="rounded-2xl border border-white/60 bg-white/55 p-5 shadow-sm transition hover:shadow-md"
                >
                  <div className="flex items-start gap-4">
                    <div className="rounded-xl bg-cyan-700/10 p-3 text-cyan-800">
                      <BadgeCheck className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-black leading-7 text-slate-900">
                        {cert.title}
                      </h4>
                      <p className="mt-1 text-sm font-medium text-slate-600">
                        {cert.issuer}
                      </p>
                      <p className="text-sm text-slate-500">{cert.issued}</p>
                      <p className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-cyan-800">
                        Open Certificate <ExternalLink className="h-4 w-4" />
                      </p>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <section id="contact" className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <Reveal>
          <h2 className="mb-10 text-5xl font-black tracking-tight md:mb-14 md:text-6xl">
            Get in Touch
          </h2>
        </Reveal>

        <div className="grid gap-10 md:grid-cols-2">
          <Reveal>
            <div>
              <p className="text-lg text-slate-700 md:text-xl">
                I’m always happy to connect around analytics, reporting, business
                intelligence, and opportunities where data can drive better
                decisions.
              </p>

              <div className="mt-10 space-y-8">
                <div>
                  <h3 className="text-2xl font-bold">Phone Number</h3>
                  <p className="mt-2 text-xl text-slate-800">+1 (857) 339-9180</p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold">Email Address</h3>
                  <p className="mt-2 text-xl text-slate-800">adarsh2707@gmail.com</p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <GlassCard className="p-6">
              <form
                className="grid gap-5"
                onSubmit={(e) => {
                  e.preventDefault();

                  const form = e.currentTarget;
                  const firstName =
                    (form.elements.namedItem("firstName") as HTMLInputElement)?.value || "";
                  const lastName =
                    (form.elements.namedItem("lastName") as HTMLInputElement)?.value || "";
                  const subject =
                    (form.elements.namedItem("subject") as HTMLInputElement)?.value || "";
                  const message =
                    (form.elements.namedItem("message") as HTMLTextAreaElement)?.value || "";

                  track("contact_form_submit", {
                    subject: subject || "Portfolio Contact",
                  });

                  const body =
                    `Name: ${firstName} ${lastName}\n\n` +
                    `Message:\n${message}`;

                  const mailtoLink = `mailto:adarsh2707@gmail.com?subject=${encodeURIComponent(
                    subject || "Portfolio Contact"
                  )}&body=${encodeURIComponent(body)}`;

                  window.location.href = mailtoLink;
                }}
              >
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-bold">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      className="w-full rounded-xl border-2 border-black/70 bg-transparent px-4 py-3 outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-bold">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      className="w-full rounded-xl border-2 border-black/70 bg-transparent px-4 py-3 outline-none"
                    />
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-bold">Your Email</label>
                    <input
                      type="email"
                      name="email"
                      className="w-full rounded-xl border-2 border-black/70 bg-transparent px-4 py-3 outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-bold">
                      Message Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      className="w-full rounded-xl border-2 border-black/70 bg-transparent px-4 py-3 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold">Message</label>
                  <textarea
                    rows={6}
                    name="message"
                    className="w-full rounded-xl border-2 border-black/70 bg-transparent px-4 py-3 outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-fit rounded-xl bg-cyan-700 px-8 py-3 text-lg font-bold text-white transition hover:bg-cyan-800"
                >
                  Send Message
                </button>
              </form>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <footer className="mt-12 border-t border-black/10 bg-slate-900 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 md:grid-cols-3">
          <div>
            <h3 className="text-2xl font-black">Adarsh Sathyanarayanan</h3>
            <p className="mt-3 text-base leading-7 text-slate-300">
              Business Analytics graduate student focused on analytics, reporting,
              business insight, and supply chain decision support.
            </p>
          </div>

          <div>
            <h4 className="text-xl font-bold">Contact</h4>
            <div className="mt-4 space-y-3 text-base text-slate-300">
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                adarsh2707@gmail.com
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                +1 857-339-9180
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Boston, MA
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-bold">Links</h4>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href="https://www.linkedin.com/in/adarshsathyanarayanan/"
                target="_blank"
                rel="noreferrer"
                onClick={() => track("linkedin_click", { location: "footer" })}
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 font-semibold transition hover:bg-white/20"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>

              <a
                href="/Resume.pdf"
                target="_blank"
                rel="noreferrer"
                onClick={() => track("resume_click", { location: "footer" })}
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 font-semibold transition hover:bg-white/20"
              >
                <FileText className="h-4 w-4" />
                Resume
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}