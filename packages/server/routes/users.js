module.exports = app => {
  const users = require('../controllers/users.controller.js');

  var router  = require("express").Router();

  router.post("/register", users.create);
  router.post("/login", users.login);
  // router.get("/profile", users.findUserById);
  router.put("/password", users.updateUserByEmail);
  app.use('/api/user', router);

}