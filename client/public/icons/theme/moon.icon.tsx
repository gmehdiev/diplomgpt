export const MoonIcon = () => {
    return <svg className="sun-and-moon" aria-hidden="true" width="24" height="24" viewBox="0 0 24 24">
        <circle className="sun" cx="12" cy="12" r="6" mask="url(#moon-mask)" fill="currentColor"/>
        <g className="sun-beams" stroke="currentColor">
            …
        </g>
        <mask className="moon" id="moon-mask">
            <rect x="0" y="0" width="100%" height="100%" fill="white"/>
            <circle cx="24" cy="10" r="6" fill="black"/>
        </mask>
    </svg>
}