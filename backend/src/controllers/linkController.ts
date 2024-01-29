import { prisma } from "../app";
import catchAsync from "../utils/catchAsync";
import { Request, Response, NextFunction } from "express";

export const getAllLinksByUserID = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const links = await prisma.links.findMany({
      where: {
        user_id: parseInt(req.params.id),
      },
    });
    res.status(200).json({
      status: "success",
      message: links,
    });
  }
);
