import { TodoRepository } from '@/repository/TodoRepository'
import { TodoService } from '@/services/TodoService'
import { container } from 'tsyringe'
import { TodoRepositoryToken, TodoServiceToken } from '@/models/Injection'

container.register(TodoServiceToken, {
  useClass: TodoService
})
container.register(TodoRepositoryToken, {
  useClass: TodoRepository
})
