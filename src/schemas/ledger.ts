import z from 'zod'

export const ledgerParamsSchema = z.object({
  accountId: z.string(),
  activityId: z.string().optional(),
})
