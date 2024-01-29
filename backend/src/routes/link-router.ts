import express from "express";
import * as linkController from "../controllers/linkController";
import { protect, checkPermission } from "../controllers/authController";
import { Role } from "../controllers/authController";

const linkRouter = express.Router();

linkRouter
  .route("/user/:id")
  .get(
    protect,
    checkPermission(Role.ADMIN),
    linkController.getAllLinksByUserID
  );

// router.route("/")
// .get(linkController.getAll);

// router.route("/:id")
// .get(linkController.getLinkByID)
// .delete(linkController.deleteLink)
// .patch(linkController.hideShowLinkByID);

// router.route("/users/:id")
// .get(linkController.getAllLinksByUserID)
// .post(linkController.createLinkByUserID);

linkRouter.route("/").get((req, res, next) => {
  res.json({
    message: "You have reached the user endpoint",
  });
});

export default linkRouter;
