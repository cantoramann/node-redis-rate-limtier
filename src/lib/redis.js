const redis = require("redis");
const { CONFIG } = require("../config");
const { formatSingleRateLog } = require("./rate");

let client;
(async () => {
  // Connect to redis at 127.0.0.1 port 6379 no password.
  client = redis.createClient();
  await client.connect();
})();

exports.incrementAndGet = async ({
  key,
  value,
  exp = CONFIG.RATE_LIMIT.EXPIRATION, // in seconds
  start = CONFIG.RATE_LIMIT.LIMIT,
  end = CONFIG.RATE_LIMIT.LIMIT,
}) => {
  const [, , lRangeResponse] = await client
    .multi()
    .lPush(key, value)
    .expire(key, exp)
    .lRange(key, start, end)
    .exec();

  return formatSingleRateLog(lRangeResponse);
};
