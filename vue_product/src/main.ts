import './assets/main.css'
import './styles/main.css'
import { createApp } from 'vue'
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from '~pages'

import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import quasarLang from 'quasar/lang/zh-CN'
import { Dialog, Loading, Notify, Quasar } from 'quasar'
import quasarIconSet from 'quasar/icon-set/fontawesome-v6'

// Import icon libraries
import '@quasar/extras/fontawesome-v6/fontawesome-v6.css'

// Import Quasar css
import 'quasar/src/css/index.sass'

const app = createApp(App)

Notify.registerType('success', {
  icon: 'fas fa-check',
  progress: true,
  color: 'positive',
  position: 'top',
  timeout: 3000,
})
Notify.registerType('danger', {
  icon: 'fas fa-bug',
  progress: true,
  color: 'negative',
  position: 'top',
  timeout: 3000,
})
Notify.registerType('warn', {
  icon: 'fas fa-exclamation',
  progress: true,
  color: 'warning',
  position: 'top',
  timeout: 3000,
})
Notify.registerType('loading', {
  spinner: true,
  color: 'warning',
  position: 'top',
  timeout: 0,
  group: false,
})


app.use(router).use(ElementPlus).use(Quasar, {
  plugins: {
    Notify,
    Dialog,
    Loading,
  },
  lang: quasarLang,
  iconSet: quasarIconSet,
  config: {
    dark: false,
  },
})

app.mount('#app')
