const proxy = require("http-proxy-middleware");

module.exports = app => {
  app.use(
    proxy("/socket.io", { target: "http://192.168.0.101:8000", ws: true })
  );
};
