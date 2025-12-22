import { Apexascend } from '@apexfintechsolutions/ascend-sdk'
import { env } from './env'

export const initializeAscendOS = async () => {
  const rawKey = env.APEX_SERVICE_ACCOUNT_CREDS_PRIVATE_KEY
  const privateKey = rawKey.replace(/\\n/g, '\n')

  const sdk = await new Apexascend({
    serverURL: env.APEX_API_URL,
    security: {
      apiKey: env.APEX_API_KEY,
      serviceAccountCreds: {
        name: env.APEX_SERVICE_ACCOUNT_CREDS_NAME,
        privateKey,
        organization: env.APEX_SERVICE_ACCOUNT_CREDS_ORGANIZATION,
        type: 'serviceAccount',
      },
    },
  })

  return sdk
}
