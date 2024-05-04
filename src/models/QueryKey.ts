import type { TodoQueryParams } from './TodoQueryParams'

export const todoKeys = {
  all: ['todo'] as const,
  progress: () => [...todoKeys.all, 'progress'] as const,
  list: (params: TodoQueryParams) => [...todoKeys.all, 'list', { params }]
}
