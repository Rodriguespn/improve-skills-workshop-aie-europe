"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AppUser } from "@/lib/types";
import { RoleSwitcher } from "./role-switcher";

interface NavProps {
  currentUser: AppUser;
  onSwitchUser: (user: AppUser) => void;
}

const NAV_LINKS = [
  { href: "/", label: "Dashboard" },
  { href: "/directory", label: "Directory" },
  { href: "/reports", label: "Reports" },
];

export function Nav({ currentUser, onSwitchUser }: NavProps) {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-sb-border bg-background/80 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between gap-4">
          {/* Left: Logo + App name */}
          <div className="flex items-center gap-3 flex-shrink-0">
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
            <span className="font-semibold text-sm text-foreground">
              Employee Directory
            </span>
          </div>

          {/* Middle: Nav links */}
          <div className="hidden sm:flex items-center gap-1">
            {NAV_LINKS.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
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

          {/* Right: Role switcher */}
          <div className="flex-shrink-0">
            <RoleSwitcher currentUser={currentUser} onSwitch={onSwitchUser} />
          </div>
        </div>
      </div>
    </nav>
  );
}
