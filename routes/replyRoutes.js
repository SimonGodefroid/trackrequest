const _ = require("lodash");
const Path = require("path-parser");
const { URL } = require("url");
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
module.exports = app => {
  const Ctrl = require("../controllers/replyController")();
  app.get("/api/replies/", Ctrl.list) // get all replies
  app.get("/api/replies/:id([a-fA-F\\d]{24})", Ctrl.read); // get reply by id
  app.post("/api/replies/request/:requestid([a-fA-F\\d]{24})/comment/:commentid([a-fA-F\\d]{24})/user/:userid([a-fA-F\\d]{24})",
  // requireLogin,
  Ctrl.create);// create reply for comment 123
  app.patch("/api/replies/:id([a-fA-F\\d]{24})", Ctrl.update); // update reply
  app.delete("/api/replies/:id([a-fA-F\\d]{24})/request/:requestid([a-fA-F\\d]{24})", Ctrl.delete); // delete reply
  app.post(
    "/api/replies/upvote/:id([a-fA-F\\d]{24})/user/:userid([a-fA-F\\d]{24})",
    Ctrl.upvote
  ); // upvote reply
  app.post(
    "/api/replies/downvote/:id([a-fA-F\\d]{24})/user/:userid([a-fA-F\\d]{24})",
    Ctrl.downvote
  ); // downvote reply
};
