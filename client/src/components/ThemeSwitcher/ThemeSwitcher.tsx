"use client";

import { SunIcon } from "../../../public/icons/theme/sun.icon";
import { MoonIcon } from "../../../public/icons/theme/moon.icon";
import styles from "./ThemeSwithcer.module.css";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { Button, ButtonTheme } from "../common/Button/Button";
import cls from "./ThemeSwithcer.module.scss";
export const ThemeSwitcher = () => {
  async function setTheme(theme: string) {
    const response = await fetch(`http://${process.env.NEXT_PUBLIC_API_URL}:8080/api/theme`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ theme: theme }),
    });
    return response.json();
  }
  useEffect(() => {
    if (typeof window !== undefined) {
      const theme = document.documentElement.getAttribute("data-theme");
      setDark(theme === "dark");
    }
  }, []);
  const toggleTheme = (value: string) => {
    document.documentElement.setAttribute("data-theme", value);
    setTheme(value);
  };

  const [isDark, setDark] = useState<boolean | null>(null);
  return (
    <div className={clsx(cls.container, {}, [])}>
      <Button
        className={clsx(cls.ThemeButton, {}, [])}
        theme={ButtonTheme.DEFAULT}
        onClick={() => {
          toggleTheme("light");
          setDark((prev) => !prev);
        }}
      >
        {"light"}
      </Button>
      <Button
        // [ cls[theme]]
        className={clsx(cls.ThemeButton, {}, [])}
        theme={ButtonTheme.DEFAULT}
        onClick={() => {
          toggleTheme("dark");
          setDark((prev) => !prev);
        }}
      >
        {"dark"}
      </Button>
    </div>
  );
};
