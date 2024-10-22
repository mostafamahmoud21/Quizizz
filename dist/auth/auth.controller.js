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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const roles_decorator_1 = require("./decorators/roles.decorator");
const roles_guard_1 = require("./guards/roles.guard");
const roles_enum_1 = require("./enums/roles.enum");
const register_dto_1 = require("./dto/instructor/register.dto");
const create_student_dto_1 = require("./dto/student/create-student.dto");
const login_dto_1 = require("./dto/instructor/login.dto");
const login_student_dto_1 = require("./dto/student/login-student.dto");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async registerInstructor(dto) {
        return this.authService.registerInstructor(dto);
    }
    async loginInstructor(dto) {
        return this.authService.loginInstructor(dto);
    }
    async registerStudent(dto) {
        return this.authService.registerStudent(dto);
    }
    async loginStudent(dto) {
        return this.authService.loginStudent(dto);
    }
    async protectedRoute() {
        return { message: 'This route is protected for instructors only.' };
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('instructor/register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.RegisterInstructorDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registerInstructor", null);
__decorate([
    (0, common_1.Post)('instructor/login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginInstructorDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginInstructor", null);
__decorate([
    (0, common_1.Post)('student/register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_student_dto_1.CreateStudentDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registerStudent", null);
__decorate([
    (0, common_1.Post)('student/login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_student_dto_1.LoginStudentDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginStudent", null);
__decorate([
    (0, common_1.Post)('protected-route'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.INSTRUCTOR),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "protectedRoute", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map