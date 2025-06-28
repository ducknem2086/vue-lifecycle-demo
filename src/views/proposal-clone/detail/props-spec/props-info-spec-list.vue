<template>
  <div class="background-list">
    <p class="padding-2"><b>Proposal Group Specification</b></p>
    <div class="background-search">
      <InputText
        placeholder="Press enter to search"
        class="background-search-input"
        @change="searchData($event)"
      ></InputText>
      <Button severity="info" @click="openDialogAttr()">Create</Button>
    </div>
    <div class="background-table">
      <DataTable :value="store.currentProps.proposalSpecification">
        <Column
          v-for="col of columns"
          :key="col.field"
          :field="col.field"
          :header="col.header"
        ></Column>
        <Column :header="'Action'">
          <template #body="{ data, index }">
            <div class="btn-icon-group">
              <i :class="'pi pi-pen-to-square'" @click="openDialogAttr(data)"></i>
              <i :class="'pi pi-trash'" @click="deleteRow(index)"></i>
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup lang="ts">
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import { usePropsStore } from '@/stores/proposal.ts'
import type { ProposalSpecification } from '@/views/proposal-clone/model/proposal.ts'

const emitEvent = defineEmits<{
  (
    event: 'setDialogAttrStatus',
    param: {
      status: boolean
      specId: string
    },
  ): void
}>()

const columns = [
  {
    field: 'name',
    header: 'Tên',
  },
  {
    field: 'description',
    header: 'Mô tả',
  },
]
const store = usePropsStore()

function openDialogAttr(data?: ProposalSpecification) {
  emitEvent('setDialogAttrStatus', {
    specId: data?.id,
    status: true,
  })
}

function deleteRow(index: number) {
  store.deleteProposalSpecDetails(index)
}

function searchData(eventSearch: any) {
  console.log(eventSearch.target.value)
}
</script>
<style scoped lang="scss">
.background-list {
  width: 100%;
}

.btn-icon-group {
  display: flex;
  flex-direction: row;
  gap: 20px;
}

.background-search {
  display: grid;
  grid-template-columns: 1fr 100px;
  gap: 20px;
  margin-bottom: 20px;
}
</style>
