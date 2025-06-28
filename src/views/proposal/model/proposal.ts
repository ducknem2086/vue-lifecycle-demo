interface IProposalItem {
  '@type': string
  '@baseType': string
  code: string
  name: string
  description: string
  groupType: string
  proposalSpecification: ProposalSpecification[]
  id: string
  lastModified: LastModified
}

interface LastModified {
  $date: string
}

interface ProposalSpecification {
  '@baseType': string
  '@schemaLocation': string
  '@type': string
  '@referredType': string
  id: string
  name: string
  index: number
  shortDescription: string
  description: string
  attribute: Attribute[]
}

interfaLace Attribute {
  layout: Layout
  code: string
  title: string
  dataType: string
  value: string
}

interface Layout {
  ctlType: string
  extInfo: ExtInfo[]
}

interface ExtInfo {
  label: string
  value: string
}
