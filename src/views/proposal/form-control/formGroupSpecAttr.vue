<template>
  <Dialog
    :visible="props?.showModal"
    modal
    header="Proposal Attibute"
    :style="{ width: '25rem', minWidth: 'max-content' }"
    @update:visible="setDialogStatus($event)"
  >
    <template #header></template>
    <div class="background-attr-form">
      <div class="background-attr-form-row" v-for="(control, index) in formControls" :key="index">
        <label class="background-attr-form-label">{{ control.attribute }}</label>

        <template v-if="control.type === 'textfield'">
          <InputText ref="input" v-model="control.value" class="w-full" placeholder="Enter value" />
        </template>

        <template v-else-if="control.type === 'select'">
          <Dropdown
            :show-clear="true"
            v-model="control.value"
            :options="control.options"
            optionLabel="label"
            optionValue="value"
            placeholder="Select option"
            class="w-full"
          />
        </template>

        <template v-else-if="control.layout && control.type === 'layout'">
          <div class="row-item">
            <label> Control Type </label>
            <div>
              <Dropdown
                v-model="control.layout.ctlType"
                :options="listOptionLayout"
                optionLabel="label"
                @change="clearChildrenValue($event, control)"
                optionValue="value"
                placeholder="Select option"
                :show-clear="true"
                class="w-full"
              />
            </div>
          </div>
        </template>

        <template v-if="control.layout && control.layout.ctlType === 'selectLov'">
          <label>Extra Info</label>
          <Dropdown
            v-model="control.layout.extInfo[0].value"
            :options="listSelectLovLayout"
            optionLabel="name"
            optionValue="id"
            :show-clear="true"
            placeholder="Select option"
            class="w-full"
          />
        </template>
        <template v-else-if="control.layout && control.layout.ctlType === 'selectList'">
          <div class="">
            <label>Extra Info</label>
            <div
              v-for="(item, idx) in control?.layout?.extInfo"
              :key="idx"
              class="btn-group-extra-info"
            >
              <InputText v-model="item.label" placeholder="Label" class="flex-1" />
              <InputText v-model="item.value" placeholder="Value" class="flex-1" />
              <div class="btn-layout-extra-info">
                <Button
                  icon="pi pi-trash"
                  severity="danger"
                  v-if="idx > 0"
                  @click="removeListItem(control, idx)"
                />
                <Button
                  v-if="idx === control?.layout?.extInfo?.length - 1"
                  icon="pi pi-plus"
                  outlined
                  @click="addListItem(control)"
                />
              </div>
            </div>
          </div>
        </template>

        <template v-else-if="control.type === 'radio'">
          <div class="flex gap-4">
            <div
              v-for="option in control.options"
              :key="option.value"
              class="flex items-center gap-2"
            >
              <RadioButton
                v-model="control.value"
                :inputId="`${control.attribute}-${option.value}`"
                :value="option.value"
              />
              <label :for="`${control.attribute}-${option.value}`">
                {{ option.label }}
              </label>
            </div>
          </div>
        </template>

        <template v-else-if="control.type === 'checkbox'">
          <div class="flex gap-4">
            <div
              v-for="option in control.options"
              :key="option.value"
              class="flex items-center gap-2"
            >
              <Checkbox
                v-model="control.value"
                :inputId="`${control.attribute}-${option.value}`"
                :value="option.value"
              />
              <label :for="`${control.attribute}-${option.value}`">
                {{ option.label }}
              </label>
            </div>
          </div>
        </template>

        <template v-else-if="control.type === 'textarea'">
          <Textarea v-model="control.value" class="w-full" placeholder="Enter text" rows="4" />
        </template>
      </div>
    </div>
    <template #footer>
      <div class="form-attr-footer">
        <Button label="Cancel" outlined severity="secondary" @click="setDialogStatus(false)" />
        <Button label="Save" severity="info" @click="submitForm" />
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { defineEmits, onBeforeMount, reactive } from 'vue'
import InputText from 'primevue/inputtext'
import Dropdown, { type DropdownChangeEvent } from 'primevue/dropdown'
import RadioButton from 'primevue/radiobutton'
import Checkbox from 'primevue/checkbox'
import Textarea from 'primevue/textarea'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'

const props = defineProps<{
  case: 'update' | 'open'
  data?: any
  showModal?: boolean
}>()

const emit = defineEmits<{
  (event: 'submitEvent', data: { data: any; pageCase: string }): void
  (event: 'closeForm'): void
}>()

const listOptionLayout = [
  {
    value: 'textBox',
    label: 'TextBox',
  },
  {
    value: 'textArea',
    label: 'TextArea',
  },
  {
    value: 'selectList',
    label: 'SelectList',
  },
  {
    value: 'selectLov',
    label: 'SelectLov',
  },
]
const listSelectLovLayout: {
  id: string
  name: string
}[] = []

onBeforeMount(() => {
  for (let i = 0; i < 100; i++) {
    const item: { id: string; name: string } = {
      id: 'lov' + i,
      name: 'lov_value' + i,
    }
    listSelectLovLayout.push(item)
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
    layout?: any
  }[]
>([
  {
    title: 'Code',
    attribute: 'code',
    type: 'textfield',
    value: '',
  },
  {
    title: 'Title',
    attribute: 'title',
    type: 'textfield',
    value: '',
  },
  {
    title: 'Data Type',
    attribute: 'dataType',
    type: 'select',
    value: '',
    options: [
      { label: 'String', value: 'stirng' },
      { label: 'Number', value: 'number' },
      { label: 'Object', value: 'object' },
    ],
  },
  {
    title: 'Value',
    attribute: 'value',
    type: 'textfield',
    value: '',
  },
  {
    title: 'Layout',

    attribute: 'layout',
    type: 'layout',
    value: '',
    layout: {
      extInfo: [{ label: '', value: '' }],
      ctlType: '',
    },
  },

  // {
  //   attribute: 'Gender',
  //   type: 'radio',
  //   value: '',
  //   options: [
  //     { label: 'Male', value: 'male' },
  //     { label: 'Female', value: 'female' },
  //   ],
  // },
  // {
  //   attribute: 'Interests',
  //   type: 'checkbox',
  //   value: [],
  //   options: [
  //     { label: 'Sports', value: 'sports' },
  //     { label: 'Music', value: 'music' },
  //     { label: 'Travel', value: 'travel' },
  //   ],
  // },
  // {
  //   attribute: 'Biography',
  //   type: 'textarea',
  //   value: '',
  // },
])

// Define dynamic form controls
function clearChildrenValue(event: DropdownChangeEvent, control: any) {
  control.layout && (control.layout.extInfo = [{ label: '', value: '' }])
}

// Functions for list item control
function addListItem(control: any) {
  console.log(control)
  control.layout.extInfo.push({ label: '', value: '' })
}

function removeListItem(control: any, idx: any) {
  control.layout.extInfo.splice(idx, 1)
}

// Submit form logic
function setDialogStatus(status: boolean) {
  emit('closeForm', status)
}

function submitForm() {
  const formData: any = {}
  formControls.forEach((ctrl) => {
    console.log(ctrl.value)
    if (!ctrl.layout && !ctrl.value) {
      return
    }
    if ('layout' in ctrl) {
      if (ctrl.layout?.ctlType) {
        ;(formData as any)[ctrl.attribute] = ctrl.layout
      } else {
        ;(formData as any)[ctrl.attribute] = ctrl.value
      }
    } else {
      ;(formData as any)[ctrl.attribute] = ctrl.value
    }
  })
  if (!formData?.layout) {
    delete formData?.layout
  }
  console.log(formData)
  emit('submitEvent', formData)
}
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
  width: 500px;
}

.form-attr-footer {
  display: flex;
  flex-direction: row;
  gap: 20px;
  width: 100%;
  justify-content: center;
}

.background-attr-form-row {
  display: grid;
  grid-template-columns: 150px auto;
  align-items: center;
  width: 100%;
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
