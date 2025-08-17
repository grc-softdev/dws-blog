import { render } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { PropsWithChildren, ReactElement } from 'react'
import type { AppStore } from '../store/store'

type ProvidersOptions = {
  store: AppStore
  queryClient?: QueryClient
}

export function renderWithProviders(
  ui: ReactElement,
  {
    store,
    queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    }),
  }: ProvidersOptions,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  const Wrapper = ({ children }: PropsWithChildren) => (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Provider>
  )

  return render(ui, { wrapper: Wrapper, ...options })
}
