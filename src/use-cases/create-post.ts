import { PostsRepository } from "@/repositories/posts-repository"
import { uploadS3 } from "@/utils/aws/upload-s3"
import { Post } from "@prisma/client"
import { ContentRequiredError } from "./errors/content-required-error"

interface CreatePostUseCaseRequest {
  userId: string
  contentFile: {
    filetype: string
    data: any // FIX Types
  }
  description: string
}

interface CreatePostUseCaseResponse {
  post: Post
}

export class CreatePostUseCase {
  constructor(private postsRepository: PostsRepository) {}

  async execute({
    userId,
    contentFile,
    description,
  }: CreatePostUseCaseRequest): Promise<CreatePostUseCaseResponse> {
    if (!contentFile) {
      throw new ContentRequiredError()
    }

    // TODO Validation fails
    const fileUploadedURL = await uploadS3(
      contentFile.data,
      contentFile.filetype
    )

    const post = await this.postsRepository.create({
      content: fileUploadedURL as string, // TODO Fix types
      description,
      authorId: userId,
    })

    return {
      post,
    }
  }
}
