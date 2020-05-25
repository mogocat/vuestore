<template lang="html">
	<div>
		<el-row>
			<el-col :span="20" :offset="2">
				<business-form
					:is-disabled="false"
					:is-create="false"
					:business-data="current"
					@open="dialogVisible = true"
					@submit="submitForm">
				</business-form>
			</el-col>
		</el-row>

		<record-table :is-editable="true">
		</record-table>

		<record-form
			:record-data="recordData"
			:dialog-visible="dialogVisible"
			@close="dialogVisible = false">
		</record-form>

	</div>
</template>

<script>
// business表单组件=>可编辑
// record列表组件=>可编辑
// record表单组件=>可编辑

import { mapState } from 'vuex'
import BusinessForm from './form'
import RecordTable from '../record/table'
import RecordForm from '../record/form'
import * as types from '@/store/mutation-types'

export default {
	data() {
		return {
			// 必须初始化所有属性 否则form中无法加载
			dialogVisible: false,
			recordData: this.$config.emptyRecord()
		}
	},
	computed:{
		...mapState({current: state => state.business.current})
	},
	created(){
		this.$store.dispatch(types.LOAD_BUSINESS_SINGLE, {id: this.$route.params.id})
	},
	methods:{
		submitForm(item){
			this.$store.dispatch(types.UPDATE_BUSINESS_ITEM, item)
		}
	},
	components:{
		BusinessForm,
		RecordTable,
		RecordForm
	}
}
</script>

<style lang="css" scoped>
.top{
	margin-top: 20px;
}
</style>
