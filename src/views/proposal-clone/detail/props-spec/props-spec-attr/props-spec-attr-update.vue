<template>
  <Dialog
    :visible="props.showModal"
    modal
    header="Proposal Attibute"
    :style="{ width: '25rem', minWidth: 'max-content' }"
    @update:visible="setDialogStatus($event)"
  >
    <template #header></template>
    <div class="background-tab">
      <Tabs value="0">
        <TabList>
          <Tab value="0"><i class="pi pi-file"></i></Tab>
          <Tab value="1"><i class="pi pi-bars"></i></Tab>
        </TabList>
        <TabPanels>
          <TabPanel value="0">
            <FormGroupSpecInfo v-model="formSpecInfo"></FormGroupSpecInfo>
          </TabPanel>
          <TabPanel value="1">
            <PropsSpecAttrList
              @setDialogAttrStatus="openModalAttr($event)"
              :specId="props.specId"
            ></PropsSpecAttrList>
            <div class="background-form-attr">
              <FormGroupSpecAttr
                :case="'open'"
                :attr-id="currentAttrId"
                :showModal="dialogAttrStatus"
                @submitEvent="submitFormAttr"
                @closeForm="setModalAttrStatus(false)"
              ></FormGroupSpecAttr>
            </div>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <!--  <FormControl @submitEvent="createAttibute($event)"></FormControl>-->
      <!--  <FormGroupSpecInfo></FormGroupSpecInfo>-->
    </div>
    <template #footer>
      <div class="form-attr-footer">
        <Button severity="secondary" type="reset" @click="closeForm">Close</Button>
        <Button severity="info" type="reset" label="Submit" @click="submitDataSpec()"
          >Submit
        </Button>
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { defineProps, ref, watch } from 'vue'
import FormGroupSpecInfo from '@/views/proposal-clone/form-control/formGroupSpecInfo.vue'
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'
import Button from 'primevue/button'
import FormGroupSpecAttr from '@/views/proposal-clone/form-control/formGroupSpecAttr.vue'
import PropsSpecAttrList from '@/views/proposal-clone/detail/props-spec/props-spec-attr/props-spec-attr-list.vue'
import Dialog from 'primevue/dialog'
import { usePropsStore } from '@/stores/proposal.ts'
import type { ProposalSpecification } from '@/views/proposal-clone/model/proposal.ts'
import { ProposalService } from '@/views/proposal-clone/service/proposal.service.ts'
import CloneDeep from 'lodash/cloneDeep'

const props = defineProps<{
  specId?: string
  showModal: boolean
}>()
const currentAttrId = ref('')

const emitEvent = defineEmits<{
  (event: 'setDialogUpdateStatus', status: boolean): void
}>()

const dialogAttrStatus = ref(false)
const store = usePropsStore()

const formSpecInfo = ref<Omit<ProposalSpecification, 'attribute'>>({
  id: '',
  name: '',
  index: 0,
  shortDescription: '',
  description: '',
})
watch(
  () => props.showModal,
  () => {
    setModalAttrStatus(false)
    console.log(props)
    if (props.specId) {
      const specData = store.getCurrentProps.proposalSpecification.find(
        (x) => x.id === props.specId,
      )
      formSpecInfo.value = CloneDeep(specData)
      store.setListAttributeWithSpec(props.specId)
    } else {
      store.listAttribute = []
      formSpecInfo.value = {
        id: '',
        name: '',
        index: 0,
        shortDescription: '',
        description: '',
      }
    }
  },
)

function closeForm() {
  console.log('closeForm')
  emitEvent('setDialogUpdateStatus', false)
}

function setDialogStatus(modalStatus: boolean) {
  emitEvent('setDialogUpdateStatus', modalStatus)
}

function setModalAttrStatus(modalStatus: boolean) {
  console.log(modalStatus)
  dialogAttrStatus.value = modalStatus
}

function submitFormAttr(param: { data: string; pageCase: string }) {
  const { data, pageCase } = param
  if (pageCase === 'update') {
    return
  }
  console.log(data)
}

function openModalAttr(param: { attrId: string; status: boolean }) {
  console.log(param)
  dialogAttrStatus.value = param.status
  currentAttrId.value = param.attrId

}

function submitDataSpec() {
  const submitData: ProposalSpecification = {
    ...formSpecInfo.value,
    id: '',
    attribute: store.listAttribute,
  }
  if (!props.specId) {
    submitData.id = ProposalService.generateUUIDv4()
    store.addProposalSpecToCurrentProps(submitData as any)
    closeForm()
    return
  }
  submitData.id = props.specId
  store.updateProposalSpecDetails(submitData as any)

  console.log('submit form spec', submitData, props.specId)
  closeForm()
  return
}
</script>

<style scoped lang="scss">
.btn-group-extra-info {
  display: flex;
  gap: 10px;
  flex-direction: row;
  height: 30px;
}

.background-tab {
  height: 100%;
  width: 100%;
  background: white;
}

.background-form-attr {
  max-width: inherit;
}

.form-attr-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  padding: 0 20px;
  gap: 20px;
}

.form-attr-footer {
  margin-bottom: 20px;
}
</style>
