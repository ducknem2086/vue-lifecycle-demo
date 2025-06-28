<template>
  <div class="background-proposal" :class="'show-detail'">
    <ListProposal
      @setDialogUpdateStatus="setDialogUpdateStatus(true)"
      :listPropSpec="[]"
    ></ListProposal>
    <PropsInfoSpecUpdate v-model="openUpdateModal" @closeForm="setDialogUpdateStatus(false)">
    </PropsInfoSpecUpdate>
  </div>
</template>
<style scoped lang="scss">
.background {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  min-width: 100%;
}

.background-proposal {
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;
  gap: 20px;
  height: 100%;

  &.show-detail {
    grid-template-columns: 2fr 1fr;
  }
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
