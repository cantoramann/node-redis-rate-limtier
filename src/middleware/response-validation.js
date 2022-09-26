const { CONFIG } = require("../config");
const { generateResetTime } = require("../lib/time");

exports.responseValidationPostHandler = (req, res, next) => {
   res.cookie(CONFIG.HEADERS.HTTP_ONLY_AUTH_HEADER, req.accessKey, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
   });

   res.set(CONFIG.HEADERS.RATE_LIMIT_HEADER, CONFIG.RATE_LIMIT.LIMIT);
   res.set(CONFIG.HEADERS.RATE_LIMIT_RESET_HEADER, generateResetTime());

   // todo: find an optimal way to set the remaining rate limit

   next();
};
