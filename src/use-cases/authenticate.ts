import { UsersRepository } from "@/repositories/users-repository"
import { User } from "@prisma/client"
import { compare } from "bcryptjs"
import { InvalidCredentialsError } from "./errors/invalid-credentials-error"

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}
interface AuthenticateUseCaseResponse {
  user: User
}

export class AuthenticateUseCase {
  constructor(private readonly userRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.userRepository.findByEmail(email)
    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, user.password)
    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      user,
    }
  }
}
