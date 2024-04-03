import { container, type InjectionToken } from 'tsyringe'

export function resolver<TService>(key: InjectionToken<TService>) {
  return container.resolve<TService>(key)
}
