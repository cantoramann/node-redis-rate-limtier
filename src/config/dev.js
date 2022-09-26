exports.CONFIG_DEV = {
   APP: {
      PORT: process.env.PORT || 8000,
   },

   REDIS: {
      CONNECTION_URL: process.env.CONNECTION_URL || "redis://localhost:6379",
   },

   HEADERS: {
      HTTP_ONLY_AUTH_HEADER: process.env.HTTP_ONLY_AUTH_HEADER || "authentication",
      RATE_LIMIT_HEADER: process.env.RATE_LIMIT_HEADER || "X-RateLimit-Limit",
      RATE_LIMIT_REMAINING_HEADER: process.env.RATE_LIMIT_REMAINING_HEADER || "",
      RATE_LIMIT_RESET_HEADER: process.env.RATE_LIMIT_RESET_HEADER || "X-RateLimit-Reset",
   },

   RATE_LIMIT: {
      LIMIT: process.env.RATE_LIMIT_LIMIT || 10,
      EXPIRATION: process.env.RATE_LIMIT_EXPIRATION || 60, // in seconds
   },

   COOKIES: {
      HTTP_ONLY: process.env.COOKIES_HTTP_ONLY || true,
      MAX_AGE: process.env.COOKIES_MAX_AGE || 24 * 60 * 60 * 1000, // 24 hours
   },
};
