import { PrismaPostsRepository } from "@/repositories/prisma/prisma-posts-repository"
import { CreatePostUseCase } from "../create-post"

export function makeCreatePostsUseCase() {
  const postsRepository = new PrismaPostsRepository()
  const createPostsUseCase = new CreatePostUseCase(postsRepository)

  return createPostsUseCase
}
