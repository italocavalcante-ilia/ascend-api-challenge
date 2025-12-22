import { FastifyInstance } from 'fastify'
import { fundingsParamsSchema, fundingsBodySchema } from '../schemas/fundings'
import z from 'zod'

export async function fundingsRoutes(app: FastifyInstance) {
  app.get('/:accountId/get-deposit/:lastDepositId', async (req, reply) => {
    const apexascend = req.sdk

    const { accountId, lastDepositId } = fundingsParamsSchema.parse(req.params)

    if (!accountId || !lastDepositId)
      return reply
        .status(400)
        .send({ message: 'AccountID / Last Deposit ID not provided' })

    const responseData = await apexascend.achTransfers.getAchDeposit(
      accountId,
      lastDepositId,
    )

    return reply.send(responseData.achDeposit)
  })

  app.post('/:accountId/create-deposit', async (req, reply) => {
    const result = fundingsBodySchema.safeParse(req.body)

    if (!result.success) {
      const errorMessage = z.treeifyError(result.error)
      return reply.status(400).send(errorMessage)
    }

    const apexascend = req.sdk
    const { accountId } = fundingsParamsSchema.parse(req.params)

    const responseData = await apexascend.achTransfers.createAchDeposit(
      result.data,
      accountId,
    )

    return reply.send(responseData.achDeposit)
  })
}
