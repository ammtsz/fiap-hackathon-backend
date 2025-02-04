import { z } from 'zod';

export const saveStudentQuestionnaireDto = z.object({
  userId: z.coerce.number(),
  questionnaireId: z.coerce.number(),
  score: z.string(),
  date: z.string(),
  subject: z.object({
    id: z.string(),
  }),
});

export type SaveStudentQuestionnaireDto = z.infer<
  typeof saveStudentQuestionnaireDto
>;
