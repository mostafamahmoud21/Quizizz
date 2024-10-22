"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const quizzes_module_1 = require("./quizzes/quizzes.module");
const auth_module_1 = require("./auth/auth.module");
const questions_module_1 = require("./questions/questions.module");
const choices_module_1 = require("./choices/choices.module");
const dotenv = require("dotenv");
const prisma_service_1 = require("./prisma/prisma.service");
dotenv.config();
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [quizzes_module_1.QuizzesModule, auth_module_1.AuthModule, questions_module_1.QuestionsModule, choices_module_1.ChoicesModule],
        controllers: [],
        providers: [prisma_service_1.PrismaService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map