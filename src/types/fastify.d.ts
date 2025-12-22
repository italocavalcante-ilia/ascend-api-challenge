import 'fastify'
import { Apexascend } from '@apexfintechsolutions/ascend-sdk'

declare module 'fastify' {
  interface FastifyRequest {
    sdk: Apexascend
  }
}
