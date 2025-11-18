// src/components/ThemeToggle.tsx
import { Moon, MoonIcon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import "../style/toogleThemeButton.css";
import StyledIcon from "./styleIcon";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Éviter le hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div style={{ width: 48, height: 48 }} />;
  }

  return (
    <StyledIcon
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      icon={theme === "light" ? Sun : MoonIcon}
      title={`Passer en mode ${theme === "light" ? "sombre" : "clair"}`}
    />
  );
};

export default ThemeToggle;
