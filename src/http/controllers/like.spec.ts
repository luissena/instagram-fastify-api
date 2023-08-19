import { app } from "@/app"
import { createUserAndPost } from "@/utils/test/create-user-and-post"
import request from "supertest"
import { afterAll, beforeAll, describe, expect, it } from "vitest"

describe("Like (e2e)", () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it("should be able to create a like ", async () => {
    const { token, post } = await createUserAndPost(app)

    const response = await request(app.server)
      .post("/likes")
      .set("Authorization", `Bearer ${token}`)
      .send({
        postId: post.id,
      })

    expect(response.statusCode).toEqual(201)
  })
})
