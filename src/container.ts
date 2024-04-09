import { TodoRepositoryToken } from '@/models/Injection'
import { TodoRepositoryImpl } from '@/repository/TodoRepositoryImpl'
import { container } from 'tsyringe'

container.register(TodoRepositoryToken, {
  useClass: TodoRepositoryImpl
})
