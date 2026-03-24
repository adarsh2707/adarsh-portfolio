"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
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
  icon: JSX.Element;
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
  icon: JSX.Element;
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

export default function Page() {
  const [activeSection, setActiveSection] = useState<SectionId>("home");
  const [scrollProgress, setScrollProgress] = useState(0);

  const projects: Project[] = [
    {
      id: "patent",
      title: "Student Patent Novelty Check",
      subtitle: "Graduate Assistant Project | Analytics & Data Platforms",
      description:
        "Built a data-driven platform to help users evaluate early-stage ideas by retrieving similar patents, surfacing relevant sections, and presenting results in a more structured and interpretable way.",
      detail:
        "I helped shape a workflow that supports early-stage innovation analysis by organizing patent information into a more usable experience for students and researchers. The project combined backend data handling, APIs, analytics logic, and product-style thinking to turn a complex research process into clearer decision support.",
      tags: ["Python", "FastAPI", "SQL", "APIs", "Semantic Search", "Analytics"],
      image: "/patent-project.png",
      icon: <Search className="h-12 w-12" />,
      insights: [
        "Structured a complex research workflow into a clearer decision-support tool",
        "Translated analytical outputs into interpretable, user-friendly insights",
        "Combined backend pipelines with product-style thinking",
      ],
    },
    {
      id: "bestbuy",
      title: "Best Buy Laptop Pricing Analytics",
      subtitle: "Web Scraping, Data Engineering & Machine Learning",
      description:
        "Developed an end-to-end analytics workflow to scrape, clean, store, and analyze laptop listings to understand what drives pricing and discounting.",
      detail:
        "Built automated crawling using Selenium, sitemap parsing, regex extraction, and structured parsing. Stored cleaned laptop records in SQLite and used regression, decision trees, clustering, and comparative analysis to identify the drivers of price, product popularity, and discounting behavior.",
      tags: ["Python", "Selenium", "SQLite", "Regression", "Decision Trees", "K-Means"],
      image: "/bestbuy-project.png",
      icon: <Database className="h-12 w-12" />,
      insights: [
        "CPU tier and RAM were the strongest pricing drivers",
        "Discounting appeared to be influenced more by reviews and engagement than specs",
        "Built the full lifecycle from raw web extraction to business insight",
      ],
    },
    {
      id: "spotify",
      title: "Spotify Dashboard",
      subtitle: "Business Intelligence & User-Friendly KPI Storytelling",
      description:
        "Designed a BI-focused dashboard experience around music performance metrics, trends, and category comparisons while keeping the interface simple and intuitive for end users.",
      detail:
        "This project demonstrates my dashboarding approach: simplify complex data into a visual experience that remains intuitive, decision-friendly, and engaging. I focused on selecting the right measures, reducing clutter, and presenting meaningful comparisons in a way that made the analysis easy to navigate.",
      tags: ["Power BI", "Dashboarding", "DAX", "Data Modeling", "Storytelling"],
      image: "/spotify.png",
      icon: <Music4 className="h-12 w-12" />,
      insights: [
        "Balanced analytical depth with a simple, user-friendly layout",
        "Focused on relevant KPIs instead of overcrowding the report",
        "Designed for clear navigation and intuitive business storytelling",
      ],
    },
  ];

  const experience: Experience[] = [
    {
      company: "Thorogood",
      title:
        "Manager – Data & Analytics Consulting | BI Strategy, Power BI, Supply Chain Analytics",
      period: "2023 – 2024",
      bullets: [
        "Led cross-functional analytics initiatives for global clients, translating business problems into scalable BI and reporting solutions.",
        "Designed KPI frameworks and dashboards to monitor inventory, demand, and forecast performance across supply chain operations.",
        "Directed analysts building 5–10 Power BI dashboards to improve reporting standardization and business visibility.",
        "Partnered with stakeholders across geographies to align reporting outputs with business goals.",
        "Recognized in the Unilever client newsletter for outstanding contribution to a major migration initiative converting Tableau dashboards into Power BI reports and improving adoption.",
      ],
    },
    {
      company: "Thorogood",
      title:
        "Data & Analytics Consultant | Power BI, SQL, Alteryx, Data Visualization",
      period: "2020 – 2023",
      bullets: [
        "Delivered end-to-end BI solutions by integrating data from multiple sources and transforming them into actionable insights using SQL and Power BI.",
        "Designed interactive dashboards and scorecards tracking supply chain and financial KPIs for leadership decision-making.",
        "Led a Tableau-to-Power BI migration of 6 complex dashboards into scalable Power BI reports, improving performance, usability, and adoption.",
        "Built and optimized SQL queries to structure large datasets for reporting and analytics.",
      ],
    },
    {
      company: "Cypress Atlantic",
      title: "Data & Business Analytics Intern | Python, SQL, Power BI",
      period: "2025",
      bullets: [
        "Integrated multi-source data including POS, OCR invoices, and cloud storage into structured datasets for reporting and analysis.",
        "Built 6+ BI dashboards tracking revenue, COGS, and operational KPIs to support data-driven decision-making.",
        "Automated data ingestion pipelines using Python to improve data availability and reporting accuracy.",
      ],
    },
    {
      company: "University of Massachusetts Boston",
      title: "Graduate Assistant – Analytics & Data Platforms",
      period: "2025 – Present",
      bullets: [
        "Designed and built a data-driven platform to analyze patent datasets and support structured decision-making.",
        "Developed backend data pipelines using Python, SQL, and APIs to process and analyze large-scale datasets.",
        "Translated analytical outputs into interpretable insights for non-technical stakeholders.",
      ],
    },
  ];

  const skillGroups = [
    {
      title: "Analytics & BI",
      items: [
        { name: "Power BI", icon: <BarChart3 className="h-6 w-6" /> },
        { name: "Excel", icon: <FileText className="h-6 w-6" /> },
        { name: "Tableau", icon: <LayoutDashboard className="h-6 w-6" /> },
        { name: "SQL", icon: <Database className="h-6 w-6" /> },
        { name: "Business Analysis", icon: <Briefcase className="h-6 w-6" /> },
      ],
    },
    {
      title: "Data Engineering & Automation",
      items: [
        { name: "Python", icon: <Code2 className="h-6 w-6" /> },
        { name: "Azure Data Factory", icon: <Factory className="h-6 w-6" /> },
        { name: "Databricks", icon: <Workflow className="h-6 w-6" /> },
        { name: "Alteryx", icon: <Bot className="h-6 w-6" /> },
        { name: "Power Automate", icon: <Workflow className="h-6 w-6" /> },
      ],
    },
    {
      title: "Advanced Analytics",
      items: [
        { name: "Supply Chain Analytics", icon: <Truck className="h-6 w-6" /> },
        { name: "Web Scraping", icon: <Search className="h-6 w-6" /> },
        { name: "Machine Learning", icon: <Cpu className="h-6 w-6" /> },
        { name: "KPI Design", icon: <BarChart3 className="h-6 w-6" /> },
        { name: "Dashboarding", icon: <LayoutDashboard className="h-6 w-6" /> },
      ],
    },
  ];

  const certifications: Certification[] = [
    {
      title: "Microsoft Certified: Power BI Data Analyst Associate",
      issuer: "Microsoft",
      issued: "Credential",
      file: "/powerbi-cert.pdf",
    },
    {
      title: "Python Essential Training",
      issuer: "LinkedIn Learning",
      issued: "Issued Mar 2024",
      file: "/python-essential-training.pdf",
    },
    {
      title: "Six Sigma Foundations",
      issuer: "LinkedIn Learning",
      issued: "Issued Jan 2025",
      file: "/six-sigma-foundations.pdf",
    },
    {
      title: "R for Data Science: Analysis and Visualization",
      issuer: "LinkedIn Learning",
      issued: "Issued Sep 2024",
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
              Data that drives
              <span className="block bg-gradient-to-r from-cyan-600 via-sky-700 to-indigo-700 bg-clip-text text-transparent">
                clearer business decisions
              </span>
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-9 text-slate-800 md:text-2xl md:leading-10">
              I’m a Business Analytics graduate student at UMass Boston, building my career at the intersection of analytics, business decision-making, and supply chain insight. With consulting experience across BI reporting, KPI design, and operational analysis, I enjoy turning messy data into structured decisions leaders can use.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <motion.a
                whileHover={{ y: -2 }}
                href="/Resume.pdf"
                target="_blank"
                rel="noreferrer"
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
                className="text-[#0A66C2] transition hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-10 w-10" />
              </a>

              <a
                href="https://wa.me/18573399180"
                target="_blank"
                rel="noreferrer"
                className="text-green-600 transition hover:scale-110"
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="h-10 w-10" />
              </a>
            </div>

            <div className="mt-8 grid gap-3 md:max-w-2xl md:grid-cols-3">
              {[
                "Data Analysis & Dashboards",
                "Business Analysis",
                "Supply Chain Analytics",
              ].map((item, idx) => (
                <Reveal key={item} delay={0.1 + idx * 0.05}>
                  <GlassCard className="p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-600">
                      Hire me for
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
            My skill set combines business intelligence, analytics, automation, and data engineering tools that help convert complex data into clear business decisions.
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
              My academic foundation combines business analytics, supply chain thinking, quantitative modeling, and technical problem solving.
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
                    "Multivariate & Regression",
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

              <p className="text-xl font-bold">B.E. in Electrical and Electronics Engineering</p>
              <p className="mt-1 text-lg italic">Best Final Project Award in the department</p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section id="experience" className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <Reveal>
          <div className="mb-10">
            <h2 className="text-5xl font-black tracking-tight md:text-6xl">Experience</h2>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-700 md:text-xl">
              My experience combines BI development, stakeholder-facing analytics, supply chain reporting, process automation, and data platform work across consulting and academic settings.
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
              A selection of projects that reflect my strengths in analytics, business intelligence, structured problem solving, and turning complex data into useful decisions.
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
                <h3 className="text-3xl font-black">Academic & Professional Recognition</h3>
              </div>
              <ul className="mt-6 space-y-4 text-lg leading-8 md:text-2xl md:leading-10">
                <li>Beta Gamma Sigma – University of Massachusetts Boston</li>
                <li>4.0 GPA – MS in Business Analytics</li>
                <li>Microsoft Certified: Power BI Data Analyst Associate</li>
                <li>Best Final Project Award – Electrical & Electronics Engineering</li>
              </ul>
            </DarkFeatureCard>
          </Reveal>

          <Reveal delay={0.05}>
            <DarkFeatureCard className="p-8">
              <div className="mb-4 flex items-center gap-3">
                <Award className="h-7 w-7" />
                <h3 className="text-3xl font-black">Thorogood Awards</h3>
              </div>
              <ul className="mt-6 space-y-4 text-lg leading-8 md:text-2xl md:leading-10">
                <li>Thorogood Star Award – November 2022</li>
                <li>Thorogood Star Award – January 2023</li>
                <li>Thorogood Star Award – June 2023</li>
                <li>Featured in the Unilever client newsletter for outstanding migration work on Tableau to Power BI dashboard conversion.</li>
              </ul>
            </DarkFeatureCard>
          </Reveal>
        </div>

        <Reveal delay={0.08}>
          <div className="mt-10">
            <h3 className="mb-6 text-3xl font-black">Certifications</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {certifications.map((cert) => (
                <motion.a
                  key={cert.title}
                  whileHover={{ y: -4 }}
                  href={cert.file}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl border border-white/60 bg-white/55 p-5 shadow-sm transition hover:shadow-md"
                >
                  <div className="flex items-start gap-4">
                    <div className="rounded-xl bg-cyan-700/10 p-3 text-cyan-800">
                      <BadgeCheck className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-black text-slate-900">{cert.title}</h4>
                      <p className="mt-1 text-sm text-slate-600">{cert.issuer}</p>
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
                I’m excited to connect with you.
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
                    <label className="mb-2 block text-sm font-bold">Message Subject</label>
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
              Business Analytics graduate student focused on data analysis, business insight, and
              supply chain decision support.
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
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 font-semibold transition hover:bg-white/20"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>

              <a
                href="/Resume.pdf"
                target="_blank"
                rel="noreferrer"
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