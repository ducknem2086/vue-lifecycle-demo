import './assets/main.css'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'vuetify/styles'
import './assets/vuetify-custom.scss'
import App from './App.vue'
import router from './router'
import { createVuetify } from 'vuetify/framework'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const app = createApp(App)

// 🟦 Custom theme with new primary color
const myCustomLightTheme = {
  dark: false,
  colors: {
    primary: '#4CAF50', // ✅ your new primary color (e.g., green)
    secondary: '#03A9F4', // optional
    error: '#FF5252', // optional
    background: '#222222',
  },
}

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'myCustomLightTheme',
    themes: {
      myCustomLightTheme,
    },
  },
})

app
  .use(createPinia())
  .component('VueDatePicker', VueDatePicker)
  .use(router)
  .use(vuetify)
  .mount('#app')
