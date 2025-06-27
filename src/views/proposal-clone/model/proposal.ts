export interface IProposalItem {
  // '@type': string
  // '@baseType': string
  code: string
  name: string
  description: string
  groupType: string
  proposalSpecification: ProposalSpecification[]
  id: string
  lastModified: LastModified
}

export interface LastModified {
  $date: string
}

export interface ProposalSpecification {
  // '@baseType': string
  // '@schemaLocation': string
  // '@type': string
  // '@referredType': string
  id: string
  name: string
  index: number
  shortDescription: string
  description: string
  attribute: Attribute[]
}

export interface Attribute {
  layout: Layout
  code: string
  title: string
  dataType: string
  value: string
  index: number
}

export interface Layout {
  ctlType: string
  extInfo: ExtInfo[] | string
}

export interface ExtInfo {
  label: string
  value: string
}
