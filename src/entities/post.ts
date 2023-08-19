import { Comment } from "./comment"
import { Like } from "./like"
import { User } from "./user"

export type Post = {
  id: string
  content: string
  description: string
  comments?: Comment[]
  likes?: Like[]
  author?: User
  authorId: string
  createdAt: Date
  _count?: {
    likes: number
    comments: number
  }
}
