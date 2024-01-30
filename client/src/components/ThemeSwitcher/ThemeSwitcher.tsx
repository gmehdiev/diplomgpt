'use client'



import {SunIcon} from "../../../public/icons/theme/sun.icon";
import {MoonIcon} from "../../../public/icons/theme/moon.icon";
import styles from './ThemeSwithcer.module.css'
import {useState} from "react";

export const ThemeSwitcher = () => {
    async function setTheme(theme: string) {
        const response = await fetch('http://localhost:8080/api/theme', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({theme: theme})

        })
        return response.json()
    }

    const theme = document.documentElement.getAttribute('data-theme')
    console.log(theme)
 const toggleTheme= (value: string) => {
     document.documentElement.setAttribute('data-theme', value)
 }
    const [isDark, setDark] = useState(theme==='dark');
    console.log(theme==='dark')
    return (
        <>{isDark}
            <button onClick={() => {
                setTheme('dark')
                toggleTheme('dark')
            }}>
                {theme}
            </button>
            <button onClick={() => {
                setTheme('light')
                toggleTheme('light')
            }}>
                light
            </button>
            <label
                className={`${styles.container} ${!isDark ? styles.IsDark : styles.IsLight}`}
                title={isDark ? "Activate light mode" : "Activate dark mode"}
                aria-label={isDark ? "Activate light mode" : "Activate dark mode"}
            > <input
                type="checkbox"
                defaultChecked={isDark}
                onChange={() => setDark((prev) => !prev)}
                />
                <div/>
            </label>

            <div/>


        </>
    );
}
