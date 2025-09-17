"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../config/prisma");
const res_1 = require("../../utils/res");
const bcrypt_1 = __importDefault(require("bcrypt"));
const token_1 = require("../../config/token");
const registerAsync = async (req, res) => {
    try {
        const { userName, email, password, avatar } = req.body;
        const existing = await prisma_1.prisma.user.findUnique({
            where: { email },
        });
        if (existing) {
            (0, res_1.sendRes)(res, {
                success: true,
                statusCode: 400,
                message: "This email is already in use",
            });
        }
        const passwordHashing = await bcrypt_1.default.hash(password, 10);
        const user = await prisma_1.prisma.user.create({
            data: {
                avatar,
                userName,
                email,
                password: passwordHashing,
            },
        });
        const token = (0, token_1.generateToken)(user.id, user.email);
        (0, res_1.sendRes)(res, {
            success: true,
            statusCode: 201,
            message: "User registered successfully",
            token,
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
const getMe = async (req, res) => {
    try {
        if (!req.user)
            return res.status(401).json({ message: "Unauthorized" });
        const user = await prisma_1.prisma.user.findUnique({
            where: { id: req.user.id, email: req.user.email },
        });
        if (!user) {
            (0, res_1.sendRes)(res, {
                success: false,
                statusCode: 404,
                message: "User not found",
            });
        }
        res.json(user);
    }
    catch (error) {
        console.error(error);
        (0, res_1.sendRes)(res, {
            success: false,
            message: "Internal server error",
            statusCode: 500,
        });
    }
};
exports.default = {
    registerAsync,
    getMe,
};
//# sourceMappingURL=auth.controllers.js.map