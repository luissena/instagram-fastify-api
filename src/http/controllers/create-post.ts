import { makeCreatePostsUseCase } from "@/use-cases/factories/make-create-post-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function createPost(request: FastifyRequest, reply: FastifyReply) {
  const createPostBodySchema = z.object({
    // TODO validar para S3
    content: z.string().min(1).max(255),
    description: z.string().min(1).max(255),
  })

  const { content, description } = createPostBodySchema.parse(request.body)

  const createPosts = makeCreatePostsUseCase()

  const { post } = await createPosts.execute({
    content,
    description,
    userId: request.user.sub,
  })

  return reply.status(201).send({
    post,
  })
}
