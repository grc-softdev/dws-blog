import { describe, it, expect, beforeEach, vi } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { configureStore } from '@reduxjs/toolkit'
import { renderWithProviders } from '../test/test-utils'
import { setSearchTerm } from '../store/filtersSlice'
import SearchBar from './SearchBar'

const createStore = () =>
  configureStore({
    reducer: {
      filters: (state = { searchTerm: '' }, action) =>
        action.type === setSearchTerm.type ? { ...state, searchTerm: action.payload } : state,
    },
  })

const mockMatchMedia = (matches: boolean) => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(() => ({
      matches,
      media: '(max-width: 639px)',
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      onchange: null,
      dispatchEvent: vi.fn(),
    })),
  })
}

beforeEach(() => {
  vi.restoreAllMocks()
})

describe('SearchBar', () => {
  it('submits on desktop', async () => {
    mockMatchMedia(false)
    const user = userEvent.setup()
    const store = createStore()
    renderWithProviders(<SearchBar/>, { store })
    const input = screen.getByPlaceholderText(/search/i)
    await user.clear(input)
    await user.type(input, 'world')
    await user.click(screen.getByRole('button', { name: /search/i }))
    expect(store.getState().filters.searchTerm).toBe('world')
  })

  it('opens then submits on mobile', async () => {
    mockMatchMedia(true)
    vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => {
      cb(0)
      return 1
    })
    const user = userEvent.setup()
    const store = createStore()
    renderWithProviders(<SearchBar />, { store })
    const input = screen.getByPlaceholderText(/search/i)
    const btn = screen.getByRole('button', { name: /search/i })
    await user.click(btn)
    expect(document.activeElement).toBe(input)
    await user.type(input, 'hello')
    await user.click(btn)
    expect(store.getState().filters.searchTerm).toBe('hello')
  })
})
