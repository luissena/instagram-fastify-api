import { PostsRepository } from "@/repositories/posts-repository"
import { UsersRepository } from "@/repositories/users-repository"
import { Post } from "@prisma/client"
import { ResourceNotFoundError } from "./errors/resource-not-found"

interface GetUserPostsUseCaseRequest {
  userId: string
}
interface GetUserPostsUseCaseResponse {
  posts: Post[]
}

export class GetUserPostsUseCase {
  constructor(
    private readonly postsRepository: PostsRepository,
    private readonly usersRepository: UsersRepository
  ) {}

  async execute({
    userId,
  }: GetUserPostsUseCaseRequest): Promise<GetUserPostsUseCaseResponse> {
    const userExists = await this.usersRepository.findById(userId)

    if (!userExists) {
      throw new ResourceNotFoundError()
    }

    const posts = await this.postsRepository.findManyByAuthorId(userId)

    return {
      posts,
    }
  }
}
