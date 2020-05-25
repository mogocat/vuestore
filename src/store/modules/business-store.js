import axios from 'axios'
import * as types from '../mutation-types'
import lib from '@/components/lib'
import config from '@/components/config'
import _ from 'lodash'


const url = '/business'

const state = {
	list: [],
	current: {}
}

const getters = {
	businessStream(state, getters, rootState){
		return rootState.route.path.split('/')[1] == "buy" ? 1 : 0
	},
	businessOrigin(state, getters){
		return _.filter(state.list, ['stream', getters.businessStream])
	},
	businessConfig(state, getters){
		if(getters.businessStream === 0){
			return {label: '客户', path: 'sell', stream: getters.businessStream}
		}else{
			return {label: '供应商', path: 'buy', stream: getters.businessStream}
		}
	}
}

const actions = {
	[types.CREATE_BUSINESS_ITEM]({commit}, item) {
		axios.post(url, item).then(response => {
			commit(types.CREATE_BUSINESS_ITEM, response.data.item)
		}, error => {
			// TODO: error handling
		})
	},
	[types.DELETE_BUSINESS_ITEM]({commit, state}, {id}) {
		axios.delete(url, {params: {id}}).then(response => {
			commit(types.DELETE_BUSINESS_ITEM, {id})
		}, error => {
			// TODO: error handling
		})
	},
	[types.UPDATE_BUSINESS_ITEM]({commit}, item) {
		axios.put(url, item).then(response => {
			commit(types.UPDATE_BUSINESS_ITEM, item)
		}, error => {
			// TODO: error handling
		})
	},
	[types.CONFIRM_BUSINESS_ITEM]({commit, state}, {id}) {
		axios.get(url + "/confirm", {params: {id}}).then(response => {
			commit(types.CONFIRM_BUSINESS_ITEM, {id})
			// 调用mutation中对应的函数 触发数据的实际变动
		}, error => {
			// TODO: error handling
		})
	},
	[types.LOAD_BUSINESS_SINGLE]({commit, state}, {id}) {
		axios.get(url, {params: {id}}).then(response => {
			commit(types.LOAD_BUSINESS_SINGLE, response.data)
			// 调用mutation中对应的函数 触发数据的实际变动
		}, error => {
			// TODO: error handling
		})
	},
	[types.LOAD_BUSINESS_TABLE]({commit, state}) {
		axios.get(url).then(response => {
			commit(types.LOAD_BUSINESS_TABLE, response.data)
			// 调用mutation中对应的函数 触发数据的实际变动
		}, error => {
			// TODO: error handling
		})
	}
}

// 状态实际发生变化时触发
const mutations = {
	// 选择分类条目
	[types.LOAD_BUSINESS_SINGLE](state, item){
		state.current = item
	},
	[types.CONFIRM_BUSINESS_ITEM](state, {id}){
		let list = _.keyBy(state.list, 'id')
		list[id].confirm = 1
		state.list = _.map(list)
	},
	[types.CREATE_BUSINESS_ITEM](state, item){
		state.list.push(item)
		state.current = item
	},
	[types.DELETE_BUSINESS_ITEM](state, {id}){
		// 获取父节点后移除该节点
		state.list = _.reject(state.list, ['id', id])
	},
	[types.UPDATE_BUSINESS_ITEM](state, item){
		let list = _.keyBy(state.list, 'id')
		list[item.id] = item
		state.list = _.map(list)
	},
	[types.LOAD_BUSINESS_TABLE](state, list){
		state.list = list
	}
}

export default{
	state,
	getters,
	actions,
	mutations
}
