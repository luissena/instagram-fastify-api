import { InMemoryPostsRepository } from "@/repositories/in-memory/in-memory-posts-repository"
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository"
import { hash } from "bcryptjs"
import { beforeEach, describe, expect, it } from "vitest"
import { ResourceNotFoundError } from "./errors/resource-not-found"
import { GetUserPostsUseCase } from "./get-user-posts"

describe("Get User Posts Use Case", () => {
  let usersRepository: InMemoryUsersRepository
  let postsRepository: InMemoryPostsRepository
  let sut: GetUserPostsUseCase

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    postsRepository = new InMemoryPostsRepository()
    sut = new GetUserPostsUseCase(postsRepository, usersRepository)
  })
  it("should be able to get user posts", async () => {
    const createdUser = await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: await hash("123456", 6),
    })

    await postsRepository.create({
      authorId: createdUser.id,
      content: "Post example",
      description: "Post example description",
    })

    await postsRepository.create({
      authorId: createdUser.id,
      content: "Post example 2",
      description: "Post example description 2",
    })

    const { posts } = await sut.execute({
      userId: createdUser.id,
    })

    expect(posts).toEqual(expect.any(Array))
    expect(posts).toHaveLength(2)
    expect(posts[0]).toEqual(
      expect.objectContaining({ authorId: createdUser.id })
    )
  })
  it("should not be able to get user posts with non existing user", async () => {
    await expect(async () => {
      await sut.execute({
        userId: "non-existing-id",
      })
    }).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
