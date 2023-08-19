import { CommentsRepository } from "@/repositories/comments-repository"
import { PostsRepository } from "@/repositories/posts-repository"
import { Comment } from "@prisma/client"
import { ResourceNotFoundError } from "./errors/resource-not-found"

interface CreateCommentUseCaseRequest {
  userId: string
  postId: string
  message: string
}

interface CreateCommentUseCaseResponse {
  comment: Comment
}

export class CreateCommentUseCase {
  constructor(
    private commentsRepository: CommentsRepository,
    private postsRepository: PostsRepository
  ) {}

  async execute({
    userId,
    postId,
    message,
  }: CreateCommentUseCaseRequest): Promise<CreateCommentUseCaseResponse> {
    const postExists = await this.postsRepository.findById(postId)

    if (!postExists) {
      throw new ResourceNotFoundError()
    }

    const comment = await this.commentsRepository.create({
      message,
      postId,
      userId,
    })

    return {
      comment,
    }
  }
}
