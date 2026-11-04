import { Link } from '@tanstack/react-router'

export default function NotFound() {
    return (
        <div className="flex min-h-full flex-col items-start gap-4 p-4 sm:p-[clamp(16px,3vw,44px)]">
            <h1 className="m-0 font-display text-3xl font-bold">Page not found</h1>
            <p className="m-0 text-st-ink-2">There's nothing at this address.</p>
            <Link to="/" className="font-bold text-st-link">
                Back to Home
            </Link>
        </div>
    )
}
