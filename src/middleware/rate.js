const { createNewHashKey, verifyHashKey } = require("../lib/id");
const { incrementAndGet } = require("../lib/redis");
const { createNowTimestamp } = require("../lib/time");
const { CONFIG } = require("../config");

exports.rateLimitPreHandler = async (req, res, next) => {
  const { ip, language, software, authToken } = req.metadata;
  const nowTimestamp = createNowTimestamp();

  const key =
    authToken && verifyHashKey(authToken) ? authToken : createNewHashKey();

  const data = await incrementAndGet({
    key,
    value: JSON.stringify({
      timestamp: nowTimestamp,
      ip,
      language,
      software,
    }),
  });

  if (!data) return next(); // this means that there are not as many requests yet, good to go.
  const { timestamp: dataTimestamp } = data;

  if (nowTimestamp <= dataTimestamp + CONFIG.RATE_LIMIT.EXPIRATION * 1000) {
    return res.status(429).send("Too many requests");
  }

  next();
};
