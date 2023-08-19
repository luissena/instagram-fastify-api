import { makeCreateLikeUseCase } from "@/use-cases/factories/make-create-like-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function like(request: FastifyRequest, reply: FastifyReply) {
  const likeBodySchema = z.object({
    postId: z.string().uuid(),
  })

  const { postId } = likeBodySchema.parse(request.body)

  const createLike = makeCreateLikeUseCase()

  await createLike.execute({
    postId,
    userId: request.user.sub,
  })

  return reply.status(201).send()
}
