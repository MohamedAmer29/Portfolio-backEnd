export const databaseConfig = () => ({
  type: process.env.DATABASE_TYPE,
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT ?? 5432),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  name: process.env.DATABASE_NAME,
  url: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_SSL === 'true',
  sslRejectUnauthorized:
    process.env.DATABASE_SSL_REJECT_UNAUTHORIZED === 'true',
});
