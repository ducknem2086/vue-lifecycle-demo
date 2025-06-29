<template>
  <div ref="parentRef" class="background-proposal" :class="openUpdateModal ? 'show-detail' : ''">
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
  padding: 20px;
  height: 100%;

  &.show-detail {
    grid-template-columns: 2fr 400px;
  }
}
</style>
<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import ListProposal from '@/views/proposal-clone/list-proposal.vue'
import PropsInfoSpecUpdate from '@/views/proposal-clone/detail/props-spec/props-info-spec-update.vue'
import gsap from 'gsap'
import Flip from 'gsap/Flip'

const parentRef = ref<HTMLElement | null>(null)
gsap.registerPlugin(Flip)

const openUpdateModal = ref(false)

watch(openUpdateModal, async () => {
  const state = Flip.getState(parentRef.value?.children as any) // capture child layout

  await nextTick() // wait for class change to reflect in DOM

  Flip.from(state, {
    duration: 0.6,
    ease: 'power2.inOut',
    stagger: 0.04,
  });
})

function setDialogUpdateStatus(updateStatus: boolean): void {
  openUpdateModal.value = updateStatus
}
</script>
