const _ = require("lodash");
const Path = require("path-parser");
const { URL } = require("url");
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
module.exports = app => {
  const Ctrl = require("../controllers/requestController")();
  app.get("/api/requests/", Ctrl.list);
  app.get("/api/requests/:id([a-fA-F\\d]{24})", Ctrl.read);
  app.post("/api/requests",
  // requireLogin,
  Ctrl.create);
  app.patch("/api/requests/:id([a-fA-F\\d]{24})", Ctrl.update)
  app.delete("/api/requests/:id([a-fA-F\\d]{24})",
  // "/api/requests/:id([a-fA-F\\d]{24})/user/:userid([a-fA-F\\d]{24})"
  // requireLogin,
  Ctrl.delete);
  app.post(
    "/api/requests/:id([a-fA-F\\d]{24})/user/:userid([a-fA-F\\d]{24})/upvote",
    Ctrl.upvote
  );
  app.post(
    "/api/requests/:id([a-fA-F\\d]{24})/user/:userid([a-fA-F\\d]{24})/downvote",
    Ctrl.downvote
  );
};
