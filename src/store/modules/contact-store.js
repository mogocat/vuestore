import axios from 'axios'
import * as types from '../mutation-types'
import lib from '@/components/lib'
import config from '@/components/config'
import _ from 'lodash'


const url = '/contact'

const state = {
	list: [],
	stream: 0,
	message: null
}

const getters = {
	contactStore(state){
		return _.filter(state.list, ['stream', state.stream])
	}
}

const actions = {
	[types.CREATE_CONTACT_ITEM]({commit}, item) {
		axios.post(url, item).then(response => {
			commit(types.CREATE_CONTACT_ITEM, {item: response.data.item})
		}, error => {
			// TODO: error handling
		})
	},
	[types.DELETE_CONTACT_ITEM]({commit, state}, {id}) {
		axios.delete(url, {params: {id}}).then(response => {
			if(response.data.status == 0){
				commit(types.DELETE_CONTACT_ITEM, {id})
			}else{
				commit(types.CONTACT_STATUS, response.data)
			}
		}, error => {
			// TODO: error handling
		})
	},
	[types.UPDATE_CONTACT_ITEM]({commit}, item) {
		axios.put(url, item).then(response => {
			commit(types.UPDATE_CONTACT_ITEM, {item})
		}, error => {
			// TODO: error handling
		})
	},
	[types.LOAD_CONTACT_TABLE]({commit}) {
		axios.get(url).then(response => {
			commit(types.LOAD_CONTACT_TABLE, {list: response.data})
			// 调用mutation中对应的函数 触发数据的实际变动
		}, error => {
			// TODO: error handling
		})
	}
}

// 状态实际发生变化时触发
const mutations = {
	// 选择分类条目
	[types.CREATE_CONTACT_ITEM](state, {item}){
		state.list.push(item)

		state.message = {status: 0, info: '创建成功'}
	},
	[types.DELETE_CONTACT_ITEM](state, {id}){
		// 获取父节点后移除该节点
		state.list = _.reject(state.list, ['id', id])

		state.message = {status: 0, info: '删除成功'}
	},
	[types.UPDATE_CONTACT_ITEM](state, {item}){
		let list = _.keyBy(state.list, 'id')
		list[item.id] = item
		state.list = _.map(list)

		state.message = {status: 0, info: '更新成功'}
	},
	[types.LOAD_CONTACT_TABLE](state, {list}){
		state.list = list
	},
	[types.CONTACT_STATUS](state, data){
		switch (data.status) {
		case 100:
			state.message = {status: data.status, info: '该联系人有单据记录 禁止删除'}
			break;
		default:
			console.log(data.status + ":" + data.error)
			break;
		}
	}
}

export default{
	state,
	getters,
	actions,
	mutations
}
