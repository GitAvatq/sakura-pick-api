import { Request, Response } from "express";
import { prisma } from "../../config/prisma";
import { sendRes } from "../../utils/res";
import bcrypt from "bcrypt";
import { generateToken } from "../../config/token";

interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string; // или number, если id у тебя Int
  };
}

const registerAsync = async (req: Request, res: Response) => {
  try {
    const { userName, email, password, avatar } = req.body;
    const existing = await prisma.user.findUnique({
      where: { email },
    });

    if (existing) {
      sendRes(res, {
        success: true,
        statusCode: 400,
        message: "This email is already in use",
      });
    }

    const passwordHashing = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        avatar,
        userName,
        email,
        password: passwordHashing,
      },
    });

    const token = generateToken(user.id, user.email);

    sendRes(res, {
      success: true,
      statusCode: 201,
      message: "User registered successfully",
      token,
    });
  } catch (error: any) {
    sendRes(res, {
      success: false,
      statusCode: 500,
      message: "Internal server error",
      error: `Register error : ${error.message}`,
    });
  }
};

const getMe = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    const user = await prisma.user.findUnique({
      where: { id: req.user.id, email: req.user.email },
    });
    if (!user) {
      sendRes(res, {
        success: false,
        statusCode: 404,
        message: "User not found",
      });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    sendRes(res, {
      success: false,
      message: "Internal server error",
      statusCode: 500,
    });
  }
};

export default {
  registerAsync,
  getMe,
};
