import {
  BankAccountCreateType,
  VerificationMethod,
} from '@apexfintechsolutions/ascend-sdk/models/components'
import { z } from 'zod'

export const bankRelationshipParamsSchema = z.object({
  accountId: z.string(),
  bankRelationshipId: z.string().optional(),
})

export const bankRelationshipAddAccountSchema = z.object({
  nickname: z.string(),
  bankAccount: z
    .object({
      accountNumber: z.string(),
      routingNumber: z.string(),
      owner: z.string(),
      type: z
        .enum(BankAccountCreateType)
        .default(BankAccountCreateType.Checking),
    })
    .optional(),
  verificationMethod: z
    .enum(VerificationMethod)
    .default(VerificationMethod.MicroDeposit),
})

export const bankRelationshipVerifyMicroDepositSchema = z.object({
  amounts: z.object({
    amount1: z.object({
      value: z.string(),
    }),
    amount2: z.object({
      value: z.string(),
    }),
  }),
  name: z.string(),
})
