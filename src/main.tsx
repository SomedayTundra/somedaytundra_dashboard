import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from '@tanstack/react-router'
import { ThemeProvider } from '@somedaytundra/theme'
import ClerkThemedProvider from '@/components/auth/ClerkThemedProvider.tsx'
import { router } from '@/router.tsx'
import './index.css'

// nothing queries yet; the provider is here for the backend wiring that comes next
const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider>
            <ClerkThemedProvider>
                <QueryClientProvider client={queryClient}>
                    <RouterProvider router={router} />
                </QueryClientProvider>
            </ClerkThemedProvider>
        </ThemeProvider>
    </StrictMode>
)
