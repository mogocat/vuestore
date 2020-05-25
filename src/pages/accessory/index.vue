<template lang="html">
    <div>
		<el-form ref="form" label-width="50px" :inline="true" style="margin-left: 10px;">
            <el-form-item class="middle">
                <el-button type="primary" @click="showForm($config.emptyAccessory())">添 加</el-button>
            </el-form-item>
            <el-form-item class="middle">
                <el-input v-model="search" placeholder="搜索……" class="search"></el-input>
            </el-form-item>
        </el-form>

        <el-table
        :data="filteredList"
        height="550"
        highlight-current-row
        border>
            <el-table-column type="index" label="#" width="65" align="center">
            </el-table-column>
            <el-table-column prop="name" label="名称" width="180">
            </el-table-column>
            <el-table-column prop="serial" label="编码">
            </el-table-column>
            <el-table-column prop="note" label="备注">
            </el-table-column>
            <el-table-column>
                <template scope="scope">
                    <el-button @click="showForm(scope.row)" icon="edit"></el-button>
                    <el-button type="danger" @click="deleteRow(scope.row.id)" icon="delete"></el-button>
                </template>
            </el-table-column>
        </el-table>

		<accessory-form :accessory-data="accessoryData" :dialog-visible="dialogVisible" @close="dialogVisible = false">

		</accessory-form>
    </div>
</template>

<script>
// TODO: 在表格上方加上搜索和添加按钮
import AccessoryForm from './form'
import { mapState, mapGetters } from 'vuex'
import _ from 'lodash'
import * as types from '@/store/mutation-types'
import ErrorHandler from '@/components/error'

export default {
    data() {
        return {
			search: '',
			accessoryData: this.$config.emptyAccessory(),
            dialogVisible: false,
			props: {
				value: 'code'
			},
			accessoryRules: {
				name: [{required: true, message: '配件名不能为空', trigger: 'blur'}]
			}
        }
    },
	computed:{
        ...mapState({message: state => state.accessory.message}),
		...mapGetters(['accessoryList']),
		filteredList(){
			let list = _.cloneDeep(this.accessoryList)
			let search = this.search
			return _.filter(list, function(item){
				if(search != ''){
					// TODO: 添加名称拼音过滤
					return item.serial.toString().indexOf(search) !== -1
				}
				return true
			})
		}
	},
    mixins: [ErrorHandler],
    created() {
		this.$store.dispatch(types.LOAD_ACCESSORY_TABLE)
    },
    methods: {
        showForm(data){
            this.accessoryData = data
            this.dialogVisible = true
        },
        deleteRow(id){
            this.$store.dispatch(types.DELETE_ACCESSORY_ITEM, {id})
        }
    },
	components:{
		AccessoryForm
	}
}
</script>

<style lang="css" scoped>
.middle{
    margin: 10px 5px 10px 5px;
}
.search{
    width: 300px;
}
</style>
