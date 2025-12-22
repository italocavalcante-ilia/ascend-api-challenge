import { z } from 'zod'

export const fundingsParamsSchema = z.object({
  accountId: z.string(),
  lastDepositId: z.string().optional(),
})

export const fundingsBodySchema = z.object({
  amount: z.object({
    value: z.string(),
  }),
  bankRelationship: z.string(),
  clientTransferId: z.string(),
  memo: z.string().optional(),
})
