import clsx from 'clsx'
import * as React from 'react'
import { Outlet } from '@tanstack/react-router'
import { Menu, X } from 'lucide-react'
import Backdrop from '@/components/backdrop/Backdrop.tsx'
import IglooMark from '@/components/brand/IglooMark.tsx'
import Wordmark from '@/components/brand/Wordmark.tsx'
import Sidebar from './Sidebar.tsx'

/**
 * The root layout: the fixed theme backdrop, the sidebar, and a bounded, scrollable main area that
 * every page renders into. Below `md` the sidebar becomes a slide-over opened from a top bar.
 */
export default function AppLayout() {
    const [menuOpen, setMenuOpen] = React.useState(false)
    const closeMenu = React.useCallback(() => setMenuOpen(false), [])

    return (
        <div className="relative h-full">
            <Backdrop />

            <div className="relative z-10 flex h-full flex-col md:flex-row">
                <header className="flex items-center justify-between gap-3 border-b border-line bg-sidebar px-4 py-2 backdrop-blur-md md:hidden">
                    <span className="flex items-baseline gap-2.5">
                        <IglooMark width={40} height={19} crop="tight" />
                        <Wordmark size="sm" />
                    </span>
                    <button
                        type="button"
                        aria-label="Open menu"
                        aria-expanded={menuOpen}
                        onClick={() => setMenuOpen(true)}
                        className="grid size-11 cursor-pointer place-items-center rounded-xl text-ink-2 hover:bg-nav-hover"
                    >
                        <Menu aria-hidden="true" className="size-5" />
                    </button>
                </header>

                {menuOpen && (
                    <div aria-hidden="true" className="fixed inset-0 z-30 bg-black/40 md:hidden" onClick={closeMenu} />
                )}
                <aside
                    className={clsx(
                        // the slide-over needs an opaque ground; on desktop the translucent sidebar shows the backdrop
                        'fixed inset-y-0 left-0 z-40 w-[280px] max-w-[85vw] bg-page transition-transform duration-200 md:static md:z-auto md:w-[268px] md:max-w-none md:shrink-0 md:translate-x-0 md:bg-transparent',
                        menuOpen ? 'translate-x-0' : '-translate-x-full'
                    )}
                >
                    {menuOpen && (
                        <button
                            type="button"
                            aria-label="Close menu"
                            onClick={closeMenu}
                            className="absolute top-3 right-3 z-10 grid size-11 cursor-pointer place-items-center rounded-xl text-ink-2 hover:bg-nav-hover md:hidden"
                        >
                            <X aria-hidden="true" className="size-5" />
                        </button>
                    )}
                    <Sidebar onNavigate={closeMenu} />
                </aside>

                <main className="min-h-0 min-w-0 flex-1 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
