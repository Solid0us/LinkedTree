import { Request, Response, NextFunction } from "express";
import { AnyZodObject, AnyZodTuple, ZodError } from "zod";

const checkClientRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (err) {
      if (err instanceof ZodError) {
        return res
          .status(400)
          .json({ success: "failure", message: err.flatten() });
      }
      return res.status(400).json(err);
    }
  };
};

export default checkClientRequest;
