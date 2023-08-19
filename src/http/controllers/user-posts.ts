import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found"
import { makeGetUserPostsUseCase } from "@/use-cases/factories/make-get-user-posts-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function userPosts(request: FastifyRequest, reply: FastifyReply) {
  const userPostsBodySchema = z.object({
    userId: z.string().uuid(),
  })
  const { userId } = userPostsBodySchema.parse(request.params)

  let posts

  try {
    const getUserPosts = makeGetUserPostsUseCase()

    posts = await getUserPosts.execute({
      userId,
    })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }
    throw err
  }

  return reply.status(200).send(posts)
}
