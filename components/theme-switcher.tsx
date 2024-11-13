"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { getCookie, setCookie } from "cookies-next";
import { Moon, Sun } from "lucide-react";

interface ThemeSwitcherProps {
  text?: string | null;
}

const ThemeSwitcher = ({ text }: ThemeSwitcherProps) => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const themes = ["dark", "light"];

  // Get system theme preference
  const getSystemTheme = () =>
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

  // Initialize theme on mount
  useEffect(() => {
    setMounted(true);
    const storedTheme = getCookie("theme");
    setTheme(storedTheme ? (storedTheme as string) : getSystemTheme());
  }, [setTheme]);

  // Function to switch themes
  const cycleTheme = () => {
    const currentTheme = resolvedTheme || theme || "light";
    const nextTheme = themes[(themes.indexOf(currentTheme) + 1) % themes.length];
    setTheme(nextTheme);
    setCookie("theme", nextTheme, { maxAge: 60 * 60 * 24 * 365 });
  };

  // Prevent rendering until theme is mounted
  if (!mounted) return null;

  return (
    <button
      onClick={cycleTheme}
      className="flex items-center gap-2 cursor-pointer hover:bg-muted dark:hover:bg-muted-foreground rounded p-1"
    >
      {resolvedTheme === "light" ? (
        <Sun size={18} className="" />
      ) : (
        <Moon size={18} className="" />
      )}
      {text && <span className="font-light">{text}</span>}
    </button>
  );
};

export default ThemeSwitcher;
