import { app } from "@/app"
import { createUserAndPost } from "@/utils/test/create-user-and-post"
import request from "supertest"
import { afterAll, beforeAll, describe, expect, it } from "vitest"

describe("User Posts (e2e)", () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it("should be able to get user posts", async () => {
    const { user, token } = await createUserAndPost(app)

    const userPostsResponse = await request(app.server)
      .get(`/${user.id}/posts`)
      .set("Authorization", `Bearer ${token}`)
      .send()

    expect(userPostsResponse.statusCode).toEqual(200)
    expect(userPostsResponse.body.posts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          content: "Post example",
          description: "Post example description",
        }),
      ])
    )
  })
})
