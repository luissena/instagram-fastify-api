import { app } from "@/app"
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user"
import request from "supertest"
import { afterAll, beforeAll, describe, expect, it } from "vitest"

describe("Create Post (e2e)", () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it("should be able to create a post ", async () => {
    const { token } = await createAndAuthenticateUser(app)

    const response = await request(app.server)
      .post("/posts")
      .set("Authorization", `Bearer ${token}`)
      .send({
        content: "Post example",
        description: "Post example description",
      })

    expect(response.statusCode).toEqual(201)
    expect(response.body.post).toEqual(
      expect.objectContaining({
        content: "Post example",
        description: "Post example description",
      })
    )
  })
})
