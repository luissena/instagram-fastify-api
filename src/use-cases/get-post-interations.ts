import { PostsRepository } from "@/repositories/posts-repository"
import { ResourceNotFoundError } from "./errors/resource-not-found"

interface GetPostInterationsUseCaseRequest {
  postId: string
}
interface GetPostInterationsUseCaseResponse {
  postWithInterations: any // TODO fix this return type
}

export class GetPostInterationsUseCase {
  constructor(private readonly postsRepository: PostsRepository) {}

  async execute({
    postId,
  }: GetPostInterationsUseCaseRequest): Promise<GetPostInterationsUseCaseResponse> {
    const postWithInterations = await this.postsRepository.findById(postId)

    if (!postWithInterations) {
      throw new ResourceNotFoundError()
    }

    return {
      postWithInterations,
    }
  }
}
