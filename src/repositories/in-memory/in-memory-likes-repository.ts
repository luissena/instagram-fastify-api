import { Like, Prisma } from "@prisma/client"
import { randomUUID } from "crypto"
import { LikesRepository } from "../likes-repository"

export class InMemoryLikesRepository implements LikesRepository {
  public items: Like[] = []

  async create(data: Prisma.LikeUncheckedCreateInput) {
    const like: Like = {
      id: randomUUID(),
      postId: data.postId,
      userId: data.userId,
      createdAt: new Date(),
    }

    this.items.push(like)

    return like
  }
}
