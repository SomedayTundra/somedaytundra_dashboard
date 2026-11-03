import * as React from 'react'
import type { MotionId, ThemeId } from './themes.ts'

export type ThemeContextValue = {
    theme: ThemeId
    setTheme: (theme: ThemeId) => void
    motion: MotionId
    setMotion: (motion: MotionId) => void
    // the motion setting resolved against the OS reduce-motion preference
    animated: boolean
}

export const ThemeContext = React.createContext<ThemeContextValue | null>(null)

export function useTheme(): ThemeContextValue {
    const value = React.useContext(ThemeContext)
    if (value === null) throw new Error('useTheme must be used inside <ThemeProvider>')
    return value
}
