import { makeCreatePostsUseCase } from "@/use-cases/factories/make-create-post-use-case"
import { FastifyReply, FastifyRequest } from "fastify"

export async function createPost(request: FastifyRequest, reply: FastifyReply) {
  const data = request.parts()

  let contentFile: any // TODO Fix types
  let description: any // TODO Fix types

  // TODO Fix validation
  for await (const part of data) {
    if (part.type === "file") {
      contentFile = {
        filetype: part.mimetype,
        data: await part.toBuffer(),
      }
    } else {
      if (part.fieldname === "description") {
        description = part.value
      }
    }
  }

  const createPosts = makeCreatePostsUseCase()

  const { post } = await createPosts.execute({
    contentFile,
    description,
    userId: request.user.sub,
  })
  return reply.status(201).send({
    post,
  })
}
