const { CONFIG } = require("../config");

exports.responseValidationPostHandler = (req, res, next) => {
  res.cookie(CONFIG.HEADERS.HTTP_ONLY_AUTH_HEADER, key, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  });

  res.set(CONFIG.HEADERS.RATE_LIMIT_HEADER, "10");
  res.set(
    CONFIG.HEADERS.RATE_LIMIT_RESET_HEADER,
    new Date().getTime() + 60 * 1000
  );
  // todo: find an optimal way to set the remaining rate limit

  next();
};
