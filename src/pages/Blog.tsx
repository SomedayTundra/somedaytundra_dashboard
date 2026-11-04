import { useClerk } from '@clerk/react'
import { FileText, Lock } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { CLERK_ENABLED } from '@/lib/clerk.ts'
import { useFamilyAccess } from '@/lib/family.ts'
import PlaceholderPage from './PlaceholderPage.tsx'

function SignInButton() {
    const clerk = useClerk()
    return (
        <button
            type="button"
            onClick={() => clerk.openSignIn()}
            className="inline-flex min-h-11 cursor-pointer items-center rounded-[10px] border border-accent bg-accent px-[18px] text-[14.5px] font-bold text-accent-ink"
        >
            Sign in
        </button>
    )
}

function FamilyOnly({ signedOut }: { signedOut: boolean }) {
    return (
        <div className="flex min-h-full flex-col p-4 sm:p-[clamp(16px,3vw,44px)]">
            <section className="flex flex-1 flex-col items-start gap-5 rounded-[22px] border border-line bg-surface-hero p-[clamp(24px,4vw,56px)] shadow-card backdrop-blur-[4px]">
                <span aria-hidden="true" className="grid size-14 place-items-center rounded-2xl bg-accent-soft text-accent-soft-ink">
                    <Lock className="size-7" />
                </span>
                <h1 className="m-0 font-display text-[clamp(26px,3vw,34px)] font-bold tracking-[-0.02em]">The Blog is for family</h1>
                <p className="m-0 max-w-[60ch] text-base leading-relaxed text-ink-2">
                    {signedOut
                        ? 'Sign in with a family account to read it.'
                        : "Your account isn't in the family group yet. If it should be, ask to be added."}
                </p>
                {signedOut ? (
                    CLERK_ENABLED && <SignInButton />
                ) : (
                    <Link to="/" className="font-bold text-link">
                        Back to Home
                    </Link>
                )}
            </section>
        </div>
    )
}

export default function Blog() {
    const access = useFamilyAccess()
    // Clerk is still loading: show nothing rather than flashing the locked page at a family member
    if (access === 'loading') return null
    if (access !== 'granted') return <FamilyOnly signedOut={access === 'signed-out'} />
    return <PlaceholderPage eyebrow="Blog" title="Blog" Icon={FileText} />
}
