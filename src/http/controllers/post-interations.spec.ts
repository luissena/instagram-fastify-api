import { app } from "@/app"
import { createUserAndPost } from "@/utils/test/create-user-and-post"
import request from "supertest"
import { afterAll, beforeAll, describe, expect, it } from "vitest"

describe("Post Interations (e2e)", () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it("should be able to get user posts", async () => {
    const { token, post } = await createUserAndPost(app)

    const userPostsResponse = await request(app.server)
      .get(`/posts/${post.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send()

    expect(userPostsResponse.statusCode).toEqual(200)
    expect(userPostsResponse.body).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        likes: expect.any(Array),
        comments: expect.any(Array),
        _count: expect.objectContaining({
          likes: expect.any(Number),
          comments: expect.any(Number),
        }),
      })
    )
  })
})
