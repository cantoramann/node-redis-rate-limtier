exports.createNowTimestamp = () => {
  return new Date().getTime();
};

exports.calculateTimestampDifference = (start, end) => {
  if (end < start) {
    return -1;
  }
  return end - start;
};

exports.getDateStringFromTimestamp = (timestamp) => {
  return new Date(timestamp).toISOString(); // timezone is always UTC
};
