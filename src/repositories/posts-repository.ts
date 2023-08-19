import { Post, Prisma } from "@prisma/client"

export interface PostsRepository {
  create(data: Prisma.PostUncheckedCreateInput): Promise<Post>
  findManyByAuthorId(authorId: string): Promise<Post[]>
  findById(postId: string): Promise<any> // TODO fix this return type
}
