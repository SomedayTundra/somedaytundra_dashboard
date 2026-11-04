import * as React from 'react'
import { useLocalStorageState } from '@/lib/useLocalStorageState.ts'
import { ThemeContext } from './themeContext.ts'
import { isMotionId, isThemeId, type MotionId, type ThemeId } from './themes.ts'

const REDUCE_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

function subscribeToReduceMotion(onChange: () => void) {
    const query = window.matchMedia(REDUCE_MOTION_QUERY)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
}

function prefersReducedMotion() {
    return window.matchMedia(REDUCE_MOTION_QUERY).matches
}

// a stored value from an older build (or a hand edit) that isn't a known id falls back to the default
const themeStorage = {
    deserialize: (raw: string): ThemeId => {
        const parsed: unknown = JSON.parse(raw)
        return isThemeId(parsed) ? parsed : 'glacier-forest'
    },
}

const motionStorage = {
    deserialize: (raw: string): MotionId => {
        const parsed: unknown = JSON.parse(raw)
        return isMotionId(parsed) ? parsed : 'always'
    },
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    // index.html reads the same keys before first paint, so keep them in sync with it
    const [theme, setTheme] = useLocalStorageState<ThemeId>('st.theme', 'glacier-forest', themeStorage)
    const [motion, setMotion] = useLocalStorageState<MotionId>('st.motion', 'always', motionStorage)
    const reduceMotion = React.useSyncExternalStore(subscribeToReduceMotion, prefersReducedMotion)

    React.useEffect(() => {
        document.documentElement.dataset.theme = theme
        document.documentElement.dataset.motion = motion
    }, [theme, motion])

    const animated = motion === 'always' || (motion === 'system' && !reduceMotion)

    // remembered so switching animation back on restores "follow my system" rather than discarding it
    const lastOnMotion = React.useRef<MotionId>(motion === 'off' ? 'always' : motion)
    React.useEffect(() => {
        if (motion !== 'off') lastOnMotion.current = motion
    }, [motion])

    const setAnimated = React.useCallback(
        (on: boolean) => {
            if (!on) setMotion('off')
            // turning it on should visibly animate, so "system" only comes back if the OS allows motion
            else setMotion(lastOnMotion.current === 'system' && !reduceMotion ? 'system' : 'always')
        },
        [setMotion, reduceMotion]
    )

    const value = React.useMemo(
        () => ({ theme, setTheme, motion, setMotion, animated, setAnimated }),
        [theme, setTheme, motion, setMotion, animated, setAnimated]
    )

    return <ThemeContext value={value}>{children}</ThemeContext>
}
