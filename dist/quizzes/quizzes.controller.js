"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizzesController = void 0;
const common_1 = require("@nestjs/common");
const quizzes_service_1 = require("./quizzes.service");
const create_quiz_dto_1 = require("./dto/create-quiz.dto");
const update_quiz_dto_1 = require("./dto/update-quiz.dto");
const submit_answers_dto_1 = require("./dto/submit-answers.dto");
const jwt_middleware_1 = require("../auth/middleware/jwt.middleware");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_enum_1 = require("../auth/enums/roles.enum");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
let QuizzesController = class QuizzesController {
    constructor(quizzesService) {
        this.quizzesService = quizzesService;
    }
    create(req, createQuizDto) {
        const instructorId = req.user.id;
        return this.quizzesService.createQuiz(createQuizDto, instructorId);
    }
    async takeQuiz(quizId, req) {
        const studentId = req.user.id;
        return this.quizzesService.takeQuiz(+quizId, studentId);
    }
    async submitAnswers(quizId, submitAnswersDto, req) {
        const studentId = req.user.id;
        return this.quizzesService.submitAnswers(+quizId, studentId, submitAnswersDto);
    }
    findAll() {
        return this.quizzesService.getQuizzes();
    }
    findOne(id) {
        return this.quizzesService.getQuizById(+id);
    }
    update(id, updateQuizDto, req) {
        const instructorId = req.user.id;
        return this.quizzesService.updateQuiz(+id, updateQuizDto, instructorId);
    }
    remove(id, req) {
        const instructorId = req.user.id;
        return this.quizzesService.deleteQuiz(+id, instructorId);
    }
};
exports.QuizzesController = QuizzesController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_middleware_1.JwtMiddleware, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.INSTRUCTOR),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_quiz_dto_1.CreateQuizDto]),
    __metadata("design:returntype", void 0)
], QuizzesController.prototype, "create", null);
__decorate([
    (0, common_1.Post)(':quizId/take'),
    (0, common_1.UseGuards)(jwt_middleware_1.JwtMiddleware),
    __param(0, (0, common_1.Param)('quizId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], QuizzesController.prototype, "takeQuiz", null);
__decorate([
    (0, common_1.Post)(':quizId/answers'),
    (0, common_1.UseGuards)(jwt_middleware_1.JwtMiddleware),
    __param(0, (0, common_1.Param)('quizId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, submit_answers_dto_1.SubmitAnswersDto, Object]),
    __metadata("design:returntype", Promise)
], QuizzesController.prototype, "submitAnswers", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_middleware_1.JwtMiddleware, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.INSTRUCTOR),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], QuizzesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(jwt_middleware_1.JwtMiddleware, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.INSTRUCTOR),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QuizzesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_middleware_1.JwtMiddleware, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.INSTRUCTOR),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_quiz_dto_1.UpdateQuizDto, Object]),
    __metadata("design:returntype", void 0)
], QuizzesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_middleware_1.JwtMiddleware, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.INSTRUCTOR),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], QuizzesController.prototype, "remove", null);
exports.QuizzesController = QuizzesController = __decorate([
    (0, common_1.Controller)('/api/quizzes'),
    __metadata("design:paramtypes", [quizzes_service_1.QuizzesService])
], QuizzesController);
//# sourceMappingURL=quizzes.controller.js.map