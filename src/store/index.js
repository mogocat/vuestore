import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import createLogger from '../plugins/logger'
import category from './modules/category-store.js'
import accessory from './modules/accessory-store.js'
import contact from './modules/contact-store.js'
import business from './modules/business-store.js'
import stock from './modules/stock-store.js'
import record from './modules/record-store.js'

Vue.use(Vuex)

export default new Vuex.Store({
	actions,
	getters,
	modules:{
		category: category,
		accessory: accessory,
		contact: contact,
		business: business,
		record: record,
		stock: stock
	},
	plugins: [createLogger()]
})
