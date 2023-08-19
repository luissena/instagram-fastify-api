import { Comment, Prisma } from "@prisma/client"
import { randomUUID } from "crypto"
import { CommentsRepository } from "../comments-repository"

export class InMemoryCommentsRepository implements CommentsRepository {
  public items: Comment[] = []
  async create(data: Prisma.CommentUncheckedCreateInput): Promise<Comment> {
    const comment: Comment = {
      id: randomUUID(),
      message: data.message,
      userId: data.userId,
      postId: data.postId,
      createdAt: new Date(),
    }

    this.items.push(comment)

    return comment
  }
}
