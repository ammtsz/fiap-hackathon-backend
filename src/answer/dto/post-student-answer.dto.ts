import { z } from 'zod';

export const postStudentAnswerDto = z.object({
  questionnaire_id: z.coerce.number(),
  user_id: z.coerce.number(),
  subject_id: z.string(),
  score: z.string(),
  answers: z.array(
    z.object({
      question_id: z.coerce.number(),
      answer: z.boolean(),
    }),
  ),
});

export type PostStudentAnswerDto = z.infer<typeof postStudentAnswerDto>;
