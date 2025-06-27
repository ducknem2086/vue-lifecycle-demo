import { defineStore } from 'pinia'
import type {
  Attribute,
  ExtInfo,
  IProposalItem,
  ProposalSpecification,
} from '@/views/proposal-clone/model/proposal.ts'

const mockData: IProposalItem = {
  code: 'MyTV',
  name: 'MyTV111',
  description: '123123',
  groupType: 'Interest',
  proposalSpecification: [
    {
      id: 'f1be5cba-cdb7-4a7a-af84-39dca95acac8',
      name: 'Miễn phí kênh truyền hình',
      index: 0,
      shortDescription: '981239817',
      description: '897129837',
      attribute: [
        {
          layout: {
            ctlType: 'SELECT-LIST',
            extInfo: [
              {
                label: '123189723',
                value: '198723981723',
              },
              {
                label: '1984718974',
                value: '19874',
              },
            ],
          },
          code: '12983718927',
          title: '987129',
          dataType: 'number',
          value: '1987',
        },
      ],
    },
  ],
  id: '0d02845b-c91a-464c-87b4-367d188971e1',
  lastModified: {
    $date: '2025-06-17T14:31:57.154Z',
  },
}

export const usePropsStore = defineStore('proposal', {
  state: () => {
    return {
      listProps: [mockData],
      currentProps: mockData,
      listAttribute: [],
      currentAttribute: {},
      loading: false,

      layoutAttr: {
        ctlType: '',
        extInfo: [],
      },
    }
  },
  getters: {
    getListProps: (state) => state.listProps,
    getLoadingStatus: (state) => state.loading,
    getListPropSpec: (state) => state.currentProps.proposalSpecification,
    getCurrentProps: (state) => state.currentProps,

    listLayoutRecord: (state) => state.layoutAttr.extInfo,
  },
  actions: {
    createProposal(proposalSpecification: IProposalItem) {
      this.listProps = [...this.listProps, proposalSpecification]
    },

    setCurrentProps(code: string) {
      const findProps = this.listProps.find((prop) => prop.code === code)
      if (findProps) {
        this.currentProps = findProps
      }
    },
    updateCurrentProps(state: IProposalItem) {
      this.currentProps = { ...state }
      this.updateCurrentToListProps()
    },
    updateCurrentToListProps() {
      const index = this.listProps.findIndex((prop) => prop.id === this.currentProps.id)

      if (index !== -1) {
        // Replace the object in listProps to trigger reactivity
        this.listProps.splice(index, 1, { ...this.currentProps })
      }
    },
    deleteProposal(id: string) {
      const find = this.listProps.findIndex((prop) => prop.id === id)
      if (find) {
        this.listProps.splice(find, 1)
      }
    },

    /**
     * ____________________phan nay la update spec
     * @param propSpec
     */

    updateProposalSpecToCurrentProps(propSpec: ProposalSpecification[]) {
      this.currentProps.proposalSpecification = propSpec
    },

    updateProposalSpecDetails(propSpec: ProposalSpecification) {
      const index = this.currentProps.proposalSpecification.findIndex((x) => x.id === propSpec.id)
      if (index !== -1) {
        this.currentProps.proposalSpecification.splice(index, 1, { ...propSpec })
      }
    },

    deleteProposalSpecDetails(propSpec: ProposalSpecification) {
      const find = this.currentProps.proposalSpecification.findIndex((x) => x.id === propSpec.id)
      if (find) {
        this.currentProps.proposalSpecification.splice(find, 1)
      }
    },
    addProposalSpecToCurrentProps(propSpec: ProposalSpecification) {
      this.currentProps.proposalSpecification = [
        ...this.currentProps.proposalSpecification,
        propSpec,
      ]
    },

    /**
     * ________________ phan nay la attibute
     */

    setListAttributeWithSpec(specId: string) {
      const findAttribute = this.currentProps.proposalSpecification.find((x) => x.id === specId)
      if (findAttribute) {
        this.listAttribute = findAttribute.attribute
      }
    },

    createNewAttr(attrData: Attribute) {
      this.listAttribute = [...this.listAttribute, attrData]
      console.log(this.listAttribute)
    },

    updateAttributeWithSpec(attrData: Attribute) {
      const index = this.listAttribute.findIndex((x) => x.index === attrData.index)
      if (index !== -1) {
        this.listAttribute.splice(index, 1, { ...attrData })
      }
      console.log('update attr', this.listAttribute)
    },


    deleteAttributeWithSpec(attrData: Attribute) {
      const findAttr = this.listAttribute.findIndex((x) => x.index === attrData.index)
      if (findAttr) {
        this.listAttribute.splice(findAttr, 1)
      }
    },

    //layout attr
    setLayoutOfAttr(attrId: string) {
      const findAttr = this.listAttribute.find((x) => x.id === attrId)
      this.layoutAttr = findAttr.layout
    },

    updateLayoutOfAttr(layout: ExtInfo[] | string) {
      if (typeof layout === 'string') {
        this.layoutAttr.extInfo = layout as any
      }
      this.layoutAttr.extInfo = [...layout]
    },

    // listProps: [mockData],
    // currentProps: mockData,
    // listAttribute: [],
    // currentAttribute: {},
    // loading: false,

    resetLayoutOfAttr() {
      this.layoutAttr = {
        extInfo: [],
        ctlType: '',
      }
    },

    resetListAttribute() {
      this.listAttribute = []
    },

    resetCurrentAttribute() {
      this.currentAttribute = {}
    },

    resetAllData() {
      this.listProps = [mockData]
      this.currentProps = mockData
      this.listAttribute = []
      this.currentAttribute = {}
      this.loading = false
    },
  },
})
