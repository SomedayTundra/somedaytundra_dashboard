import type * as React from 'react'
import { Link } from '@tanstack/react-router'
import { ArrowRight, Bell, Bus, ChartColumn, Code, ExternalLink, Search } from 'lucide-react'
import { ThemeToggle } from '@somedaytundra/theme'
import { useFamilyAccess } from '@/lib/family.ts'
import { BULLDOG_SHUTTLE_URL, NHL_STATS_URL } from '@/lib/links.ts'

const panel = 'rounded-[18px] border border-line bg-surface'

type Project = {
    name: string
    blurb: string
    Icon: typeof Code
    iconClass: string
    linkClass: string
} & ({ href: string } | { to: string })

const PROJECTS: Project[] = [
    {
        name: 'NHL Stats',
        blurb: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur.',
        Icon: ChartColumn,
        iconClass: 'bg-proj-nhl-soft text-proj-nhl',
        linkClass: 'text-proj-nhl',
        href: NHL_STATS_URL,
    },
    {
        name: 'Bulldog Shuttle',
        blurb: 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.',
        Icon: Bus,
        iconClass: 'bg-proj-shuttle-soft text-proj-shuttle',
        linkClass: 'text-proj-shuttle',
        href: BULLDOG_SHUTTLE_URL,
    },
    {
        name: 'Dev Blog',
        blurb: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.',
        Icon: Code,
        iconClass: 'bg-proj-devblog-soft text-proj-devblog',
        linkClass: 'text-proj-devblog',
        to: '/projects/dev-blog',
    },
]

const POSTS = [
    'Quis autem vel eum iure reprehenderit',
    'At vero eos et accusamus et iusto odio',
    'Temporibus autem quibusdam et aut officiis',
    'Itaque earum rerum hic tenetur sapiente',
]

const ACTIVITY = [
    { title: 'Nam libero tempore, cum soluta nobis', source: 'NHL Stats', dot: 'bg-proj-nhl' },
    { title: 'Eligendi optio cumque nihil impedit', source: 'Bulldog Shuttle', dot: 'bg-proj-shuttle' },
    { title: 'Quo minus id quod maxime placeat', source: 'Dev Blog', dot: 'bg-proj-devblog' },
    { title: 'Facere possimus, omnis voluptas assumenda', source: 'Blog', dot: 'bg-muted' },
]

const cardLink = 'mt-auto inline-flex items-center gap-1.5 text-sm font-bold'

function ProjectLink({ project }: { project: Project }) {
    if ('href' in project) {
        return (
            <a href={project.href} target="_blank" rel="noopener noreferrer" className={`${cardLink} ${project.linkClass}`}>
                Open <ExternalLink aria-hidden="true" className="size-[15px]" />
                <span className="sr-only">{project.name} (opens in a new window)</span>
            </a>
        )
    }
    return (
        <Link to={project.to} className={`${cardLink} ${project.linkClass}`}>
            Open <ArrowRight aria-hidden="true" className="size-[15px]" />
            <span className="sr-only">{project.name}</span>
        </Link>
    )
}

function SectionHeading({ children }: { children: React.ReactNode }) {
    return <h2 className="m-0 font-display text-[17px] font-semibold">{children}</h2>
}

export default function Home() {
    // Blog posts and Blog activity are family-only, like the Blog page itself
    const family = useFamilyAccess() === 'granted'
    const activity = family ? ACTIVITY : ACTIVITY.filter((item) => item.source !== 'Blog')
    return (
        <div className="flex flex-col gap-7 px-4 pt-7 pb-[170px] sm:px-[clamp(16px,3vw,44px)]">
            <div className="flex flex-wrap items-center justify-between gap-3.5">
                <div className="flex flex-col gap-0.5">
                    <span className="text-[12.5px] font-bold tracking-[0.08em] text-muted uppercase">Home</span>
                    <span className="font-display text-[15px] font-semibold">Lorem ipsum dashboard</span>
                </div>
                <div className="flex flex-wrap items-center gap-2.5">
                    <label className="flex min-h-11 w-[300px] max-w-full items-center gap-2 rounded-xl border border-line bg-surface px-3.5">
                        <Search aria-hidden="true" className="size-[17px] text-muted" />
                        <span className="sr-only">Search</span>
                        <input
                            type="search"
                            placeholder="Search lorem, ipsum…"
                            className="min-w-0 flex-1 border-0 bg-transparent text-sm text-ink outline-none placeholder:text-muted"
                        />
                    </label>
                    <ThemeToggle />
                    <button
                        type="button"
                        aria-label="Notifications"
                        className="grid size-11 cursor-pointer place-items-center rounded-xl border border-line bg-surface text-ink-2"
                    >
                        <Bell aria-hidden="true" className="size-[19px]" />
                    </button>
                </div>
            </div>

            <section className="relative flex flex-col gap-4 overflow-hidden rounded-[22px] border border-line bg-surface-hero p-[clamp(24px,4vw,44px)] shadow-card backdrop-blur-[4px]">
                <span className="inline-flex items-center gap-2 self-start rounded-full bg-accent-soft px-3 py-1.5 text-[12.5px] font-bold text-accent-soft-ink">
                    <span aria-hidden="true" className="size-1.5 rounded-full bg-accent shadow-[0_0_8px_var(--accent)]" />
                    Lorem ipsum · dolor sit
                </span>
                <h1 className="m-0 max-w-[18ch] font-display text-[clamp(28px,3.4vw,42px)] leading-[1.12] font-bold tracking-[-0.02em]">
                    Lorem ipsum dolor sit amet, consectetur.
                </h1>
                <p className="m-0 max-w-[60ch] text-base leading-relaxed text-ink-2">
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
                    aperiam, eaque ipsa quae ab illo inventore veritatis.
                </p>
                <div className="flex flex-wrap gap-2.5">
                    <button
                        type="button"
                        className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-[10px] border border-accent bg-accent px-[18px] text-[14.5px] font-bold text-accent-ink"
                    >
                        Lorem action <ArrowRight aria-hidden="true" className="size-4" />
                    </button>
                    <button
                        type="button"
                        className="inline-flex min-h-11 cursor-pointer items-center rounded-[10px] border border-line bg-transparent px-[18px] text-[14.5px] font-bold text-ink"
                    >
                        Ipsum secondary
                    </button>
                </div>
            </section>

            <section className="flex flex-col gap-3.5">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <h2 className="m-0 font-display text-[19px] font-semibold">Projects</h2>
                </div>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-4">
                    {PROJECTS.map((project) => (
                        <article key={project.name} className={`${panel} flex flex-col gap-3 p-5`}>
                            <span aria-hidden="true" className={`grid size-11 place-items-center rounded-xl ${project.iconClass}`}>
                                <project.Icon className="size-[22px]" />
                            </span>
                            <h3 className="m-0 text-[16.5px] font-extrabold">{project.name}</h3>
                            <p className="m-0 text-sm leading-normal text-muted">{project.blurb}</p>
                            <ProjectLink project={project} />
                        </article>
                    ))}
                </div>
            </section>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
                {family && (
                    <section className={`${panel} flex flex-col gap-1.5 p-[22px]`}>
                        <SectionHeading>Recent posts</SectionHeading>
                        <ul className="m-0 mt-2 list-none p-0">
                            {POSTS.map((title) => (
                                <li key={title}>
                                    <Link
                                        to="/blog"
                                        className="flex justify-between gap-4 border-t border-line-soft py-3 text-ink no-underline"
                                    >
                                        <span className="text-[14.5px] font-bold">{title}</span>
                                        <span className="shrink-0 text-[13px] text-muted">[Date]</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}
                <section className={`${panel} flex flex-col gap-3.5 p-[22px]`}>
                    <SectionHeading>Lorem activity</SectionHeading>
                    <ul className="m-0 flex list-none flex-col gap-3.5 p-0">
                        {activity.map((item) => (
                            <li key={item.title} className="flex items-start gap-3">
                                <span aria-hidden="true" className={`mt-1.5 size-[9px] shrink-0 rounded-full ${item.dot}`} />
                                <span className="flex flex-col gap-0.5">
                                    <span className="text-[14.5px] font-bold">{item.title}</span>
                                    <span className="text-[13px] text-muted">{item.source} · [Time ago]</span>
                                </span>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
        </div>
    )
}
