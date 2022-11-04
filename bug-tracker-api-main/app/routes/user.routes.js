module.exports = app => {
  const user = require("../controllers/user.controller");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/signup", user.signup);
  router.post("/signin", user.signin) 
  router.post("/enableuser", user.enableuser) 
  router.post("/disableuser", user.disableuser) 
  router.get("/users", user.getAllUsers) 
  app.use("/api/user", router);
};
