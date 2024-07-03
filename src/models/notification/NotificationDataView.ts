export interface INotificationDataView {
  content: string
  title: string
  type: 'success' | 'default'
}

export class NotificationDataView implements INotificationDataView {
  content: string
  title: string
  type: 'success' | 'default'

  constructor() {
    this.content = ''
    this.title = ''
    this.type = 'default'
  }
}

export class NotificationDataViewBuilder {
  private static dataView: NotificationDataView

  static builder() {
    this.dataView = new NotificationDataView()
    return this
  }

  static content(value: string) {
    this.dataView.content = value
    return this
  }

  static title(value: string) {
    this.dataView.title = value
    return this
  }

  static type(value: 'success' | 'default') {
    this.dataView.type = value
    return this
  }

  static build() {
    return this.dataView
  }
}
