"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const login_controllers_1 = __importDefault(require("./login.controllers"));
const router = (0, express_1.Router)();
router.post("/login", login_controllers_1.default.loginAsync);
exports.default = router;
//# sourceMappingURL=login.router.js.map