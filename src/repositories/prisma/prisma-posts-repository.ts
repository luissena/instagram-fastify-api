import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { PostsRepository } from "../posts-repository"

export class PrismaPostsRepository implements PostsRepository {
  async findById(postId: string) {
    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        comments: true,
        likes: true,
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
    })

    return post
  }
  async findManyByAuthorId(authorId: string) {
    const posts = await prisma.post.findMany({
      where: { authorId },
    })

    return posts
  }
  async create(data: Prisma.PostUncheckedCreateInput) {
    const post = await prisma.post.create({
      data,
    })

    return post
  }
}
