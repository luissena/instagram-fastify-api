import { makeCreateCommentUseCase } from "@/use-cases/factories/make-create-comment-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function comment(request: FastifyRequest, reply: FastifyReply) {
  const commentBodySchema = z.object({
    message: z.string().min(1).max(255),
    postId: z.string().uuid(),
  })

  const { message, postId } = commentBodySchema.parse(request.body)

  const createComment = makeCreateCommentUseCase()

  await createComment.execute({
    message,
    postId,
    userId: request.user.sub,
  })

  return reply.status(201).send()
}
