<template>
  <b>Proposal Group Information</b>
  <div class="background-attr-form">
    <div class="background-attr-form-row" v-for="(control, index) in formControls" :key="index">
      <label class="background-attr-form-label">{{ control.title }}</label>

      <template v-if="control.type === 'textfield'">
        <InputText
          ref="input"
          v-model="propModel[control.attribute]"
          class="w-full"
          placeholder="Enter value"
        />
      </template>

      <template v-else-if="control.type === 'textarea'">
        <Textarea
          v-model="propModel[control.attribute]"
          class="w-full"
          placeholder="Enter text"
          rows="4"
        />
      </template>
      <template v-else-if="control.type === 'select'">
        <Dropdown
          :show-clear="true"
          v-model="propModel[control.attribute]"
          :options="control.options"
          optionLabel="label"
          optionValue="value"
          placeholder="Select option"
          class="w-full"
        />
      </template>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Dropdown from 'primevue/dropdown'
import type { IProposalItem } from '@/views/proposal/model/proposal.ts'

const propModel = defineModel<IProposalItem>()

onMounted(() => {
  console.log(propModel.value)
  if (propModel?.value && propModel.value?.id) {
    formControls.forEach(({ attribute }, index) => {
      formControls[index].value = propModel.value[attribute]
    })
  }
})

const formControls = reactive<
  {
    title: string
    attribute: string
    type: string
    value: any
    options?: any
    disabled?: boolean
  }[]
>([
  {
    title: 'Name',
    attribute: 'name',
    type: 'textfield',
    value: '',
  },
  {
    title: 'Code',
    attribute: 'code',
    type: 'textfield',
    value: '',
  },
  {
    title: 'Group Type',
    attribute: 'groupType',
    type: 'select',
    value: '',

    options: [
      { label: 'Common', value: 'Common' },
      { label: 'Price', value: 'Price' },
      { label: 'Commitment', value: 'Interest' },
      {
        label: 'Interest',
        value: 'Interest',
      },
      {
        label: 'Qualification',
        value: 'Qualification',
      },
      {
        label: 'Other',
        value: 'Other',
      },
    ],
  },
  {
    title: 'State',
    attribute: 'state',
    type: 'textfield',
    value: 'Active',
    disabled: true,
    options: [
      { name: 'Active', value: 'active' },
      { name: 'Inactive', value: 'inactive' },
    ],
  },
  {
    title: 'Description',
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
