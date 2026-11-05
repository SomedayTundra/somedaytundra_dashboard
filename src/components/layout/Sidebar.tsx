import clsx from 'clsx'
import type * as React from 'react'
import { Link } from '@tanstack/react-router'
import { Bus, ChevronDown, CircleHelp, Code, ExternalLink, FileText, House, LayoutGrid, SlidersHorizontal } from 'lucide-react'
import AuthCard from '@/components/auth/AuthCard.tsx'
import PuckIcon from '@/components/icons/PuckIcon.tsx'
import { useFamilyAccess } from '@/lib/family.ts'
import { BULLDOG_SHUTTLE_URL, NHL_STATS_URL } from '@/lib/links.ts'
import { useLocalStorageState } from '@/lib/useLocalStorageState.ts'

const navItem =
    'flex min-h-11 w-full cursor-pointer items-center gap-3 rounded-[10px] px-3 text-left text-[14.5px] font-semibold text-st-ink-2 transition-colors hover:bg-st-nav-hover hover:text-st-ink data-[status=active]:bg-st-accent-soft data-[status=active]:text-st-accent-soft-ink'

const childItem = `${navItem} text-[14px]`

function NavLink({ to, exact, icon, label, onNavigate, className = navItem }: {
    to: string
    exact?: boolean
    icon: React.ReactNode
    label: string
    onNavigate?: () => void
    className?: string
}) {
    return (
        <Link to={to} activeOptions={{ exact }} className={className} onClick={onNavigate}>
            {icon}
            {label}
        </Link>
    )
}

function ExternalNavLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
    return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={childItem}>
            {icon}
            <span className="flex-1">{label}</span>
            <ExternalLink aria-hidden="true" className="size-3.5 opacity-60" />
            <span className="sr-only">(opens in a new window)</span>
        </a>
    )
}

const iconClass = 'size-[19px]'
const childIconClass = 'size-[17px]'

export default function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
    const [projectsOpen, setProjectsOpen] = useLocalStorageState('st.sidebar.projectsOpen', true)
    // the Blog is family-only, so only family members see it in the nav
    const showBlog = useFamilyAccess() === 'granted'

    return (
        <nav
            aria-label="Primary"
            className="flex h-full flex-col justify-between gap-7 overflow-y-auto border-r border-st-line bg-st-sidebar px-4 py-[18px] backdrop-blur-md"
        >
            <div className="flex flex-col gap-[22px]">
                <AuthCard />

                <div className="flex flex-col gap-0.5">
                    <NavLink to="/" exact icon={<House aria-hidden="true" className={iconClass} />} label="Home" onNavigate={onNavigate} />
                    {showBlog && (
                        <NavLink to="/blog" icon={<FileText aria-hidden="true" className={iconClass} />} label="Blog" onNavigate={onNavigate} />
                    )}
                    <button
                        type="button"
                        className={navItem}
                        aria-expanded={projectsOpen}
                        aria-controls="sidebar-projects"
                        onClick={() => setProjectsOpen((open) => !open)}
                    >
                        <LayoutGrid aria-hidden="true" className={iconClass} />
                        <span className="flex-1">Projects</span>
                        <ChevronDown
                            aria-hidden="true"
                            className={clsx('size-4 transition-transform duration-200', projectsOpen && 'rotate-180')}
                        />
                    </button>
                    {projectsOpen && (
                        <div id="sidebar-projects" className="mt-0.5 mb-1 ml-[21px] flex flex-col gap-0.5 border-l-[1.5px] border-st-line pl-3">
                            <ExternalNavLink
                                href={NHL_STATS_URL}
                                icon={<PuckIcon aria-hidden="true" className={clsx(childIconClass, 'text-st-proj-nhl')} />}
                                label="NHL Stats"
                            />
                            <ExternalNavLink
                                href={BULLDOG_SHUTTLE_URL}
                                icon={<Bus aria-hidden="true" className={clsx(childIconClass, 'text-st-proj-shuttle')} />}
                                label="Bulldog Shuttle"
                            />
                            <NavLink
                                to="/projects/dev-blog"
                                icon={<Code aria-hidden="true" className={clsx(childIconClass, 'text-st-proj-devblog')} />}
                                label="Dev Blog"
                                onNavigate={onNavigate}
                                className={childItem}
                            />
                        </div>
                    )}
                </div>
            </div>

            <div className="flex flex-col gap-0.5 border-t border-st-line-soft pt-3.5">
                <NavLink to="/settings" icon={<SlidersHorizontal aria-hidden="true" className={iconClass} />} label="Settings" onNavigate={onNavigate} />
                <NavLink to="/help" icon={<CircleHelp aria-hidden="true" className={iconClass} />} label="Help" onNavigate={onNavigate} />
            </div>
        </nav>
    )
}
