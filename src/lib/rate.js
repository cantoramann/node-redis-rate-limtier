exports.formatSingleRateLog = (rateLog) => {
  return rateLog[0] ? JSON.parse(rateLog[0]) : undefined;
};
