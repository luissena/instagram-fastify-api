import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { LikesRepository } from "../likes-repository"

export class PrismaLikesRepository implements LikesRepository {
  async create(data: Prisma.LikeUncheckedCreateInput) {
    const like = await prisma.like.create({
      data,
    })
    return like
  }
}
