import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/lib/theme";

export function ThemeToggle() {
  const { resolved, toggle } = useTheme();
  const isDark = resolved === "dark";
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      title={isDark ? "Modo claro" : "Modo oscuro"}
      className="focus-ring grid h-9 w-9 place-items-center rounded-md text-white hover:bg-white/15 transition-colors"
    >
      {isDark ? <Sun className="h-[18px] w-[18px]" strokeWidth={2} /> : <Moon className="h-[18px] w-[18px]" strokeWidth={2} />}
    </button>
  );
}
