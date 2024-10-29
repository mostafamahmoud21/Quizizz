// import { PrismaClient } from '@prisma/client';
// import { faker } from '@faker-js/faker';

// const prisma = new PrismaClient();

// async function main() {
//   // Create roles
//   const instructorRole = 'INSTRUCTOR';
//   const studentRole = 'STUDENT';

//   // Seed Instructors
//   const instructors = [];
//   for (let i = 0; i < 5; i++) {
//     const instructor = await prisma.instructor.create({
//       data: {
//         name: faker.name.fullName(),
//         email: faker.internet.email(),
//         password: faker.internet.password(),
//         role: instructorRole,
//       },
//     });
//     instructors.push(instructor);
//   }

//   // Seed Students
//   const students = [];
//   for (let i = 0; i < 10; i++) {
//     const student = await prisma.student.create({
//       data: {
//         name: faker.name.fullName(),
//         email: faker.internet.email(),
//         password: faker.internet.password(),
//         role: studentRole,
//       },
//     });
//     students.push(student);
//   }

//   // Seed Courses
//   const courses = [];
//   for (let i = 0; i < 5; i++) {
//     const course = await prisma.course.create({
//       data: {
//         title: faker.lorem.words(3),
//         description: faker.lorem.sentences(2),
//         instructorId: instructors[i % instructors.length].id, // Assign each course to an instructor
//       },
//     });
//     courses.push(course);
//   }

//   // Seed Enrollments
//   for (const student of students) {
//     const enrolledCourses = faker.helpers.arrayElements(courses, 2);
//     for (const course of enrolledCourses) {
//       await prisma.enrollment.create({
//         data: {
//           studentId: student.id,
//           courseId: course.id,
//         },
//       });
//     }
//   }

//   // Seed Quizzes
//   const quizzes = [];
//   for (const course of courses) {
//     const quiz = await prisma.quiz.create({
//       data: {
//         title: `${course.title} Quiz`,
//         description: faker.lorem.sentence(),
//         instructorId: course.instructorId,
//         courseId: course.id,
//         type: faker.helpers.arrayElement(['Quiz', 'Final']),
//       },
//     });
//     quizzes.push(quiz);
//   }

//   // Seed Questions and Choices
//   for (const quiz of quizzes) {
//     for (let i = 0; i < 5; i++) { // 5 questions per quiz
//       const question = await prisma.question.create({
//         data: {
//           text: faker.lorem.sentence(),
//           quizId: quiz.id,
//           level: faker.helpers.arrayElement(['Easy', 'Medium', 'Hard']),
//         },
//       });

//       // Create choices for each question
//       for (let j = 0; j < 4; j++) { // 4 choices per question
//         await prisma.choice.create({
//           data: {
//             text: faker.lorem.words(2),
//             questionId: question.id,
//           },
//         });
//       }
//     }
//   }

//   // Seed Quiz Attempts
//   for (const student of students) {
//     const attemptedQuizzes = faker.helpers.arrayElements(quizzes, 3); // 3 attempts per student
//     for (const quiz of attemptedQuizzes) {
//       await prisma.quizAttempt.create({
//         data: {
//           quizId: quiz.id,
//           studentId: student.id,
//           score: faker.datatype.number({ min: 50, max: 100 }),
//           dateTaken: faker.date.past(),
//         },
//       });
//     }
//   }
// }

// main()
//   .then(() => {
//     console.log("Database seeded successfully with Faker data.");
//   })
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
