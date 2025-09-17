import { NextFunction, Request, Response } from "express";
import { sendRes } from "../../utils/res";
import jwt from "jsonwebtoken";
interface AuthRequest extends Request {
  user?: {
    userId: string;
  };
}
export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return sendRes(res, {
      statusCode: 401,
      message: "Unauthorized!",
      success: false,
    });
  }

  const token = authHeader.split(" ")[1] as string;

  try {
    const payload: any = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = payload;

    next();
  } catch (error) {
    sendRes(res, {
      success: false,
      statusCode: 401,
      message: "Invalid token",
    });
  }
};
