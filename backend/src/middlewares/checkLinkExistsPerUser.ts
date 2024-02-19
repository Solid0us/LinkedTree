import { Request, Response, NextFunction } from "express";
import { AnyZodObject, AnyZodTuple, ZodError } from "zod";
import catchAsync from "../utils/catchAsync";
import * as dotenv from "dotenv";
import { prisma } from "../app";
import AppError from "../utils/appError";
dotenv.config();

export const checkLinkExistPerUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body.user);
    const existLinkPerUser = await prisma.links.findUnique({
      where: {
        id: req.body.id,
        user_id: req.body.user.id,
      },
    });
    if (!existLinkPerUser) {
      return next(new AppError("Could not find link by user ID", 400));
    }
    next();
  }
);
