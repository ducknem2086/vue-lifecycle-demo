<template>
  <div class="background-attr-form">
    <p><b>Proposal Group Spec info</b></p>
    <div class="background-attr-form-row" v-for="(control, index) in formControls" :key="index">
      <label class="background-attr-form-label">{{ control.title }}</label>

      <template v-if="control.type === 'textfield'">
        <InputText
          ref="input"
          v-model="formGroupSpecInfo[control.attribute]"
          class="w-full"
          placeholder="Enter value"
        />
      </template>

      <template v-else-if="control.type === 'textarea'">
        <Textarea
          v-model="formGroupSpecInfo[control.attribute]"
          class="w-full"
          placeholder="Enter text"
          rows="4"
        />
      </template>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineModel, reactive } from 'vue'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import type { ProposalSpecification } from '@/views/proposal-clone/model/proposal.ts'

const formGroupSpecInfo = defineModel<Omit<ProposalSpecification, 'attribute'>>()

const formControls = reactive([
  {
    attribute: 'name',
    type: 'textfield',
    value: '',
    title: 'Name',
  },
  {
    attribute: 'shortDescription',
    type: 'textarea',
    value: '',
    title: 'Short Description',
  },
  {
    title: 'Detail Description',
    attribute: 'description',
    type: 'textarea',
    value: '',
  },
])
</script>

<style scoped lang="scss">
.btn-group-extra-info {
  display: flex;
  gap: 10px;
  flex-direction: row;
  height: 30px;
  padding: 10px 0;
  margin: 10px 0;
  align-items: stretch;

  > input {
    height: inherit;
  }
}

.btn-layout-extra-info {
  display: flex;
  gap: 10px;
  flex-direction: row;
  height: 30px;
}

.row-item {
  display: flex;
  gap: 10px;
  flex-direction: row;
}

.background-attr-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  width: 100%;
}

.background-attr-form-row {
  display: grid;
  grid-template-columns: 150px auto;
  align-items: center;
  gap: 10px;
}

.row-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  line-height: 30px;
}
</style>
