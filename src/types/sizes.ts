const sizes = ['sm', 'default', 'md', 'lg'] as const

export type EnumSize = (typeof sizes)[number]
