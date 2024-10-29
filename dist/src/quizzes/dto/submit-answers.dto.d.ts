<<<<<<< HEAD:dist/quizzes/dto/submit-answers.dto.d.ts
export declare class SubmitAnswersDto {
    answers: Array<{
        questionId: number;
        answer: string;
    }>;
}
=======
declare class AnswerDto {
    questionId: number;
    answerText: string;
}
export declare class SubmitAnswersDto {
    answers: AnswerDto[];
}
export {};
>>>>>>> 66e1d7db664d8fb642bf14abfb28b6a14bd7ba04:dist/src/quizzes/dto/submit-answers.dto.d.ts
