import Vue from 'vue'
import app from './app'
import router from './router'
import store from './store'
import { sync } from 'vuex-router-sync'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueRouter from 'vue-router'
import axios from 'axios'

import lib from './components/lib'
import config from './components/config'
axios.defaults.baseURL = 'http://localhost:3000'
sync(store, router)

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(ElementUI)
// vue-resource已经被官方弃用 推荐了axios
Vue.prototype.$http = axios
Vue.prototype.$lib = lib
Vue.prototype.$config = config


new Vue({ // eslint-disable-line
    el: '#app',
	router,
	store,
    render: h => h(app)
})
