import { Like, Prisma } from "@prisma/client"

export interface LikesRepository {
  create(data: Prisma.LikeUncheckedCreateInput): Promise<Like>
}
