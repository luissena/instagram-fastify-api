import { env } from "@/env"
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3"
import { randomUUID } from "crypto"

const s3 = new S3Client({
  region: env.AWS_REGION,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
})

// TODO Fix types
export async function uploadS3(file: any, fileType: any) {
  const command = new PutObjectCommand({
    Bucket: env.AWS_BUCKET,
    Key: randomUUID() + `.${fileType.split("/")[1]}`,
    Body: file,
    ContentType: fileType,
  })

  try {
    await s3.send(command)
    const fileUploadedURL = `https://${env.AWS_BUCKET}.s3.amazonaws.com/${command.input.Key}`
    return { fileUploadedURL }
  } catch (err) {
    console.error(err)
  }
}
