import axios from 'axios'
import * as types from '../mutation-types'
import lib from '@/components/lib'
import config from '@/components/config'
import _ from 'lodash'

const url = '/stock'

const state = {
    cate: 1,
	list: []
}

const getters = {
    stockList(){
        _.forEach(state.list, function(item){
			item.serial = item.cate + "-" + item.code
		})
		return _.filter(state.list, function(item){
			return item.cate.toString().indexOf(state.cate) === 0
		})
    }
}

const actions = {
	[types.LOAD_STOCK_TABLE]({commit}) {
		axios.get(url).then(response => {
			commit(types.LOAD_STOCK_TABLE, {list: response.data})
			// 调用mutation中对应的函数 触发数据的实际变动
		}, error => {
			// TODO: error handling
		})
	}
}

// 状态实际发生变化时触发
const mutations = {
    [types.CHOOSE_CATEGORY_ITEM](state, {code}){
        state.cate = code
	},
	[types.LOAD_STOCK_TABLE](state, {list}){
		state.list = list
	}
}

export default{
	state,
	getters,
	actions,
	mutations
}
