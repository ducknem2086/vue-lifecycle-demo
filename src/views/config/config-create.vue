<template>
  <form class="d-flex flex-wrap flex-column" @submit.prevent="submitForm">
      <v-row class="w-100 pa-0 ma-0 ">
        <v-col class="v-col-6">
          <VueDatePicker
            :format="formatDate"
            v-model="dateFrom"
            v-bind="dateFromAttr"
            required
          ></VueDatePicker>
          <v-text-field
            v-model="desc"
            v-bind="descAttr"
            placeholder="Insert desc"
            required
          ></v-text-field>
        </v-col>
        <v-col class="v-col-6">
          <VueDatePicker
            :format="formatDate"
            v-model="dateTo"
            v-bind="dateToAttr"
            required
          ></VueDatePicker>
          <v-select
            clearable
            v-model="configType"
            v-bind="configTypeAttr"
            :items="listConfigType"
            :item-title="'name'"
            :item-value="'id'"
            placeholder="Select configType"
          ></v-select>
        </v-col>
      </v-row>
      <v-btn type="submit" color="primary">Create config</v-btn>
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
import VueDatePicker from '@vuepic/vue-datepicker'
import { defineProps, onBeforeMount, ref } from 'vue'
import { formatDate } from '@/shared/util.ts'
import { useForm } from 'vee-validate'
import * as yup from 'yup'

const schema = yup.object({
  dateFrom: yup.date().required(),
  dateTo: yup.date().required(),
  configType: yup.string().required(),
  desc: yup.string(),
})

const { defineField } = useForm({
  validationSchema: schema,
})

const [dateFrom, dateFromAttr] = defineField('dateFrom')
const [dateTo, dateToAttr] = defineField('dateTo')
const [desc, descAttr] = defineField('desc')
const [configType, configTypeAttr] = defineField('configType')

const listConfigType = ref<any[]>([])

onBeforeMount(() => {
  getListConfigType()
})
const emit = defineEmits<{
  (event: 'getListConfig'): void
}>()

const prop = defineProps<{
  linkApi: string
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
    })
    .catch((error) => console.error(error))
}

function getListConfigType(): void {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
  }
  fetch(prop.linkApi + `/configType`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      listConfigType.value = res[0]
      console.log(res)
    })
    .catch((error) => console.error(error))
}
</script>
