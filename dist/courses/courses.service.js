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
exports.CoursesService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
let CoursesService = class CoursesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createCourseServices(createCourseDto, instructorId) {
        try {
            const course = await this.prisma.course.create({
                data: {
                    title: createCourseDto.title,
                    description: createCourseDto.description,
                    instructorId: instructorId,
                },
            });
            return {
                course,
                message: { success: 'Course created successfully' },
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                error: 'Failed to create course',
            }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async findAllCoursesServices(instructorId) {
        return await this.prisma.course.findMany({
            where: { instructorId },
            select: {
                title: true,
                description: true,
                createdAt: true,
                updatedAt: true,
                instructor: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
            },
        });
    }
    async findOne(id) {
        const course = await this.prisma.course.findUnique({
            where: { id },
            include: {
                instructor: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
            },
        });
        if (!course) {
            throw new common_1.HttpException('Course not found', common_1.HttpStatus.NOT_FOUND);
        }
        return course;
    }
    async update(id, updateCourseDto, instructorId) {
        const course = await this.prisma.course.findUnique({ where: { id } });
        if (!course) {
            throw new common_1.HttpException('Course not found', common_1.HttpStatus.NOT_FOUND);
        }
        if (course.instructorId !== instructorId) {
            throw new common_1.HttpException('You are not authorized to update this course', common_1.HttpStatus.FORBIDDEN);
        }
        try {
            const updatedCourse = await this.prisma.course.update({
                where: { id },
                data: {
                    title: updateCourseDto.title,
                    description: updateCourseDto.description,
                },
            });
            return {
                updatedCourse,
                message: { success: 'Course updated successfully' },
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                error: 'Failed to update course',
            }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async remove(id, instructorId) {
        const course = await this.prisma.course.findUnique({ where: { id } });
        if (!course) {
            throw new common_1.HttpException('Course not found', common_1.HttpStatus.NOT_FOUND);
        }
        if (course.instructorId !== instructorId) {
            throw new common_1.HttpException('You are not authorized to delete this course', common_1.HttpStatus.FORBIDDEN);
        }
        try {
            await this.prisma.course.delete({
                where: { id },
            });
            return { message: 'Course removed successfully' };
        }
        catch (error) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                error: 'Failed to remove course',
            }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.CoursesService = CoursesService;
exports.CoursesService = CoursesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [client_1.PrismaClient])
], CoursesService);
//# sourceMappingURL=courses.service.js.map