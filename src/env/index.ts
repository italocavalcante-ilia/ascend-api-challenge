import zod from 'zod'
import dotenv from 'dotenv'

dotenv.config()

const envSchema = zod.object({
  APEX_API_KEY: zod.string(),
  APEX_SERVICE_ACCOUNT_CREDS_NAME: zod.string(),
  APEX_SERVICE_ACCOUNT_CREDS_ORGANIZATION: zod.string(),
  APEX_API_URL: zod.string(),
  APEX_ACCOUNT_GROUP_ID: zod.string(),
  APEX_CORRESPONDENT_ID: zod.string(),
  STOCK_DATA_URL: zod.string(),
  STOCK_DATA_AUTH_TOKEN: zod.string(),
  APEX_SERVICE_ACCOUNT_CREDS_PRIVATE_KEY: zod.string(),
  PORT: zod
    .string()
    .default('3337')
    .transform((value) => Number(value)),
})
const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('⚠️ Invalid environment variables', _env.error.format())

  throw new Error('Invalid environment variables.')
}

export const env = _env.data
