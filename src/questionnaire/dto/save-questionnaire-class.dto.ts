import { z } from 'zod';

export const saveQuestionnaireClassDto = z.object({
  questionnaire: z.object({ id: z.coerce.number() }),
  class: z.object({ id: z.string() }),
});

export type SaveQuestionnaireClassDto = z.infer<
  typeof saveQuestionnaireClassDto
>;
