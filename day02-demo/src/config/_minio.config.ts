import { registerAs } from "@nestjs/config";

export default registerAs("minio", () => {
  return {
    // endPoint: '192.168.245.128',
    // port: 9090,
    // accessKey: 'admin',
    // secretKey: 'admin123',
    // useSSL: true,
    // bucket: 'test',
  }
});
