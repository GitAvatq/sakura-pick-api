"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = __importDefault(require("../modules/auth/auth.route"));
const login_router_1 = __importDefault(require("../modules/login/login.router"));
const router = (0, express_1.Router)();
router.use("/auth", auth_route_1.default);
router.use("/auth", login_router_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map