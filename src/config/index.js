exports.CONFIG = {
  APP: {
    PORT: 8000,
  },
  REDIS: {
    CONNECTION_URL: "redis://localhost:6379",
  },
  HEADERS: {
    HTTP_ONLY_AUTH_HEADER: "authentication",
    RATE_LIMIT_HEADER: "X-RateLimit-Limit",
    RATE_LIMIT_REMAINING_HEADER: "",
    RATE_LIMIT_RESET_HEADER: "X-RateLimit-Reset",
  },
  RATE_LIMIT: {
    LIMIT: 10,
    EXPIRATION: 60, // in seconds
  },
};
