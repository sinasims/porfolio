"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { easeInOut, motion } from "framer-motion";

type Theme = "light" | "dark";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    setMounted(true);

    try {
      let storedTheme = localStorage.getItem("theme") as Theme | null;

      if (!storedTheme) {
        storedTheme = "dark";
        localStorage.setItem("theme", "dark");
      }

      setTheme(storedTheme);
      applyTheme(storedTheme);
    } catch {}
}, []);


  if (!mounted) return null;

  const toggleTheme = () => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    applyTheme(nextTheme);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.4, ease:easeInOut }}>
      <button
        onClick={toggleTheme}
        className="p-3 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-lg hover:scale-110 transition-transform"
        aria-label="Toggle Dark Mode"
      >
        {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>
    </motion.div>
  );
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;

  if (theme === "dark") {
    root.classList.add("dark");
    root.style.colorScheme = "dark";
  } else {
    root.classList.remove("dark");
    root.style.colorScheme = "light";
  }

  try {
    localStorage.setItem("theme", theme);
  } catch {
    // ignore
  }
}
