const _ = require("lodash");
const Path = require("path-parser");
const { URL } = require("url");
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
module.exports = app => {
  const Ctrl = require("../controllers/commentController")();
  app.get("/api/comments/", Ctrl.list);
  app.get("/api/comments/:id([a-fA-F\\d]{24})", Ctrl.read);
  app.post("/api/comments", requireLogin, Ctrl.create);
  app.post(
    "/api/:userid([a-fA-F\\d]{24})/comments/:id([a-fA-F\\d]{24})/upvote",
    Ctrl.upvote
  );
  app.post(
    "/api/:userid([a-fA-F\\d]{24})/comments/:id([a-fA-F\\d]{24})/downvote",
    Ctrl.downvote
  );
};
