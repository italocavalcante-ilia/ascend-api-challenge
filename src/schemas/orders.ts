import {
  AssetType,
  IdentifierType,
  OrderType,
  Side,
  TimeInForce,
} from '@apexfintechsolutions/ascend-sdk/models/components'
import { z } from 'zod'

export const ordersParamsSchema = z.object({
  accountId: z.string(),
  lastOrderId: z.string().optional(),
})

export const ordersBodySchema = z.object({
  assetType: z.enum(AssetType).default(AssetType.Equity),
  clientOrderId: z.string(),
  currencyCode: z.string().default('USD'),
  identifier: z.string(),
  identifierType: z.enum(IdentifierType).default(IdentifierType.Symbol),
  orderDate: z.object({
    day: z.number(),
    month: z.number(),
    year: z.number(),
  }),
  quantity: z.object({
    value: z.string(),
  }),
  orderType: z.enum(OrderType).default(OrderType.Market),
  side: z.enum(Side).default(Side.Buy),
  timeInForce: z.enum(TimeInForce).default(TimeInForce.Day),
})
