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
      <DataTable
        paginator
        :rows="5"
        :rowsPerPageOptions="[1,2,3,4]"
        table-style="min-width:100%"
        :value="listPropsFilter"
      >
        <Column
          v-for="col of columns"
          :key="col.field"
          :field="col.field"
          :header="col.header"
        ></Column>
        <Column :header="'Action'">
          <template #body="{ data, index }">
            <div class="btn-icon-group">
              <i :class="'pi pi-pen-to-square'" @click="updateRow(data.id)"></i>
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
import { computed, ref } from 'vue'

const emitEvent = defineEmits<{
  (event: 'setDialogUpdateStatus', status: boolean): void
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
const searchText = ref<string>('')
const listPropsFilter = computed(() => {
  return (
    store?.listProps?.filter((x) =>
      x.name.toLowerCase().includes(searchText.value.toLowerCase()),
    ) ?? []
  )
})

function createSpec() {
  emitEvent('setDialogUpdateStatus', true)
  store.resetStoreData({
    currentAttribute: true,
    currentProps: true,
    listAttribute: true,
  })
}

function searchData(eventSearch: any) {
  searchText.value = eventSearch.target.value
}

function deleteRow(index: number) {
  store.deleteProposal(index)
}

function updateRow(data: any) {
  emitEvent('setDialogUpdateStatus', true)
  store.setCurrentProps(data)
  console.log(store.currentProps)
}
</script>
<style scoped lang="scss">
.background-list {
  width: 100%;
  height: 100%;
  background: white;
  border-radius: 10px;
  padding: 20px;
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
