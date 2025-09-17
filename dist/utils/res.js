"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendRes = void 0;
const sendRes = (res, { success, statusCode, message, details, token, error, user }) => {
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
exports.sendRes = sendRes;
//# sourceMappingURL=res.js.map