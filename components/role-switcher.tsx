"use client";

import { useState, useRef, useEffect } from "react";
import { AppUser } from "@/lib/types";
import { USERS } from "@/lib/users";

interface RoleSwitcherProps {
  currentUser: AppUser;
  onSwitch: (user: AppUser) => void;
}

const roleBadgeClass: Record<AppUser["role"], string> = {
  employee: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
  manager: "bg-sb-green/20 text-sb-green border border-sb-green/30",
  hr: "bg-purple-500/20 text-purple-400 border border-purple-500/30",
};

export function RoleSwitcher({ currentUser, onSwitch }: RoleSwitcherProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-sb-border bg-sb-card hover:border-sb-green/40 transition-colors"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <div className="flex flex-col items-start min-w-0">
          <span className="text-sm font-medium text-foreground leading-tight truncate max-w-[120px]">
            {currentUser.name}
          </span>
          <span
            className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium mt-0.5 ${roleBadgeClass[currentUser.role]}`}
          >
            {currentUser.role}
          </span>
        </div>
        <svg
          className={`w-4 h-4 text-sb-muted flex-shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="Switch user"
          className="absolute right-0 mt-1 w-52 rounded-lg border border-sb-border bg-sb-card shadow-lg z-50 overflow-hidden"
        >
          <div className="px-3 py-2 border-b border-sb-border">
            <p className="text-[10px] uppercase tracking-wider text-sb-muted font-semibold">
              Switch User
            </p>
          </div>
          <ul className="py-1">
            {USERS.map((user) => {
              const isActive = user.id === currentUser.id;
              return (
                <li key={user.id}>
                  <button
                    role="option"
                    aria-selected={isActive}
                    onClick={() => {
                      onSwitch(user);
                      setOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-left transition-colors ${
                      isActive
                        ? "bg-sb-green/10 text-sb-green"
                        : "hover:bg-sb-surface text-foreground"
                    }`}
                  >
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm font-medium truncate">{user.name}</span>
                      <span className="text-[10px] text-sb-muted truncate">{user.department}</span>
                    </div>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ml-2 flex-shrink-0 ${roleBadgeClass[user.role]}`}
                    >
                      {user.role}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
