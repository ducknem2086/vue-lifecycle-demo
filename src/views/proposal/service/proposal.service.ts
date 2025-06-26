import type { IProposalGroupItem } from '@/views/proposal/model/proposal.ts'

export class ProposalService {
  public propersalData: IProposalGroupItem = {
    state: '',
    name: '',
    code: '',
    description: '',
    proposalSpecification: [],
    groupType: '',
  }

  getPropersalData() {
    return this.propersalData
  }
}
