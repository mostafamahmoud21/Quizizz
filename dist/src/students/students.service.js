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
exports.StudentsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
let StudentsService = class StudentsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAllCoursesServices() {
        const courses = await this.prisma.course.findMany();
        if (!courses) {
            throw new common_1.HttpException('Courses not found', common_1.HttpStatus.NOT_FOUND);
        }
        return courses;
    }
    async enrollCourseServices(id, studentId) {
        const enroll = await this.prisma.enrollment.create({
            data: {
                courseId: id,
                studentId: studentId,
            }
        });
        return {
            message: 'Enrolled successfully',
        };
    }
    async findMyCourseEnrollmentServices(studentId) {
        return await this.prisma.enrollment.findMany({
            where: { studentId },
            select: {
                course: {
                    select: {
                        title: true,
                        description: true,
                        instructor: {
                            select: {
                                name: true
                            }
                        }
                    },
                },
            }
        });
    }
    async findCourseServices(id) {
        return await this.prisma.course.findUnique({
            where: { id },
            select: {
                title: true,
                description: true,
                instructor: {
                    select: {
                        name: true,
                    },
                },
            },
        });
    }
};
exports.StudentsService = StudentsService;
exports.StudentsService = StudentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [client_1.PrismaClient])
], StudentsService);
//# sourceMappingURL=students.service.js.map