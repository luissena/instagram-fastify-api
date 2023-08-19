import { PrismaPostsRepository } from "@/repositories/prisma/prisma-posts-repository"
import { GetPostInterationsUseCase } from "../get-post-interations"

export function makeGetPostInterationsUseCase() {
  const postsRepository = new PrismaPostsRepository()
  const getPostInterationsUseCase = new GetPostInterationsUseCase(
    postsRepository
  )

  return getPostInterationsUseCase
}
