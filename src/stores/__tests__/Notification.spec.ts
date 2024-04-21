import { NotificationDataView } from '@/models/NotificationDataView'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useNotificationStore } from '../notification'

describe('useNotificationStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should toggle show', () => {
    const store = useNotificationStore()
    expect(store.isShow).toBe(false)
    store.toggleShow()
    expect(store.isShow).toBe(true)
  })

  it('should show with content', () => {
    vi.useFakeTimers()
    const store = useNotificationStore()
    const dataView = new NotificationDataView()
    dataView.content = 'lorem ipsum'
    dataView.title = 'notification'

    store.render(dataView)

    expect(store.isShow).toBe(true)
    expect(store.dataView).toEqual(dataView)
    vi.runAllTimers()
    expect(store.isShow).toBe(false)
  })
})
