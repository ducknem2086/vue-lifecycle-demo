<template>
  <form class="d-flex flex-wrap flex-column" @submit.prevent="submitForm">
    <v-row class="w-100 ma-0">
      <v-col class="v-col-6">
        <v-date-input
          prepend-icon=""
          variant="outlined"
          placeholder="From date"
          class="w-100"
          :format="formatDate"
          v-model="dateFrom"
          v-bind="dateToAttr"
        ></v-date-input>
        <v-text-field
          v-model="desc"
          v-bind="descAttr"
          variant="outlined"
          placeholder="Insert desc"
          required
        ></v-text-field>
      </v-col>
      <v-col class="v-col-6">
        <v-date-input
          placeholder="To date"
          prepend-icon=""
          :format="formatDate"
          v-model="dateTo"
          v-bind="dateToAttr"
          variant="outlined"
          class="datepicker"
        ></v-date-input>
        <v-select
          clearable
          v-model="configType"
          v-bind="configTypeAttr"
          :items="prop.listConfigType"
          :item-title="'name'"
          :item-value="'id'"
          placeholder="Select config type"
          variant="outlined"
        ></v-select>
      </v-col>
      <v-col>
        <v-btn class="w-100 px-2" type="submit" color="primary">Create config</v-btn>
      </v-col>
    </v-row>
  </form>
</template>
<style lang="scss">
.background-form {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
}
</style>
<script lang="ts" setup>
import { defineProps, onMounted } from 'vue'
import { formatDate } from '@/shared/util.ts'
import { useForm } from 'vee-validate'
import * as yup from 'yup'

const schema = yup.object({
  dateFrom: yup.date().required(),
  dateTo: yup.date().required(),
  configType: yup.string().required(),
  desc: yup.string(),
})

const { defineField, resetForm } = useForm({
  validationSchema: schema,
})

const [dateFrom, dateFromAttr] = defineField('dateFrom')
const [dateTo, dateToAttr] = defineField('dateTo')
const [desc, descAttr] = defineField('desc')
const [configType, configTypeAttr] = defineField('configType')
//
// const listConfigType = ref<any[]>([])

onMounted(() => {
  emit('getListConfigType')
})
const emit = defineEmits<{
  (event: 'getListConfig'): void
  (event: 'getListConfigType'): void
}>()

const prop = defineProps<{
  linkApi: string
  listConfigType: any[]
}>()

function submitForm() {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify({
      desc: desc.value,
      configTypeId: configType.value,
      dateTo: formatDate(dateTo.value),
      dateFrom: formatDate(dateFrom.value),
    }),
  }
  fetch(prop.linkApi + `/config`, requestOptions)
    .then((response) => response.json())
    .then(() => {
      emit('getListConfig')
      resetForm()
    })
    .catch((error) => console.error(error))
}
</script>
