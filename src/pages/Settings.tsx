import type * as React from 'react'
import clsx from 'clsx'
import { Show, SignOutButton, useClerk, useUser } from '@clerk/react'
import { IglooMark, THEME_IDS, THEMES, type ThemeId, useTheme } from '@somedaytundra/theme'
import { CLERK_ENABLED } from '@/lib/clerk.ts'

const panel = 'flex flex-col gap-5 rounded-[18px] border border-st-line bg-st-surface p-[22px] sm:p-7'
const optionCard =
    'flex cursor-pointer gap-3.5 rounded-2xl border border-st-line p-4 transition-colors hover:bg-st-nav-hover has-[:checked]:border-st-accent has-[:checked]:bg-st-accent-soft has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-st-accent'
const button =
    'inline-flex min-h-11 cursor-pointer items-center rounded-[10px] border px-[18px] text-[14.5px] font-bold'
const primaryButton = `${button} border-st-accent bg-st-accent text-st-accent-ink`
const secondaryButton = `${button} border-st-line bg-transparent text-st-ink`

// a miniature of each theme's ground, so the choice can be made by look as well as by name
const PREVIEW: Record<ThemeId, { ground: string; cutout: string }> = {
    'glacier-forest': { ground: 'linear-gradient(180deg, #DDEBF8, #F4F8FC)', cutout: '#EEF4FB' },
    aurora: { ground: 'radial-gradient(120% 90% at 30% 0%, rgba(75, 227, 160, 0.35), #05070B 70%)', cutout: '#05070B' },
}

function SectionHeader({ title, description }: { title: string; description: string }) {
    return (
        <div className="flex flex-col gap-1">
            <h2 className="m-0 font-display text-[19px] font-semibold">{title}</h2>
            <p className="m-0 text-sm text-st-muted">{description}</p>
        </div>
    )
}

function Legend({ children }: { children: React.ReactNode }) {
    return <legend className="mb-3 text-[15px] font-bold">{children}</legend>
}

function AppearanceSettings() {
    const { theme, setTheme, motion, setMotion, animated, setAnimated } = useTheme()
    const animationOn = motion !== 'off'
    return (
        <section className={panel}>
            <SectionHeader title="Appearance" description="Your choices are saved in this browser, and to your account when you're signed in." />

            <fieldset className="m-0 border-0 p-0">
                <Legend>Theme</Legend>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-3">
                    {THEME_IDS.map((id) => (
                        <label key={id} className={optionCard}>
                            <input
                                type="radio"
                                name="theme"
                                value={id}
                                checked={theme === id}
                                onChange={() => setTheme(id)}
                                className="sr-only"
                            />
                            <span
                                aria-hidden="true"
                                className="grid h-[60px] w-[84px] shrink-0 place-items-end justify-center rounded-xl border border-st-line pb-2"
                                style={{ background: PREVIEW[id].ground }}
                            >
                                <IglooMark width={44} height={21} crop="tight" themeId={id} cutout={PREVIEW[id].cutout} />
                            </span>
                            <span className="flex flex-col gap-1">
                                <span className="text-[15px] font-bold">{THEMES[id].name}</span>
                                <span className="text-[13px] leading-snug text-st-muted">{THEMES[id].description}</span>
                            </span>
                        </label>
                    ))}
                </div>
            </fieldset>

            <fieldset className="m-0 border-0 p-0">
                <Legend>Background animation</Legend>
                <div className="flex flex-col gap-2">
                    <label className={`${optionCard} items-center justify-between py-3`}>
                        <span className="flex flex-col">
                            <span className="text-[14.5px] font-bold">Animate backgrounds</span>
                            <span className="text-[13px] text-st-muted">
                                {animationOn ? 'Snow falls and the aurora moves.' : 'Backgrounds stay still.'}
                            </span>
                        </span>
                        <input
                            type="checkbox"
                            role="switch"
                            checked={animationOn}
                            onChange={(e) => setAnimated(e.target.checked)}
                            className="sr-only"
                        />
                        <span
                            aria-hidden="true"
                            className={clsx(
                                'relative h-6 w-11 shrink-0 rounded-full border transition-colors',
                                animationOn ? 'border-st-accent bg-st-accent' : 'border-st-line bg-st-nav-hover'
                            )}
                        >
                            <span
                                className={clsx(
                                    'absolute top-0.5 size-[18px] rounded-full bg-st-surface shadow transition-[left]',
                                    animationOn ? 'left-[22px]' : 'left-0.5'
                                )}
                            />
                        </span>
                    </label>
                    {animationOn && (
                        <label className={`${optionCard} items-center py-3`}>
                            <input
                                type="checkbox"
                                checked={motion === 'system'}
                                onChange={(e) => setMotion(e.target.checked ? 'system' : 'always')}
                                className="size-4 accent-[var(--st-accent)]"
                            />
                            <span className="flex flex-col">
                                <span className="text-[14.5px] font-bold">Follow my system setting</span>
                                <span className="text-[13px] text-st-muted">
                                    {motion === 'system' && !animated
                                        ? 'Paused right now: your device is asking apps to reduce motion.'
                                        : 'Stay still when your device asks apps to reduce motion.'}
                                </span>
                            </span>
                        </label>
                    )}
                </div>
            </fieldset>
        </section>
    )
}

function SignedInAccount() {
    const { user } = useUser()
    const clerk = useClerk()
    if (!user) return null
    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3.5">
                <img src={user.imageUrl} alt="" className="size-12 rounded-full" />
                <div className="flex min-w-0 flex-col">
                    <span className="truncate font-bold">{user.fullName ?? user.username ?? 'Signed in'}</span>
                    <span className="truncate text-sm text-st-muted">{user.primaryEmailAddress?.emailAddress}</span>
                    {import.meta.env.DEV && (
                        <span className="truncate font-mono text-[11.5px] text-st-muted">dev · {user.id}</span>
                    )}
                </div>
            </div>
            <div className="flex flex-wrap gap-2.5">
                <button type="button" className={primaryButton} onClick={() => clerk.openUserProfile()}>
                    Manage account
                </button>
                <SignOutButton>
                    <button type="button" className={secondaryButton}>
                        Sign out
                    </button>
                </SignOutButton>
            </div>
        </div>
    )
}

function ClerkAccountSettings() {
    const clerk = useClerk()
    return (
        <>
            <Show when="signed-in">
                <SignedInAccount />
            </Show>
            <Show when="signed-out">
                <div className="flex flex-wrap gap-2.5">
                    <button type="button" className={primaryButton} onClick={() => clerk.openSignIn()}>
                        Sign in
                    </button>
                    <button type="button" className={secondaryButton} onClick={() => clerk.openSignUp()}>
                        Create account
                    </button>
                </div>
            </Show>
        </>
    )
}

function AccountSettings() {
    return (
        <section className={panel}>
            <SectionHeader title="Account" description="Sign-in and your profile are handled by Clerk." />
            {CLERK_ENABLED ? (
                <ClerkAccountSettings />
            ) : (
                <p className="m-0 text-sm text-st-ink-2">
                    Sign-in isn't set up yet: add <code className="font-mono">VITE_CLERK_PUBLISHABLE_KEY</code> to{' '}
                    <code className="font-mono">.env.local</code>.
                </p>
            )}
        </section>
    )
}

export default function Settings() {
    return (
        <div className="flex flex-col gap-6 px-4 pt-7 pb-[170px] sm:px-[clamp(16px,3vw,44px)]">
            <div className="flex flex-col gap-0.5">
                <span className="text-[12.5px] font-bold tracking-[0.08em] text-st-muted uppercase">Settings</span>
                <h1 className="m-0 font-display text-[clamp(26px,3vw,34px)] font-bold tracking-[-0.02em]">Settings</h1>
            </div>
            <AppearanceSettings />
            <AccountSettings />
        </div>
    )
}
