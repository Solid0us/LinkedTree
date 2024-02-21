import { prisma } from "../app";
import catchAsync from "../utils/catchAsync";
import { Request, Response, NextFunction } from "express";
import { VerifiedUser } from "./authController";

interface CreateLinkBody extends Request {
  body: {
    user: VerifiedUser;
    link: string;
    list_order: number;
  };
}

interface UpdateLinkBody extends Request {
  body: {
    id: number;
    link: string;
    list_order: number;
  };
}

export const getAllLinksByUserID = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const links = await prisma.links.findMany({
      where: {
        user_id: parseInt(req.params.id),
      },
    });
    res.status(200).json({
      status: "success",
      data: links,
    });
  }
);

export const createLink = catchAsync(
  async (req: CreateLinkBody, res: Response, next: NextFunction) => {
    const { user, link, list_order } = req.body;
    const createdLink = await prisma.links.create({
      data: {
        user_id: user.id,
        link,
        list_order,
      },
    });
    res.status(200).json({
      status: "success",
      message: "Link has been created",
      data: createdLink.link,
    });
  }
);

export const updateLink = catchAsync(
  async (req: UpdateLinkBody, res: Response, next: NextFunction) => {
    const { id, link, list_order } = req.body;
    const updateLink = await prisma.links.update({
      where: {
        id,
      },
      data: {
        list_order,
        link,
      },
    });
    res.status(200).json({
      status: "success",
      data: updateLink,
    });
  }
);
