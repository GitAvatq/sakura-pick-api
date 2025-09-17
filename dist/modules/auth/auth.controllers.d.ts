import { Request, Response } from "express";
interface AuthRequest extends Request {
    user?: {
        id: string;
        email: string;
    };
}
declare const _default: {
    registerAsync: (req: Request, res: Response) => Promise<void>;
    getMe: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
};
export default _default;
//# sourceMappingURL=auth.controllers.d.ts.map