import { InMemoryLikesRepository } from "@/repositories/in-memory/in-memory-likes-repository"
import { InMemoryPostsRepository } from "@/repositories/in-memory/in-memory-posts-repository"
import { beforeEach, describe, expect, it } from "vitest"
import { CreateLikeUseCase } from "./create-like"
import { ResourceNotFoundError } from "./errors/resource-not-found"

describe("Create Like Use Case", () => {
  let likesRepository: InMemoryLikesRepository
  let postsRepository: InMemoryPostsRepository
  let sut: CreateLikeUseCase

  beforeEach(() => {
    likesRepository = new InMemoryLikesRepository()
    postsRepository = new InMemoryPostsRepository()
    sut = new CreateLikeUseCase(likesRepository, postsRepository)
  })

  it("should be able to create a new like", async () => {
    const { id } = await postsRepository.create({
      authorId: "any_user_id",
      content: "any_content",
      description: "any_description",
    })

    const { like } = await sut.execute({
      postId: id,
      userId: "any_user_id",
    })

    expect(like).toMatchObject({
      postId: "1",
      userId: "any_user_id",
    })
  })

  it("should not be able to create a new like without post", async () => {
    await expect(() =>
      sut.execute({
        postId: "non_existent_post_id",
        userId: "any_user_id",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
