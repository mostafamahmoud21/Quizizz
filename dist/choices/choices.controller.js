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
let ChoicesController = class ChoicesController {
    constructor(choicesService) {
        this.choicesService = choicesService;
    }
    async createChoice(questionId, createChoiceDto) {
        return this.choicesService.createChoice(+questionId, createChoiceDto);
    }
};
exports.ChoicesController = ChoicesController;
__decorate([
    (0, common_1.Post)('questions/:questionId'),
    __param(0, (0, common_1.Param)('questionId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_choice_dto_1.createChoiceDto]),
    __metadata("design:returntype", Promise)
], ChoicesController.prototype, "createChoice", null);
exports.ChoicesController = ChoicesController = __decorate([
    (0, common_1.Controller)('choices'),
    __metadata("design:paramtypes", [choices_service_1.ChoicesService])
], ChoicesController);
//# sourceMappingURL=choices.controller.js.map