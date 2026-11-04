import type { LucideIcon } from 'lucide-react'

type PlaceholderPageProps = {
    eyebrow: string
    title: string
    Icon: LucideIcon
}

// A page that isn't built yet: one panel filling the whole main area.
export default function PlaceholderPage({ eyebrow, title, Icon }: PlaceholderPageProps) {
    return (
        <div className="flex min-h-full flex-col p-4 sm:p-[clamp(16px,3vw,44px)]">
            <section className="flex flex-1 flex-col gap-5 rounded-[22px] border border-st-line bg-st-surface-hero p-[clamp(24px,4vw,56px)] shadow-st-card backdrop-blur-[4px]">
                <span className="text-[12.5px] font-bold tracking-[0.08em] text-st-muted uppercase">{eyebrow}</span>
                <div className="flex items-center gap-4">
                    <span aria-hidden="true" className="grid size-14 place-items-center rounded-2xl bg-st-accent-soft text-st-accent-soft-ink">
                        <Icon className="size-7" />
                    </span>
                    <h1 className="m-0 font-display text-[clamp(28px,3.4vw,42px)] leading-tight font-bold tracking-[-0.02em]">{title}</h1>
                </div>
                <span className="inline-flex items-center gap-2 self-start rounded-full bg-st-accent-soft px-3 py-1.5 text-[12.5px] font-bold text-st-accent-soft-ink">
                    <span aria-hidden="true" className="size-1.5 rounded-full bg-st-accent shadow-[0_0_8px_var(--st-accent)]" />
                    Coming soon
                </span>
                <div className="flex max-w-[68ch] flex-col gap-4 text-base leading-relaxed text-st-ink-2">
                    <p className="m-0">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                        ea commodo consequat.
                    </p>
                    <p className="m-0">
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                        laborum.
                    </p>
                </div>
            </section>
        </div>
    )
}
