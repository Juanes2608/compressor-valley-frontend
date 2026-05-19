/**
 * Theme provider manual (light / dark / system) con persistencia en localStorage.
 * Sin flash en primer paint: el script inline en __root.tsx aplica la clase
 * antes de hidratar.
 */
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Theme = "light" | "dark" | "system";
type Resolved = "light" | "dark";

interface ThemeCtx {
  theme: Theme;
  resolved: Resolved;
  setTheme: (t: Theme) => void;
  toggle: () => void;
}

const STORAGE_KEY = "chv-theme";

const Ctx = createContext<ThemeCtx | null>(null);

function resolve(t: Theme): Resolved {
  if (t === "system") {
    if (typeof window === "undefined") return "light";
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  return t;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");
  const [resolved, setResolved] = useState<Resolved>("light");

  useEffect(() => {
    const stored = (localStorage.getItem(STORAGE_KEY) as Theme | null) ?? "system";
    setThemeState(stored);
    const r = resolve(stored);
    setResolved(r);
    document.documentElement.classList.toggle("dark", r === "dark");
  }, []);

  useEffect(() => {
    if (theme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      const r: Resolved = mq.matches ? "dark" : "light";
      setResolved(r);
      document.documentElement.classList.toggle("dark", r === "dark");
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [theme]);

  const setTheme = (t: Theme) => {
    setThemeState(t);
    localStorage.setItem(STORAGE_KEY, t);
    const r = resolve(t);
    setResolved(r);
    document.documentElement.classList.toggle("dark", r === "dark");
  };

  const toggle = () => setTheme(resolved === "dark" ? "light" : "dark");

  return <Ctx.Provider value={{ theme, resolved, setTheme, toggle }}>{children}</Ctx.Provider>;
}

export function useTheme(): ThemeCtx {
  const c = useContext(Ctx);
  if (!c) {
    // Fallback durante SSR para no romper.
    return {
      theme: "light",
      resolved: "light",
      setTheme: () => {},
      toggle: () => {},
    };
  }
  return c;
}
