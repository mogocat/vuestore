import axios from 'axios'
import * as types from '../mutation-types'
import lib from '@/components/lib'
import config from '@/components/config'
import _ from 'lodash'


const url = '/accessory'

const state = {
	cate: 1, // 当前左侧树选中的分类
	list: [],
	message: null
}

const getters = {
	accessoryList(state){
		_.forEach(state.list, function(item){
			item.serial = item.cate + "-" + item.code
		})
		return _.filter(state.list, function(item){
			return item.cate.toString().indexOf(state.cate) === 0
		})
	}
}

const actions = {
	[types.CREATE_ACCESSORY_ITEM]({commit}, item) {
		axios.post(url, item).then(response => {
			commit(types.CREATE_ACCESSORY_ITEM, {item: response.data.item})
		}, error => {
			// TODO: error handling
		})
	},
	[types.DELETE_ACCESSORY_ITEM]({commit, state}, {id}) {
		axios.delete(url, {params: {id}}).then(response => {
			if(response.data.status == 0){
				commit(types.DELETE_ACCESSORY_ITEM, {id})
			}else{
				commit(types.ACCESSORY_STATUS, response.data)
			}
		}, error => {
			// TODO: error handling
		})
	},
	[types.UPDATE_ACCESSORY_ITEM]({commit}, item) {
		axios.put(url, item).then(response => {
			commit(types.UPDATE_ACCESSORY_ITEM, {item})
		}, error => {
			// TODO: error handling
		})
	},
	[types.LOAD_ACCESSORY_TABLE]({commit}) {
		axios.get(url).then(response => {
			commit(types.LOAD_ACCESSORY_TABLE, {list: response.data})
			// 调用mutation中对应的函数 触发数据的实际变动
		}, error => {
			// TODO: error handling
		})
	}
}

// 状态实际发生变化时触发
const mutations = {
	// 选择分类条目
	[types.CHOOSE_CATEGORY_ITEM](state, {code}){
		state.cate = code
	},
	[types.CREATE_ACCESSORY_ITEM](state, {item}){
		state.list.push(item)

		state.message = {status: 0, info: '创建成功'}
	},
	[types.DELETE_ACCESSORY_ITEM](state, {id}){
		// 获取父节点后移除该节点
		state.list = _.reject(state.list, ['id', id])

		state.message = {status: 0, info: '删除成功'}
	},
	[types.UPDATE_ACCESSORY_ITEM](state, {item}){
		let list = _.keyBy(state.list, 'id')
		list[item.id] = item
		state.list = _.map(list)

		state.message = {status: 0, info: '更新成功'}
	},
	[types.LOAD_ACCESSORY_TABLE](state, {list}){
		state.list = list
	},
	[types.ACCESSORY_STATUS](state, data){
		switch (data.status) {
		case 100:
			state.message = {status: data.status, info: '该配件存在出入库记录 禁止删除'}
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
