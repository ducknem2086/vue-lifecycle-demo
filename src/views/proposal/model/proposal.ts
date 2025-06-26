export interface IProposalGroupItem {
  state: string
  proposalSpecification: IProposalSpecification[]
  name: string
  code: string
  groupType: string
  description: string
}

// export class Proposal implements IProposalGroupItem {
//   state: string = ''
//   name: string = ''
//   code: string = ''
//   groupType: string = ''
//   description: string = ''
//   proposalSpecification = []
// }

export interface IProposalSpecification {
  attribute: IAttribute[]
  name: string
  shortDescription: string
  description: string
  id: string
}

export interface IAttribute {
  layout: ILayout
  code: string
  title: string
  dataType: string
  value: string
  index: number
}

export interface ILayout {
  ctlType: string
  extInfo: IExtInfo[]
}

export interface IExtInfo {
  label: string
  value: string
}
