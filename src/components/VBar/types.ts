export type Props<TData extends Record<string, any>> = {
  data: TData[]
}

export type BarItemProps = {
  value: number
  selected: boolean
  lowest?: boolean
}
