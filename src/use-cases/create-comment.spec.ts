import { InMemoryCommentsRepository } from "@/repositories/in-memory/in-memory-comments-repository"
import { InMemoryPostsRepository } from "@/repositories/in-memory/in-memory-posts-repository"
import { beforeEach, describe, expect, it } from "vitest"
import { CreateCommentUseCase } from "./create-comment"
import { ResourceNotFoundError } from "./errors/resource-not-found"

describe("Create Post Use Case", () => {
  let commentsRepository: InMemoryCommentsRepository
  let postsRepository: InMemoryPostsRepository
  let sut: CreateCommentUseCase

  beforeEach(() => {
    commentsRepository = new InMemoryCommentsRepository()
    postsRepository = new InMemoryPostsRepository()
    sut = new CreateCommentUseCase(commentsRepository, postsRepository)
  })

  it("should be able to create a new post", async () => {
    const { id } = await postsRepository.create({
      authorId: "any_user_id",
      content: "any_content",
      description: "any_description",
    })

    const { comment } = await sut.execute({
      message: "Hello world!",
      postId: id,
      userId: "any_user_id",
    })

    expect(comment).toMatchObject({
      message: "Hello world!",
      postId: id,
      userId: "any_user_id",
    })
  })
  it("should not be able to create a new post without post", async () => {
    await expect(() =>
      sut.execute({
        message: "Hello world!",
        postId: "non_existent_post_id",
        userId: "any_user_id",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
