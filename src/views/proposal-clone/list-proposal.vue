<template>
  <div class="background-list">
    <p><b>Proposal Group Specification</b></p>
    <div class="background-search">
      <InputText
        placeholder="Press enter to search"
        class="background-search-input"
        @change="searchData($event)"
      ></InputText>
      <Button severity="info" @click="createSpec()">Create</Button>
    </div>
    <div class="background-table">
      <DataTable :value="store.getListProps">
        <Column
          v-for="col of columns"
          :key="col.field"
          :field="col.field"
          :header="col.header"
        ></Column>
        <Column :header="'Action'">
          <template #body="{ data }">
            <div class="btn-icon-group">
              <i :class="'pi pi-pen-to-square'" @click="updateRow(data.id)"></i>
              <i :class="'pi pi-trash'" @click="deleteRow"></i>
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import { usePropsStore } from '@/stores/proposal.ts'

const props = defineProps<{
  listPropSpec: any[]
}>()
const emitEvent = defineEmits<{
  (event: 'setDialogUpdateStatus', status: boolean): void
  (event: 'updateAttr', param: { data?: any; pageCase: 'update' | 'create' }): void
  (event: 'updateSpec', param: { data?: any; pageCase: 'update' | 'create' }): void
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

function createSpec() {
  emitEvent('setDialogUpdateStatus', true)
}

function searchData(eventSearch: any) {
  console.log(eventSearch.target.value)
}

function deleteRow(data: any) {
  console.log(data)
}

function updateRow(data: any) {
  emitEvent('setDialogUpdateStatus', true)
  store.setCurrentProps(data)
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
