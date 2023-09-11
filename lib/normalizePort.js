const normalizePort = (port) => {
  if (!port) {
    throw new Error("Provide valid port number");
  }
  const parsedPort = parseInt(port);
  if (parsedPort < 1025 || parsedPort > 65536) {
    throw new Error(`The port should be in range of 1025 - 65536`);
  }
  return parsedPort;
};

module.exports = normalizePort;
