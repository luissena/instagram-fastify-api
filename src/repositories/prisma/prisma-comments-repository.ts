import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { CommentsRepository } from "../comments-repository"

export class PrismaCommentsRepository implements CommentsRepository {
  async create(data: Prisma.CommentUncheckedCreateInput) {
    const comment = await prisma.comment.create({
      data,
    })
    return comment
  }
}
