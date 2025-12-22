import { FastifyInstance } from 'fastify'
import {
  accountParamsSchema,
  affirmAgreementsSchema,
  createPersonBodySchema,
  createAccountSchema,
  enrollAccountSchema,
  updatePersonParamsSchema,
  createUploadLinkSchema,
  updatePersonBodySchema,
} from '../schemas/accounts'
import { z } from 'zod'

export async function accountsRoutes(app: FastifyInstance) {
  app.get('/get-account/:accountId', async (req, reply) => {
    const apexascend = req.sdk

    const { accountId } = accountParamsSchema.parse(req.params)
    const responseData = await apexascend.accountCreation.getAccount(accountId)

    if (responseData.account) {
      reply.setCookie('accountId', accountId)
    }

    return reply.send(responseData.account)
  })
  app.post('/create-account', async (req, reply) => {
    const accountValidateResult = createAccountSchema.safeParse(req.body)

    if (!accountValidateResult.success) {
      const errorMessage = z.treeifyError(accountValidateResult.error)
      return reply.status(400).send(errorMessage)
    }
    const apexascend = req.sdk

    const responseData = await apexascend.accountCreation.createAccount(
      accountValidateResult.data,
    )

    return reply.send(responseData.account)
  })
  app.post('/create-person', async (req, reply) => {
    const apexascend = req.sdk

    const personDataResult = createPersonBodySchema.safeParse(req.body)

    if (!personDataResult.success) {
      const errorMessage = z.treeifyError(personDataResult.error)
      return reply.status(400).send(errorMessage)
    }
    const responseData =
      await apexascend.personManagement.createLegalNaturalPerson(
        personDataResult.data,
      )

    return reply.send(responseData.legalNaturalPerson)
  })

  app.post('/enroll-account/:accountId', async (req, reply) => {
    const { accountId } = accountParamsSchema.parse(req.params)
    const result = enrollAccountSchema.safeParse(req.body)

    if (!result.success) {
      const errorMessage = z.treeifyError(result.error)
      return reply.status(400).send(errorMessage)
    }

    const apexascend = req.sdk

    const responseData =
      await apexascend.enrollmentsAndAgreements.enrollAccount(
        result.data,
        accountId,
      )

    return reply.send(responseData.enrollAccountResponse)
  })

  app.post('/investor-docs/create-upload-link', async (req, reply) => {
    const result = createUploadLinkSchema.safeParse(req.body)

    if (!result.success) {
      const errorMessage = z.treeifyError(result.error)
      return reply.status(400).send(errorMessage)
    }

    const payload = {
      createDocumentUploadLinkRequest: [
        {
          idDocumentUploadRequest: result.data,
          clientBatchSourceId: crypto.randomUUID(),
          mimeType: 'application/json',
        },
      ],
    }
    const apexascend = req.sdk

    const responseData =
      await apexascend.investorDocs.batchCreateUploadLinks(payload)

    return reply.send(responseData.batchCreateUploadLinksResponse)
  })

  app.post(
    '/enroll-account/affirm-agreements/:accountId',
    async (req, reply) => {
      const { accountId } = accountParamsSchema.parse(req.params)
      const result = affirmAgreementsSchema.safeParse(req.body)

      if (!result.success) {
        const errorMessage = z.treeifyError(result.error)
        return reply.status(400).send(errorMessage)
      }
      const apexascend = req.sdk

      const responseData =
        await apexascend.enrollmentsAndAgreements.affirmAgreements(
          result.data,
          accountId,
        )

      return reply.send(responseData.affirmAgreementsResponse)
    },
  )

  app.patch('/update-person/:legalNaturalPersonID', async (req, reply) => {
    const { legalNaturalPersonID } = updatePersonParamsSchema.parse(req.params)
    const apexascend = req.sdk
    const result = updatePersonBodySchema.safeParse(req.body)

    if (!result.success) {
      const errorMessage = z.treeifyError(result.error)
      return reply.status(400).send(errorMessage)
    }
    const responseData =
      await apexascend.personManagement.updateLegalNaturalPerson(
        result.data,
        legalNaturalPersonID,
      )

    return reply.send(responseData.legalNaturalPerson)
  })
}
