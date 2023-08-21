import { FastifyInstance } from 'fastify'

import { completed } from '../controllers/tasks/completed'
import { create } from '../controllers/tasks/create'
import { fetch } from '../controllers/tasks/fetch'
import { remove } from '../controllers/tasks/remove'
import { verifyJWT } from '../middlewares/verify-jwt'

export async function tasksRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/tasks', fetch)
  app.delete('/tasks/:taskId', remove)
  app.patch('/tasks/:taskId/completed', completed)
  app.post('/tasks', create)
}