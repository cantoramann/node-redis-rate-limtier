const { parseAcceptLanguage, parseUserAgent } = require("../lib/request");

exports.requestValidationPreHandler = (req, res, next) => {
  req.metadata = {
    ip: req.headers["x-forwarded-for"] || req.socket.address().address,
    language: parseAcceptLanguage(req.headers["accept-language"]) || undefined,
    software: parseUserAgent(req.headers["user-agent"]) || undefined,
    authToken: req.cookies.authentication || undefined,
  };
  next();
};
