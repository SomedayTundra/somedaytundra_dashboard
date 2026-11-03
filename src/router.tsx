import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router'
import AppLayout from '@/components/layout/AppLayout.tsx'
import Blog from '@/pages/Blog.tsx'
import DevBlog from '@/pages/DevBlog.tsx'
import Help from '@/pages/Help.tsx'
import Home from '@/pages/Home.tsx'
import NotFound from '@/pages/NotFound.tsx'
import Settings from '@/pages/Settings.tsx'

// NHL Stats and Bulldog Shuttle aren't routes: they're separate apps the sidebar opens in a new window.

const rootRoute = createRootRoute({
    component: AppLayout,
    notFoundComponent: NotFound,
})

const homeRoute = createRoute({
    path: '/',
    getParentRoute: () => rootRoute,
    component: Home,
})

const blogRoute = createRoute({
    path: '/blog',
    getParentRoute: () => rootRoute,
    component: Blog,
})

const devBlogRoute = createRoute({
    path: '/projects/dev-blog',
    getParentRoute: () => rootRoute,
    component: DevBlog,
})

const settingsRoute = createRoute({
    path: '/settings',
    getParentRoute: () => rootRoute,
    component: Settings,
})

const helpRoute = createRoute({
    path: '/help',
    getParentRoute: () => rootRoute,
    component: Help,
})

const routeTree = rootRoute.addChildren([homeRoute, blogRoute, devBlogRoute, settingsRoute, helpRoute])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}
