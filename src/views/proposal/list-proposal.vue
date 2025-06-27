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
      <DataTable :value="mockDataTable">
        <Column
          v-for="col of columns"
          :key="col.field"
          :field="col.field"
          :header="col.header"
        ></Column>
        <Column :header="'Action'">
          <template #body="{ data }">
            <div class="btn-icon-group">
              <i :class="'pi pi-pen-to-square'" @click="updateRow"></i>
              <i :class="'pi pi-trash'" @click="deleteRow"></i>
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

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
    field: 'desc',
    header: 'Mô tả',
  },
]

const mockDataTable = ref([
  {
    name: 'test',
    desc: 'test',
  },
])

function createSpec() {
  emitEvent('setDialogUpdateStatus', true)
}

function searchData(eventSearch: any) {
  console.log(eventSearch.target.value)
}

function deleteRow() {}

function updateRow(data: any) {
  console.log(data)
  emitEvent('setDialogUpdateStatus', true)
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
