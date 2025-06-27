<template>
  <div class="background-tab">
    <Tabs value="1">
      <TabList>
        <Tab value="0"><i class="pi pi-file"></i></Tab>
        <Tab value="1"><i class="pi pi-bars"></i></Tab>
      </TabList>
      <TabPanels>
        <TabPanel value="0">
          <FormGroupInfo></FormGroupInfo>
        </TabPanel>
        <TabPanel value="1">
          <PropsInfoSpecList
            @setDialogUpdateStatus="openModalFunc"
            :listPropSpec="[]"
          ></PropsInfoSpecList>
          <!--          <div class="background-form-attr">-->
          <!--            <FormGroupSpecAttr-->
          <!--              :case="'open'"-->
          <!--              :showModal="openModal"-->
          <!--              @submitEvent="submitFormAttr"-->
          <!--              @closeForm="closeModal($event)"-->
          <!--            ></FormGroupSpecAttr-->
          <!--          </div>-->
          <PropsSpecAttrUpdate
            :showModal="openModal"
            @setDialogUpdateStatus="setModalInfoStatus"
            case="open"
            :data="{}"
            id=""
            :attribute="[]"
            name=""
            short-description=""
            description=""
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
import { defineProps, ref } from 'vue'
import type { IProposalSpecification } from '@/views/proposal/model/proposal.ts'
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'
import Button from 'primevue/button'
import PropsInfoSpecList from '@/views/proposal/detail/props-spec/props-info-spec-list.vue'
import FormGroupInfo from '@/views/proposal/form-control/formGroupInfo.vue'
import PropsSpecAttrUpdate from '@/views/proposal/detail/props-spec/props-spec-attr/props-spec-attr-update.vue'

const props = defineProps<IProposalSpecification>()
const emitEvent = defineEmits<{
  (event: 'updateAttr', param: { data?: any; pageCase: 'update' | 'create' }): void
  (event: 'updateSpec', param: { data?: any; pageCase: 'update' | 'create' }): void
}>()

const openModal = ref(false)

function closeForm() {
  console.log('closeForm')
}

function setModalInfoStatus(modalStatus: boolean) {
  openModal.value = modalStatus
}

//
// function submitFormAttr(param: { data: string; pageCase: string }) {
//   const { data, pageCase } = param
//   if (pageCase === 'update') {
//     return
//   }
//   console.log(data)
// }

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
  margin-bottom: 20px;
}
</style>
