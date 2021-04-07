import Vue from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'

import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'

import FcEditor from "@form-create/component-wangeditor"
import formCreate from '@form-create/iview'

formCreate.component('editor', FcEditor)

Vue.config.productionTip = false

Vue.use(ViewUI)
Vue.use(formCreate)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
