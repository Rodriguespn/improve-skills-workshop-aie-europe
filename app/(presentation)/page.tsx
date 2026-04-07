"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";

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
  const [dark, setDark] = useState(false);
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
    document.documentElement.classList.toggle("dark", dark);
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
            <p className="stagger text-sm text-sb-muted mt-2">Pedro Rodrigues &middot; Supabase &middot; pedro.rodrigues@supabase.io</p>
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
          <p className="stagger text-lg text-sb-muted mb-6">The systematic approach</p>

          {/* Circular cycle diagram */}
          <div className="stagger flex items-center justify-center">
            <div className="relative" style={{ width: "42rem", height: "26rem" }}>
              {/* Cycle ring — SVG arrows connecting steps */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 672 416" fill="none">
                {/* Top row L→R */}
                <path d="M150 108 L262 108" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" className="text-sb-border" markerEnd="url(#arrowGreen)" />
                <path d="M408 108 L524 108" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" className="text-sb-border" markerEnd="url(#arrowGreen)" />
                {/* Right side down — pushed further right to avoid overlapping step 4 */}
                <path d="M640 155 C672 200, 672 255, 640 300" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" className="text-sb-border" markerEnd="url(#arrowGreen)" />
                {/* Bottom row R→L */}
                <path d="M524 330 L408 330" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" className="text-sb-border" markerEnd="url(#arrowGreen)" />
                <path d="M262 330 L150 330" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" className="text-sb-border" markerEnd="url(#arrowGreen)" />
                {/* Left side up — pushed further left to clear step 6 */}
                <path d="M32 300 C0 255, 0 200, 32 155" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" className="text-sb-border" markerEnd="url(#arrowGreen)" />
                {/* Arrow marker */}
                <defs>
                  <marker id="arrowGreen" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                    <path d="M0 0 L8 3 L0 6" fill="none" stroke="#3ECF8E" strokeWidth="1.5" />
                  </marker>
                </defs>
              </svg>

              {/* Step nodes positioned around the cycle */}
              {/* Top row: 1, 2, 3 (left to right) */}
              <div className="absolute flex flex-col items-center text-center" style={{ left: "0", top: "56px", width: "150px" }}>
                <NumberBadge n={1} />
                <h3 className="font-bold text-sm mt-2">Define Metrics</h3>
                <p className="text-xs text-sb-muted mt-0.5">What does &lsquo;good&rsquo; look like?</p>
              </div>
              <div className="absolute flex flex-col items-center text-center" style={{ left: "260px", top: "56px", width: "150px" }}>
                <NumberBadge n={2} />
                <h3 className="font-bold text-sm mt-2">Create Skill</h3>
                <p className="text-xs text-sb-muted mt-0.5">SKILL.md with clear instructions</p>
              </div>
              <div className="absolute flex flex-col items-center text-center" style={{ left: "522px", top: "56px", width: "150px" }}>
                <NumberBadge n={3} />
                <h3 className="font-bold text-sm mt-2">Test</h3>
                <p className="text-xs text-sb-muted mt-0.5">Surface hidden assumptions</p>
              </div>

              {/* Bottom row: 6, 5, 4 (left to right, but numbered in cycle order) */}
              <div className="absolute flex flex-col items-center text-center" style={{ left: "0", top: "268px", width: "150px" }}>
                <NumberBadge n={6} />
                <h3 className="font-bold text-sm mt-2">Iterate</h3>
                <p className="text-xs text-sb-muted mt-0.5">Real failures drive improvement</p>
              </div>
              <div className="absolute flex flex-col items-center text-center" style={{ left: "260px", top: "268px", width: "150px" }}>
                <NumberBadge n={5} />
                <h3 className="font-bold text-sm mt-2">Grade</h3>
                <p className="text-xs text-sb-muted mt-0.5">Deterministic checks, then rubrics</p>
              </div>
              <div className="absolute flex flex-col items-center text-center" style={{ left: "522px", top: "268px", width: "150px" }}>
                <NumberBadge n={4} />
                <h3 className="font-bold text-sm mt-2">Build Test Cases</h3>
                <p className="text-xs text-sb-muted mt-0.5">Targeted prompts, +/&minus; scenarios</p>
              </div>
            </div>
          </div>

          <p className="text-xs text-sb-muted/50 absolute bottom-12 left-20">
            Source: OpenAI &mdash; Testing Agent Skills Systematically with Evals
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
                We&apos;ll write a product-aware skill from scratch using Supabase as our example, test it against a real app, discover where it fails, and iterate until it works. The same loop you&apos;d use in production.
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
                    <p className="text-sm text-sb-muted">Create a product-aware skill from scratch</p>
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
              From zero to a skill that knows your product
            </p>
            <div className="stagger flex items-center gap-8 mt-4 text-lg">
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-sb-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487z" />
                </svg>
                Write
              </span>
              <svg className="w-4 h-4 text-sb-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-sb-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                </svg>
                Test
              </span>
              <svg className="w-4 h-4 text-sb-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
                Break
              </span>
              <svg className="w-4 h-4 text-sb-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-sb-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.1-5.1a7.5 7.5 0 1110.795 10.795l-5.1-5.1m0 0L15.75 21M11.42 15.17L21 5.59" />
                </svg>
                Fix
              </span>
            </div>
            <div className="stagger flex flex-col items-center gap-2 mt-6">
              <div className="rounded-xl border border-sb-green/30 bg-sb-card p-2">
                <QRCodeSVG
                  value="https://github.com/Rodriguespn/improve-skills-workshop-aie-europe"
                  size={96}
                  bgColor="transparent"
                  fgColor="#3ECF8E"
                  level="M"
                />
              </div>
              <p className="text-xs text-sb-muted">Scan to get the repo</p>
              <p className="text-[10px] font-mono text-sb-muted/50">github.com/Rodriguespn/improve-skills-workshop-aie-europe</p>
            </div>
          </div>
        </Slide>

        {/* ─── Slide 5: Eval Harness ─── */}
        <Slide active={current === 5}>
          <h2 className="stagger text-5xl font-extrabold font-[var(--font-display)] tracking-tight mb-10">
            Eval Harness
          </h2>
          <div className="stagger grid grid-cols-2 gap-10">
            <Card>
              <p className="text-xs uppercase tracking-widest text-sb-muted mb-4">File structure</p>
              <div className="font-mono text-sm leading-7">
                <div className="text-sb-muted/50">supabase-skill/</div>
                <div className="ml-4"><span className="text-sb-muted">├── </span><span className="text-white">SKILL.md</span></div>
                <div className="ml-4"><span className="text-sb-muted">└── </span><span className="text-sb-green">evals/</span></div>
                <div className="ml-8"><span className="text-sb-muted">└── </span><span className="text-sb-green">evals.json</span></div>
                <div className="mt-2 text-sb-muted/50">workspace/</div>
                <div className="ml-4"><span className="text-sb-muted">└── </span><span className="text-sb-muted/50">iteration-1/</span></div>
                <div className="ml-8"><span className="text-sb-muted">├── </span><span className="text-sb-green">with_skill/</span></div>
                <div className="ml-12"><span className="text-sb-muted">│&nbsp;&nbsp; ├── </span><span className="text-sb-muted">outputs/</span></div>
                <div className="ml-12"><span className="text-sb-muted">│&nbsp;&nbsp; └── </span><span className="text-sb-muted">grading.json</span></div>
                <div className="ml-8"><span className="text-sb-muted">└── </span><span className="text-sb-muted/50">without_skill/</span></div>
                <div className="ml-12"><span className="text-sb-muted">&nbsp;&nbsp;&nbsp;&nbsp; └── </span><span className="text-sb-muted/50">grading.json</span></div>
              </div>
            </Card>
            <div className="flex flex-col gap-4">
              <Card>
                <p className="text-xs uppercase tracking-widest text-sb-muted mb-3">evals.json</p>
                <div className="font-mono text-xs leading-6 text-sb-muted">
                  <p><span className="text-sb-muted/50">{"{"}</span></p>
                  <p className="ml-4"><span className="text-sb-green">&quot;prompt&quot;</span><span className="text-sb-muted/50">: </span><span className="text-amber-300/80">&quot;Check RLS on the employees table&quot;</span><span className="text-sb-muted/50">,</span></p>
                  <p className="ml-4"><span className="text-sb-green">&quot;assertions&quot;</span><span className="text-sb-muted/50">: [</span></p>
                  <p className="ml-8"><span className="text-amber-300/80">&quot;Flags views without security_invoker&quot;</span><span className="text-sb-muted/50">,</span></p>
                  <p className="ml-8"><span className="text-amber-300/80">&quot;Catches tables without RLS&quot;</span></p>
                  <p className="ml-4"><span className="text-sb-muted/50">]</span></p>
                  <p><span className="text-sb-muted/50">{"}"}</span></p>
                </div>
              </Card>
              <Card className="border-sb-green/20 bg-sb-green/5">
                <div className="flex flex-col gap-2 font-mono text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-sb-green font-bold">✓</span>
                    <span className="text-sb-green">with_skill: 4/4 passed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-red-400 font-bold">✗</span>
                    <span className="text-red-400">without_skill: 1/4 passed</span>
                  </div>
                  <div className="mt-2 pt-2 border-t border-sb-border text-xs text-sb-muted">
                    delta: <span className="text-sb-green font-bold">+0.75</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Slide>

        {/* ─── Slide 6: Final Remarks ─── */}
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
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-sb-green shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                  </svg>
                  <div>
                    <p className="font-bold text-sm">Combine Skills and MCP to Close the Context Gap</p>
                    <p className="text-xs text-sb-muted mt-0.5">April 9 &middot; 3:10&ndash;3:30pm &middot; St. James &middot; Context Engineering track</p>
                  </div>
                </div>
                <div className="pill bg-sb-green/10 text-sb-green border border-sb-green/20 shrink-0">Talk</div>
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
              <span>@rodriguespn23</span>
              <span className="w-1 h-1 rounded-full bg-sb-border" />
              <span>pedro.rodrigues@supabase.io</span>
            </div>
            <div className="stagger mt-6">
              <Card className="border-sb-green/20 bg-sb-green/5 inline-block">
                <div className="flex items-center gap-3">
                  <svg className="w-4 h-4 text-sb-green shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                  </svg>
                  <div>
                    <p className="text-sm font-bold text-sb-green">Combine Skills and MCP to Close the Context Gap</p>
                    <p className="text-xs text-sb-muted mt-0.5">April 9 &middot; 3:10&ndash;3:30pm &middot; St. James</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Slide>

        {/* ─── Bottom navigation bar ─── */}
        <div className="absolute bottom-0 left-0 right-0 z-40 flex items-center justify-between px-8 py-4">
          <div className="flex items-center gap-3">
            <Image
              src={dark ? "/slides/supabase-dark.svg" : "/slides/supabase-light.svg"}
              alt="Supabase"
              width={100}
              height={20}
              className="opacity-60"
            />
            <span className="text-xs text-sb-muted/50 font-mono">{current + 1}/{TOTAL_SLIDES}</span>
          </div>
          <div className="flex items-center gap-1.5">
            {Array.from({ length: TOTAL_SLIDES }, (_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
                className={`h-11 w-6 flex items-center justify-center cursor-pointer`}
                aria-label={`Go to slide ${i + 1}`}
              >
                <span className={`block h-1.5 rounded-full transition-all duration-300 ${
                  i === current ? "w-6 bg-sb-green" : i < current ? "w-2 bg-sb-green/30" : "w-2 bg-sb-border"
                }`} />
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={(e) => { e.stopPropagation(); setDark((d) => !d); }}
              className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-sb-surface transition-colors text-sb-muted cursor-pointer"
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
            <span className="text-xs text-sb-muted/60 font-mono">&larr; &rarr; navigate</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-sb-border/30 z-50">
          <div className="h-full bg-sb-green/50 slide-progress" style={{ width: `${((current + 1) / TOTAL_SLIDES) * 100}%` }} />
        </div>
      </div>
    </>
  );
}
