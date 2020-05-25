import axios from 'axios'
import * as types from '../mutation-types'
import lib from '@/components/lib'
import config from '@/components/config'
import _ from 'lodash'


const url = '/record'

const state = {
	list: []
}

const getters = {
	recordOrigin(state, getters, rootState){
		let id = Number(rootState.route.params.id)
		let list = _.filter(state.list, ['business_id', id])
		for (var i = 0; i < list.length; i++) {
			list[i].name = list[i].accessory.name
			list[i].total = list[i].price * list[i].count
			list[i].serial = list[i].accessory.cate + "-" + list[i].accessory.code
		}
		return list
	},
	recordTotal(state, getters){
		let amount = _.sumBy(getters.recordOrigin, 'count')
		let total = _.sumBy(getters.recordOrigin, item => {return item.price * item.count})
		return [{name: '总计', count: amount, total: total}]
	}
}

const actions = {
	[types.CREATE_RECORD_ITEM]({commit, state}, item) {
		axios.post(url, item).then(response => {
			item.id = response.data.item.id
			commit(types.CREATE_RECORD_ITEM, item)
		}, error => {
			// TODO: error handling
		})
	},
	[types.DELETE_RECORD_ITEM]({commit, state}, {id}) {
		axios.delete(url, {params: {id}}).then(response => {
			commit(types.DELETE_RECORD_ITEM, {id})
		}, error => {
			// TODO: error handling
		})
	},
	[types.UPDATE_RECORD_ITEM]({commit}, item) {
		axios.put(url, item).then(response => {
			commit(types.UPDATE_RECORD_ITEM, item)
		}, error => {
			// TODO: error handling
		})
	},
	[types.LOAD_RECORD_TABLE]({commit}) {
		axios.get(url).then(response => {
			commit(types.LOAD_RECORD_TABLE, {list: response.data})
			// 调用mutation中对应的函数 触发数据的实际变动
		}, error => {
			// TODO: error handling
		})
	}
}

// 状态实际发生变化时触发
const mutations = {
	// 选择分类条目
	[types.CREATE_RECORD_ITEM](state, item){
		state.list.push(item)
	},
	[types.DELETE_RECORD_ITEM](state, {id}){
		// 获取父节点后移除该节点
		state.list = _.reject(state.list, ['id', id])
	},
	[types.UPDATE_RECORD_ITEM](state, item){
		let list = _.keyBy(state.list, 'id')
		list[item.id] = item
		state.list = _.map(list)
	},
	[types.LOAD_RECORD_TABLE](state, {list}){
		state.list = list
	}
}

export default{
	state,
	getters,
	actions,
	mutations
}
