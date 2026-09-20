import type { ReactNode } from 'react'

interface AppProvidersProps {
  children: ReactNode
}

// Release 1 has no global data or authentication provider. This component keeps
// the application bootstrap stable when those Release 2 providers are introduced.
export function AppProviders({ children }: AppProvidersProps) {
  return <>{children}</>
}
