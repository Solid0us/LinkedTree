import express, { NextFunction, Request, Response } from "express";
import * as fs from "fs";
import * as morgan from "morgan";
import userRouter from "./routes/user-router";
import welcomeRouter from "./routes/welcome-router";
import linkRouter from "./routes/link-router";
import * as dotenv from "dotenv";
dotenv.config();
import { z } from "zod";
import globalErrorHandler from "./controllers/errorController";
import AppError from "./utils/appError";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth-router";

export const prisma = new PrismaClient();
const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  credentials: true,
};
const mySchema = z.string().email();
console.log(mySchema.safeParse(""));

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

app.use("/api/v1", welcomeRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/links", linkRouter);
app.use("/api/v1/auth", authRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl}!`, 404));
});

app.use(globalErrorHandler);

export default app;
