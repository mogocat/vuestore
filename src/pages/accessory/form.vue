<template lang="html">
	<el-dialog title="配件信息" v-model="visible" size="small">
		<el-form
		:model="currentItem"
		:rules="accessoryRules"
		ref="accessoryForm"
		label-width="60px">

		  <el-col :span="8">
			  <el-form-item label="名称" prop="name">
				  <el-input type="text" v-model="currentItem.name"></el-input>
			  </el-form-item>
		  </el-col>
		  <el-col :span="8">
			  <el-form-item label="分类" prop="cate">
				  <el-cascader
				  :options="tree"
				  :show-all-levels="false"
				  :props="props"
				  v-model="selected"
				  @change="handleChange"
				  change-on-select>
				  </el-cascader>
			  </el-form-item>

		  </el-col>

		  <el-col :span="8">
			  <el-form-item label="编号" prop="code">
				  <el-input type="text" v-model="currentItem.code" disabled>
					  <template slot="prepend">{{currentItem.cate}}-</template>
				  </el-input>
			  </el-form-item>
		  </el-col>
		  <el-col :span="24">
			  <el-form-item label="备注" prop="note">
				  <el-input type="text" v-model="currentItem.note" style="width: 540px;">
				  </el-input>
			  </el-form-item>
		  </el-col>
		</el-form>

		<span slot="footer" class="dialog-footer">
			<el-button type="primary" @click="submitForm('accessoryForm')">提 交</el-button>
			<el-button @click="visible = false">取消</el-button>
		</span>
	</el-dialog>

</template>

<script>
import _ from 'lodash'
import { mapState } from 'vuex'
import * as types from '@/store/mutation-types'

export default {
	data(){
		return {
			currentItem: {},
			visible: false,
			selected: ["1"],
			props: {
				value: 'code'
			},
			accessoryRules: {
				name: [{required: true, message: '配件名不能为空', trigger: 'blur'}]
			}
		}
	},
	props:['dialogVisible', 'accessoryData'],
	watch:{
		visible(){
			if(this.visible == false){
				this.$emit('close')
			}
		},
		dialogVisible(){
			this.selected = this.$lib.codeToPath(this.accessoryData.cate)
			this.currentItem = _.cloneDeep(this.accessoryData)
			this.handleChange(this.selected)

			if(this.visible != this.dialogVisible){
				this.visible = this.dialogVisible
			}
		}
	},
	computed:{
		...mapState({
			list: state => state.accessory.list,
			tree: state => state.category.list
		})
	},
	methods:{
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					if(this.currentItem.id){
						this.$store.dispatch(types.UPDATE_ACCESSORY_ITEM, this.currentItem)
					}else{
						this.$store.dispatch(types.CREATE_ACCESSORY_ITEM, this.currentItem)
					}
					this.visible = false
				} else {
					this.$message.error('信息填写错误')
					return false
				}
			})
		},
		handleChange(cate){
			cate = cate[cate.length - 1]
			let id = this.currentItem.id
			let tempList = _.filter(this.list, function(item){
				return item.cate == cate && item.id != id
			})
			let newCode = ''

			if(tempList.length > 0){
				newCode = (Number(_.maxBy(tempList, 'code').code) + 1).toString()
				newCode = _.padStart(newCode, 3, '0')
			}else{
				newCode = "001"
			}
			this.currentItem.cate = cate
			this.currentItem.code = newCode
		}
	}
}
</script>

<style lang="css">
</style>
