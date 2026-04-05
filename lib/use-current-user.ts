"use client";

import { useState, useCallback, useEffect } from "react";
import { AppUser } from "./types";
import { USERS } from "./users";

const STORAGE_KEY = "skill-workshop-user-id";

function getUserById(id: string): AppUser {
  return USERS.find((u) => u.id === id) ?? USERS[0];
}

export function useCurrentUser() {
  const [currentUser, setCurrentUser] = useState<AppUser>(USERS[0]);

  // Hydrate from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setCurrentUser(getUserById(stored));
    }
  }, []);

  const switchUser = useCallback((user: AppUser) => {
    setCurrentUser(user);
    localStorage.setItem(STORAGE_KEY, user.id);
  }, []);

  return { currentUser, switchUser };
}
