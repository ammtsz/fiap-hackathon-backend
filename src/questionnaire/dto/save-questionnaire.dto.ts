import { z } from 'zod';

export const saveQuestionnaireDto = z.object({
  title: z.string(),
  content: z.string(),
  questionsAmount: z.coerce.number(),
  year: z.object({ id: z.string() }),
  grade: z.object({ id: z.string() }),
  subject: z.object({ id: z.string() }),
  author: z.object({ id: z.coerce.number() }),
});

export type SaveQuestionnaireDto = z.infer<typeof saveQuestionnaireDto>;
