import { PrismaCommentsRepository } from "@/repositories/prisma/prisma-comments-repository"
import { PrismaPostsRepository } from "@/repositories/prisma/prisma-posts-repository"
import { CreateCommentUseCase } from "../create-comment"

export function makeCreateCommentUseCase() {
  const commentsRepository = new PrismaCommentsRepository()
  const postsRepository = new PrismaPostsRepository()
  const createCommentUseCase = new CreateCommentUseCase(
    commentsRepository,
    postsRepository
  )

  return createCommentUseCase
}
