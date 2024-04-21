import { setActivePinia, createPinia } from 'pinia'
import { useCounterStore } from '../counter'
import { describe, it, expect, beforeEach } from 'vitest'

describe('useCounterStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should increment', () => {
    const counter = useCounterStore()
    expect(counter.count).toBe(0)
    counter.increment()
    expect(counter.count).toBe(1)
  })

  it('should multiple by 2', () => {
    const counter = useCounterStore()
    expect(counter.count).toBe(0)
    counter.increment()
    counter.increment()
    expect(counter.doubleCount).toBe(4)
  })
})
