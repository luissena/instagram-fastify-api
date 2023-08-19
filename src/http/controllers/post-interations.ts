import { makeGetPostInterationsUseCase } from "@/use-cases/factories/make-get-post-interations-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function postInterations(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const postInterationsBodySchema = z.object({
    postId: z.string().uuid(),
  })
  const { postId } = postInterationsBodySchema.parse(request.params)

  const getPostInterations = makeGetPostInterationsUseCase()

  const { postWithInterations } = await getPostInterations.execute({
    postId,
  })

  return reply.status(200).send(postWithInterations)
}
