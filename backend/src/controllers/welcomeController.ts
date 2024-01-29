import { Request, Response, NextFunction } from "express";

export const welcome = (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to the App!",
  });
};
