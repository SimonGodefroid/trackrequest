const _ = require("lodash");
const Path = require("path-parser");
const { URL } = require("url");
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
module.exports = app => {
  const Ctrl = require("../controllers/userController")();
  app.get("/api/users", Ctrl.list);
  app.get("/api/users/:id([a-fA-F\\d]{24})", Ctrl.read);
};
