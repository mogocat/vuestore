<template lang="html">
	<div>
		<el-row>
			<el-col :span="20" :offset="2">
				<business-form
					:is-disabled="true"
					:is-create="false"
					:business-data="current">
				</business-form>
			</el-col>
		</el-row>

		<record-table
			:is-editable="false">
		</record-table>
	</div>
</template>

<script>
// business表单组件=>禁止编辑
// record列表组件=>禁止编辑

import BusinessForm from './form'
import RecordTable from '../record/table'
import _ from 'lodash'
import * as types from '@/store/mutation-types'
import { mapState, mapGetters } from 'vuex'

export default {
	computed:{
		...mapState({
			current: state => state.business.current
		}),
		...mapGetters(['recordList', 'businessConfig'])
	},
	created(){
        this.$store.dispatch(types.LOAD_BUSINESS_SINGLE, {id: this.$route.params.id})
	},
	components:{
		BusinessForm,
		RecordTable
	}
}
</script>

<style lang="css" scoped>
</style>
