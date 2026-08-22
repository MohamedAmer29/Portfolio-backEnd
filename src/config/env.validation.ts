export function validateEnv(config: Record<string, unknown>) {
  const required = [
    'PORT',
    'DATABASE_TYPE',
    'DATABASE_HOST',
    'DATABASE_PORT',
    'DATABASE_USERNAME',
    'DATABASE_PASSWORD',
    'DATABASE_NAME',
  ];
  for (const key of required) {
    if (config[key] === undefined || config[key] === '') {
      throw new Error(`Configuration error: ${key} is required`);
    }
  }
  return config;
}
