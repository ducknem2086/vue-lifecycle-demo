<template>
  <div class="d-block">
    <form @submit.prevent="submitForm">
      <v-text-field v-model="form.name" label="Name" :error-messages="errors.name" />
      <v-btn type="submit" color="primary">Create config type</v-btn>
    </form>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from 'vue'

defineEmits<{
  (event: 'getListConfigType'): void
}>()
const form = reactive({
  name: '',
})
const errors = reactive({
  name: '',
})

function validate() {
  let valid = true
  errors.name = ''

  if (!form.name) {
    errors.name = 'Name is required'
    valid = false
  }

  return valid
}

function submitForm() {
  const apiLink = 'http://localhost:4000'
  if (!validate()) {
    return
  }
  const { name } = form
  console.log(name)
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify({
      name: name,
    }),
  }
  fetch(apiLink + `/configType`, requestOptions)
    .then((response) => response.json())
    .then(() => {
      form.name = ''
    })
    .catch((error) => console.error(error))
}
</script>
<style lang="scss"></style>
