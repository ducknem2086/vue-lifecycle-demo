import { defineStore } from 'pinia'
import type {
  Attribute,
  IProposalItem,
  ProposalSpecification,
} from '@/views/proposal-clone/model/proposal.ts'
import CloneDeep from 'lodash/cloneDeep'

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
          index: 0,
        },
      ],
    },
  ],
  id: '0d02845b-c91a-464c-87b4-367d188971e1',
  lastModified: {
    $date: '2025-06-17T14:31:57.154Z',
  },
}

export interface IPropsStore {
  listProps: IProposalItem[]
  // currentProps:any,
  currentProps: IProposalItem
  listAttribute: Attribute[]
  currentAttribute: Attribute
  loading: any
}

export const usePropsStore = defineStore('proposal', {
  state: () => {
    const initData: IPropsStore = {
      listProps: [mockData],
      // currentProps: mockData,
      currentProps: {},
      listAttribute: [],
      currentAttribute: {},
      loading: false,
    }
    return initData
  },
  getters: {
    getListProps: (state) => state.listProps,
    getLoadingStatus: (state) => state.loading,
    getListPropSpec: (state) => state.currentProps.proposalSpecification,
    getCurrentProps: (state) => state.currentProps,
  },
  actions: {
    /**
     * chỗ này call api cập nhật xong thì cần phải xoá lại current prop
     * @param proposalSpecification
     */
    createProposal(proposalSpecification: IProposalItem) {
      this.currentProps = proposalSpecification
      this.listProps = [...this.listProps, this.currentProps]
    },

    setCurrentProps(id: string) {
      const findProps = this.listProps.find((prop) => prop.id === id)
      if (findProps) {
        this.currentProps = CloneDeep(findProps)
      }
    },
    updatePropToList(state: IProposalItem) {
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
    deleteProposal(index: number) {
      this.listProps.splice(index, 1)
    },

    /**
     * ____________________phan nay la update spec
     * @param propSpec
     */

    updateProposalSpecDetails(propSpec: ProposalSpecification) {
      const index = this.currentProps.proposalSpecification.findIndex((x) => x.id === propSpec.id)
      if (index !== -1) {
        this.currentProps.proposalSpecification.splice(index, 1, { ...propSpec })
      }
      console.log(this.currentProps.proposalSpecification[index], propSpec)
    },

    deleteProposalSpecDetails(index: number) {
      this.currentProps.proposalSpecification.splice(index, 1)
    },
    addProposalSpecToCurrentProps(propSpec: ProposalSpecification) {
      console.log(this.currentProps, propSpec)
      if (!this.currentProps.proposalSpecification) {
        this.currentProps.proposalSpecification = [propSpec]
        return
      }
      this.currentProps.proposalSpecification = [
        ...this.currentProps.proposalSpecification,
        propSpec,
      ]
    },

    /**
     * ________________ phan nay la attibute
     */

    setListAttributeWithSpec(specId: string) {
      const findAttribute = this.currentProps?.proposalSpecification?.find((x) => x.id === specId)
      if (findAttribute) {
        this.listAttribute = CloneDeep(findAttribute?.attribute ?? [])
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

    deleteAttributeWithSpec(index: number) {
      this.listAttribute.splice(index, 1)
    },

    resetListAttribute() {
      this.listAttribute = []
    },

    resetCurrentAttribute() {
      this.currentAttribute = {}
    },

    resetStoreData(param: {
      [key in keyof IPropsStore]?: boolean
    }) {
      param.listProps && (this.listProps = [])
      param.currentProps && (this.currentProps = {})
      param.listAttribute && (this.listAttribute = [])
      param.currentAttribute && (this.currentAttribute = {})
      param.loading && (this.loading = false)
    },
  },
})
