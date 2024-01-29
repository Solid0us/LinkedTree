import express from "express";
import * as authController from "../controllers/authController";
import checkClientRequest from "../middlewares/checkClientRequest";
import {
  validateSignupBody,
  validateLoginBody,
} from "../validations/request_body/validateAuthBody";

const authRouter = express.Router();

authRouter.route("/").post(authController.checkCredentials);

authRouter
  .route("/login")
  .post(checkClientRequest(validateLoginBody), authController.login);

authRouter
  .route("/signup")
  .post(checkClientRequest(validateSignupBody), authController.signup);

authRouter.route("/signout").post(authController.signout);

export default authRouter;
