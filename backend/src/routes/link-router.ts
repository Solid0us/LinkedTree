import express from "express";
import * as linkController from "../controllers/linkController";
import { protect, checkPermission } from "../controllers/authController";
import { Role } from "../controllers/authController";
import { checkLinkExistPerUser } from "../middlewares/checkLinkExistsPerUser";

const linkRouter = express.Router();

linkRouter.route("/users/:id").get(protect, linkController.getAllLinksByUserID);

// router.route("/")
// .get(linkController.getAll);

// router.route("/:id")
// .get(linkController.getLinkByID)
// .delete(linkController.deleteLink)
// .patch(linkController.hideShowLinkByID);

// router.route("/users/:id")
// .get(linkController.getAllLinksByUserID)
// .post(linkController.createLinkByUserID);

linkRouter
  .route("/")
  .get(protect, checkPermission(Role.ADMIN), (req, res, next) => {
    res.json({
      message: "You have reached the user endpoint",
    });
  })
  .post(protect, linkController.createLink);

linkRouter
  .route("/:id")
  .patch(protect, checkLinkExistPerUser, linkController.updateLink);

export default linkRouter;
