import { PrismaLikesRepository } from "@/repositories/prisma/prisma-likes-repository"
import { PrismaPostsRepository } from "@/repositories/prisma/prisma-posts-repository"
import { CreateLikeUseCase } from "../create-like"

export function makeCreateLikeUseCase() {
  const likesRepository = new PrismaLikesRepository()
  const postsRepository = new PrismaPostsRepository()
  const createLikeUseCase = new CreateLikeUseCase(
    likesRepository,
    postsRepository
  )

  return createLikeUseCase
}
