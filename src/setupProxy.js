const proxy = require("http-proxy-middleware");

module.exports = app => {
  app.use(proxy("/socket.io", { target: "https://localhost:8080", ws: true }));
};
