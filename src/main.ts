import { createApp, h } from 'vue'
import singleSpaVue from 'single-spa-vue'

import './assets/main.css'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createPinia } from 'pinia'
import 'vuetify/styles'
import './assets/vuetify-custom.scss'
import App from './App.vue'
import router from './router'
import { createVuetify } from 'vuetify/framework'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { VDateInput } from 'vuetify/labs/VDateInput'

const myCustomLightTheme = {
  dark: false,
  colors: {
    primary: '#4CAF50', // ✅ your new primary color (e.g., green)
    secondary: '#03A9F4', // optional
    error: '#FF5252', // optional
    background: 'white',
  },
}

const vuetify = createVuetify({
  components: {
    ...components,
    VDateInput,
  },
  directives,
  theme: {
    defaultTheme: 'myCustomLightTheme',
    themes: {
      myCustomLightTheme,
    },
  },
})

const vueLifecycles = singleSpaVue({
  createApp,
  appOptions: {
    render() {
      return h(App, {
        props: {
          // single-spa props are available on the "this" object. Forward them to your component as needed.
          // https://single-spa.js.org/docs/building-applications#lifecyle-props
        },
      })
    },
  },
  handleInstance(app) {
    app.use(vuetify).use(createPinia()).component('VueDatePicker', VueDatePicker).use(router)
  },
})

export const bootstrap = vueLifecycles.bootstrap
export const mount = vueLifecycles.mount
export const unmount = vueLifecycles.unmount
