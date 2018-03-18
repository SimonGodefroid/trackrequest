const passport = require("passport");

module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );
  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/requests");
    }
  );
  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/");
    // res.send(req.user); // explained
  });

  app.get("/api/current_user", (req, res) => {
    console.log('user',req.user)
    res.send(req.user);
  });
};
