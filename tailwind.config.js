/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  safelist: [
    "bg-[var(--accent)]",
    "bg-[var(--accent-hover)]",
    "bg-[var(--accent-active)]",
    "bg-[var(--accent-subtle)]",
    "bg-[var(--accent-subtle-hover)]",
    "text-[var(--accent-light)]",
    "border-[var(--accent-border)]",
    "ring-[var(--accent-ring)]",
    "hover:bg-[var(--accent-hover)]",
    "hover:bg-[var(--accent-active)]",
    "hover:text-[var(--accent-light)]",
    "hover:border-[var(--accent-border)]",
    "focus:ring-[var(--accent-ring)]",
    "focus:border-[var(--accent-border)]",
    "group-hover:text-[var(--accent-light)]",
    "active:bg-[var(--accent-active)]",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

