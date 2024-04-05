import { TodoRepository } from '@/repository/TodoRepository'
import { TodoService } from '@/services/TodoService'
import { container } from 'tsyringe'

container.register(TodoService, { useClass: TodoService })
container.register(TodoRepository, { useClass: TodoRepository })
