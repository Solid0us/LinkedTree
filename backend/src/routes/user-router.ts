import express from "express";
import * as authController from "../controllers/authController";
import * as userController from "../controllers/userController";

const userRouter = express.Router();

userRouter.post("/signup", authController.signup);
userRouter.post("/login", authController.login);

// router.route('/')
// .get(userController.getAllUsers)
// .post(userController.createUser);

// router.route('/:id')
// .get(userController.getUser)
// .delete(userController.deleteUser)
// .patch(userController.updateUser);

userRouter.route("/").get(userController.getAllUsers);

export default userRouter;
