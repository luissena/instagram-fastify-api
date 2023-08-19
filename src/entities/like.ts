import { Post, User } from "@prisma/client"

export type Like = {
  id: string
  createdAt: Date
  Post: Post
  postId: string
  User: User
  userId: string
}
