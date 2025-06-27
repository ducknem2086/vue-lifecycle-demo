<template>
  <Dialog>
    <template #header></template>
    <div class="background-tab">
      <Tabs value="1">
        <TabList>
          <Tab value="0">Header I</Tab>
          <Tab value="1">Header II</Tab>
        </TabList>
        <TabPanels>
          <TabPanel value="0">
            <PropsInfoSpecUpdate
              :attribute="[]"
              :name="''"
              :shortDescription="''"
              :description="''"
              :id="''"
            ></PropsInfoSpecUpdate>
          </TabPanel>
          <TabPanel value="1">
            <PropsSpecAttrList :listPropSpec="props.data.attribute"></PropsSpecAttrList>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <!--  <FormControl @submitEvent="createAttibute($event)"></FormControl>-->
      <!--  <FormGroupSpecInfo></FormGroupSpecInfo>-->
    </div>
    <template #footer>
      <div class="row-item-footer">
        <Button label="Close" outlined @click="closeForm"></Button>
        <Button severity="info" label="Submit" @click="submitForm" />
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import type { IProposalSpecification } from '@/views/proposal/model/proposal.ts'
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'
import Button from 'primevue/button'
import PropsSpecAttrList from '@/views/proposal/detail/props-spec/props-spec-attr/props-spec-attr-list.vue'
import PropsInfoSpecUpdate from '@/views/proposal/detail/props-spec/props-info-spec-update.vue'

const props = defineProps<{
  data: IProposalSpecification
  openModal: boolean
}>()

function createAttibute(data: any) {
  console.log('createAttibute', data)
}

function closeForm() {

}

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

.row-item-footer {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: end;
  padding-bottom: 20px;
}
</style>
