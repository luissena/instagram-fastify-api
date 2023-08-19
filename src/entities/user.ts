import { Comment } from "./comment"
import { Like } from "./like"
import { Post } from "./post"

export type User = {
  id: string
  email: string
  name: string
  avatar?: string
  password: string
  createdAt: Date
  updatedAt: Date
  posts?: Post[]
  comments?: Comment[]
  likes?: Like[]
}
