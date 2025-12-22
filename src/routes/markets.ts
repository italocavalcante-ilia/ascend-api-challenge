import { FastifyInstance } from 'fastify'
import { env } from '../env'
import { marketsQuerySchema, stockApiResponse } from '../schemas/markets'

export async function marketsRoutes(app: FastifyInstance) {
  app.get(
    '/get-stock-prices',
    {
      schema: {
        querystring: marketsQuerySchema,
      },
    },
    async (req, reply) => {
      const { symbols } = marketsQuerySchema.parse(req.query)

      try {
        const response = await fetch(
          `${env.STOCK_DATA_URL}/v1/data/quote?symbols=${symbols}&api_token=${env.STOCK_DATA_AUTH_TOKEN}`,
        )

        const body = stockApiResponse.parse(await response.json())
        return reply.send(body.data)
      } catch (error) {
        return reply.status(500).send({ error })
      }
    },
  )
}
