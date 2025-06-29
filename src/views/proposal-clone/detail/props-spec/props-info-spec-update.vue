<template>
  <div v-if="isOpened" class="background-tab">
    <Tabs value="0">
      <TabList>
        <Tab value="0"><i class="pi pi-file"></i></Tab>
        <Tab value="1"><i class="pi pi-bars"></i></Tab>
      </TabList>
      <TabPanels>
        <TabPanel value="0">
          <FormGroupInfo v-model="propUpdate"></FormGroupInfo>
        </TabPanel>
        <TabPanel value="1">
          <PropsInfoSpecList @setDialogAttrStatus="openModalAttrId($event)"></PropsInfoSpecList>

          <PropsSpecAttrUpdate
            :spec-id="currentSpecId"
            :showModal="openModal"
            @setDialogUpdateStatus="setModalInfoStatus($event)"
          >
          </PropsSpecAttrUpdate>
        </TabPanel>
      </TabPanels>
    </Tabs>
    <div class="row-item">
      <Button outlined severity="secondary" label="Close" @click="closeForm"></Button>
      <Button severity="info" label="Submit" @click="submitDataSpec()" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'
import Button from 'primevue/button'
import PropsInfoSpecList from '@/views/proposal-clone/detail/props-spec/props-info-spec-list.vue'
import FormGroupInfo from '@/views/proposal-clone/form-control/formGroupInfo.vue'
import PropsSpecAttrUpdate from '@/views/proposal-clone/detail/props-spec/props-spec-attr/props-spec-attr-update.vue'
import { usePropsStore } from '@/stores/proposal.ts'
import type { IProposalItem } from '@/views/proposal-clone/model/proposal.ts'
import { ProposalService } from '@/views/proposal-clone/service/proposal.service.ts'

const emitEvent = defineEmits<{
  (event: 'closeForm'): void
}>()

const openModal = ref(false)
const propUpdate = ref<IProposalItem>({
  code: '',
  name: '',
  description: '',
  groupType: '',
  proposalSpecification: [],
  id: '',
  lastModified: {
    $date: '',
  },
}) // chỗ này nếu để ref nó không ăn, tìm hiểu sau
const store = usePropsStore()
const currentSpecId = ref('')
const isOpened = defineModel<boolean>()

watch(
  () => [store?.currentProps?.id],
  () => {
    if (!store.currentProps?.id) {
      propUpdate.value = {
        code: '',
        name: '',
        description: '',
        groupType: '',
        proposalSpecification: [],
        id: '',
        lastModified: {
          $date: '',
        },
      }
    } else {
      if (!isOpened.value) {
        store.resetStoreData({
          currentProps: true,
        })
      } else initData()
    }
  },
)

function initData() {
  if (store?.currentProps?.id) {
    propUpdate.value = Object.assign({}, store.currentProps)
    store.setListAttributeWithSpec(propUpdate.value.id)
    console.log(propUpdate.value)
  }
}

function closeForm() {
  emitEvent('closeForm')
  console.log(store.listProps)
}

function openModalAttrId(param: { status: boolean; specId: string }) {
  openModal.value = param.status
  currentSpecId.value = param.specId
  console.log(param)
}

function setModalInfoStatus(status: boolean) {
  openModal.value = status
}

function submitDataSpec() {
  console.log('submitDataSpec', store.currentProps)
  const { proposalSpecification, ...propInfo } = propUpdate.value
  const newProps = { ...store.currentProps, ...propInfo }


  if (!store.currentProps.id) {
    newProps.id = ProposalService.generateUUIDv4()
    store.createProposal(newProps)

    // tạo thành công thì cho reset data đi
    store.resetStoreData({
      currentProps: true,
    })
    return
  }
  store.updatePropToList(newProps)
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

.row-item {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 20px;
  margin-bottom: 20px;
}
</style>
