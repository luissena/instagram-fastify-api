import { LikesRepository } from "@/repositories/likes-repository"
import { PostsRepository } from "@/repositories/posts-repository"
import { Like } from "@prisma/client"
import { ResourceNotFoundError } from "./errors/resource-not-found"

interface CreateLikeUseCaseRequest {
  userId: string
  postId: string
}

interface CreateLikeUseCaseResponse {
  like: Like
}

export class CreateLikeUseCase {
  constructor(
    private likesRepository: LikesRepository,
    private postsRepository: PostsRepository
  ) {}

  async execute({
    userId,
    postId,
  }: CreateLikeUseCaseRequest): Promise<CreateLikeUseCaseResponse> {
    const postExists = await this.postsRepository.findById(postId)

    if (!postExists) {
      throw new ResourceNotFoundError()
    }

    const like = await this.likesRepository.create({
      postId,
      userId,
    })

    return {
      like,
    }
  }
}
