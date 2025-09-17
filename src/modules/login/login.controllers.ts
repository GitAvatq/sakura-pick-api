import { Request, Response } from "express";
import { prisma } from "../../config/prisma";
import { sendRes } from "../../utils/res";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateToken } from "../../config/token";

const loginAsync = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user)
      return sendRes(res, {
        success: false,
        message: "User is not defined",
        statusCode: 401,
      });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return sendRes(res, {
        success: false,
        statusCode: 401,
        message: "Find user with the same password",
      });

    const token = generateToken(user.id, user.email);

    sendRes(res, {
      success: true,
      statusCode: 200,
      message: "Login Successful",
      token,
      user: { id: user.id, email: user.email, name: user.userName },
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

export default {
  loginAsync,
};
