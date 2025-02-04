import { z } from 'zod';

export const saveAnswerDto = z.object({
  questionnaire: z.object({ id: z.coerce.number() }),
  question: z.object({ id: z.coerce.number() }),
  user: z.object({ id: z.coerce.number() }),
  answer: z.boolean(),
});

export type SaveAnswerDto = z.infer<typeof saveAnswerDto>;
