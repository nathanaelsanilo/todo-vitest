import { mount, type VueWrapper } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import VNotification from './VNotification.vue'

describe('VNotification', () => {
  let wrapper: VueWrapper<InstanceType<typeof VNotification>>

  beforeEach(() => {
    wrapper = mount(VNotification, {
      props: {
        params: {
          content: 'lorem ipsum',
          title: 'success',
          type: 'success'
        }
      }
    })
  })

  it('should render correctly', async () => {
    const btnClose = '[data-testid="notif-close"]'
    const lblTitle = '[data-testid="notif-title"]'
    const lblContent = '[data-testid="notif-content"]'
    const mainNotif = '[data-testid="notif"]'

    expect(wrapper).toBeDefined()
    expect(wrapper.get(btnClose)).toBeDefined()
    expect(wrapper.get(lblTitle).text()).toBe('success')
    expect(wrapper.get(lblContent).text()).toBe('lorem ipsum')
    expect(wrapper.get(mainNotif).classes('is-success')).toBe(true)

    const notificationStore = await import('@/stores/notification')
    const spyDestroy = vi.spyOn(notificationStore.useNotificationStore(), 'destroy')

    await wrapper.get(btnClose).trigger('click')

    expect(spyDestroy).toHaveBeenCalled()
  })
})
