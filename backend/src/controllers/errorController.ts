import { Request, Response, NextFunction } from "express";
import AppError from "../utils/appError";
// This is the Express.js default error handler.
// Can be conveniently used when custom error handlers are not needed.
const globalErrorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  res.status(err.statusCode).json({
    type: err.type,
    status: err.status,
    message: err.message,
  });
  next();
};

export default globalErrorHandler;
