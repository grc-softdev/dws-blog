import { describe, it, expect } from 'vitest'
import { formattedDate } from './format'

describe('formattedDate', () => {
  it('formats the date correctly', () => {
    expect(formattedDate('2025-05-15T12:00:00Z')).toBe('May 15, 2025')
    expect(formattedDate('1999-12-31T12:00:00Z')).toBe('Dec 31, 1999')
  })
 
})

