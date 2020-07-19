import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/reset.css' // 全局样式
import axios from 'axios' // 封装的axios请求

Vue.prototype.$http = axios
Vue.use(ElementUI)
Vue.config.productionTip = false
new Vue({
    el: '#app',
    router,
    components: {
        App
    },
    template: '<App/>'
})