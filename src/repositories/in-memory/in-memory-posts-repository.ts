import { Post } from "@/entities/post"
import { Prisma } from "@prisma/client"
import { PostsRepository } from "../posts-repository"

export class InMemoryPostsRepository implements PostsRepository {
  public items: Post[] = []

  async create(data: Prisma.PostUncheckedCreateInput) {
    const post: Post = {
      id: "1",
      authorId: data.authorId,
      content: data.content,
      description: data.description,
      createdAt: new Date(),
      likes: [],
      comments: [],
      _count: {
        likes: 0,
        comments: 0,
      },
    }

    this.items.push(post)

    return post
  }

  async findManyByAuthorId(authorId: string) {
    const posts = this.items.filter((post) => post.authorId === authorId)

    return posts
  }

  async findById(postId: string) {
    const post = this.items.find((post) => post.id === postId)

    return post
  }
}
