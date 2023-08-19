import { Task, TaskDocument } from '@/models/task'

import { CreateTaskInput, TasksRepository } from '../tasks-repository'

export class InMemoryTasksRepository implements TasksRepository {
  public items: TaskDocument[] = []

  async findManyByUserId(userId: string, page: number) {
    const tasks = this.items
      .filter((item) => item.userId.toString() === userId)
      .slice((page - 1) * 20, page * 20)

    return tasks
  }

  async create(data: CreateTaskInput) {
    const task = new Task(data)

    this.items.push(task)

    return task
  }
}
