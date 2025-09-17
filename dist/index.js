"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const server = (0, app_1.default)();
const startServer = () => {
    try {
        const PORT = process.env.PORT || 4500;
        server.listen({
            port: PORT,
            host: "0.0.0.0",
        }, () => {
            console.log(`Server is running on port : ${PORT}`);
        });
    }
    catch (error) {
        console.log(`Server crushed, crush is : ${error.message}`);
    }
};
startServer();
//# sourceMappingURL=index.js.map