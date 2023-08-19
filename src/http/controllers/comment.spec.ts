import { app } from "@/app"
import { createUserAndPost } from "@/utils/test/create-user-and-post"
import request from "supertest"
import { afterAll, beforeAll, describe, expect, it } from "vitest"

describe("Comment (e2e)", () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it("should be able to create a comment ", async () => {
    const { token, post } = await createUserAndPost(app)

    const response = await request(app.server)
      .post("/comments")
      .set("Authorization", `Bearer ${token}`)
      .send({
        message: "Hello World!",
        postId: post.id,
      })

    expect(response.statusCode).toEqual(201)
  })
})
