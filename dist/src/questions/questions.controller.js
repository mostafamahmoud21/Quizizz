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
exports.QuestionsController = void 0;
const common_1 = require("@nestjs/common");
const questions_service_1 = require("./questions.service");
const create_question_dto_1 = require("./dto/create-question-dto");
const create_question_dto_2 = require("./dto/create-question-dto");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const roles_enum_1 = require("../auth/enums/roles.enum");
const jwt_middleware_1 = require("../auth/middleware/jwt.middleware");
const roles_guard_1 = require("../auth/guards/roles.guard");
const not_found_1 = require("./guards/not-found");
const numeric_id_pipe_1 = require("./pipes/numeric-id.pipe");
const not_found_questions_1 = require("./guards/not-found-questions");
let QuestionsController = class QuestionsController {
    constructor(questionsService) {
        this.questionsService = questionsService;
    }
    async create(req, quizId, createQuestionDto) {
        const instructorId = req.user.id;
        return this.questionsService.createQuestion(quizId, createQuestionDto, instructorId);
    }
    async createWithoutQuiz(req, createQuestionDto) {
        const instructorId = req.user.id;
        return this.questionsService.createOnlyQuestion(createQuestionDto, instructorId);
    }
    async findAll(quizId, req) {
        const instructorId = req.user.id;
        return this.questionsService.getQuestions(quizId, instructorId);
    }
    async findOne(req, questionId) {
        const instructorId = req.user.id;
        return this.questionsService.getQuestionById(instructorId, questionId);
    }
    async update(req, questionId, updateQuestionDto) {
        const instructorId = req.user.id;
        return this.questionsService.updateQuestion(questionId, updateQuestionDto, instructorId);
    }
    async remove(req, questionId) {
        const instructorId = req.user.id;
        return this.questionsService.deleteQuestion(questionId, instructorId);
    }
    async createAutomatic(req, quizId, automaticQuestionDto) {
        const instructorId = req.user.id;
        return this.questionsService.automaticQuestion(quizId, automaticQuestionDto, instructorId);
    }
};
exports.QuestionsController = QuestionsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_middleware_1.JwtMiddleware, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.INSTRUCTOR),
    (0, common_1.UseGuards)(not_found_1.NotFoundGuard),
    (0, common_1.UsePipes)(numeric_id_pipe_1.ValidationPipe),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('quizId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, create_question_dto_1.CreateQuestionDto]),
    __metadata("design:returntype", Promise)
], QuestionsController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('only'),
    (0, common_1.UseGuards)(jwt_middleware_1.JwtMiddleware, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.INSTRUCTOR),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_question_dto_1.CreateQuestionDto]),
    __metadata("design:returntype", Promise)
], QuestionsController.prototype, "createWithoutQuiz", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_middleware_1.JwtMiddleware, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.INSTRUCTOR),
    (0, common_1.UseGuards)(not_found_1.NotFoundGuard),
    (0, common_1.UsePipes)(numeric_id_pipe_1.ValidationPipe),
    __param(0, (0, common_1.Param)('quizId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], QuestionsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':questionId'),
    (0, common_1.UseGuards)(jwt_middleware_1.JwtMiddleware, roles_guard_1.RolesGuard, not_found_questions_1.NotFoundGuardqQuestions),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.INSTRUCTOR),
    (0, common_1.UsePipes)(numeric_id_pipe_1.ValidationPipe),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('questionId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], QuestionsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':questionId'),
    (0, common_1.UseGuards)(jwt_middleware_1.JwtMiddleware, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.INSTRUCTOR),
    (0, common_1.UseGuards)(not_found_questions_1.NotFoundGuardqQuestions),
    (0, common_1.UsePipes)(numeric_id_pipe_1.ValidationPipe),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('questionId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, create_question_dto_2.UpdateQuestionDto]),
    __metadata("design:returntype", Promise)
], QuestionsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':questionId'),
    (0, common_1.UseGuards)(jwt_middleware_1.JwtMiddleware, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.INSTRUCTOR),
    (0, common_1.UseGuards)(not_found_questions_1.NotFoundGuardqQuestions),
    (0, common_1.UsePipes)(numeric_id_pipe_1.ValidationPipe),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('questionId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], QuestionsController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('automatic/:quizId'),
    (0, common_1.UseGuards)(jwt_middleware_1.JwtMiddleware, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.INSTRUCTOR),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('quizId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, create_question_dto_1.AutomaticQuestionDto]),
    __metadata("design:returntype", Promise)
], QuestionsController.prototype, "createAutomatic", null);
exports.QuestionsController = QuestionsController = __decorate([
    (0, common_1.Controller)('/questions'),
    __metadata("design:paramtypes", [questions_service_1.QuestionsService])
], QuestionsController);
//# sourceMappingURL=questions.controller.js.map