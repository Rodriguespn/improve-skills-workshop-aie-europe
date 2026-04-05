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
const TOTAL_SLIDES = 8;

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
              Level Up Your Skills
            </h1>
            <p className="stagger text-xl text-sb-muted max-w-2xl leading-relaxed">
              Writing and testing agent skills, hands-on
            </p>
            <div className="stagger flex items-center gap-3 mt-4">
              <div className="pill bg-sb-green/10 text-sb-green border border-sb-green/20">Workshop</div>
              <div className="pill bg-sb-surface text-sb-muted border border-sb-border">AI Engineer Europe 2026</div>
            </div>
            <p className="stagger text-sm text-sb-muted mt-2">Pedro Rodrigues &middot; Supabase</p>
            <div className="stagger flex flex-col items-center gap-2 mt-4">
              <div className="w-24 h-24 rounded-xl border-2 border-dashed border-sb-border flex items-center justify-center">
                <span className="text-xs text-sb-muted font-mono">QR</span>
              </div>
              <p className="text-xs text-sb-muted">Scan to get started</p>
            </div>
          </div>
        </Slide>

        {/* ─── Slide 1: What Are Skills ─── */}
        <Slide active={current === 1}>
          <h2 className="stagger text-5xl font-extrabold font-[var(--font-display)] tracking-tight mb-2">
            What Are Skills
          </h2>
          <p className="stagger text-lg text-sb-muted mb-8">
            Reusable instructions that shape how AI agents approach tasks
          </p>
          <div className="stagger grid grid-cols-3 gap-6 mb-8">
            <Card className="card-hover">
              <div className="flex items-start gap-3">
                <NumberBadge n={1} />
                <div>
                  <h3 className="font-bold mb-1">Frontmatter</h3>
                  <p className="text-sm text-sb-muted">Name, description, triggers for discovery</p>
                </div>
              </div>
            </Card>
            <Card className="card-hover">
              <div className="flex items-start gap-3">
                <NumberBadge n={2} />
                <div>
                  <h3 className="font-bold mb-1">Instructions</h3>
                  <p className="text-sm text-sb-muted">Markdown body with domain expertise and best practices</p>
                </div>
              </div>
            </Card>
            <Card className="card-hover">
              <div className="flex items-start gap-3">
                <NumberBadge n={3} />
                <div>
                  <h3 className="font-bold mb-1">Context</h3>
                  <p className="text-sm text-sb-muted">Reference docs and examples agents can consult</p>
                </div>
              </div>
            </Card>
          </div>
          <div className="stagger">
            <TerminalBlock
              dark={dark}
              title="terminal"
              lines={[
                "$ cat .claude/skills/supabase-security/SKILL.md",
                "---",
                "name: supabase-security",
                "description: Review Supabase RLS policies",
                "user-invocable: true",
                "---",
                "# Supabase Security Review",
                "Check all tables have RLS enabled...",
              ]}
            />
          </div>
        </Slide>

        {/* ─── Slide 2: Testing Skills with Evals ─── */}
        <Slide active={current === 2}>
          <h2 className="stagger text-5xl font-extrabold font-[var(--font-display)] tracking-tight mb-2">
            Testing Skills with Evals
          </h2>
          <p className="stagger text-lg text-sb-muted mb-8">The systematic approach</p>
          <div className="stagger grid grid-cols-3 gap-6">
            <Card className="card-hover">
              <div className="flex items-start gap-3">
                <NumberBadge n={1} />
                <div>
                  <h3 className="font-bold mb-1">Define Metrics</h3>
                  <p className="text-sm text-sb-muted">What does &lsquo;good&rsquo; look like?</p>
                </div>
              </div>
            </Card>
            <Card className="card-hover">
              <div className="flex items-start gap-3">
                <NumberBadge n={2} />
                <div>
                  <h3 className="font-bold mb-1">Create Skill</h3>
                  <p className="text-sm text-sb-muted">SKILL.md with clear instructions</p>
                </div>
              </div>
            </Card>
            <Card className="card-hover">
              <div className="flex items-start gap-3">
                <NumberBadge n={3} />
                <div>
                  <h3 className="font-bold mb-1">Test Manually</h3>
                  <p className="text-sm text-sb-muted">Surface hidden assumptions early</p>
                </div>
              </div>
            </Card>
            <Card className="card-hover">
              <div className="flex items-start gap-3">
                <NumberBadge n={4} />
                <div>
                  <h3 className="font-bold mb-1">Build Test Cases</h3>
                  <p className="text-sm text-sb-muted">Targeted prompts, positive + negative</p>
                </div>
              </div>
            </Card>
            <Card className="card-hover">
              <div className="flex items-start gap-3">
                <NumberBadge n={5} />
                <div>
                  <h3 className="font-bold mb-1">Grade</h3>
                  <p className="text-sm text-sb-muted">Deterministic checks first, then rubrics</p>
                </div>
              </div>
            </Card>
            <Card className="card-hover">
              <div className="flex items-start gap-3">
                <NumberBadge n={6} />
                <div>
                  <h3 className="font-bold mb-1">Iterate</h3>
                  <p className="text-sm text-sb-muted">Let real failures drive improvement</p>
                </div>
              </div>
            </Card>
          </div>
          <p className="text-xs text-sb-muted absolute bottom-6 left-8">
            Source: OpenAI — Testing Agent Skills Systematically with Evals
          </p>
        </Slide>

        {/* ─── Slide 3: What We're Doing ─── */}
        <Slide active={current === 3} className="slide-from-left">
          <h2 className="stagger text-5xl font-extrabold font-[var(--font-display)] tracking-tight mb-2">
            What We&apos;re Doing
          </h2>
          <p className="stagger text-lg text-sb-muted mb-8">Same principles, our way</p>
          <div className="stagger grid grid-cols-2 gap-10">
            <div className="flex flex-col justify-center gap-6">
              <p className="text-base leading-relaxed text-sb-muted">
                We&apos;ll write a Supabase security skill from scratch, test it against a real app, discover where it fails, and iterate until it works. The same loop you&apos;d use in production — compressed into a workshop.
              </p>
              <BranchBadge branch="main" />
            </div>
            <div className="flex flex-col gap-4">
              <Card className="card-hover relative overflow-hidden">
                <div className="accent-bar absolute top-0 left-0 w-1 h-full bg-sb-green" />
                <div className="pl-4 flex items-start gap-3">
                  <NumberBadge n={1} />
                  <div>
                    <h3 className="font-bold mb-1">Write</h3>
                    <p className="text-sm text-sb-muted">Create a Supabase security skill from scratch</p>
                  </div>
                </div>
              </Card>
              <Card className="card-hover relative overflow-hidden">
                <div className="accent-bar absolute top-0 left-0 w-1 h-full bg-sb-green" />
                <div className="pl-4 flex items-start gap-3">
                  <NumberBadge n={2} />
                  <div>
                    <h3 className="font-bold mb-1">Test</h3>
                    <p className="text-sm text-sb-muted">Run it manually against the Employee Directory</p>
                  </div>
                </div>
              </Card>
              <Card className="card-hover relative overflow-hidden">
                <div className="accent-bar absolute top-0 left-0 w-1 h-full bg-red-400" />
                <div className="pl-4 flex items-start gap-3">
                  <NumberBadge n={3} />
                  <div>
                    <h3 className="font-bold mb-1">Break</h3>
                    <p className="text-sm text-sb-muted">Discover the RLS view leak</p>
                  </div>
                </div>
              </Card>
              <Card className="card-hover relative overflow-hidden">
                <div className="accent-bar absolute top-0 left-0 w-1 h-full bg-sb-green" />
                <div className="pl-4 flex items-start gap-3">
                  <NumberBadge n={4} />
                  <div>
                    <h3 className="font-bold mb-1">Fix</h3>
                    <p className="text-sm text-sb-muted">Iterate on the skill and re-test</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Slide>

        {/* ─── Slide 4: Demo ─── */}
        <Slide active={current === 4}>
          <div className="flex flex-col items-center justify-center text-center gap-8 h-full">
            <h2 className="stagger text-7xl font-extrabold font-[var(--font-display)] tracking-tight">
              Demo
            </h2>
            <p className="stagger text-xl text-sb-muted max-w-2xl">
              Let&apos;s write a Supabase security skill from scratch
            </p>
            <div className="stagger flex items-center gap-8 mt-4 text-lg">
              <span>&#9999;&#65039; Write</span>
              <span className="text-sb-muted">&middot;</span>
              <span>&#129514; Test</span>
              <span className="text-sb-muted">&middot;</span>
              <span>&#128165; Break</span>
              <span className="text-sb-muted">&middot;</span>
              <span>&#128295; Fix</span>
            </div>
          </div>
        </Slide>

        {/* ─── Slide 5: Braintrust ─── */}
        <Slide active={current === 5} className="slide-from-right">
          <h2 className="stagger text-5xl font-extrabold font-[var(--font-display)] tracking-tight mb-2">
            Braintrust
          </h2>
          <p className="stagger text-lg text-sb-muted mb-8">From manual checks to automated evals</p>
          <div className="stagger grid grid-cols-2 gap-6 mb-8">
            <Card className="card-hover">
              <div className="flex items-start gap-3">
                <NumberBadge n={1} />
                <div>
                  <h3 className="font-bold mb-1">Track Runs</h3>
                  <p className="text-sm text-sb-muted">Monitor agent execution in production</p>
                </div>
              </div>
            </Card>
            <Card className="card-hover">
              <div className="flex items-start gap-3">
                <NumberBadge n={2} />
                <div>
                  <h3 className="font-bold mb-1">Score Criteria</h3>
                  <p className="text-sm text-sb-muted">Grade each run against success metrics</p>
                </div>
              </div>
            </Card>
            <Card className="card-hover">
              <div className="flex items-start gap-3">
                <NumberBadge n={3} />
                <div>
                  <h3 className="font-bold mb-1">Compare Versions</h3>
                  <p className="text-sm text-sb-muted">Side-by-side skill iteration results</p>
                </div>
              </div>
            </Card>
            <Card className="card-hover">
              <div className="flex items-start gap-3">
                <NumberBadge n={4} />
                <div>
                  <h3 className="font-bold mb-1">Catch Regressions</h3>
                  <p className="text-sm text-sb-muted">Spot problems before they reach users</p>
                </div>
              </div>
            </Card>
          </div>
          <div className="stagger rounded-xl border border-sb-border bg-sb-card p-6">
            <p className="text-xs text-sb-muted uppercase tracking-widest mb-4">Skill iteration scores</p>
            <div className="space-y-3">
              {[
                { name: "v1 — basic rules", score: 60, color: "bg-red-400" },
                { name: "v2 — view coverage", score: 85, color: "bg-yellow-400" },
                { name: "v3 — full security", score: 95, color: "bg-sb-green" },
              ].map((v) => (
                <div key={v.name} className="flex items-center gap-3">
                  <span className="text-xs font-mono text-sb-muted w-40 shrink-0">{v.name}</span>
                  <div className="flex-1 h-2 bg-sb-border rounded-full overflow-hidden">
                    <div className={`h-full rounded-full score-bar ${v.color}`} style={{ width: `${v.score}%` }} />
                  </div>
                  <span className={`text-sm font-mono font-bold w-12 text-right ${v.score >= 90 ? "text-sb-green" : v.score >= 70 ? "text-yellow-400" : "text-red-400"}`}>{v.score}%</span>
                </div>
              ))}
            </div>
          </div>
        </Slide>

        {/* ─── Slide 6: What Actually Works ─── */}
        <Slide active={current === 6}>
          <h2 className="stagger text-5xl font-extrabold font-[var(--font-display)] tracking-tight mb-10">
            What Actually Works
          </h2>
          <div className="stagger grid grid-cols-3 gap-10 mb-10">
            <Card className="card-hover text-center p-8">
              <div className="mb-4 text-sb-green flex justify-center"><IconRuler /></div>
              <h3 className="font-bold text-xl mb-2">Measure Everything</h3>
              <p className="text-sm text-sb-muted leading-relaxed">
                Good evals make regressions clear and failures explainable
              </p>
            </Card>
            <Card className="card-hover text-center p-8">
              <div className="mb-4 text-sb-green flex justify-center"><IconTarget /></div>
              <h3 className="font-bold text-xl mb-2">Principles Over Templates</h3>
              <p className="text-sm text-sb-muted leading-relaxed">
                Teach the &lsquo;why&rsquo;, not just the &lsquo;how&rsquo;
              </p>
            </Card>
            <Card className="card-hover text-center p-8">
              <div className="mb-4 text-sb-green flex justify-center"><IconRefresh /></div>
              <h3 className="font-bold text-xl mb-2">Small Iterations Win</h3>
              <p className="text-sm text-sb-muted leading-relaxed">
                Write, test, fix, repeat
              </p>
            </Card>
          </div>
          <div className="stagger">
            <Card className="border-sb-green/20 bg-sb-green/5">
              <div className="flex items-center gap-3">
                <span className="text-sb-green font-bold">Tomorrow:</span>
                <span className="text-sm text-sb-muted">Skill Issue — What actually moved the needle in production</span>
              </div>
            </Card>
          </div>
        </Slide>

        {/* ─── Slide 7: Thank You ─── */}
        <Slide active={current === 7}>
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
            <p className="stagger text-xl text-sb-muted max-w-xl">Now go level up your skills.</p>
            <div className="stagger flex items-center gap-6 mt-6 text-sm text-sb-muted">
              <span>Pedro Rodrigues</span>
              <span className="w-1 h-1 rounded-full bg-sb-border" />
              <span>@pedrorgz</span>
              <span className="w-1 h-1 rounded-full bg-sb-border" />
              <span>supabase.com</span>
            </div>
            <p className="stagger text-sm text-sb-green mt-4">
              Tomorrow: Skill Issue — What actually moved the needle in production
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
