import { useState, useCallback } from "react";

const KEY = "budget_tracker_profile";

const DEFAULTS = {
  name: "Sajbur",
  avatarGradient: "from-violet-500 to-indigo-600",
  theme: "violet",
};

function getInitials(name) {
  if (!name || typeof name !== "string") return "U";
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "U";
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return parts[0][0].toUpperCase();
}

export function useProfile() {
  const [profile, setProfile] = useState(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) return { ...DEFAULTS, ...JSON.parse(raw) };
    } catch { /* ignore parse errors */ }
    return { ...DEFAULTS };
  });

  const updateProfile = useCallback((updates) => {
    setProfile((prev) => {
      const next = { ...prev, ...updates };
      localStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  return { profile, initials: getInitials(profile.name), updateProfile };
}
