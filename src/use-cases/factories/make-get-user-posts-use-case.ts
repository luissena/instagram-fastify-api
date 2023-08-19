import { PrismaPostsRepository } from "@/repositories/prisma/prisma-posts-repository"
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { GetUserPostsUseCase } from "../get-user-posts"

export function makeGetUserPostsUseCase() {
  const postsRepository = new PrismaPostsRepository()
  const usersRepository = new PrismaUsersRepository()
  const getUserPostsUseCase = new GetUserPostsUseCase(
    postsRepository,
    usersRepository
  )

  return getUserPostsUseCase
}
