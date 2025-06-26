<template>
  <div class="background-tab">
    <Tabs value="0">
      <TabList>
        <Tab value="0">Header I</Tab>
        <Tab value="1">Header II</Tab>
      </TabList>
      <TabPanels>
        <TabPanel value="0">
          <FormGroupSpecInfo></FormGroupSpecInfo>
        </TabPanel>
        <TabPanel value="1">
          <PropsInfoSpecList
            @setDialogUpdateStatus="openModalFunc"
            :listPropSpec="[]"
          ></PropsInfoSpecList>
          <div class="background-form-attr">
            <FormGroupSpecAttr
              :case="'open'"
              :showModal="openModal"
              @submitEvent="submitFormAttr"
              @closeForm="closeModal($event)"
            ></FormGroupSpecAttr>
          </div>
        </TabPanel>
      </TabPanels>
    </Tabs>
    <!--  <FormControl @submitEvent="createAttibute($event)"></FormControl>-->
    <!--  <FormGroupSpecInfo></FormGroupSpecInfo>-->
    <div class="row-item">
      <Button label="Close" @click="closeForm"></Button>
      <Button label="Submit" @click="submitDataSpec()" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue'
import type { IProposalSpecification } from '@/views/proposal/model/proposal.ts'
import FormGroupSpecInfo from '@/views/proposal/form-control/formGroupSpecInfo.vue'
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'
import Button from 'primevue/button'
import PropsInfoSpecList from '@/views/proposal/detail/props-spec/props-info-spec-list.vue'
import FormGroupSpecAttr from '@/views/proposal/form-control/formGroupSpecAttr.vue'

const props = defineProps<IProposalSpecification>()
const emitEvent = defineEmits<{
  (event: 'setDialogUpdateStatus', status: boolean): void
  (event: 'updateAttr', param: { data?: any; pageCase: 'update' | 'create' }): void
  (event: 'updateSpec', param: { data?: any; pageCase: 'update' | 'create' }): void
}>()

const openModal = ref(false)

function closeForm() {
  console.log('closeForm')
}

function closeModal(modalStatus: boolean) {
  openModal.value = modalStatus
}

function submitFormAttr(param: { data: string; pageCase: string }) {
  const { data, pageCase } = param
  if (pageCase === 'update') {
    return
  }
  console.log(data)
}

function openModalFunc(status: boolean) {
  openModal.value = status
  console.log(openModal.value)
}

function submitDataSpec() {
  console.log('submit form spec')
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
}
</style>
