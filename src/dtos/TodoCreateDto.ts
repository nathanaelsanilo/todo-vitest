export class TodoCreateDto {
  description!: string
  timestamp!: string
  is_complete!: boolean

  setDescription(value: string): this {
    this.description = value
    return this
  }

  setTimestamp(value: string): this {
    this.timestamp = value
    return this
  }

  setIsComplete(value: boolean): this {
    this.is_complete = value
    return this
  }
}
