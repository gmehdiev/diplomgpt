'use client'



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

 const toggleTheme= (value: string) => {
     document.documentElement.setAttribute('data-theme', value)
 }

    return (
        <>
            <button onClick={() => {
                setTheme('dark')
                toggleTheme('dark')
            }}>
                dark
            </button>
            <button onClick={() => {
                setTheme('light')
                toggleTheme('light')
            }}>
                light
            </button>
        </>
    );
}
