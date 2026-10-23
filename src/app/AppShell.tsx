import type { ReactNode } from 'react'
import { AppFooter } from '../components/layout/AppFooter'
import { AppHeader } from '../components/layout/AppHeader'
import { PageContainer } from '../components/layout/PageContainer'
import { Button } from '../components/ui/Button'

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="app-shell">
      <AppHeader />
      <main className="flex-1">{children}</main>
      <AppFooter />
    </div>
  )
}

export function NotFoundPage() {
  return (
    <PageContainer className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-brand">404</p>
      <h1 className="mb-3 text-3xl font-extrabold text-ink">Page not found</h1>
      <p className="mb-8 max-w-md text-muted">The page you are looking for does not exist.</p>
      <Button to="/">Back to products</Button>
    </PageContainer>
  )
}
