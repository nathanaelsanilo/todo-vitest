export class TodoQueryParams {
  name: string | undefined

  constructor() {
    this.name = undefined
  }

  setName(value: string): this {
    this.name = value
    return this
  }
}
