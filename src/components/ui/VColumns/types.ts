export type VColumnProps = {
  columnSize?: ColumnSize
  gridSize?: ColumnGridSize
}

export type VColumnsProps = {
  alignItems?: AlignItems
}

export type AlignItems = 'center'

export type ColumnSize =
  | 'is-full'
  | 'is-four-fifths'
  | 'is-three-quarters'
  | 'is-two-thirds'
  | 'is-three-fifths'
  | 'is-half'
  | 'is-two-fifths'
  | 'is-one-third'
  | 'is-one-quarter'
  | 'is-one-fifth'

export type ColumnGridSize =
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '11'
  | '12'
