import { Post } from "./post"
import { User } from "./user"

export type Comment = {
  id: string
  message: string
  createdAt: Date
  Post: Post
  postId: string
  user: User
  userId: string
}
