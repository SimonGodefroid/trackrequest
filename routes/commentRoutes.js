const _ = require("lodash");
const Path = require("path-parser");
const { URL } = require("url");
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
module.exports = app => {
  const Ctrl = require("../controllers/commentController")();
  app.get("/api/comments/", Ctrl.list) // get all comments
  app.get("/api/comments/request/:requestid([a-fA-F\\d]{24})", Ctrl.listByRequest); // get all comments for a request
  app.get("/api/comments/author/:userid([a-fA-F\\d]{24})", Ctrl.listByAuthor); // get all comments for an author
  app.get("/api/comments/:id([a-fA-F\\d]{24})", Ctrl.read); // get comment by id
  app.post("/api/comments/:requestid([a-fA-F\\d]{24})/user/:userid([a-fA-F\\d]{24})",
  // requireLogin,
  Ctrl.create);// create comment for request 123
  app.patch("/api/comments/:id([a-fA-F\\d]{24})", Ctrl.update); // update comment
  app.delete("/api/comments/:id([a-fA-F\\d]{24})", Ctrl.delete); // delete comment
  app.post(
    "/api/comments/:id([a-fA-F\\d]{24})/user/:userid([a-fA-F\\d]{24})/upvote",
    Ctrl.upvote
  ); // upvote comment
  app.post(
    "/api/comments/:id([a-fA-F\\d]{24})/user/:userid([a-fA-F\\d]{24})/downvote",
    Ctrl.downvote
  ); // downvote comment
};
