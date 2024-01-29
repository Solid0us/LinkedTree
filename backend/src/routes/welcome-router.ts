import express from "express";
// const welcomeController = require("../controllers/welcome.controller");

const welcomeRouter = express.Router();

// router.route("/")
// .get(welcomeController.welcome);

welcomeRouter.route("/").get((req, res, next) => {
  res.json({
    message: "You have reached the welcome endpoint",
  });
});

export default welcomeRouter;
