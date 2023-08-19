import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository"
import { compare } from "bcryptjs"
import { beforeEach, describe, expect, it } from "vitest"
import { UserAlreadyExistsError } from "./errors/user-already-exists-error"
import { RegisterUseCase } from "./register"

describe("Register Use Case", () => {
  let usersRepository: InMemoryUsersRepository
  let sut: RegisterUseCase

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it("should be able to register", async () => {
    const { user } = await sut.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    })

    expect(user.id).toEqual(expect.any(String))
  })
  it("should hash user password upon regisstration", async () => {
    const { user } = await sut.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    })

    const isPasswordCorrectlyHashed = await compare("123456", user.password)
    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it("should not allow two users with the same email", async () => {
    const email = "johndoe@example.com"

    await sut.execute({
      name: "John Doe",
      email,
      password: "123456",
    })

    await expect(() =>
      sut.execute({
        name: "John Doe",
        email,
        password: "123456",
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
