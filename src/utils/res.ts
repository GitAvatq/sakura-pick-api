import { Response } from "express";

export interface ISendRes {
  success: boolean;
  statusCode: number;
  message: string;
  token?: any;
  details?: any;
  error?: any;
  user?: any;
}

export const sendRes = (
  res: Response,
  { success, statusCode, message, details, token, error, user }: ISendRes
) => {
  return res.status(statusCode).json({
    success,
    statusCode,
    message,
    token,
    details,
    error,
    user,
  });
};
