import { vi } from 'vitest'

export const useLib = vi.fn().mockReturnValue({
  plus: vi.fn(),
  minus: vi.fn(),
  clear: vi.fn()
})
