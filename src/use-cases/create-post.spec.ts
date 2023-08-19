import { InMemoryPostsRepository } from "@/repositories/in-memory/in-memory-posts-repository"
import { beforeEach, describe, expect, it } from "vitest"
import { CreatePostUseCase } from "./create-post"
import { ContentRequiredError } from "./errors/content-required-error"

describe("Create Post Use Case", () => {
  let postsRepository: InMemoryPostsRepository
  let sut: CreatePostUseCase

  beforeEach(() => {
    postsRepository = new InMemoryPostsRepository()
    sut = new CreatePostUseCase(postsRepository)
  })

  it("should be able to create a new post", async () => {
    const { post } = await sut.execute({
      content: "any_content",
      description: "any_description",
      userId: "any_user_id",
    })

    expect(post).toMatchObject({
      id: "1",
      authorId: "any_user_id",
      content: "any_content",
      description: "any_description",
    })
  })

  it("should be not able to create a new post with empty content", async () => {
    await expect(
      sut.execute({
        content: "",
        description: "any_description",
        userId: "any_user_id",
      })
    ).rejects.toBeInstanceOf(ContentRequiredError)
  })
})
