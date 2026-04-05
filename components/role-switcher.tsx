"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { AppUser } from "@/lib/types";
import { USERS } from "@/lib/users";
import { roleBadgeClass } from "@/lib/styles";

interface RoleSwitcherProps {
  currentUser: AppUser;
  onSwitch: (user: AppUser) => void;
}

export function RoleSwitcher({ currentUser, onSwitch }: RoleSwitcherProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const ref = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const closeMenu = useCallback(() => {
    setOpen(false);
    setActiveIndex(-1);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setActiveIndex(-1);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [open]);

  // Focus active option when activeIndex changes
  useEffect(() => {
    if (open && activeIndex >= 0) {
      optionRefs.current[activeIndex]?.focus();
    }
  }, [open, activeIndex]);

  const handleTriggerKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen(true);
      setActiveIndex(0);
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setOpen(true);
      setActiveIndex(USERS.length - 1);
    }
  };

  const handleOptionKeyDown = (e: React.KeyboardEvent, index: number) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((index + 1) % USERS.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((index - 1 + USERS.length) % USERS.length);
        break;
      case "Home":
        e.preventDefault();
        setActiveIndex(0);
        break;
      case "End":
        e.preventDefault();
        setActiveIndex(USERS.length - 1);
        break;
      case "Escape":
        e.preventDefault();
        closeMenu();
        break;
      case "Tab":
        closeMenu();
        break;
    }
  };

  return (
    <div ref={ref} className="relative">
      <button
        ref={triggerRef}
        onClick={() => {
          if (open) {
            closeMenu();
          } else {
            setOpen(true);
            setActiveIndex(0);
          }
        }}
        onKeyDown={handleTriggerKeyDown}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-sb-border/70 bg-sb-card hover:border-sb-green/30 transition-all duration-200"
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
          className="absolute right-0 mt-2 w-52 rounded-xl border border-sb-border/70 bg-sb-card shadow-xl shadow-black/20 z-50 overflow-hidden"
        >
          <div className="px-3 py-2 border-b border-sb-border">
            <p className="text-[10px] uppercase tracking-wider text-sb-muted font-semibold">
              Switch User
            </p>
          </div>
          <ul className="py-1">
            {USERS.map((user, index) => {
              const isActive = user.id === currentUser.id;
              return (
                <li key={user.id}>
                  <button
                    ref={(el) => { optionRefs.current[index] = el; }}
                    role="option"
                    aria-selected={isActive}
                    tabIndex={activeIndex === index ? 0 : -1}
                    onClick={() => {
                      onSwitch(user);
                      closeMenu();
                    }}
                    onKeyDown={(e) => handleOptionKeyDown(e, index)}
                    className={`w-full flex items-center justify-between px-3 py-2 text-left transition-colors ${
                      isActive
                        ? "bg-sb-green/10 text-sb-green"
                        : "hover:bg-sb-surface text-foreground"
                    } ${activeIndex === index ? "ring-2 ring-sb-green/50 ring-inset" : ""}`}
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
