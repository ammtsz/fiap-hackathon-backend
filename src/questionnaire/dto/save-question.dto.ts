import { z } from 'zod';

export const saveQuestionDto = z.object({
  questionnaire: z.object({ id: z.coerce.number() }),
  question: z.string(),
  answer: z.boolean(),
});

export type SaveQuestionDto = z.infer<typeof saveQuestionDto>;
