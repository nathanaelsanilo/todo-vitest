import { vi } from 'vitest'

export const useMutation = vi.fn().mockImplementation(() => ({
  mutate: vi.fn()
}))
