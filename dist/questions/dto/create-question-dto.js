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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateQuestionDto = exports.CreateQuestionDto = void 0;
const class_validator_1 = require("class-validator");
const levels_enum_1 = require("../../auth/enums/levels.enum");
class CreateQuestionDto {
}
exports.CreateQuestionDto = CreateQuestionDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateQuestionDto.prototype, "text", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(levels_enum_1.Levels, { message: 'Level must be either Easy, Medium, or Hard' }),
    __metadata("design:type", String)
], CreateQuestionDto.prototype, "level", void 0);
class UpdateQuestionDto {
}
exports.UpdateQuestionDto = UpdateQuestionDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateQuestionDto.prototype, "text", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(levels_enum_1.Levels, { message: 'Level must be either Easy, Medium, or Hard' }),
    __metadata("design:type", String)
], UpdateQuestionDto.prototype, "level", void 0);
//# sourceMappingURL=create-question-dto.js.map