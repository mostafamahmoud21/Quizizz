"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtConstants = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
class JwtConstants {
}
exports.JwtConstants = JwtConstants;
JwtConstants.SECRET = process.env.JWT_SECRET || 'your_default_secret_key';
//# sourceMappingURL=jwt.constants.js.map