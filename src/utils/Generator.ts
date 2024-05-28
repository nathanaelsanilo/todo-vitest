export class Generator {
  static randNumber(): number[] {
    return Array.from({ length: 40 }, () => Math.floor(Math.random() * 200))
  }
}
