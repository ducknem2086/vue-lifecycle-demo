<template>
  <Dialog
    :visible="props?.showModal"
    modal
    header="Proposal Attibute"
    :style="{ width: '25rem', minWidth: 'max-content' }"
    @update:visible="closeForm()"
  >
    <template #header></template>
    <div class="background-attr-form">
      <div class="background-attr-form-row" v-for="(control, index) in formControls" :key="index">
        <label class="background-attr-form-label">{{ control.attribute }}</label>

        <template v-if="control.type === 'textfield'">
          <InputText
            ref="input"
            v-model="attrFormData[control.attribute]"
            class="w-full"
            placeholder="Enter value"
          />
        </template>

        <template v-else-if="control.type === 'select'">
          <Dropdown
            :show-clear="true"
            v-model="attrFormData[control.attribute]"
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
                v-model="attrFormData.layout.ctlType"
                :options="listOptionLayout"
                optionLabel="label"
                @change="clearChildrenValue()"
                optionValue="value"
                placeholder="Select option"
                :show-clear="true"
                class="w-full"
              />
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
                v-model="attrFormData[control.attribute]"
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
                v-model="attrFormData[control.attribute]"
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
          <Textarea
            v-model="attrFormData[control.attribute]"
            class="w-full"
            placeholder="Enter text"
            rows="4"
          />
        </template>
      </div>
      <template v-if="attrFormData.layout && attrFormData.layout.ctlType === 'SELECT-LOV'">
        <label>Extra Info</label>
        <Dropdown
          v-model="attrFormData.layout.extInfo[0].value"
          :options="listSelectLovLayout"
          optionLabel="name"
          optionValue="id"
          :show-clear="true"
          placeholder="Select option"
          class="w-full"
        />
      </template>
      <template v-else-if="attrFormData.layout && attrFormData.layout.ctlType === 'SELECT-LIST'">
        <div class="">
          <label>Extra Info</label>
          <div
            v-for="(item, idx) in attrFormData.layout?.extInfo"
            :key="idx"
            class="btn-group-extra-info"
          >
            <InputText v-model="(item as any).label" placeholder="Label" class="flex-1" />
            <InputText v-model="(item as any).value" placeholder="Value" class="flex-1" />
            <div class="btn-layout-extra-info">
              <Button
                icon="pi pi-trash"
                severity="danger"
                v-if="idx > 0"
                @click="removeListItem(attrFormData, idx)"
              />
              <Button
                v-if="idx === attrFormData?.layout?.extInfo?.length - 1"
                icon="pi pi-plus"
                outlined
                @click="addListItem(attrFormData)"
              />
            </div>
          </div>
        </div>
      </template>
    </div>
    <template #footer>
      <div class="form-attr-footer">
        <Button label="Cancel" outlined severity="secondary" @click="closeForm" />
        <Button label="Save" severity="info" @click="submitForm" />
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, onBeforeMount, reactive, watch } from 'vue'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import RadioButton from 'primevue/radiobutton'
import Checkbox from 'primevue/checkbox'
import Textarea from 'primevue/textarea'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import type { Attribute } from '@/views/proposal/model/proposal.ts'
import { usePropsStore } from '@/stores/proposal.ts'

const props = defineProps<{
  showModal?: boolean
  attrId?: string
}>()

const emit = defineEmits<{
  (event: 'closeForm'): void
}>()
const store = usePropsStore()

const listOptionLayout = [
  { label: 'TEXTBOX', value: 'TEXTBOX' },
  { label: 'TEXTAREA', value: 'TEXTAREA' },
  { label: 'SELECT-LIST', value: 'SELECT-LIST' },
  { label: 'SELECT-LOV', value: 'SELECT-LOV' },
]
const listSelectLovLayout: {
  id: string
  name: string
}[] = []

let attrFormData = reactive<Attribute>({
  layout: {
    extInfo: [],
    ctlType: '',
  },
  code: '',
  title: '',
  dataType: '',
  value: '',
  index: 0,
})

watch(
  () => props.showModal,
  () => {
    console.log(props.attrId)
    if (props.attrId && !!props.showModal) {
      const attrData = store.listAttribute.find((x: Attribute) => x.code === props.attrId)
      if (attrData) {
        attrFormData = Object.assign({}, attrData)
      }
    } else {
      attrFormData = {
        layout: {
          extInfo: [],
          ctlType: '',
        },
        code: '',
        title: '',
        dataType: '',
        value: '',
        index: 0,
      }
    }
  },
)

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
])

// Define dynamic form controls
function clearChildrenValue() {
  attrFormData?.layout?.extInfo && (attrFormData.layout.extInfo = [{ label: '', value: '' }])
}

// Functions for list item control
function addListItem(control: any) {
  control.layout.extInfo.push({ label: '', value: '' })
}

function removeListItem(control: any, idx: any) {
  control.layout.extInfo.splice(idx, 1)
}

function closeForm() {
  emit('closeForm')
}

function submitForm() {
  console.log(attrFormData)
  if (attrFormData.index === 0) {
    attrFormData.index = store.listAttribute.length
    store.createNewAttr(attrFormData)
    closeForm()

    return
  }
  store.updateAttributeWithSpec(Object.assign({}, attrFormData))
  closeForm()
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
