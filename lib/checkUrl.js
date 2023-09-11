const checkUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    if (error) {
      return false;
    }
  }
};

module.exports = checkUrl;
