import { FastifyInstance } from 'fastify'
import { accountParamsSchema } from '../schemas/accounts'

export async function transactionsRoutes(app: FastifyInstance) {
  app.get('/get-cash-balance/:accountId', async (req, reply) => {
    const apexascend = req.sdk

    const { accountId } = accountParamsSchema.parse(req.params)
    const responseData =
      await apexascend.cashBalances.calculateCashBalance(accountId)

    return reply.send(responseData.calculateCashBalanceResponse)
  })
  app.get('/get-buying-power/:accountId', async (req, reply) => {
    const apexascend = req.sdk

    const { accountId } = accountParamsSchema.parse(req.params)
    const responseData = await apexascend.margins.getBuyingPower(accountId)

    return reply.send(responseData.buyingPower)
  })
}
