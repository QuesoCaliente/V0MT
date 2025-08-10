import "dotenv/config";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
const client = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

export async function subirArchivo({
  bucket,
  key,
  body,
  contentType = "application/octet-stream",
}: {
  bucket: string;
  key: string;
  body: Buffer | Uint8Array | string;
  contentType?: string;
}) {
  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    Body: body,
    ContentType: contentType,
  });
  await client.send(command);
  console.log(`Archivo subido a R2: ${key}`);
  return `https://${process.env.R2_CDN}/${key}`;
}
