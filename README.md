# vitest-todo

## Mocking Function and Module

### How to mock module

full example look [useTodo.test.ts](src/composables/__test__/useTodo.test.ts)

1. to mock module you can use `vi.mock('path/to/module', factory)`
   where `factory` is a function that return all exported member from the module. if you dont provide the factory module, all exported member from the module will `undefined`. also you can use global mock module using `__mocks__` folder in the root folder or alongside the module

   ```js
   vi.mock('@/modules/axios', () => {
     return {
       http: {
         get: vi.fn().mockResolvedValue({ data: true })
       }
     }
   })
   ```

2. use `vi.mocked` to get the exported mock function from the module that have been mocked. test the exported mocked member using `vi.isMockFunction(fn)`

   ```js
   expect(vi.isMockFunction(AxiosModule.http.get)).toBe(true)
   ```

3. you can then override the mock function return value, or implementation

   ```js
   vi.mocked(AxiosModule.http.get).mockImplementationOnce(() => {
     return Promise.resolve({ data: mockAll })
   })
   ```

### Mock Reset

full example look [useManage.spec.ts](src/composables/__test__/useManage.spec.ts)

After you mock the module, you can use `fn().mockReset()` to reset the inner implementation to `undefined`. If you intent to change the implementation you can use this and apply new implementation

1. mock module using `vi.mock('path/to/module')` then add the exported member

```js
vi.mock('@/libs/useLib', () => ({
  useLib: vi.fn(() => ({
    plus: vi.fn(),
    minus: vi.fn(),
    clear: vi.fn()
  }))
}))
```

2. reset the mocked module using `.mockReset()`

```js
const mocked = vi.mocked(useLib, { partial: true }).mockReset()
```

3. define exported member from the mocked module, since it will return undefined

```js
const spy = vi.fn()
mocked.mockImplementationOnce(() => ({
  clear: vi.fn(),
  minus: spy.mockReturnValueOnce('mocked'),
  plus: vi.fn()
}))
```
