import fastify, { FastifyRequest } from 'fastify'
import {
  ZodTypeProvider,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { env } from './env'
import { initializeAscendOS } from './initializeAscend'
import { accountsRoutes } from './routes/accounts'
import { ordersRoutes } from './routes/orders'
import { transactionsRoutes } from './routes/transactions'
import { bankRelationshipRoutes } from './routes/bankRelationship'
import fastifyCookie from '@fastify/cookie'
import { fundingsRoutes } from './routes/fundings'
import { ledgerRoutes } from './routes/ledger'
import { marketsRoutes } from './routes/markets'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.addHook('preHandler', async (request: FastifyRequest) => {
  request.sdk = await initializeAscendOS()
})

app.register(fastifyCookie)

app.register(accountsRoutes, {
  prefix: 'accounts',
})

app.register(bankRelationshipRoutes, {
  prefix: 'bank-relationship',
})

app.register(fundingsRoutes, {
  prefix: 'fundings',
})

app.register(ledgerRoutes, {
  prefix: 'ledger',
})
app.register(marketsRoutes, {
  prefix: 'markets',
})

app.register(ordersRoutes, {
  prefix: 'orders',
})

app.register(transactionsRoutes, {
  prefix: 'transactions',
})

app.listen({ port: env.PORT }).then(() => {
  console.log('Server is running on http://localhost:3337')
})
