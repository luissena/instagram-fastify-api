import { FastifyInstance } from "fastify"
import { authenticate } from "./controllers/authenticate"
import { comment } from "./controllers/comment"
import { createPost } from "./controllers/create-post"
import { like } from "./controllers/like"
import { postInterations } from "./controllers/post-interations"
import { profile } from "./controllers/profile"
import { refresh } from "./controllers/refresh"
import { register } from "./controllers/register"
import { userPosts } from "./controllers/user-posts"
import { verifyJWT } from "./middlewares/verify-jwt"

export async function appRoutes(app: FastifyInstance) {
  app.post("/users", register)
  app.post("/sessions", authenticate)

  app.patch("/token/refresh", refresh)

  app.get("/:userId/posts", userPosts)

  // Authenticated
  app.get("/me", { onRequest: [verifyJWT] }, profile)
  app.get("/posts/:postId", { onRequest: [verifyJWT] }, postInterations)
  app.post("/posts", { onRequest: [verifyJWT] }, createPost)
  app.post("/comments", { onRequest: [verifyJWT] }, comment)
  app.post("/likes", { onRequest: [verifyJWT] }, like)
}
