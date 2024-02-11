import { prisma } from "../app";
import { Request, Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import * as dotenv from "dotenv";

interface Payload extends JwtPayload {
  id: string;
}

export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
}
dotenv.config();

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

const signToken = async (id: string, name: string, role: string) => {
  return jwt.sign({ id, name, role }, ACCESS_TOKEN_SECRET, {
    expiresIn: "1hr",
  });
};

const createHttpOnlyCookie = (
  res: Response,
  tokenName: string,
  jwtToken: string
) => {
  res.cookie(tokenName, jwtToken, {
    sameSite: "none",
    httpOnly: true,
    path: "/",
    secure: true,
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
  });
};

export const signup = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      username,
      email,
      password,
      first_name,
      last_name,
      confirmPassword,
    } = req.body;
    const existingEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (existingEmail) {
      return next(new AppError("Email already exists.", 400, "email"));
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await prisma.user.create({
      data: {
        username,
        first_name,
        last_name,
        email,
        password: hashedPassword,
      },
    });

    const token = await signToken(
      String(newUser.id),
      newUser.username,
      newUser.role
    );
    createHttpOnlyCookie(res, "token", token);

    res.status(201).json({
      status: "success",
      token,
      message: {
        user: {
          username: newUser.username,
          email: newUser.email,
          role: newUser.role,
        },
      },
    });
  }
);

export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    let correctPassword = false;
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (user) {
      correctPassword = await bcrypt.compare(password, user.password);
    }
    if (!user || !correctPassword) {
      return next(new AppError("Incorrect email or password.", 400));
    }
    const token = await signToken(String(user.id), user.username, user.role);
    createHttpOnlyCookie(res, "token", token);
    res.status(200).json({
      status: "success",
      user: {
        username: user.username,
        email: user.email,
        role: user.role,
      },
      token,
    });
  }
);

export const signout = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res
      .clearCookie("token", { path: "/" })
      .json({ message: "You have successfully logged out!" });
  }
);

export const protect = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let token = "";
    let decoded: string | JwtPayload = "";
    let existingUser: any = "";
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      next(
        new AppError("You are not logged in! Please log in to get access.", 400)
      );
    }

    // 1. Verify token, 2. Check if user still exists, 3. Check if password has changed

    jwt.verify(token, ACCESS_TOKEN_SECRET, async (err, payload) => {
      if (err) return next(new AppError("Invalid tokens", 401));
      existingUser = await prisma.user.findUnique({
        where: {
          id: parseInt((payload as Payload).id),
        },
        select: {
          id: true,
          username: true,
          email: true,
          role: true,
        },
      });
      req.body = { ...req.body, user: existingUser };
      next();
      if (!existingUser)
        return next(
          new AppError("The user belonging to this token does not exist.", 401)
        );
    });
  }
);

export const checkPermission = (role: Role) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.body.user.role !== role) {
      return next(
        new AppError("You do not have permission to access this route.", 403)
      );
    }
    next();
  };
};

export const checkCredentials = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;

  try {
    if (jwt.verify(token, ACCESS_TOKEN_SECRET)) {
      return res.status(201).send(jwt.decode(token));
    }
  } catch (err) {
    return res.status(401).send(err);
  }
};
