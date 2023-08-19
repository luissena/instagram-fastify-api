import { PostsRepository } from "@/repositories/posts-repository"
import { Post } from "@prisma/client"
import { ContentRequiredError } from "./errors/content-required-error"

interface CreatePostUseCaseRequest {
  userId: string
  content: string
  description: string
}

interface CreatePostUseCaseResponse {
  post: Post
}

export class CreatePostUseCase {
  constructor(private postsRepository: PostsRepository) {}

  async execute({
    userId,
    content,
    description,
  }: CreatePostUseCaseRequest): Promise<CreatePostUseCaseResponse> {
    if (!content) {
      throw new ContentRequiredError()
    }

    const post = await this.postsRepository.create({
      content,
      description,
      authorId: userId,
    })

    return {
      post,
    }
  }
}
