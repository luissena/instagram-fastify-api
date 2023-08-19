import { FastifyInstance } from "fastify"
import request from "supertest"
import { createAndAuthenticateUser } from "./create-and-authenticate-user"

export async function createUserAndPost(app: FastifyInstance) {
  const { token } = await createAndAuthenticateUser(app)

  const profileResponse = await request(app.server)
    .get("/me")
    .set("Authorization", `Bearer ${token}`)
    .send()

  const postResponse = await request(app.server)
    .post("/posts")
    .set("Authorization", `Bearer ${token}`)
    .send({
      content: "Post example",
      description: "Post example description",
    })

  const { user } = profileResponse.body
  const { post } = postResponse.body

  return {
    user,
    token,
    post,
  }
}
