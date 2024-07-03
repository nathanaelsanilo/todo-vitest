import type { INotificationDataView } from '@/models/notification/NotificationDataView'
import { useTimeoutFn, useToggle } from '@vueuse/core'
import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useNotificationStore = defineStore('store--notification', () => {
  const [isShow, toggleShow] = useToggle(false)
  const dataView = reactive<INotificationDataView>({ content: '', title: '', type: 'default' })
  const { start } = useTimeoutFn(
    () => {
      toggleShow(false)
    },
    2500,
    { immediate: false }
  )

  function render(args: INotificationDataView) {
    dataView.content = args.content
    dataView.title = args.title
    dataView.type = args.type

    toggleShow(true)
    start()
  }

  function destroy() {
    dataView.content = ''
    dataView.title = ''
    dataView.type = 'default'

    toggleShow(false)
  }

  return { isShow, toggleShow, render, dataView, destroy }
})
