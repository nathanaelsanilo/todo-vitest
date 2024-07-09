const variants = ['primary', 'link', 'info', 'success', 'warning', 'danger'] as const

export type EnumVariant = (typeof variants)[number]
