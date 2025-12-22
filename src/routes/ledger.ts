import { FastifyInstance } from 'fastify'
import { ledgerParamsSchema } from '../schemas/ledger'

export async function ledgerRoutes(app: FastifyInstance) {
  app.get('/activities/:accountId', async (req, reply) => {
    const apexascend = req.sdk

    const { accountId } = ledgerParamsSchema.parse(req.params)
    const responseData = await apexascend.ledger.listActivities(accountId)

    return reply.send(responseData.listActivitiesResponse)
  })
  app.get('/positions/:accountId', async (req, reply) => {
    const apexascend = req.sdk

    const { accountId } = ledgerParamsSchema.parse(req.params)
    const responseData = await apexascend.ledger.listPositions(accountId)

    return reply.send(responseData.listPositionsResponse)
  })

  app.get(':accountId/positions/:activityId', async (req, reply) => {
    const apexascend = req.sdk

    const { accountId, activityId } = ledgerParamsSchema.parse(req.params)

    if (!accountId || !activityId)
      return reply
        .status(400)
        .send({ message: 'AccountID / Activity ID not provided' })

    const responseData = await apexascend.ledger.getActivity(
      accountId,
      activityId,
    )

    return reply.send(responseData.activity)
  })
}
