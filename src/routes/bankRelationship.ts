import { FastifyInstance } from 'fastify'
import {
  bankRelationshipParamsSchema,
  bankRelationshipAddAccountSchema,
  bankRelationshipVerifyMicroDepositSchema,
} from '../schemas/bankRelationship'
import { z } from 'zod'

export async function bankRelationshipRoutes(app: FastifyInstance) {
  app.get(
    '/:accountId/get-deposits/:bankRelationshipId',
    async (req, reply) => {
      const apexascend = req.sdk

      const { accountId, bankRelationshipId } =
        bankRelationshipParamsSchema.parse(req.params)

      if (!accountId || !bankRelationshipId)
        return reply
          .status(400)
          .send({ message: 'AccountID / Bank Relationship ID not provided' })

      const responseData =
        await apexascend.testSimulation.getMicroDepositAmounts(
          accountId,
          bankRelationshipId,
        )

      return reply.send(responseData.microDepositAmounts)
    },
  )

  app.get('/:accountId/status/:bankRelationshipId', async (req, reply) => {
    const { accountId, bankRelationshipId } =
      bankRelationshipParamsSchema.parse(req.params)

    if (!accountId || !bankRelationshipId)
      return reply
        .status(400)
        .send({ message: 'AccountID / Bank Relationship ID not provided' })

    const apexascend = req.sdk

    const responseData = await apexascend.bankRelationships.getBankRelationship(
      accountId,
      bankRelationshipId,
    )

    return reply.send(responseData.bankRelationship)
  })

  app.post('/add-bank-account/:accountId', async (req, reply) => {
    const result = bankRelationshipAddAccountSchema.safeParse(req.body)

    if (!result.success) {
      const errorMessage = z.treeifyError(result.error)
      return reply.status(400).send(errorMessage)
    }

    const apexascend = req.sdk

    const { accountId } = bankRelationshipParamsSchema.parse(req.params)

    const responseData =
      await apexascend.bankRelationships.createBankRelationship(
        result.data,
        accountId,
      )

    return reply.send(responseData.bankRelationship)
  })

  app.post(
    '/:accountId/verify-account/:bankRelationshipId',
    async (req, reply) => {
      const result = bankRelationshipVerifyMicroDepositSchema.safeParse(
        req.body,
      )

      if (!result.success) {
        const errorMessage = z.treeifyError(result.error)
        return reply.status(400).send(errorMessage)
      }

      const { accountId, bankRelationshipId } =
        bankRelationshipParamsSchema.parse(req.params)

      if (!accountId || !bankRelationshipId)
        return reply
          .status(400)
          .send({ message: 'AccountID / Bank Relationship ID not provided' })

      const apexascend = req.sdk

      const responseData =
        await apexascend.bankRelationships.verifyMicroDeposits(
          result.data,
          accountId,
          bankRelationshipId,
        )

      return reply.send(responseData.bankRelationship)
    },
  )
}
