const initServer = (port, app, fn) => {
  fn(port);
  app.listen(port, (err) => {
    if (err) {
      console.log(`---------------`);
      console.log(`Error: `);
      console.log(err);
    }
    console.log(`Server is listening on: http://localhost:${8888}`);
  });
};

module.exports = initServer;
