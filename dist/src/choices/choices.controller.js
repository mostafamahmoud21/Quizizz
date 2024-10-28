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
exports.ChoicesController = void 0;
const common_1 = require("@nestjs/common");
const choices_service_1 = require("./choices.service");
const create_choice_dto_1 = require("./dto/create-choice.dto");
const update_choice_dto_1 = require("./dto/update-choice.dto");
const jwt_middleware_1 = require("../auth/middleware/jwt.middleware");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_enum_1 = require("../auth/enums/roles.enum");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
let ChoicesController = class ChoicesController {
    constructor(choicesService) {
        this.choicesService = choicesService;
    }
    async createChoice(questionId, req, createChoiceDto) {
        const instructorId = req.user.id;
        return this.choicesService.createChoice(questionId, instructorId, createChoiceDto);
    }
    async updateChoice(id, questionId, req, updateChoiceDto) {
        const instructorId = req.user.id;
        return this.choicesService.updateChoice(id, questionId, instructorId, updateChoiceDto);
    }
    async deleteChoice(id, questionId, req) {
        const instructorId = req.user.id;
        return this.choicesService.deleteChoice(id, questionId, instructorId);
    }
};
exports.ChoicesController = ChoicesController;
__decorate([
    (0, common_1.Post)('questions/:questionId'),
    (0, common_1.UseGuards)(jwt_middleware_1.JwtMiddleware, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.INSTRUCTOR),
    __param(0, (0, common_1.Param)('questionId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, create_choice_dto_1.createChoiceDto]),
    __metadata("design:returntype", Promise)
], ChoicesController.prototype, "createChoice", null);
__decorate([
    (0, common_1.Put)(':id/questions/:questionId'),
    (0, common_1.UseGuards)(jwt_middleware_1.JwtMiddleware, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.INSTRUCTOR),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('questionId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object, update_choice_dto_1.updateChoiceDto]),
    __metadata("design:returntype", Promise)
], ChoicesController.prototype, "updateChoice", null);
__decorate([
    (0, common_1.Delete)(':id/questions/:questionId'),
    (0, common_1.UseGuards)(jwt_middleware_1.JwtMiddleware, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.INSTRUCTOR),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('questionId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], ChoicesController.prototype, "deleteChoice", null);
exports.ChoicesController = ChoicesController = __decorate([
    (0, common_1.Controller)('choices'),
    __metadata("design:paramtypes", [choices_service_1.ChoicesService])
], ChoicesController);
//# sourceMappingURL=choices.controller.js.map