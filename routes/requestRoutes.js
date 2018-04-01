const _ = require("lodash");
const Path = require("path-parser");
const { URL } = require("url");
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
module.exports = app => {
  const Ctrl = require("../controllers/requestController")();
  app.get("/api/requests/", Ctrl.list);
  app.get("/api/requests/:id([a-fA-F\\d]{24})", Ctrl.read);
  app.post("/api/requests/:userid([a-fA-F\\d]{24})",
  // requireLogin,
  Ctrl.create);
  app.patch("/api/requests/:id([a-fA-F\\d]{24})", Ctrl.update)
  app.delete("/api/requests/:id([a-fA-F\\d]{24})",
  // "/api/requests/:id([a-fA-F\\d]{24})/user/:userid([a-fA-F\\d]{24})"
  // requireLogin,
  Ctrl.delete);
  app.post(
    "/api/requests/upvote/:id([a-fA-F\\d]{24})/user/:userid([a-fA-F\\d]{24})",
    Ctrl.upvote
  );
  app.post(
    "/api/requests/downvote/:id([a-fA-F\\d]{24})/user/:userid([a-fA-F\\d]{24})",
    Ctrl.downvote
  );
};
