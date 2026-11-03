import clsx from 'clsx'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/theme/themeContext.ts'
import { THEMES, type ThemeId } from '@/theme/themes.ts'

const OPTIONS: { id: ThemeId; Icon: typeof Sun }[] = [
    { id: 'glacier-forest', Icon: Sun },
    { id: 'aurora', Icon: Moon },
]

// Quick-access switch between the two themes; the same choice lives under Settings › Appearance.
export default function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    return (
        <div role="group" aria-label="Theme" className="flex h-11 items-center gap-1 rounded-xl border border-line bg-surface p-1">
            {OPTIONS.map(({ id, Icon }) => {
                const active = theme === id
                return (
                    <button
                        key={id}
                        type="button"
                        aria-pressed={active}
                        onClick={() => setTheme(id)}
                        title={THEMES[id].name}
                        className={clsx(
                            'flex h-full cursor-pointer items-center gap-2 rounded-lg px-3 text-[13.5px] font-bold transition-colors',
                            active ? 'bg-accent-soft text-accent-soft-ink' : 'text-muted hover:text-ink'
                        )}
                    >
                        <Icon aria-hidden="true" className="size-4" />
                        <span className="hidden sm:inline">{THEMES[id].name}</span>
                        <span className="sr-only sm:hidden">{THEMES[id].name}</span>
                    </button>
                )
            })}
        </div>
    )
}
