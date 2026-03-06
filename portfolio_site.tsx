import { useState, useEffect, useRef } from "react";

const NAV = ["About", "Experience", "Projects", "Stack", "Contact"];

const COMMUNITY_LINKS = {
  githubUrl: "https://github.com/VASI-vancouver-autonomous/auto-navigation",
  demoUrl: "https://www.linkedin.com/posts/vancouver-autonomous-systems-initiative_demo-session-recap-vancouver-autonomous-activity-7435050694317084673-fGrF?utm_source=share&utm_medium=member_desktop&rcm=ACoAACNINSYBB7QmTgeKqsQbAHLc0pLF9nvhaXI",
};

const EXPERIENCE = [
  {
    period: "Nov 2025 – Present",
    role: "Technical Lead",
    company: "Vancouver Autonomous Systems Initiative",
    type: "Part-time · Hybrid",
    desc: "Leading AI and autonomy research at the intersection of robotics and machine learning. Directing technical roadmap for autonomous systems development using ROS-based simulation and real hardware deployments.",
    tags: ["ROS", "Simulation", "Autonomous Systems", "Technical Leadership"],
    color: "#6366f1",
    current: true,
  },
  {
    period: "Feb 2025 – Present",
    role: "Lead AI Engineer",
    company: "HUGE",
    type: "Contract · Hybrid · Greater Vancouver",
    desc: "Leading AI engineering initiatives across robotics and applied AI. Architecting end-to-end AI systems spanning model development, deployment infrastructure, and cross-functional technical delivery.",
    tags: ["AI Systems", "Robotics", "MLOps", "Team Lead"],
    color: "#8b5cf6",
    current: true,
  },
  {
    period: "Apr 2024 – Nov 2024",
    role: "Database Specialist",
    company: "Canadian Red Cross",
    type: "Hybrid · Canada",
    desc: "Led data infrastructure and management initiatives supporting humanitarian operations across Canada. Established data quality standards and pipelines for mission-critical systems.",
    tags: ["Data Management", "Data Infrastructure"],
    color: "#a855f7",
    current: false,
  },
  {
    period: "Jun 2022 – Jan 2024",
    role: "Machine Learning Researcher",
    company: "Cognizant",
    type: "Contract Full-time · Remote",
    desc: "Conducted applied ML research across mathematical modeling and production ML systems. Developed and validated models across 13+ technical domains including deep learning, statistical modeling, and ML systems design.",
    tags: ["ML Research", "Mathematical Modeling", "Deep Learning", "Applied AI"],
    color: "#ec4899",
    current: false,
  },
  {
    period: "Feb 2018 – Dec 2021",
    role: "MLOps Engineer",
    company: "The FMN Group",
    type: "Permanent Full-time · On-site",
    desc: "Built and operated production ML infrastructure for nearly 4 years. Automated end-to-end pipelines for training, testing, and deployment. Built time series demand forecasting models on hardware across multiple regions, reducing inventory costs by 12%.",
    tags: ["MLOps", "CI/CD Pipelines", "Time Series", "Forecasting", "Production ML"],
    color: "#f59e0b",
    current: false,
    highlight: "12% inventory cost reduction across multiple regions",
  },
];

const PROJECTS = [
  {
    tag: "Computer Vision · MLOps · Multi-modal",
    title: "Visual Product Recommendation Engine",
    desc: "Multi-category visual search across 137k products using ViT embeddings and FAISS. Image and text signals fused at inference for stronger retrieval. Evaluated using eProduct benchmark methodology. Architecture designed to scale to MEP-3M.",
    stack: ["ViT", "FAISS", "FastAPI", "MLflow", "Docker", "GitHub Actions", "ABO Dataset"],
    metrics: [
      { label: "Index Size", value: "137k" },
      { label: "Search Latency", value: "<5ms" },
      { label: "Architecture", value: "Fusion" },
    ],
    color: "#6366f1",
    status: "Live",
    githubUrl: "https://github.com/lawrenceokolo1/vit-faiss-product-recommendation",
    demoUrl: "https://huggingface.co/spaces/Lawrence-okolo/product-recommendation",
  },
  {
    tag: "LLM · RAG Systems",
    title: "Enterprise RAG Knowledge Platform",
    desc: "Retrieval-augmented generation system for internal knowledge bases. Multi-document ingestion, semantic chunking, re-ranking pipeline, and swappable LLM backends with full conversation memory.",
    stack: ["LangChain", "Qdrant", "FastAPI", "Ollama", "Docker", "HuggingFace"],
    metrics: [
      { label: "Retrieval Acc.", value: "94%" },
      { label: "Response Time", value: "<2s" },
      { label: "Doc Sources", value: "Multi" },
    ],
    color: "#a855f7",
    status: "Building",
  },
  {
    tag: "Infrastructure · GPU Systems",
    title: "Async GPU Inference Service",
    desc: "High-throughput asynchronous inference platform with intelligent job orchestration across GPU workers. Fault-tolerant queue management, dead letter handling, and real-time observability via Prometheus and Grafana.",
    stack: ["PyTorch", "Celery", "Redis", "Prometheus", "Grafana", "Docker"],
    metrics: [
      { label: "Throughput", value: "1.2k/min" },
      { label: "Queue Latency", value: "<50ms" },
      { label: "Uptime", value: "99.9%" },
    ],
    color: "#8b5cf6",
    status: "Planned",
  },
];

const SKILLS = [
  { cat: "Deep Learning", items: ["PyTorch", "TensorFlow", "HuggingFace", "ViT", "CLIP", "Transformers", "CNNs", "TFT"] },
  { cat: "MLOps & Infra", items: ["MLflow", "DVC", "Docker", "Kubernetes", "GitHub Actions", "Prometheus", "Grafana", "Triton"] },
  { cat: "Robotics & Systems", items: ["ROS", "ROS2", "Simulation", "SLAM", "Sensor Fusion", "Autonomous Systems", "Edge AI", "Embedded ML"] },
  { cat: "LLM & GenAI", items: ["LangChain", "LlamaIndex", "RAG", "LoRA", "QLoRA", "Ollama", "CLIP", "Prompt Eng"] },
  { cat: "Inference & Serving", items: ["FastAPI", "Celery", "Redis", "FAISS", "Qdrant", "TorchServe", "ONNX", "TensorRT"] },
  { cat: "Languages & Data", items: ["Python", "SQL", "Bash", "NumPy", "Pandas", "Spark", "Kafka", "Airflow"] },
];

const LINKS = {
  github: "https://github.com/lawrenceokolo1",
  linkedin: "https://www.linkedin.com/in/lawrence-okolo",
  huggingface: "https://huggingface.co/Lawrence-okolo",
  email: "mailto:okololawrence48@yahoo.com",
};

function useInView(threshold = 0.08) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function FadeIn({ children, delay = 0 }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: `opacity 0.55s ease ${delay}s, transform 0.55s ease ${delay}s` }}>
      {children}
    </div>
  );
}

function Tag({ label, color }) {
  return (
    <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color, border: `1px solid ${color}40`, borderRadius: 4, padding: "3px 8px", whiteSpace: "nowrap" }}>
      {label}
    </span>
  );
}

function StatusBadge({ status }) {
  const map = { Live: "#22c55e", Building: "#f59e0b", Planned: "#4b5563", Ready: "#22c55e" };
  const c = map[status] || "#4b5563";
  const pulse = status === "Live" || status === "Building";
  return (
    <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: c, background: `${c}12`, border: `1px solid ${c}30`, borderRadius: 100, padding: "3px 10px", display: "inline-flex", alignItems: "center", gap: 5 }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: c, display: "inline-block", boxShadow: pulse ? `0 0 6px ${c}` : "none", animation: pulse ? "pulse 2s infinite" : "none" }} />
      {status}
    </span>
  );
}

function SocialLink({ icon, label, href, accent }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ display: "inline-flex", alignItems: "center", gap: 8, background: hov ? `${accent}15` : "#0e0e1a", border: `1px solid ${hov ? accent + "50" : "#1a1a2e"}`, color: hov ? accent : "#e8e8f4", borderRadius: 10, padding: "10px 20px", fontSize: 13, fontWeight: 600, textDecoration: "none", transition: "all 0.2s", transform: hov ? "translateY(-2px)" : "none" }}>
      <span style={{ fontSize: 15 }}>{icon}</span>{label}
    </a>
  );
}

export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false);
  const [activeNav, setActiveNav] = useState("About");
  const [hovExp, setHovExp] = useState(null);
  const [hovProj, setHovProj] = useState(null);
  const [roleIdx, setRoleIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const roles = ["ML Systems", "Autonomous AI", "MLOps Architecture", "AI Research"];

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = NAV.map(n => document.getElementById(n.toLowerCase()));
      const active = sections.findIndex(s => s && s.getBoundingClientRect().top < 120);
      if (active >= 0) setActiveNav(NAV[active]);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const cur = roles[roleIdx];
    const t = setTimeout(() => {
      if (!deleting) {
        if (charIdx < cur.length) setCharIdx(c => c + 1);
        else setTimeout(() => setDeleting(true), 1800);
      } else {
        if (charIdx > 0) setCharIdx(c => c - 1);
        else { setDeleting(false); setRoleIdx(r => (r + 1) % roles.length); }
      }
    }, deleting ? 32 : 72);
    return () => clearTimeout(t);
  }, [charIdx, deleting, roleIdx]);

  const bg = "#070710", surface = "#0d0d1a", surfaceHigh = "#121220";
  const border = "#1a1a2e", text = "#e8e8f4", muted = "#5a5a7a";
  const accent = "#6366f1", accent2 = "#8b5cf6";

  const scrollTo = id => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveNav(id);
  };

  return (
    <div style={{ background: bg, color: text, fontFamily: "'Inter', system-ui, -apple-system, sans-serif", minHeight: "100vh", overflowX: "hidden" }}>

      {/* Ambient blobs */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -200, left: -200, width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, #6366f11a 0%, transparent 70%)", animation: "float1 18s ease-in-out infinite" }} />
        <div style={{ position: "absolute", top: 500, right: -250, width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, #8b5cf614 0%, transparent 70%)", animation: "float2 22s ease-in-out infinite" }} />
        <div style={{ position: "absolute", bottom: 100, left: "25%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, #a855f710 0%, transparent 70%)", animation: "float3 26s ease-in-out infinite" }} />
      </div>

      {/* Nav */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 48px", background: scrolled ? `${bg}f2` : "transparent", backdropFilter: scrolled ? "blur(24px)" : "none", borderBottom: scrolled ? `1px solid ${border}` : "none", transition: "all 0.35s ease" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: `linear-gradient(135deg, ${accent}, ${accent2})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 900, color: "#fff", letterSpacing: -0.5 }}>LO</div>
          <span style={{ fontWeight: 700, fontSize: 14, letterSpacing: -0.3 }}>Lawrence<span style={{ color: muted, fontWeight: 300 }}>.ai</span></span>
        </div>
        <div style={{ display: "flex", gap: 2 }}>
          {NAV.map(n => (
            <button key={n} onClick={() => scrollTo(n)}
              style={{ background: activeNav === n ? `${accent}18` : "transparent", border: `1px solid ${activeNav === n ? accent + "40" : "transparent"}`, color: activeNav === n ? accent : muted, borderRadius: 7, padding: "5px 14px", fontSize: 12, fontWeight: 500, cursor: "pointer", transition: "all 0.2s", letterSpacing: 0.2 }}>
              {n}
            </button>
          ))}
        </div>
      </nav>

      <div style={{ position: "relative", zIndex: 1 }}>

        {/* ── HERO ── */}
        <section id="about" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "110px 48px 80px", maxWidth: 960, margin: "0 auto" }}>
          <FadeIn>
            {/* Badges */}
            <div style={{ display: "flex", gap: 10, marginBottom: 32, flexWrap: "wrap" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "#22c55e10", border: "1px solid #22c55e28", borderRadius: 100, padding: "5px 14px" }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 8px #22c55e", animation: "pulse 2s infinite" }} />
                <span style={{ fontSize: 11, color: "#22c55e", fontWeight: 600 }}>Optimising for high-signal roles · Production AI · Vancouver / Remote</span>
              </div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "#f59e0b10", border: "1px solid #f59e0b28", borderRadius: 100, padding: "5px 14px" }}>
                <span style={{ fontSize: 11, color: "#f59e0b", fontWeight: 600 }}>7+ Years Production ML</span>
              </div>
            </div>

            {/* Headline */}
            <div style={{ marginBottom: 28 }}>
              <h1 style={{ fontSize: "clamp(38px, 5.5vw, 68px)", fontWeight: 800, lineHeight: 1.06, letterSpacing: -2, margin: 0, color: text }}>
                Lawrence Okolo
              </h1>
              <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginTop: 6, minHeight: 72, flexWrap: "wrap" }}>
                <h2 style={{ fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: -1.5, margin: 0, background: `linear-gradient(135deg, ${accent} 0%, ${accent2} 55%, #ec4899 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  {roles[roleIdx].slice(0, charIdx)}
                </h2>
                <span style={{ fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 200, color: accent, lineHeight: 1, animation: "blink 1s step-end infinite" }}>|</span>
              </div>
            </div>

            {/* Bio */}
            <div style={{ maxWidth: 580, marginBottom: 44 }}>
              <p style={{ fontSize: 16, color: muted, lineHeight: 1.85, margin: "0 0 14px" }}>
                7 years building and shipping AI in production. MLOps pipelines and time series forecasting at FMN Group, ML research at Cognizant, now leading autonomous systems at Vancouver's robotics frontier.
              </p>
              <p style={{ fontSize: 16, color: muted, lineHeight: 1.85, margin: 0 }}>
                I architect systems that bridge research and production. Currently Lead AI Engineer at HUGE and Technical Lead at the Vancouver Autonomous Systems Initiative.
              </p>
            </div>

            {/* CTA buttons */}
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 64 }}>
              <button onClick={() => scrollTo("Projects")}
                style={{ background: `linear-gradient(135deg, ${accent}, ${accent2})`, border: "none", color: "#fff", borderRadius: 10, padding: "12px 24px", fontSize: 13, fontWeight: 700, cursor: "pointer", boxShadow: `0 0 24px ${accent}30`, letterSpacing: 0.3 }}>
                View Projects →
              </button>
              <button onClick={() => scrollTo("Experience")}
                style={{ background: "transparent", border: `1px solid ${border}`, color: text, borderRadius: 10, padding: "12px 24px", fontSize: 13, fontWeight: 600, cursor: "pointer", letterSpacing: 0.3 }}>
                Experience
              </button>
              <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer"
                style={{ background: "transparent", border: `1px solid ${border}`, color: muted, borderRadius: 10, padding: "12px 24px", fontSize: 13, fontWeight: 600, cursor: "pointer", letterSpacing: 0.3, textDecoration: "none", display: "inline-flex", alignItems: "center" }}>
                LinkedIn ↗
              </a>
            </div>

            {/* Stats row */}
            <div style={{ display: "flex", gap: 40, flexWrap: "wrap", paddingTop: 28, borderTop: `1px solid ${border}` }}>
              {[
                ["7+", "Years Production ML"],
                ["4", "Deep Learning Domains"],
                ["2", "Active Leadership Roles"],
                
              ].map(([v, l]) => (
                <div key={l}>
                  <div style={{ fontSize: 28, fontWeight: 800, background: `linear-gradient(135deg, ${accent}, ${accent2})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: -1 }}>{v}</div>
                  <div style={{ fontSize: 11, color: muted, marginTop: 3, letterSpacing: 0.2 }}>{l}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </section>

        {/* ── EXPERIENCE ── */}
        <section id="experience" style={{ maxWidth: 960, margin: "0 auto", padding: "80px 48px" }}>
          <FadeIn>
            <Tag label="Experience" color={accent} />
            <h2 style={{ fontSize: 32, fontWeight: 800, margin: "14px 0 8px", letterSpacing: -1 }}>Career Timeline</h2>
            <p style={{ color: muted, fontSize: 13, marginBottom: 52, lineHeight: 1.6 }}>7 years across production ML, research, robotics, and technical leadership.</p>
          </FadeIn>

          <div style={{ position: "relative", paddingLeft: 28 }}>
            <div style={{ position: "absolute", left: 6, top: 8, bottom: 48, width: 1, background: `linear-gradient(to bottom, ${accent}, ${accent2}80, transparent)` }} />

            {EXPERIENCE.map((e, i) => (
              <FadeIn key={i} delay={i * 0.07}>
                <div style={{ marginBottom: 20, position: "relative" }}>
                  {/* Timeline dot */}
                  <div style={{ position: "absolute", left: -24, top: 22, width: 11, height: 11, borderRadius: "50%", background: e.current ? `linear-gradient(135deg, ${accent}, ${accent2})` : surfaceHigh, border: `1.5px solid ${e.current ? accent : muted + "60"}`, boxShadow: e.current ? `0 0 12px ${accent}60` : "none", zIndex: 2 }} />

                  <div
                    onMouseEnter={() => setHovExp(i)} onMouseLeave={() => setHovExp(null)}
                    style={{ background: hovExp === i ? surfaceHigh : surface, border: `1px solid ${hovExp === i ? e.color + "45" : border}`, borderRadius: 14, padding: "20px 22px", transition: "all 0.25s", cursor: "default" }}>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 10, marginBottom: 8 }}>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
                          <span style={{ fontSize: 15, fontWeight: 700, letterSpacing: -0.3 }}>{e.role}</span>
                          {e.current && (
                            <span style={{ fontSize: 9, fontWeight: 700, color: "#22c55e", background: "#22c55e12", border: "1px solid #22c55e25", borderRadius: 100, padding: "2px 8px", letterSpacing: 1, textTransform: "uppercase" }}>Current</span>
                          )}
                        </div>
                        <div style={{ fontSize: 13, color: e.color, fontWeight: 600, marginBottom: 2 }}>{e.company}</div>
                        <div style={{ fontSize: 11, color: muted, letterSpacing: 0.2 }}>{e.period} · {e.type}</div>
                      </div>
                    </div>

                    <p style={{ color: muted, fontSize: 13, lineHeight: 1.75, margin: "0 0 10px" }}>{e.desc}</p>

                    {e.highlight && (
                      <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#f59e0b0c", border: "1px solid #f59e0b22", borderRadius: 8, padding: "5px 11px", marginBottom: 10 }}>
                        <span style={{ fontSize: 13 }}>📈</span>
                        <span style={{ fontSize: 11, color: "#f59e0b", fontWeight: 600 }}>{e.highlight}</span>
                      </div>
                    )}

                    <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                      {e.tags.map(t => (
                        <span key={t} style={{ fontSize: 10, background: `${e.color}0e`, border: `1px solid ${e.color}1e`, color: e.color, borderRadius: 5, padding: "3px 8px", fontWeight: 500 }}>{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}

            {/* Education */}
            <FadeIn delay={0.35}>
              <div style={{ marginLeft: 0, background: surface, border: `1px solid ${border}`, borderRadius: 14, padding: "18px 22px" }}>
                <div style={{ fontSize: 10, color: accent, fontWeight: 700, letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 6 }}>Education</div>
                <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: -0.3 }}>Master's Degree — Applied Machine Intelligence</div>
                <div style={{ fontSize: 13, color: accent2, fontWeight: 600, marginTop: 3 }}>Northeastern University</div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── PROJECTS ── */}
        <section id="projects" style={{ maxWidth: 960, margin: "0 auto", padding: "80px 48px" }}>
          <FadeIn>
            <Tag label="Projects" color={accent} />
            <h2 style={{ fontSize: 32, fontWeight: 800, margin: "14px 0 8px", letterSpacing: -1 }}>Production Systems</h2>
            <p style={{ color: muted, fontSize: 13, marginBottom: 48, lineHeight: 1.6 }}>End-to-end ML systems built for real-world scale. Benchmarked, containerised, deployed.</p>
          </FadeIn>

          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {PROJECTS.map((p, i) => (
              <FadeIn key={i} delay={i * 0.09}>
                <div
                  onMouseEnter={() => setHovProj(i)} onMouseLeave={() => setHovProj(null)}
                  style={{ background: hovProj === i ? surfaceHigh : surface, border: `1px solid ${hovProj === i ? p.color + "50" : border}`, borderRadius: 16, padding: "26px 28px", transition: "all 0.3s", boxShadow: hovProj === i ? `0 8px 40px ${p.color}10` : "none" }}>

                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
                        <Tag label={p.tag} color={p.color} />
                        <StatusBadge status={p.status} />
                      </div>
                      <h3 style={{ fontSize: 19, fontWeight: 700, margin: "0 0 10px", letterSpacing: -0.5 }}>{p.title}</h3>
                      <p style={{ color: muted, fontSize: 13, lineHeight: 1.8, margin: "0 0 16px" }}>{p.desc}</p>
                      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 16 }}>
                        {p.stack.map(s => (
                          <span key={s} style={{ fontSize: 10, background: `${p.color}0e`, border: `1px solid ${p.color}1e`, color: p.color, borderRadius: 5, padding: "3px 8px", fontWeight: 500 }}>{s}</span>
                        ))}
                      </div>
                    </div>
                    {/* Metric cards — full width row below text */}
                    <div style={{ display: "flex", gap: 10 }}>
                      {p.metrics.map(m => (
                        <div key={m.label} style={{ textAlign: "center", background: `${p.color}08`, border: `1px solid ${p.color}18`, borderRadius: 10, padding: "12px 14px", flex: 1 }}>
                          <div style={{ fontSize: 18, fontWeight: 800, color: p.color, letterSpacing: -0.5 }}>{m.value}</div>
                          <div style={{ fontSize: 9, color: muted, marginTop: 3, letterSpacing: 0.5, lineHeight: 1.3 }}>{m.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div style={{ marginTop: 18, paddingTop: 18, borderTop: `1px solid ${border}`, display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {p.githubUrl ? (
                      <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="proj-btn"
                        style={{ background: "transparent", border: `1px solid ${p.color}35`, color: p.color, borderRadius: 7, padding: "7px 16px", fontSize: 11, fontWeight: 600, textDecoration: "none" }}>
                        GitHub →
                      </a>
                    ) : (
                      <span style={{ border: `1px solid ${border}`, color: muted, borderRadius: 7, padding: "7px 16px", fontSize: 11 }}>GitHub (soon)</span>
                    )}
                    {p.demoUrl ? (
                      <a href={p.demoUrl} target="_blank" rel="noopener noreferrer" className="proj-btn"
                        style={{ background: `${p.color}12`, border: `1px solid ${p.color}28`, color: p.color, borderRadius: 7, padding: "7px 16px", fontSize: 11, fontWeight: 600, textDecoration: "none" }}>
                        Live Demo →
                      </a>
                    ) : (
                      <span style={{ background: `${p.color}06`, border: `1px solid ${border}`, color: muted, borderRadius: 7, padding: "7px 16px", fontSize: 11 }}>Demo (soon)</span>
                    )}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ── COMMUNITY ── */}
        <section style={{ maxWidth: 960, margin: "0 auto", padding: "0 48px 80px" }}>
          <FadeIn>
            <Tag label="Open Source & Community" color="#22c55e" />
            <h2 style={{ fontSize: 32, fontWeight: 800, margin: "14px 0 32px", letterSpacing: -1 }}>Research & Community</h2>
            <div style={{ background: surface, border: "1px solid #22c55e22", borderRadius: 16, padding: "26px 28px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 20 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
                    <Tag label="Founder · Active" color="#22c55e" />
                    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 8px #22c55e", animation: "pulse 2s infinite" }} />
                      <span style={{ fontSize: 11, color: "#22c55e80", fontWeight: 500 }}>Active sessions</span>
                    </div>
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 10px", letterSpacing: -0.3 }}>Open Source Robotics Research Group</h3>
                  <p style={{ color: muted, fontSize: 13, lineHeight: 1.8, maxWidth: 500, margin: 0 }}>
                    Founded and lead an active open source research community at the intersection of robotics and AI. Built from within a hardware company — practitioners across ML, embedded systems, and autonomous platforms. Running regular technical sessions with growing attendance.
                  </p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {[["Domain", "AI + Robotics"], ["Type", "Open Source"], ["Status", "Growing"]].map(([k, v]) => (
                    <div key={k} style={{ background: "#22c55e08", border: "1px solid #22c55e18", borderRadius: 8, padding: "9px 14px", textAlign: "center", minWidth: 80 }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: "#22c55e" }}>{v}</div>
                      <div style={{ fontSize: 9, color: muted, marginTop: 2 }}>{k}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ marginTop: 20, paddingTop: 20, borderTop: "1px solid #22c55e18", display: "flex", gap: 8 }}>
                <a href={COMMUNITY_LINKS.githubUrl} target="_blank" rel="noopener noreferrer" className="proj-btn"
                  style={{ background: "transparent", border: "1px solid #22c55e35", color: "#22c55e", borderRadius: 7, padding: "7px 16px", fontSize: 11, fontWeight: 600, textDecoration: "none" }}>
                  GitHub →
                </a>
                <a href={COMMUNITY_LINKS.demoUrl} target="_blank" rel="noopener noreferrer" className="proj-btn"
                  style={{ background: "#22c55e12", border: "1px solid #22c55e28", color: "#22c55e", borderRadius: 7, padding: "7px 16px", fontSize: 11, fontWeight: 600, textDecoration: "none" }}>
                  Session Recap →
                </a>
              </div>
            </div>
          </FadeIn>
        </section>

        {/* ── STACK ── */}
        <section id="stack" style={{ maxWidth: 960, margin: "0 auto", padding: "80px 48px" }}>
          <FadeIn>
            <Tag label="Tech Stack" color={accent} />
            <h2 style={{ fontSize: 32, fontWeight: 800, margin: "14px 0 48px", letterSpacing: -1 }}>Full Technical Stack</h2>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(275px, 1fr))", gap: 14 }}>
            {SKILLS.map((s, i) => (
              <FadeIn key={s.cat} delay={i * 0.05}>
                <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 12, padding: "18px 20px" }}>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.3, color: [accent, accent2, "#a855f7", "#ec4899", "#f59e0b", "#10b981"][i % 6], textTransform: "uppercase", marginBottom: 12 }}>{s.cat}</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {s.items.map(item => (
                      <span key={item} style={{ fontSize: 11, background: "#14142a", border: `1px solid ${border}`, color: text, borderRadius: 5, padding: "4px 9px", fontWeight: 500 }}>{item}</span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" style={{ maxWidth: 960, margin: "0 auto", padding: "0 48px 120px" }}>
          <FadeIn>
            <div style={{ background: `linear-gradient(135deg, ${accent}10, ${accent2}08, #a855f706)`, border: `1px solid ${accent}20`, borderRadius: 20, padding: "56px 48px", textAlign: "center" }}>
              <Tag label="Contact" color={accent} />
              <h2 style={{ fontSize: 36, fontWeight: 800, margin: "18px 0 8px", letterSpacing: -1.5 }}>Connect</h2>
              <p style={{ color: muted, fontSize: 15, lineHeight: 1.75, maxWidth: 400, margin: "0 auto 36px" }}>
                I focus on technically ambitious work at the intersection of AI and real-world systems. Reach out for aligned opportunities.
              </p>
              <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
                <SocialLink icon="⌥" label="GitHub" href={LINKS.github} accent={accent} />
                <SocialLink icon="in" label="LinkedIn" href={LINKS.linkedin} accent={accent} />
                <SocialLink icon="🤗" label="HuggingFace" href={LINKS.huggingface} accent={accent} />
                <SocialLink icon="✉" label="Email" href={LINKS.email} accent={accent} />
              </div>
            </div>
          </FadeIn>
        </section>

        {/* Footer */}
        <div style={{ borderTop: `1px solid ${border}`, padding: "20px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", color: muted, fontSize: 11, letterSpacing: 0.2 }}>
          <span>Lawrence Okolo · Research. Production. Leadership.</span>
          <span>Vancouver, BC · Hybrid & remote</span>
        </div>
      </div>

      <style>{`
        @keyframes blink { 0%, 100% { opacity: 1 } 50% { opacity: 0 } }
        @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1) } 50% { opacity: 0.6; transform: scale(1.15) } }
        @keyframes float1 { 0%, 100% { transform: translate(0,0) } 50% { transform: translate(30px, -40px) } }
        @keyframes float2 { 0%, 100% { transform: translate(0,0) } 50% { transform: translate(-25px, 35px) } }
        @keyframes float3 { 0%, 100% { transform: translate(0,0) } 50% { transform: translate(20px, -30px) } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #070710; }
        ::-webkit-scrollbar-thumb { background: #6366f128; border-radius: 2px; }
        .proj-btn {
          display: inline-flex;
          align-items: center;
          transition: transform 0.18s ease, filter 0.18s ease;
        }
        .proj-btn:hover {
          transform: translateY(-2px);
          filter: brightness(1.12);
        }
      `}</style>
    </div>
  );
}