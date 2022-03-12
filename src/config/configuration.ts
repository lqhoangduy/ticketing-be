export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    name: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: `${process.env.DATABASE_PASSWORD}`,
    sync: process.env.DATABASE_SYNC === 'true',
    ssl: process.env.DATABASE_SSL === 'true',
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
  authFacebook: {
    app_id: process.env.FB_APP_ID,
    app_secret: process.env.FB_APP_SECRET,
  },
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  accessTokenExpiration: process.env.ACCESS_TOKEN_EXPIRATION,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  refreshTokenExpiration: process.env.REFRESH_TOKEN_EXPIRATION,
  cloudinaryName: process.env.CLOUD_NAME,
  apiKeyCloudinary: process.env.API_KEY,
  apiSecretCloudinary: process.env.API_SECRET,
});
