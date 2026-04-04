"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";

/* ─── Supabase logo SVG ─── */
function SupabaseLogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 109 113" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M63.7076 110.284C60.8481 113.885 55.0502 111.912 54.9813 107.314L53.9738 40.0627L99.1935 40.0627C107.384 40.0627 111.952 49.5228 106.859 55.9374L63.7076 110.284Z" fill="url(#paint0_linear)" />
      <path d="M63.7076 110.284C60.8481 113.885 55.0502 111.912 54.9813 107.314L53.9738 40.0627L99.1935 40.0627C107.384 40.0627 111.952 49.5228 106.859 55.9374L63.7076 110.284Z" fill="url(#paint1_linear)" fillOpacity="0.2" />
      <path d="M45.317 2.07103C48.1765 -1.53037 53.9745 0.442937 54.0434 5.041L54.4849 72.2922H9.83113C1.64038 72.2922 -2.92775 62.8321 2.1655 56.4175L45.317 2.07103Z" fill="#3ECF8E" />
      <defs>
        <linearGradient id="paint0_linear" x1="53.9738" y1="54.974" x2="94.1635" y2="71.8295" gradientUnits="userSpaceOnUse">
          <stop stopColor="#249361" />
          <stop offset="1" stopColor="#3ECF8E" />
        </linearGradient>
        <linearGradient id="paint1_linear" x1="36.1558" y1="30.578" x2="54.4844" y2="65.0806" gradientUnits="userSpaceOnUse">
          <stop />
          <stop offset="1" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ─── Slide wrapper ─── */
function Slide({
  children,
  active,
  className = "",
  noPadding = false,
}: {
  children: React.ReactNode;
  active: boolean;
  className?: string;
  noPadding?: boolean;
}) {
  return (
    <div
      className={`slide absolute inset-0 flex flex-col justify-center ${noPadding ? "" : "px-20 py-16"} ${active ? "active" : "pointer-events-none"} ${className}`}
    >
      {children}
    </div>
  );
}

/* ─── Number badge ─── */
function NumberBadge({ n }: { n: number }) {
  return (
    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-sb-green/10 border border-sb-green/20 text-sb-green font-mono text-sm font-bold shrink-0">
      {n}
    </span>
  );
}

/* ─── Card component ─── */
function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-sb-surface/60 border border-sb-border rounded-xl p-6 backdrop-blur-sm ${className}`}
    >
      {children}
    </div>
  );
}

/* ─── SVG Icons ─── */
function IconRuler({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
    </svg>
  );
}

function IconTarget({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
      <circle cx="12" cy="12" r="0.75" fill="currentColor" />
    </svg>
  );
}

function IconRefresh({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182M20.016 4.66v4.993" />
    </svg>
  );
}

function IconTable({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M10.875 12c-.621 0-1.125.504-1.125 1.125M12 12h7.5m-7.5 0c.621 0 1.125.504 1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 0v1.5c0 .621-.504 1.125-1.125 1.125" />
    </svg>
  );
}

function IconShield({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  );
}

function IconLock({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
    </svg>
  );
}

function IconCheck({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function IconX({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function IconGitBranch({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 3v12m0 0a3 3 0 103 3H15a3 3 0 100-3H9m-3 0h6m0-12a3 3 0 10-3 3h6a3 3 0 100-3H9" />
    </svg>
  );
}

/* ─── Branch badge ─── */
function BranchBadge({ branch }: { branch: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-sb-surface border border-sb-border text-xs font-mono text-sb-muted">
      <IconGitBranch className="w-3.5 h-3.5" />
      {branch}
    </div>
  );
}

/* ─── Terminal block ─── */
function TerminalBlock({ lines, title, dark }: { lines: string[]; title: string; dark: boolean }) {
  return (
    <div className={`rounded-xl border border-sb-border overflow-hidden ${dark ? "bg-[#1a1a1a]" : "bg-white"}`}>
      <div className={`flex items-center gap-2 px-4 py-2 border-b ${dark ? "border-white/10" : "border-black/10"}`}>
        <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        <span className={`ml-3 text-xs font-mono ${dark ? "text-white/40" : "text-black/40"}`}>{title}</span>
      </div>
      <div className={`p-5 font-mono text-xs leading-relaxed ${dark ? "text-white" : "text-[#1a1a1a]"}`}>
        {lines.map((line, i) => (
          <div key={i} className={line.startsWith("$") ? "text-sb-green" : line.startsWith("#") ? (dark ? "text-white/40" : "text-black/40") : ""}>
            {line}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Main Presentation ─── */
const TOTAL_SLIDES = 13;

export default function Presentation() {
  const [current, setCurrent] = useState(0);
  const [dark, setDark] = useState(true);
  const touchRef = useRef<{ x: number; y: number } | null>(null);

  const go = useCallback(
    (dir: 1 | -1) => {
      setCurrent((c) => {
        const next = c + dir;
        if (next < 0 || next >= TOTAL_SLIDES) return c;
        return next;
      });
    },
    []
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLInputElement) return;
      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
        case " ":
          e.preventDefault();
          go(1);
          break;
        case "ArrowLeft":
        case "ArrowUp":
          e.preventDefault();
          go(-1);
          break;
        case "Home":
          setCurrent(0);
          break;
        case "End":
          setCurrent(TOTAL_SLIDES - 1);
          break;
        case "d":
        case "D":
          setDark((d) => !d);
          break;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  useEffect(() => {
    document.documentElement.classList.toggle("pres-light", !dark);
  }, [dark]);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (["BUTTON", "A", "INPUT", "TEXTAREA"].includes(tag)) return;
      go(1);
    },
    [go]
  );

  return (
    <>
      {/* Portrait overlay */}
      <div className="portrait-overlay fixed inset-0 z-50 flex-col items-center justify-center gap-6 text-center p-8">
        <div style={{ animation: "rotatePhone 3s ease-in-out infinite" }}>
          <svg className="w-10 h-10 text-sb-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
          </svg>
        </div>
        <p className="text-lg font-semibold">Please rotate your device</p>
        <p className="text-sm text-sb-muted">This presentation works best in landscape mode</p>
      </div>

      {/* Main content */}
      <div
        className="presentation-content relative w-screen h-screen overflow-hidden cursor-pointer select-none"
        onClick={handleClick}
        onTouchStart={(e) => {
          touchRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        }}
        onTouchEnd={(e) => {
          if (!touchRef.current) return;
          const dx = e.changedTouches[0].clientX - touchRef.current.x;
          if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
          touchRef.current = null;
        }}
      >
        {/* ─── Slide 0: Title ─── */}
        <Slide active={current === 0}>
          <Image
            src={dark ? "/slides/bg-globe.svg" : "/slides/bg-globe-light.svg"}
            alt=""
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full z-[2] pointer-events-none blur-[120px] bg-sb-green/20" />
          <div className="relative z-10 flex flex-col items-center text-center gap-6">
            <div className="stagger">
              <SupabaseLogo className="w-14 h-14 mx-auto" />
            </div>
            <h1 className="stagger text-6xl font-extrabold font-[var(--font-display)] tracking-tight leading-tight max-w-4xl">
              Skill Issue
            </h1>
            <p className="stagger text-xl text-sb-muted max-w-2xl leading-relaxed">
              How We Used AI to Make Agents Actually Good at Supabase
            </p>
            <div className="stagger flex items-center gap-3 mt-4">
              <div className="pill bg-sb-green/10 text-sb-green border border-sb-green/20">Workshop</div>
              <div className="pill bg-sb-surface text-sb-muted border border-sb-border">MCP Dev Summit 2026</div>
            </div>
            <p className="stagger text-sm text-sb-muted mt-2">Pedro Rodrigues &middot; Supabase</p>
          </div>
        </Slide>

        {/* ─── Slide 1: The App ─── */}
        <Slide active={current === 1} className="slide-from-left">
          <p className="stagger text-xs font-medium tracking-widest text-sb-muted uppercase mb-3">The App</p>
          <h2 className="stagger text-5xl font-extrabold font-[var(--font-display)] tracking-tight mb-2">
            Employee Directory
          </h2>
          <p className="stagger text-lg text-sb-muted mb-8">Sensitive data. Real consequences.</p>
          <div className="stagger grid grid-cols-3 gap-6">
            <Card className="card-hover relative overflow-hidden">
              <div className="accent-bar absolute top-0 left-0 w-1 h-full bg-sb-green" />
              <div className="pl-4">
                <div className="flex items-center gap-2 mb-3">
                  <IconTable className="w-5 h-5 text-sb-green" />
                  <h3 className="font-bold text-lg font-mono">profiles</h3>
                </div>
                <ul className="space-y-1.5 text-sm text-sb-muted">
                  <li>name, email, department, role</li>
                  <li className="text-red-400 font-medium">salary (SENSITIVE)</li>
                  <li>hire_date</li>
                </ul>
              </div>
            </Card>
            <Card className="card-hover relative overflow-hidden">
              <div className="accent-bar absolute top-0 left-0 w-1 h-full bg-sb-green" />
              <div className="pl-4">
                <div className="flex items-center gap-2 mb-3">
                  <IconTable className="w-5 h-5 text-sb-green" />
                  <h3 className="font-bold text-lg font-mono">performance_reviews</h3>
                </div>
                <ul className="space-y-1.5 text-sm text-sb-muted">
                  <li>rating, comments</li>
                  <li className="text-red-400 font-medium">private_notes (SENSITIVE)</li>
                </ul>
              </div>
            </Card>
            <Card className="card-hover relative overflow-hidden">
              <div className="accent-bar absolute top-0 left-0 w-1 h-full bg-sb-green" />
              <div className="pl-4">
                <div className="flex items-center gap-2 mb-3">
                  <IconShield className="w-5 h-5 text-sb-green" />
                  <h3 className="font-bold text-lg">RLS Policies</h3>
                </div>
                <ul className="space-y-1.5 text-sm text-sb-muted">
                  <li>Employees see own profile</li>
                  <li>Managers see team salary</li>
                  <li>HR sees everything</li>
                </ul>
              </div>
            </Card>
          </div>
          <div className="stagger mt-6 flex items-center gap-2 text-sm text-sb-muted">
            <svg className="w-4 h-4 text-sb-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Open the app at <code className="font-mono bg-sb-surface px-2 py-0.5 rounded text-xs">localhost:3000</code> to explore
          </div>
        </Slide>

        {/* ─── Slide 2: What Are Skills? ─── */}
        <Slide active={current === 2}>
          <p className="stagger text-xs font-medium tracking-widest text-sb-muted uppercase mb-3">Quick Recap</p>
          <h2 className="stagger text-5xl font-extrabold font-[var(--font-display)] tracking-tight mb-8">
            What Are Agent Skills?
          </h2>
          <div className="stagger grid grid-cols-2 gap-8">
            <div className={`rounded-xl border border-sb-border overflow-hidden ${dark ? "bg-[#1a1a1a]" : "bg-white"}`}>
              <div className={`flex items-center gap-2 px-4 py-2 border-b ${dark ? "border-white/10" : "border-black/10"}`}>
                <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <span className="w-3 h-3 rounded-full bg-[#28c840]" />
                <span className={`ml-3 text-xs font-mono ${dark ? "text-white/40" : "text-black/40"}`}>SKILL.md</span>
              </div>
              <div className="p-5 font-mono text-xs leading-relaxed">
                <div className="text-sb-muted">---</div>
                <div><span className="text-sb-green">name</span><span className="text-sb-muted">:</span> <span className={dark ? "text-white" : "text-[#1a1a1a]"}>supabase-security</span></div>
                <div><span className="text-sb-green">description</span><span className="text-sb-muted">:</span> <span className={dark ? "text-white" : "text-[#1a1a1a]"}>Security best practices for Supabase</span></div>
                <div className="text-sb-muted">---</div>
                <div className={`mt-3 ${dark ? "text-white" : "text-[#1a1a1a]"}`}># Supabase Security</div>
                <div className={`mt-1 ${dark ? "text-white/60" : "text-black/60"}`}>## Row Level Security</div>
                <div className={dark ? "text-white/60" : "text-black/60"}>- Always enable RLS on new tables</div>
                <div className={dark ? "text-white/60" : "text-black/60"}>- Create SELECT policies scoped to auth.uid()</div>
                <div className={dark ? "text-white/60" : "text-black/60"}>- Sensitive columns need restrictive policies</div>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <Card>
                <div className="flex items-start gap-3">
                  <NumberBadge n={1} />
                  <div>
                    <h3 className="font-bold mb-1">Frontmatter</h3>
                    <p className="text-sm text-sb-muted">Name + description = trigger. The agent reads this to decide when to load the skill.</p>
                  </div>
                </div>
              </Card>
              <Card>
                <div className="flex items-start gap-3">
                  <NumberBadge n={2} />
                  <div>
                    <h3 className="font-bold mb-1">Instructions</h3>
                    <p className="text-sm text-sb-muted">Domain-specific rules, patterns, and guardrails the agent follows when the skill is active.</p>
                  </div>
                </div>
              </Card>
              <Card>
                <div className="flex items-start gap-3">
                  <NumberBadge n={3} />
                  <div>
                    <h3 className="font-bold mb-1">On-Demand Context</h3>
                    <p className="text-sm text-sb-muted">Loaded only when relevant — not stuffed into every prompt. Keeps the context window focused.</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Slide>

        {/* ─── Slide 3: Writing the Skill (Live Coding) ─── */}
        <Slide active={current === 3} className="slide-from-left">
          <p className="stagger text-xs font-medium tracking-widest text-sb-muted uppercase mb-3">Block 1</p>
          <h2 className="stagger text-5xl font-extrabold font-[var(--font-display)] tracking-tight mb-8">
            Write a Skill by Hand
          </h2>
          <div className="stagger">
            <TerminalBlock
              dark={dark}
              title="terminal"
              lines={[
                "$ mkdir -p .claude/skills/supabase-security",
                "$ cat > .claude/skills/supabase-security/SKILL.md << 'EOF'",
                "---",
                "name: supabase-security",
                "description: Security best practices for Supabase",
                "---",
                "# Supabase Security",
                "## Row Level Security",
                "- Always enable RLS on new tables",
                "- Create SELECT policies scoped to auth.uid()",
                "- Sensitive columns need restrictive policies",
                "EOF",
              ]}
            />
          </div>
          <div className="stagger mt-6 flex items-center justify-between">
            <p className="text-sm text-sb-muted">v1 — Basic RLS rules. No mention of views.</p>
            <BranchBadge branch="step/1-first-skill" />
          </div>
        </Slide>

        {/* ─── Slide 4: Manual Test (Live Coding) ─── */}
        <Slide active={current === 4} className="slide-from-right">
          <p className="stagger text-xs font-medium tracking-widest text-sb-muted uppercase mb-3">Block 2</p>
          <h2 className="stagger text-5xl font-extrabold font-[var(--font-display)] tracking-tight mb-8">
            Test It Manually
          </h2>
          <div className="stagger">
            <TerminalBlock
              dark={dark}
              title="terminal"
              lines={[
                '$ claude "Add a new expense_reports table with proper security"',
                "",
                "# Agent reads the skill...",
                "# Creates table with RLS ✓",
                "# Adds SELECT policy scoped to auth.uid() ✓",
                "# Protects sensitive columns ✓",
              ]}
            />
          </div>
          <div className="stagger mt-6 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sb-green">
              <IconCheck className="w-5 h-5" />
              <span className="text-sm font-medium">The skill works. Are we done?</span>
            </div>
            <BranchBadge branch="step/2-manual-test" />
          </div>
        </Slide>

        {/* ─── Slide 5: The Setup ─── */}
        <Slide active={current === 5}>
          <p className="stagger text-xs font-medium tracking-widest text-sb-muted uppercase mb-3">The Challenge</p>
          <h2 className="stagger text-5xl font-extrabold font-[var(--font-display)] tracking-tight mb-8">
            The Skill Passed Every Test. Is It Done?
          </h2>
          <div className="stagger text-center mb-8">
            <p className="text-lg text-sb-muted mb-6">Let&apos;s add a reporting feature.</p>
            <div className={`max-w-3xl mx-auto rounded-xl border-l-4 border-sb-green p-6 text-left ${dark ? "bg-sb-surface/80" : "bg-sb-surface"}`}>
              <p className="text-sm text-sb-muted mb-2 uppercase tracking-widest font-medium">The Prompt</p>
              <p className={`text-base leading-relaxed italic ${dark ? "text-white/90" : "text-black/90"}`}>
                &ldquo;Create a SQL view called <code className="font-mono bg-sb-surface px-1.5 py-0.5 rounded text-sb-green not-italic">department_stats</code> that shows each department&apos;s headcount, average performance rating, and salary range so HR can see workforce distribution at a glance.&rdquo;
              </p>
            </div>
          </div>
          <div className="stagger grid grid-cols-2 gap-6">
            <div className="card-hover rounded-xl border border-red-400/30 p-5 bg-red-400/5 relative overflow-hidden">
              <div className="accent-bar absolute top-0 left-0 w-1 h-full bg-red-400" />
              <div className="pl-4 flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-red-400" />
                <h3 className="font-bold text-lg">Claudia</h3>
                <span className="pill bg-red-400/10 text-red-400 border border-red-400/20 text-xs">No Skill</span>
              </div>
            </div>
            <div className="card-hover rounded-xl border border-sb-green/30 p-5 bg-sb-green/5 relative overflow-hidden">
              <div className="accent-bar absolute top-0 left-0 w-1 h-full bg-sb-green" />
              <div className="pl-4 flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-sb-green" />
                <h3 className="font-bold text-lg">Jessica</h3>
                <span className="pill bg-sb-green/10 text-sb-green border border-sb-green/20 text-xs">Skill v1</span>
              </div>
            </div>
          </div>
        </Slide>

        {/* ─── Slide 6: THE PLAYGROUND — Split Screen Demo ─── */}
        <Slide active={current === 6} noPadding>
          <div className="flex flex-col h-full">
            {/* Split screen */}
            <div className="flex flex-1 min-h-0">
              {/* LEFT HALF — Claudia */}
              <div className="flex-1 flex flex-col">
                {/* Header */}
                <div className="flex items-center gap-3 px-6 py-3 bg-red-400/10 border-b border-red-400/20">
                  <span className="w-3 h-3 rounded-full bg-red-400" />
                  <span className="font-bold text-sm">Claudia</span>
                  <span className="pill bg-red-400/10 text-red-400 border border-red-400/20 text-xs">no skill</span>
                </div>
                {/* Terminal area */}
                <div className={`flex-1 flex flex-col ${dark ? "bg-[#0d0d0d]" : "bg-gray-50"}`}>
                  <div className="flex-1 p-6 font-mono text-xs">
                    <div className={dark ? "text-white/30" : "text-black/30"}>
                      <div className="mb-1">$ claude &quot;Create a SQL view called department_stats...&quot;</div>
                      <div className="mt-4 flex items-center gap-2">
                        <span className="cursor-blink">_</span>
                        <span>waiting for agent output...</span>
                      </div>
                    </div>
                  </div>
                  {/* App preview area */}
                  <div className={`border-t ${dark ? "border-white/10 bg-[#1a1a1a]" : "border-black/10 bg-white"} p-6 flex items-center justify-center`}>
                    <p className={`text-sm ${dark ? "text-white/40" : "text-black/40"}`}>
                      Open <code className="font-mono bg-sb-surface px-1.5 py-0.5 rounded text-xs">localhost:3000/reports</code> to see Claudia&apos;s results
                    </p>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className={`w-px ${dark ? "bg-white/10" : "bg-black/10"}`} />

              {/* RIGHT HALF — Jessica */}
              <div className="flex-1 flex flex-col">
                {/* Header */}
                <div className="flex items-center gap-3 px-6 py-3 bg-sb-green/10 border-b border-sb-green/20">
                  <span className="w-3 h-3 rounded-full bg-sb-green" />
                  <span className="font-bold text-sm">Jessica</span>
                  <span className="pill bg-sb-green/10 text-sb-green border border-sb-green/20 text-xs">skill v1</span>
                </div>
                {/* Terminal area */}
                <div className={`flex-1 flex flex-col ${dark ? "bg-[#0d0d0d]" : "bg-gray-50"}`}>
                  <div className="flex-1 p-6 font-mono text-xs">
                    <div className={dark ? "text-white/30" : "text-black/30"}>
                      <div className="mb-1">$ claude &quot;Create a SQL view called department_stats...&quot;</div>
                      <div className="mt-4 flex items-center gap-2">
                        <span className="cursor-blink">_</span>
                        <span>waiting for agent output...</span>
                      </div>
                    </div>
                  </div>
                  {/* App preview area */}
                  <div className={`border-t ${dark ? "border-white/10 bg-[#1a1a1a]" : "border-black/10 bg-white"} p-6 flex items-center justify-center`}>
                    <p className={`text-sm ${dark ? "text-white/40" : "text-black/40"}`}>
                      Open <code className="font-mono bg-sb-surface px-1.5 py-0.5 rounded text-xs">localhost:3000/reports</code> to see Jessica&apos;s results
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className={`flex items-center justify-center px-6 py-3 border-t ${dark ? "border-white/10" : "border-black/10"}`}>
              <p className="text-sm text-sb-muted">Same prompt. Same app. Different context.</p>
            </div>
          </div>
        </Slide>

        {/* ─── Slide 7: The Reveal ─── */}
        <Slide active={current === 7}>
          <p className="stagger text-xs font-medium tracking-widest text-sb-muted uppercase mb-3">The Result</p>
          <h2 className="stagger text-5xl font-extrabold font-[var(--font-display)] tracking-tight mb-8 text-red-400">
            Both Leaked Salary Data
          </h2>
          <div className="stagger grid grid-cols-2 gap-8">
            <div className="card-hover rounded-2xl border border-sb-border p-7 bg-sb-card relative overflow-hidden">
              <div className="accent-bar absolute top-0 left-0 w-1 h-full bg-red-400" />
              <div className="pl-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-3 h-3 rounded-full bg-red-400" />
                  <h3 className="font-bold text-lg">Claudia (No Skill)</h3>
                </div>
                <p className="text-sm text-sb-muted leading-relaxed">
                  Created view without <code className="font-mono bg-sb-surface px-1.5 py-0.5 rounded text-xs">security_invoker</code>. Every employee can see salary data.
                </p>
              </div>
            </div>
            <div className="card-hover rounded-2xl border border-sb-border p-7 bg-sb-card relative overflow-hidden">
              <div className="accent-bar absolute top-0 left-0 w-1 h-full bg-red-400" />
              <div className="pl-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-3 h-3 rounded-full bg-red-400" />
                  <h3 className="font-bold text-lg">Jessica (Skill v1)</h3>
                </div>
                <p className="text-sm text-sb-muted leading-relaxed">
                  Skill covered tables, not views. Same leak.
                </p>
              </div>
            </div>
          </div>
          <div className="stagger mt-10 text-center">
            <p className={`text-xl leading-relaxed max-w-3xl mx-auto italic ${dark ? "text-white/80" : "text-black/80"}`}>
              &ldquo;The skill wasn&apos;t wrong — it was incomplete. And we had no way to know.&rdquo;
            </p>
          </div>
          <div className="stagger mt-6 flex justify-center">
            <BranchBadge branch="step/3-wow-moment" />
          </div>
        </Slide>

        {/* ─── Slide 8: Iterate ─── */}
        <Slide active={current === 8} className="slide-from-left">
          <p className="stagger text-xs font-medium tracking-widest text-sb-muted uppercase mb-3">Block 3</p>
          <h2 className="stagger text-5xl font-extrabold font-[var(--font-display)] tracking-tight mb-8">
            Fix the Skill
          </h2>
          <div className="stagger grid grid-cols-3 gap-6">
            <Card className="card-hover relative overflow-hidden border-yellow-400/30">
              <div className="accent-bar absolute top-0 left-0 w-1 h-full bg-yellow-400" />
              <div className="pl-4">
                <div className="flex items-center gap-2 mb-3">
                  <NumberBadge n={1} />
                  <h3 className="font-bold">v1.5 — Add docs search</h3>
                </div>
                <p className="text-sm text-sb-muted leading-relaxed">
                  Search Supabase docs for security patterns. Discover what the skill is missing.
                </p>
              </div>
            </Card>
            <Card className="card-hover relative overflow-hidden border-sb-green/30">
              <div className="accent-bar absolute top-0 left-0 w-1 h-full bg-sb-green" />
              <div className="pl-4">
                <div className="flex items-center gap-2 mb-3">
                  <NumberBadge n={2} />
                  <h3 className="font-bold">v2 — Add explicit rule</h3>
                </div>
                <p className="text-sm text-sb-muted leading-relaxed">
                  &ldquo;Views bypass RLS. Always use <code className="font-mono bg-sb-surface px-1 py-0.5 rounded text-xs">security_invoker = true</code>&rdquo;
                </p>
              </div>
            </Card>
            <Card className="card-hover relative overflow-hidden border-sb-green/30">
              <div className="accent-bar absolute top-0 left-0 w-1 h-full bg-sb-green" />
              <div className="pl-4">
                <div className="flex items-center gap-2 mb-3">
                  <NumberBadge n={3} />
                  <h3 className="font-bold">Re-run</h3>
                </div>
                <p className="text-sm text-sb-muted leading-relaxed flex items-center gap-2">
                  <IconCheck className="w-4 h-4 text-sb-green shrink-0" />
                  Agent creates safe view
                </p>
              </div>
            </Card>
          </div>
          <div className="stagger mt-8 flex items-center justify-between">
            <p className="text-sm text-sb-muted">But how do we know this works every time?</p>
            <BranchBadge branch="step/4-iterate" />
          </div>
        </Slide>

        {/* ─── Slide 9: Automate with Evals ─── */}
        <Slide active={current === 9} className="slide-from-right">
          <p className="stagger text-xs font-medium tracking-widest text-sb-muted uppercase mb-3">Block 4</p>
          <h2 className="stagger text-5xl font-extrabold font-[var(--font-display)] tracking-tight mb-8">
            Automate the Check
          </h2>
          <div className="stagger grid grid-cols-2 gap-8">
            <TerminalBlock
              dark={dark}
              title="terminal — eval runner"
              lines={[
                "$ pnpm eval --scenario view-leak --condition skill-v1",
                "",
                "# Score: 0 — security_invoker missing",
                "",
                "$ pnpm eval --scenario view-leak --condition skill-v2",
                "",
                "# Score: 1 — security_invoker present",
              ]}
            />
            <div className="rounded-xl border border-sb-border bg-sb-card p-6">
              <h3 className="font-bold text-lg mb-4">Braintrust Dashboard</h3>
              <p className="text-xs text-sb-muted uppercase tracking-widest mb-4">view-leak scenario</p>
              <div className="space-y-3">
                {[
                  { name: "baseline (no skill)", score: 0, color: "bg-red-400" },
                  { name: "skill-v1", score: 0, color: "bg-red-400" },
                  { name: "skill-v2", score: 100, color: "bg-sb-green" },
                ].map((v) => (
                  <div key={v.name} className="flex items-center gap-3">
                    <span className="text-xs font-mono text-sb-muted w-36 shrink-0">{v.name}</span>
                    <div className="flex-1 h-2 bg-sb-border rounded-full overflow-hidden">
                      <div className={`h-full rounded-full score-bar ${v.color}`} style={{ width: `${Math.max(v.score, 2)}%` }} />
                    </div>
                    <span className={`text-sm font-mono font-bold w-12 text-right ${v.score > 0 ? "text-sb-green" : "text-red-400"}`}>{v.score}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="stagger mt-6 flex justify-end">
            <BranchBadge branch="step/5-eval-setup" />
          </div>
        </Slide>

        {/* ─── Slide 10: Lessons Learned ─── */}
        <Slide active={current === 10}>
          <p className="stagger text-xs font-medium tracking-widest text-sb-muted uppercase mb-3">Lessons Learned</p>
          <h2 className="stagger text-5xl font-extrabold font-[var(--font-display)] tracking-tight mb-10">
            What Actually Works
          </h2>
          <div className="stagger grid grid-cols-3 gap-10">
            <div>
              <div className="mb-4 text-sb-green"><IconRuler /></div>
              <h3 className="font-bold text-xl mb-2">Measure Everything</h3>
              <p className="text-sm text-sb-muted leading-relaxed">
                If you can&apos;t measure the improvement, you don&apos;t know if there is one.
              </p>
            </div>
            <div>
              <div className="mb-4 text-sb-green"><IconTarget /></div>
              <h3 className="font-bold text-xl mb-2">Principles Over Templates</h3>
              <p className="text-sm text-sb-muted leading-relaxed">
                Teach the agent <em>why</em>, not just <em>what</em>. Let it adapt.
              </p>
            </div>
            <div>
              <div className="mb-4 text-sb-green"><IconRefresh /></div>
              <h3 className="font-bold text-xl mb-2">Small Iterations Win</h3>
              <p className="text-sm text-sb-muted leading-relaxed">
                One change at a time. Know what moved the score.
              </p>
            </div>
          </div>
        </Slide>

        {/* ─── Slide 11: What's Next ─── */}
        <Slide active={current === 11} className="slide-from-left">
          <p className="stagger text-xs font-medium tracking-widest text-sb-muted uppercase mb-3">What&apos;s Next</p>
          <h2 className="stagger text-5xl font-extrabold font-[var(--font-display)] tracking-tight mb-8">
            From Workshop to Production
          </h2>
          <div className="stagger grid grid-cols-2 gap-8">
            <Card className="relative overflow-hidden">
              <div className="accent-bar absolute top-0 left-0 w-1 h-full bg-sb-green" />
              <div className="pl-4">
                <h3 className="font-bold text-lg mb-3">Follow-Up Talk: April 9th</h3>
                <p className="text-sm text-sb-muted mb-4 leading-relaxed">
                  Deep dive into our eval results at Supabase. What actually moved the needle in production across 6 workflows.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Postgres Security", "Edge Functions", "Auth Setup", "Storage Policies", "Migrations", "Realtime"].map((tag) => (
                    <span key={tag} className="pill bg-sb-green/10 text-sb-green border border-sb-green/20 text-xs">{tag}</span>
                  ))}
                </div>
              </div>
            </Card>
            <div className="space-y-4">
              <Card>
                <h3 className="font-bold mb-2 flex items-center gap-2">
                  <IconCheck className="w-4 h-4 text-sb-green" /> Your Takeaways
                </h3>
                <ul className="space-y-2 text-sm text-sb-muted">
                  <li>A working skill you wrote and evaluated</li>
                  <li>Experience with the wow-moment failure</li>
                  <li>The eval loop: write, run, inspect, iterate</li>
                  <li>An intuition for reading eval results</li>
                </ul>
              </Card>
              <Card>
                <h3 className="font-bold mb-2 flex items-center gap-2">
                  <svg className="w-4 h-4 text-sb-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  Keep Going
                </h3>
                <ul className="space-y-2 text-sm text-sb-muted">
                  <li>Open source: github.com/supabase/skill-workshop</li>
                  <li>Braintrust for tracking skill iterations</li>
                  <li>Join #agent-skills in Supabase Discord</li>
                </ul>
              </Card>
            </div>
          </div>
        </Slide>

        {/* ─── Slide 12: Thank You ─── */}
        <Slide active={current === 12}>
          <Image
            src={dark ? "/slides/bg-globe.svg" : "/slides/bg-globe-light.svg"}
            alt=""
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full z-[2] pointer-events-none blur-[120px] bg-sb-green/15" />
          <div className="relative z-10 flex flex-col items-center text-center gap-6">
            <div className="stagger"><SupabaseLogo className="w-14 h-14 mx-auto" /></div>
            <h2 className="stagger text-6xl font-extrabold font-[var(--font-display)] tracking-tight">
              Thank You
            </h2>
            <p className="stagger text-xl text-sb-muted max-w-xl">Now go measure your skills.</p>
            <div className="stagger flex items-center gap-6 mt-6 text-sm text-sb-muted">
              <span>Pedro Rodrigues</span>
              <span className="w-1 h-1 rounded-full bg-sb-border" />
              <span>@pedrorgz</span>
              <span className="w-1 h-1 rounded-full bg-sb-border" />
              <span>supabase.com</span>
            </div>
            <p className="stagger text-sm text-sb-green mt-4">
              Follow-up talk: April 9th — What Actually Moved the Needle in Production
            </p>
          </div>
        </Slide>

        {/* ─── Bottom navigation bar ─── */}
        <div className="fixed bottom-0 left-0 right-0 z-30 flex items-center justify-between px-8 py-3 bg-background/80 backdrop-blur-sm border-t border-sb-border">
          <div className="flex items-center gap-3 text-sm text-sb-muted">
            <Image
              src={dark ? "/slides/supabase-dark.svg" : "/slides/supabase-light.svg"}
              alt="Supabase"
              width={80}
              height={20}
              className="opacity-60"
            />
            <span className="font-mono text-xs">{current + 1}/{TOTAL_SLIDES}</span>
          </div>
          <div className="flex items-center gap-1.5">
            {Array.from({ length: TOTAL_SLIDES }, (_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  i === current ? "w-6 bg-sb-green" : i < current ? "w-2 bg-sb-green/30" : "w-2 bg-sb-border"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={(e) => { e.stopPropagation(); setDark((d) => !d); }}
              className="p-1.5 rounded-lg hover:bg-sb-surface transition-colors text-sb-muted cursor-pointer"
              aria-label="Toggle dark mode"
            >
              {dark ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            <span className="text-xs text-sb-muted/50 hidden lg:block">&larr; &rarr; navigate &middot; D toggle theme</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="fixed bottom-0 left-0 right-0 z-40 h-0.5 bg-sb-border/30">
          <div className="h-full bg-sb-green/50 slide-progress" style={{ width: `${((current + 1) / TOTAL_SLIDES) * 100}%` }} />
        </div>
      </div>
    </>
  );
}
