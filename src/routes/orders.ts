import { FastifyInstance } from 'fastify'
import { ordersBodySchema, ordersParamsSchema } from '../schemas/orders'
import z from 'zod'

export async function ordersRoutes(app: FastifyInstance) {
  app.get('/:accountId/get-order/:lastOrderId', async (req, reply) => {
    const apexascend = req.sdk

    const { accountId, lastOrderId } = ordersParamsSchema.parse(req.params)

    if (!accountId || !lastOrderId)
      return reply
        .status(400)
        .send({ message: 'AccountID / Last Order ID was not provided' })

    const responseData = await apexascend.orders.getOrder(
      accountId,
      lastOrderId,
    )

    return reply.send(responseData.order)
  })

  app.post('/:accountId/submit-order', async (req, reply) => {
    const result = ordersBodySchema.safeParse(req.body)

    if (!result.success) {
      const errorMessage = z.treeifyError(result.error)
      return reply.status(400).send(errorMessage)
    }

    const apexascend = req.sdk
    const { accountId } = ordersParamsSchema.parse(req.params)

    const responseData = await apexascend.orders.createOrder(
      result.data,
      accountId,
    )

    return reply.send(responseData.order)
  })
}
