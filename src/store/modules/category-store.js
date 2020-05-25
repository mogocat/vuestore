import axios from 'axios'
import * as types from '../mutation-types'
import lib from '@/components/lib'
import config from '@/components/config'
import _ from 'lodash'


const url = '/category'

const state = {
	list: [],
	currentItem: config.emptyCategory(),
	message: null
}

const getters = {
	tree(state){
		return lib.listToTree(state.list)
	}
}

const actions = {
	[types.CREATE_CATEGORY_ITEM]({commit, state}) {
		axios.post(url, {code: state.currentItem.code}).then(response => {
			commit(types.CREATE_CATEGORY_ITEM, {item: response.data.item})
		}, error => {
			// TODO: error handling
		})
	},
	[types.DELETE_CATEGORY_ITEM]({commit, state}) {
		axios.delete(url, {params: {id: state.currentItem.id, code: state.currentItem.code}}).then(response => {
			if(response.data.status == 0){
				commit(types.DELETE_CATEGORY_ITEM)
			}else{
				commit(types.CATEGORY_STATUS, response.data)
			}
		}, error => {
			// TODO: error handling
		})
	},
	[types.UPDATE_CATEGORY_ITEM]({commit}, item) {
		axios.put(url, item).then(response => {
			commit(types.UPDATE_CATEGORY_ITEM, {item})
		}, error => {
			// TODO: error handling
		})
	},
	[types.LOAD_CATEGORY_TREE]({commit}) {
		axios.get(url).then(response => {
			commit(types.LOAD_CATEGORY_TREE, {tree: response.data})
			// 调用mutation中对应的函数 触发数据的实际变动
		}, error => {
			// TODO: error handling
		})
	}
}

// 状态实际发生变化是触发
const mutations = {
	[types.CHOOSE_CATEGORY_ITEM](state, {id}){
		state.currentItem = _.cloneDeep(_.find(state.list, ['id', id]))
	},
	[types.CREATE_CATEGORY_ITEM](state, {item}){
		state.list.push(item)

		state.message = {status: 0, info: '创建成功'}
	},
	[types.DELETE_CATEGORY_ITEM](state){
		// 获取父节点后移除该节点
		let parent_code = state.currentItem.parent_code
		state.list = _.reject(state.list, ['id', state.currentItem.id])
		state.currentItem = _.cloneDeep(_.find(state.list, ['code', parent_code]))

		state.message = {status: 0, info: '删除成功'}
	},
	[types.UPDATE_CATEGORY_ITEM](state, {item}){
		let list = _.keyBy(state.list, 'id')
		list[item.id] = item
		state.list = _.map(list)

		state.message = {status: 0, info: '更新成功'}
	},
	[types.LOAD_CATEGORY_TREE](state, {tree}){
		state.list = tree
		state.currentItem = _.cloneDeep(tree[0])
	},
	[types.CATEGORY_STATUS](state, data){
		switch (data.status) {
		case 100:
			state.message = {status: data.status, info: '存在子节点 禁止删除'}
			break;
		case 101:
			state.message = {status: data.status, info: '该分类下有配件 禁止删除'}
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
