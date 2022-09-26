exports.parseAcceptLanguage = (acceptLanguage) => {
   return acceptLanguage.split(",")[0];
};

exports.parseUserAgent = (userAgent) => {
   return userAgent.split("(")[1].split(")")[0];
};
