<template>
  <Dialog>
    <template #header></template>
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
            <PropsInfoSpecList  :listPropSpec="props.data.attribute"></PropsInfoSpecList>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <!--  <FormControl @submitEvent="createAttibute($event)"></FormControl>-->
      <!--  <FormGroupSpecInfo></FormGroupSpecInfo>-->
    </div>
    <template #footer>
      <div class="row-item">
        <Button label="Close" @click="closeForm"></Button>
        <Button label="Submit" @click="submitForm" />
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import type { IProposalSpecification } from '@/views/proposal/model/proposal.ts'
import FormGroupSpecInfo from '@/views/proposal/form-control/formGroupSpecInfo.vue'
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'
import Button from 'primevue/button'
import PropsInfoSpecList from '@/views/proposal/detail/props-spec/props-info-spec-list.vue'

const props = defineProps<{
  data: IProposalSpecification
  openModal: boolean
}>()

function createAttibute(data: any) {
  console.log('createAttibute', data)
}

function closeForm() {}

function submitForm() {}
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
</style>
