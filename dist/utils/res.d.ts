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
export declare const sendRes: (res: Response, { success, statusCode, message, details, token, error, user }: ISendRes) => Response<any, Record<string, any>>;
//# sourceMappingURL=res.d.ts.map