const { createNewHashKey, verifyHashKey } = require("../lib/id");
const { incrementAndGet } = require("../lib/redis");
const { createNowTimestamp } = require("../lib/time");
const { CONFIG } = require("../config");
const { MESSAGES } = require("../constants/messages");

exports.rateLimitPreHandler = async (req, res, next) => {
   const { ip, language, software, authToken } = req.metadata;
   const nowTimestamp = createNowTimestamp();

   const key = authToken && verifyHashKey(authToken) ? authToken : createNewHashKey();

   const data = await incrementAndGet({
      key,
      value: JSON.stringify({
         timestamp: nowTimestamp,
         ip,
         language,
         software,
      }),
   });

   // write the key to the request so that it is accessible in the next middleware
   // todo: check if req.accessKey can be serialized during startup in Express
   req.accessKey = key;

   if (!data) {
      // this means that there are not as many requests yet, good to go.
      return next();
   }

   const { timestamp: dataTimestamp } = data;

   if (nowTimestamp <= dataTimestamp + CONFIG.RATE_LIMIT.EXPIRATION * 1000) {
      return res.status(429).send(MESSAGES.TOO_MANY_REQUESTS);
   }

   next();
};
