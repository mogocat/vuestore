import Vue from 'vue'
import Router from 'vue-router'

import CategoryForm from '@/pages/category/form'
import CategoryTree from '@/pages/category/tree'
import AccessoryIndex from '@/pages/accessory/index'

// import BuyIndex from '@/pages/buy/index'
// import BuyForm from '@/pages/buy/form'
// import BuyShow from '@/pages/buy/show'
//
// import SellIndex from '@/pages/sell/index'
// import SellForm from '@/pages/sell/form'
// import SellShow from '@/pages/sell/show'

import BusinessIndex from '@/pages/business/index'
import BusinessCreate from '@/pages/business/create'
import BusinessUpdate from '@/pages/business/edit'
import BusinessShow from '@/pages/business/show'

import StockIndex from '@/pages/stock/index'

import ContactIndex from '@/pages/contact/index'

Vue.use(Router)

const Parent = {
	template: `<router-view></router-view>`
}

export default new Router({
    routes: [
	    {path: '/accessory', components: {left: { render: h => h(CategoryTree)}, right: { render: h => h(AccessoryIndex)}}},
	    {path: '/buy', components: {main: {render: h => h(Parent)}},
	    children: [
	        {path: '', component: BusinessIndex},
			{path: 'add', component: BusinessCreate},
			{path: 'edit/:id', component: BusinessUpdate},
			{path: 'show/:id', component: BusinessShow}
	    ]},

	    {path: '/sell', components: {main: {render: h => h(Parent)}},
	    children: [
	        {path: '', component: BusinessIndex},
			{path: 'add', component: BusinessCreate},
			{path: 'edit/:id', component: BusinessUpdate},
			{path: 'show/:id', component: BusinessShow}
	    ]},

	    {path: '/stock', components: {left: { render: h => h(CategoryTree)}, right: { render: h => h(StockIndex)}}},

	    {path: '/contact', components: {main: {render: h => h(ContactIndex)}}},

	    { path: '/category', components: {left: { render: h => h(CategoryTree)}, right: { render: h => h(CategoryForm)}}}
	]
})
