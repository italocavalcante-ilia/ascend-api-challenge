import z from 'zod'

export const stockApiResponse = z.object({
  data: z.array(
    z.object({
      ticker: z.string(),
      name: z.string(),
      mic_code: z.string(),
      currency: z.string(),
      price: z.number(),
      day_high: z.number(),
      day_low: z.number(),
      day_open: z.number(),
      previous_close_price: z.number(),
      previous_close_price_time: z.string(),
      day_change: z.number(),
      volume: z.number(),
      is_extended_hours_price: z.boolean(),
      last_trade_time: z.string(),
    }),
  ),
})

export const marketsQuerySchema = z.object({
  symbols: z.string(),
})
