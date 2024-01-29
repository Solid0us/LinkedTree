import express from "express";
import * as authController from "../controllers/authController";

const checkLoginRouter = express.Router();

checkLoginRouter.route("/").post(authController.checkCredentials);

export default checkLoginRouter;
