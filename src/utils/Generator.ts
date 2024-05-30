type GeneratorParams = {
  length?: number
  max?: number
}

export class Generator {
  static randNumber(params?: GeneratorParams): number[] {
    return Array.from({ length: params?.length ?? 40 }, () =>
      Math.floor(Math.random() * (params?.max ?? 200))
    )
  }
}
