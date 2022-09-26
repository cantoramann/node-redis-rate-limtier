const { parseAcceptLanguage, parseUserAgent } = require("../lib/request");
const { HEADERS } = require("../constants/headers");

exports.requestValidationPreHandler = (req, res, next) => {
   req.metadata = {
      ip: req.headers[HEADERS.X_FORWARDED_FOR] || req.socket.address().address,
      language: parseAcceptLanguage(req.headers[HEADERS.ACCEPT_LANGUAGE]),
      software: parseUserAgent(req.headers[HEADERS.USER_AGENT]),
      authToken: req.cookies.authentication,
   };

   next();
};
