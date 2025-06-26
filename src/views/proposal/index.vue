<template>
  <div class="background">
    <div>
      <h1>propsosal component work !</h1>
    </div>
    <div class="background-page">
      <div class="props-item">
        <ListProposal></ListProposal>

        <PropsInfoSpecUpdate
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
  border: 1px solid black;
  min-height: 100%;
  min-width: 100%;
}

.background-page {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
}

.background-page.open-update {
  grid-template-columns: 2fr 1fr;
}
</style>
<script setup lang="ts">
import ListProposal from '@/views/proposal/list-proposal.vue'
import PropsInfoTotal from '@/views/proposal/detail/props-info-total.vue'
import PropsInfoSpecUpdate from '@/views/proposal/detail/props-spec/props-info-spec-update.vue'
</script>
