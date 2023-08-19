import { Comment, Prisma } from "@prisma/client"

export interface CommentsRepository {
  create(data: Prisma.CommentUncheckedCreateInput): Promise<Comment>
}
