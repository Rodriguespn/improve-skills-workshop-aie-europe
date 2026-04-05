"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AppUser } from "@/lib/types";
import { RoleSwitcher } from "./role-switcher";

interface NavProps {
  currentUser: AppUser;
  onSwitchUser: (user: AppUser) => void;
}

const NAV_LINKS = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/directory", label: "Directory" },
  { href: "/reports", label: "Reports" },
];

export function Nav({ currentUser, onSwitchUser }: NavProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Close mobile menu on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(target) &&
        !hamburgerRef.current?.contains(target)
      ) {
        setMobileMenuOpen(false);
      }
    }
    if (mobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [mobileMenuOpen]);

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-sb-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between gap-4">
          {/* Left: Hamburger (mobile) + Logo + App name */}
          <div className="flex items-center gap-2.5 flex-shrink-0">
            <button
              ref={hamburgerRef}
              className="sm:hidden flex items-center justify-center w-11 h-11 -ml-2 rounded-lg text-sb-muted hover:text-foreground hover:bg-sb-surface transition-colors"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              )}
            </button>
            <svg
              width="24"
              height="25"
              viewBox="0 0 109 113"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Supabase"
            >
              <defs>
                <linearGradient
                  id="nav-sb-grad"
                  x1="53"
                  y1="0"
                  x2="53"
                  y2="113"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#249361" />
                  <stop offset="1" stopColor="#3ECF8E" />
                </linearGradient>
              </defs>
              <path
                d="M63.7076 110.284C60.8481 113.885 55.0502 111.912 54.9813 107.314L53.9738 40.0627L99.1935 40.0627C107.384 40.0627 111.952 49.5228 106.859 55.9374L63.7076 110.284Z"
                fill="url(#nav-sb-grad)"
              />
              <path
                d="M45.317 2.07103C48.1765 -1.53037 53.9745 0.442937 54.0434 5.041L54.4849 72.2922H9.83113C1.64038 72.2922 -2.92775 62.8321 2.1655 56.4175L45.317 2.07103Z"
                fill="#3ECF8E"
              />
            </svg>
            <span className="font-semibold text-sm tracking-tight text-foreground">
              Employee Directory
            </span>
          </div>

          {/* Middle: Nav links (desktop) */}
          <div className="hidden sm:flex items-center gap-0.5 bg-sb-surface/50 rounded-lg p-1">
            {NAV_LINKS.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`px-3.5 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-sb-card text-sb-green shadow-sm shadow-sb-green/5"
                      : "text-sb-muted hover:text-foreground"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>

          {/* Right: Role switcher */}
          <div className="flex-shrink-0">
            <RoleSwitcher currentUser={currentUser} onSwitch={onSwitchUser} />
          </div>
        </div>
      </div>

      {/* Mobile nav drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-menu"
          ref={mobileMenuRef}
          className="sm:hidden border-t border-sb-border/60 bg-background/95 backdrop-blur-xl"
        >
          <div className="px-4 py-2 space-y-1">
            {NAV_LINKS.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`block px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-sb-green/10 text-sb-green"
                      : "text-sb-muted hover:text-foreground hover:bg-sb-surface"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
