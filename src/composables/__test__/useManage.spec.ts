import { useLib } from '@/libs/useLib'
import { useMutation } from '@/libs/vue-query'
import * as UtilDate from '@/utils/Date'
import { describe, expect, it, vi } from 'vitest'
import { useManage } from '../useManage'

vi.mock('@/libs/vue-query')
vi.mock('@/libs/useLib', () => ({
  useLib: vi.fn(() => ({
    plus: vi.fn(),
    minus: vi.fn(),
    clear: vi.fn()
  }))
}))

describe('useManage', () => {
  it('mock function', () => {
    const mocked = vi.mocked(useLib, { partial: true }).mockReset()
    const spy = vi.fn()
    mocked.mockImplementationOnce(() => ({
      clear: vi.fn(),
      minus: spy.mockReturnValueOnce('mocked'),
      plus: vi.fn()
    }))
    const spyFormat = vi.spyOn(UtilDate, 'formatDate')

    const { sign } = useManage()
    const result = sign()

    expect(spyFormat).toHaveBeenCalled()
    expect(spy).toHaveBeenCalledWith(10)
    expect(result).toBe('mocked')
  })

  it('mock mutate', () => {
    const spy = vi.fn()
    const mocked = vi.mocked(useMutation).mockReset()
    mocked.mockImplementationOnce(() => ({
      mutate: spy
    }))

    const { copy } = useManage()

    copy()

    expect(spy).toHaveBeenCalled()
  })
})
