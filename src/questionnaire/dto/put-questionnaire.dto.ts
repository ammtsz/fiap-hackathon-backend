import { z } from 'zod';

export const putQuestionnaireDto = z.object({
  title: z.string().optional(),
  yearId: z.string().optional(),
  gradeId: z.string().optional(),
  subjectId: z.string().optional(),
  content: z.string().optional(),
  questionsAmount: z.coerce.number().optional(),
  classes: z.array(z.string()).optional(),
  questions: z
    .array(
      z.object({
        id: z.coerce.number(),
        question: z.string(),
        answer: z.boolean(),
      }),
    )
    .optional(),
});

export type PutQuestionnaireDto = z.infer<typeof putQuestionnaireDto>;
