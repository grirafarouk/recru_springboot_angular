import Vue from 'vue'
import App from './App'
import router from './router'
import MultiLanguage from 'vue-multilanguage'
import language from '../static/lang/language'
import VeeValidate from 'vee-validate'
//import { Validator } from 'vee-validate'
import messagesFr from '../static/messageValidate/fr.js'
import messagesAr from '../static/messageValidate/ar.js'
import BootstrapVue from 'bootstrap-vue'
import Vue2_datePicker from 'vue2-datepicker'
import Multiselect from '../static/vue-multiselect/vue-multiselect.min.js'
import VueGoodTable from '../static/goodTable/vue-good-table.min.js'
import '../static/goodTable/vue-good-table.css'

Vue.use(VueGoodTable)
Vue.use(Vue2_datePicker) 
Vue.use(BootstrapVue) 
Vue.component('multiselect', Multiselect)
Vue.use( MultiLanguage, language )
Vue.use(VeeValidate, {
  locale: 'fr' ,
  dictionary: { 
      fr: { 
          messages: messagesFr,       
      },
      ar: { 
          messages: messagesAr,  
      }
  }
});




/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {

    App
  }
})
