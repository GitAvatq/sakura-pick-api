"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../config/prisma");
const res_1 = require("../../utils/res");
const bcrypt_1 = __importDefault(require("bcrypt"));
const token_1 = require("../../config/token");
const loginAsync = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await prisma_1.prisma.user.findUnique({
            where: { email },
        });
        if (!user)
            return (0, res_1.sendRes)(res, {
                success: false,
                message: "User is not defined",
                statusCode: 401,
            });
        const isMatch = await bcrypt_1.default.compare(password, user.password);
        if (!isMatch)
            return (0, res_1.sendRes)(res, {
                success: false,
                statusCode: 401,
                message: "Find user with the same password",
            });
        const token = (0, token_1.generateToken)(user.id, user.email);
        (0, res_1.sendRes)(res, {
            success: true,
            statusCode: 200,
            message: "Login Successful",
            token,
            user: { id: user.id, email: user.email, name: user.userName },
        });
    }
    catch (error) {
        (0, res_1.sendRes)(res, {
            success: false,
            statusCode: 500,
            message: "Internal server error",
            error: `Register error : ${error.message}`,
        });
    }
};
exports.default = {
    loginAsync,
};
//# sourceMappingURL=login.controllers.js.map