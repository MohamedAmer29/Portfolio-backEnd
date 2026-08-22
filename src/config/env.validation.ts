export function validateEnv(config: Record<string, unknown>) {
  const required = [
    'PORT',
    'FRONTEND_URL',
    'DATABASE_TYPE',
    'DATABASE_HOST',
    'DATABASE_PORT',
    'DATABASE_USERNAME',
    'DATABASE_PASSWORD',
    'DATABASE_NAME',
    'REDIS_HOST',
    'REDIS_PORT',
    'JWT_ACCESS_SECRET',
    'JWT_ACCESS_EXPIRES_IN',
    'JWT_REFRESH_SECRET',
    'JWT_REFRESH_EXPIRES_IN',
    'MAIL_HOST',
    'MAIL_PORT',
    'MAIL_USER',
    'MAIL_PASSWORD',
    'MAIL_FROM',
    'CONTACT_RECEIVER_EMAIL',
    'CLOUDINARY_CLOUD_NAME',
    'CLOUDINARY_API_KEY',
    'CLOUDINARY_API_SECRET',
    'ADMIN_EMAIL',
    'ADMIN_PASSWORD',
  ];
  for (const key of required) {
    if (config[key] === undefined || config[key] === '') {
      throw new Error(`Configuration error: ${key} is required`);
    }
  }

  const port = Number(config.PORT);
  const databasePort = Number(config.DATABASE_PORT);
  const redisPort = Number(config.REDIS_PORT);
  const mailPort = Number(config.MAIL_PORT);

  if (!Number.isInteger(port) || port <= 0) {
    throw new Error('Configuration error: PORT must be a positive number');
  }
  if (!Number.isInteger(databasePort) || databasePort <= 0) {
    throw new Error(
      'Configuration error: DATABASE_PORT must be a positive number',
    );
  }
  if (!Number.isInteger(redisPort) || redisPort <= 0) {
    throw new Error(
      'Configuration error: REDIS_PORT must be a positive number',
    );
  }
  if (!Number.isInteger(mailPort) || mailPort <= 0) {
    throw new Error('Configuration error: MAIL_PORT must be a positive number');
  }

  return config;
}
