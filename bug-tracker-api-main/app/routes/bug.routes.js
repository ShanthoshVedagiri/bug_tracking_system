module.exports = app => {
  const bug = require("../controllers/bug.controller");

  var router = require("express").Router();

  
  router.post("/create", bug.createbug);
  router.post("/update", bug.updatebug);
  router.get("/all", bug.getAllbug);
  router.post("/delete", bug.deletebug);
  
  
  
  app.use("/api/bug", router);
};
