import { registerAs } from "@nestjs/config";

export default registerAs("oss", () => {
  return {
    region: process.env.OSS_REGION,
    accessKeyId: process.env.OSS_ACCESSKEYID,
    accessKeySecret: process.env.OSS_ACCESSKEYSECRET,
    bucket: process.env.OSS_BUCKET,
  }
});
