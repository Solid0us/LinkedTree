import { prisma } from "../app";
import catchAsync from "../utils/catchAsync";
import { Request, Response, NextFunction } from "express";

export const getAllUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await prisma.user.findMany();
    res.status(200).json({
      status: "success",
      message: users,
    });
  }
);
