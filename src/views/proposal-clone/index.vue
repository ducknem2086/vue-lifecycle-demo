<template>
  <div class="background">
    <div class="background-page">
      <div class="page-item">
        <ListProposal
          @setDialogUpdateStatus="setDialogUpdateStatus(true)"
          :listPropSpec="[]"
        ></ListProposal>
      </div>

      <div v-if="openUpdateModal" class="page-item">
        <PropsInfoSpecUpdate
          @closeForm="setDialogUpdateStatus(false)"
          :attribute="[]"
          :name="''"
          :shortDescription="''"
          :description="''"
          :id="''"
        >
        </PropsInfoSpecUpdate>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.background {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  min-width: 100%;
}

.background-page {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
  height: 100%;
}

.background-page.open-update {
  grid-template-columns: 2fr 1fr;
}

.page-item {
  padding: 20px;
  border-radius: 10px;
  background: white;
  height: 100%;
}
</style>
<script setup lang="ts">
import { ref } from 'vue'
import ListProposal from '@/views/proposal-clone/list-proposal.vue'
import PropsInfoSpecUpdate from '@/views/proposal-clone/detail/props-spec/props-info-spec-update.vue'

const openUpdateModal = ref(false)

function setDialogUpdateStatus(updateStatus: boolean): void {
  openUpdateModal.value = updateStatus
}
</script>
