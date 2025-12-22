import { z } from 'zod'
import {
  CostBasisLotDisposalMethod,
  EmploymentStatus,
  FederalTaxClassification,
  IrsFormType,
  RelationType,
  TaxIdType,
  UsTinStatus,
} from '@apexfintechsolutions/ascend-sdk/models/components'
import {
  InvestmentObjective,
  LiquidityNeeds,
  RiskTolerance,
  TimeHorizon,
} from '@apexfintechsolutions/ascend-sdk/models/components/accountgoalscreate'
import {
  AnnualIncomeRangeUsd,
  InvestmentExperience,
  LiquidNetWorthRangeUsd,
  TotalNetWorthRangeUsd,
} from '@apexfintechsolutions/ascend-sdk/models/components/customerprofilecreate'
import { EnrollmentCreateType } from '@apexfintechsolutions/ascend-sdk/models/components/enrollmentcreate'
import { IDDocumentUploadRequestCreateDocumentType } from '@apexfintechsolutions/ascend-sdk/models/components/iddocumentuploadrequestcreate'

const accountGoalsMock = {
  investmentObjective: InvestmentObjective.Other,
  liquidityNeeds: LiquidityNeeds.NotImportant,
  riskTolerance: RiskTolerance.High,
  timeHorizon: TimeHorizon.Long,
}
const customerProfileMock = {
  annualIncomeRangeUsd: AnnualIncomeRangeUsd.From300KTo500K,
  federalTaxBracket: 24,
  investmentExperience: InvestmentExperience.None,
  liquidNetWorthRangeUsd: LiquidNetWorthRangeUsd.From50KTo100K,
  totalNetWorthRangeUsd: TotalNetWorthRangeUsd.Under25K,
}

const AddressSchema = z
  .object({
    regionCode: z.string(),
    addressLines: z.array(z.string()),
    locality: z.string(),
    postalCode: z.string(),
    administrativeArea: z.string(),
  })
  .default({
    regionCode: 'US',
    addressLines: ['PO Box 12'],
    locality: 'Portland',
    postalCode: '97209',
    administrativeArea: 'OR',
  })

const AccountGoalsSchema = z.object({
  investmentObjective: z.enum(InvestmentObjective),
  liquidityNeeds: z.enum(LiquidityNeeds),
  riskTolerance: z.enum(RiskTolerance),
  timeHorizon: z.enum(TimeHorizon),
})
const CustomerProfileSchema = z.object({
  annualIncomeRangeUsd: z.enum(AnnualIncomeRangeUsd),
  federalTaxBracket: z.number(),
  investmentExperience: z.enum(InvestmentExperience),
  liquidNetWorthRangeUsd: z.enum(LiquidNetWorthRangeUsd),
  totalNetWorthRangeUsd: z.enum(TotalNetWorthRangeUsd),
})

const InterestedPartySchema = z.object({
  recipient: z.string(),
  mailingAddress: AddressSchema,
})

const InvestmentProfileSchema = z
  .object({
    accountGoals: AccountGoalsSchema.default(accountGoalsMock),
    customerProfile: CustomerProfileSchema.default(customerProfileMock),
  })
  .default({
    accountGoals: accountGoalsMock,
    customerProfile: customerProfileMock,
  })

const PartySchema = z.object({
  emailAddress: z.string(),
  mailingAddress: AddressSchema,
  phoneNumber: z.object({
    e164Number: z.string(),
  }),
  relationType: z.enum(RelationType).default(RelationType.PrimaryOwner),
  legalNaturalPersonId: z.string(),
  largeTrader: z
    .object({
      largeTraderId: z.string(),
    })
    .default({
      largeTraderId: '123456789',
    }),
})

const TaxProfileSchema = z.object({
  costBasisLotDisposalMethod: z
    .enum(CostBasisLotDisposalMethod)
    .default(CostBasisLotDisposalMethod.CostBasisLotDisposalLifo),
  section475Election: z.boolean(),
})

export const accountParamsSchema = z.object({
  accountId: z.string(),
})

export const createPersonBodySchema = z.object({
  birthDate: z.object({
    day: z.number(),
    month: z.number(),
    year: z.number(),
  }),
  citizenshipCountries: z.array(z.string()),
  correspondentId: z.string(),
  employment: z.object({
    employmentStatus: z
      .enum(EmploymentStatus)
      .default(EmploymentStatus.Unemployed),
  }),
  identityVerificationResult: z.object({
    addressVerified: z.boolean(),
    birthDateVerified: z.boolean(),
    executionDate: z.object({
      day: z.number(),
      month: z.number(),
      year: z.number(),
    }),
    nameVerified: z.boolean(),
    taxIdVerified: z.boolean(),
    externalCaseId: z.string(),
    vendor: z.string(),
  }),
  familyName: z.string(),
  givenName: z.string(),
  personalAddress: AddressSchema,
  taxProfile: z.object({
    federalTaxClassification: z
      .enum(FederalTaxClassification)
      .default(FederalTaxClassification.IndivSolepropOrSinglememberllc),
    irsFormType: z.enum(IrsFormType).default(IrsFormType.W9),
    legalTaxRegionCode: z.string(),
    usTinStatus: z.enum(UsTinStatus).default(UsTinStatus.Passing),
  }),
  taxIdType: z.enum(TaxIdType),
  taxId: z.string(),
})

export const createAccountSchema = z.object({
  accountGroupId: z.string(),
  correspondentId: z.string(),
  interestedParties: z.array(InterestedPartySchema),
  investmentProfile: InvestmentProfileSchema.optional(),
  parties: z.array(PartySchema),
  primaryRegisteredRepId: z.string(),
  taxProfile: TaxProfileSchema,
})

export const enrollAccountSchema = z.object({
  enrollment: z.object({
    type: z
      .enum(EnrollmentCreateType)
      .default(EnrollmentCreateType.RegistrationIndividual),
    principalApproverId: z.string(),
  }),
})

export const createUploadLinkSchema = z.object({
  correspondentId: z.string(),
  documentType: z
    .enum(IDDocumentUploadRequestCreateDocumentType)
    .default(IDDocumentUploadRequestCreateDocumentType.ThirdPartyCipResults),
  legalNaturalPersonId: z.string(),
})

export const affirmAgreementsSchema = z.object({
  accountAgreementIds: z.array(z.string()),
})

export const updatePersonBodySchema = z.object({
  identityVerificationResult: z.object({
    rawVendorDataDocumentId: z.string(),
  }),
})

export const updatePersonParamsSchema = z.object({
  legalNaturalPersonID: z.string(),
})
