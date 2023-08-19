import { InMemoryPostsRepository } from "@/repositories/in-memory/in-memory-posts-repository"
import { beforeEach, describe, expect, it } from "vitest"
import { ResourceNotFoundError } from "./errors/resource-not-found"
import { GetPostInterationsUseCase } from "./get-post-interations"

describe("Get Post Interations Use Case", () => {
  let postsRepository: InMemoryPostsRepository
  let sut: GetPostInterationsUseCase

  beforeEach(() => {
    postsRepository = new InMemoryPostsRepository()
    sut = new GetPostInterationsUseCase(postsRepository)
  })
  it("should be able to get post interations", async () => {
    const post = await postsRepository.create({
      authorId: "1",
      content: "Post example",
      description: "Post example description",
    })

    const { postWithInterations } = await sut.execute({
      postId: post.id,
    })

    expect(postWithInterations).toEqual(
      expect.objectContaining({
        id: post.id,
        authorId: post.authorId,
        content: post.content,
        description: post.description,
        createdAt: post.createdAt,
        likes: expect.any(Array),
        comments: expect.any(Array),
        _count: expect.objectContaining({
          likes: expect.any(Number),
          comments: expect.any(Number),
        }),
      })
    )
  })
  it("should not be able to get post interations with invalid post", async () => {
    await expect(async () => {
      await sut.execute({
        postId: "non-existing-post-id",
      })
    }).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
