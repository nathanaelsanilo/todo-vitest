import { describe, expect, it, vi } from 'vitest'
import { useManage } from '../useManage'
import { useLib } from '@/libs/useLib'
import { useMutation } from '@/libs/vue-query'
import * as UtilDate from '@/utils/Date'

vi.mock('@/libs/vue-query')
vi.mock('@/libs/useLib')
// vi.mock('@/libs/useLib', () => ({
//   useLib: vi.fn(() => ({
//     plus: vi.fn(),
//     minus: vi.fn(),
//     clear: vi.fn()
//   }))
// }))

describe('useManage', () => {
  it('mock function', () => {
    // const lib = useLib()
    // const spy = vi.spyOn(useLib(), 'clear')
    // const spyRun = vi.spyOn(person, 'run')
    // const spyLib = vi.spyOn(SameLib, 'clear')

    // const mocked = vi.mocked(useLib, { partial: true }).mockClear()
    // mocked.mockReturnValueOnce({
    //   minus: vi.fn()
    // })
    // const mocked = vi.mocked(useLib).mockRestore()
    const mocked = vi.mocked(useLib, { partial: true }).mockReset()
    const spy = vi.fn()
    mocked.mockImplementationOnce(() => ({
      clear: vi.fn(),
      minus: spy.mockReturnValueOnce('mocked'),
      plus: vi.fn()
    }))

    // mocked.mockRestore()
    // mocked.mockClear()
    // const mocked = vi.mocked(useLib)
    // const spy = vi.spyOn(mocked(), 'clear')

    const spyFormat = vi.spyOn(UtilDate, 'formatDate')

    const { sign } = useManage()

    const result = sign()
    console.log('🚀 ~ it ~ result:', result)

    expect(spyFormat).toHaveBeenCalled()
    expect(spy).toHaveBeenCalledWith(10)

    // expect(vi.isMockFunction(useLib)).toBe(true)
    // expect(vi.isMockFunction(useLib().clear)).toBe(true)
    // expect(spy).toHaveBeenCalled()

    // expect(spyLib).toHaveBeenCalled()
    // expect(spyRun).toHaveBeenCalled()
    // expect(spy).toHaveBeenCalled()
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
