<template>
  <div class="pa-2 d-flex">
    <form class="d-flex flex-wrap flex-column ga-2" @submit.prevent="submitForm">
      <div class="background-form">
        <VueDatePicker
          style="width: 200px"
          :format="formatDate"
          v-model="form.dateFrom"
          required
        ></VueDatePicker>
        <VueDatePicker
          style="width: 200px"
          :format="formatDate"
          v-model="form.dateTo"
          required
        ></VueDatePicker>
        <v-text-field v-model="form.desc" placeholder="Insert desc" required></v-text-field>
        <v-select v-model="form.configTypeId" placeholder="Select configType"></v-select>
      </div>
      <v-btn type="submit" color="primary">Create</v-btn>
    </form>
  </div>
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
import { reactive } from 'vue'

const form = reactive({
  dateFrom: new Date(),
  dateTo: new Date(),
  desc: '',
  configTypeId: '',
})

function submitForm() {
  const { desc, dateTo, dateFrom, configTypeId } = form
  console.log('submit', form)
}

const formatDate = (date: Date) => {
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()

  return `${day}/${month}/${year}`
}
</script>
