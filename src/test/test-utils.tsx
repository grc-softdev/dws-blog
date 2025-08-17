// src/test/test-utils.tsx
import React, { PropsWithChildren } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { store } from '../store/store'

type ProvidersOptions = {
  store: typeof store;                 
  queryClient?: QueryClient;
}

export function renderWithProviders(
  ui: React.ReactElement,
  { store, queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } }
    }) }: ProvidersOptions,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  const Wrapper = ({ children }: PropsWithChildren) => (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Provider>
  )
  return render(ui, { wrapper: Wrapper, ...options })
}
