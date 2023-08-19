import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error"
import { makeRegisterUseCase } from "@/use-cases/factories/make-register-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    avatar: z.string().optional(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password, avatar } = registerBodySchema.parse(
    request.body
  )

  try {
    const registerUseCase = makeRegisterUseCase()

    await registerUseCase.execute({
      name,
      avatar,
      email,
      password,
    })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
