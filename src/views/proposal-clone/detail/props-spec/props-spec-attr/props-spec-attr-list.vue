<template>
  <div class="background-list">
    <p><b>Attribute tab</b></p>
    <div class="background-search">
      <InputText
        placeholder="Press enter to search"
        class="background-search-input"
        @change="searchData($event)"
      ></InputText>

      <Button severity="info" @click="createSpec()">Create</Button>
    </div>
    <div class="background-table">
      <DataTable :rows="3" :rowsPerPageOptions="[1, 2, 3, 4]" :value="listAttrSpec">
        <Column
          v-for="col of columns"
          :key="col.field"
          :field="col.field"
          :header="col.header"
        ></Column>
        <Column :header="'Action'">
          <template #body="{ data, index }">
            <div class="btn-icon-group">
              <i :class="'pi pi-pen-to-square'" @click="updateRow(data)"></i>
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
  (
    event: 'setDialogAttrStatus',
    param: {
      attrId: string
      status: boolean
    },
  ): void
}>()

const columns = [
  {
    field: 'code',
    header: 'Code',
  },
  {
    field: 'title',
    header: 'Title',
  },
  {
    field: 'dataType',
    header: 'Data Type',
  },
]

const store = usePropsStore()
const searchText = ref<string>('')
const listAttrSpec = computed(() => {
  return store.listAttribute.filter((x) =>
    x.title.toLowerCase().includes(searchText.value.toLowerCase()),
  )
})

function createSpec() {
  emitEvent('setDialogAttrStatus', {
    attrId: '',
    status: true,
  })
}

function searchData(eventSearch: any) {
  searchText.value = eventSearch.target.value
}

function deleteRow(index: number) {
  store.deleteAttributeWithSpec(index)
}

function updateRow(data?: any) {
  console.log(data)
  emitEvent('setDialogAttrStatus', {
    attrId: data.code,
    status: true,
  })
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
