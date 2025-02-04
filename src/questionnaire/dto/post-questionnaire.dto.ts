import { z } from 'zod';

export const postQuestionnaireDto = z.object({
  title: z.string(),
  yearId: z.string(),
  gradeId: z.string(),
  subjectId: z.string(),
  authorId: z.coerce.number(),
  content: z.string(),
  questionsAmount: z.coerce.number(),
  classes: z.array(z.string()),
  questions: z.array(
    z.object({
      question: z.string(),
      answer: z.boolean(),
    }),
  ),
});

export type PostQuestionnaireDto = z.infer<typeof postQuestionnaireDto>;
