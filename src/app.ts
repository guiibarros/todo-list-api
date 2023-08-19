import fastify from 'fastify'
import { ZodError } from 'zod'

import { createConnection } from './database'
import { env } from './env'
import { usersRoutes } from './http/routes/users'

createConnection()

export const app = fastify()

app.register(usersRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error.',
      issue: error.format(),
    })
  }

  if (env.NODE_ENV !== 'production') {
    console.log(error)
  }

  return reply.status(500).send({
    message: 'Internal server error.',
  })
})
