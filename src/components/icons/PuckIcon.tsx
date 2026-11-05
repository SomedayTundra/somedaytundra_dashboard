import type * as React from 'react'

// The NHL Stats favicon (a hockey puck), drawn in currentColor so it picks up the project's theme color
// (text-st-proj-nhl): a solid cylinder, with an arc marking the top face's front edge. The arc is a
// translucent white on the blue light-theme puck, and black on the light-green Aurora (dark-theme) puck.
export default function PuckIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" {...props}>
            <ellipse cx="16" cy="22" rx="12" ry="5" />
            <rect x="4" y="11" width="24" height="11" />
            <ellipse cx="16" cy="11" rx="12" ry="5" />
            <path
                d="M4 11 A12 5 0 0 0 28 11"
                fill="none"
                strokeWidth="1.5"
                className="stroke-white/55 in-[[data-theme=aurora]]:stroke-black"
            />
        </svg>
    )
}
