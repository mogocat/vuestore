<template lang="html">
    <el-form
    :model="currentItem"
    :rules="categoryRules"
    ref="categoryForm"
    label-width="80px">

        <el-row class="top">
            <el-col :span="5">
                <el-form-item label="编号" prop="code">
                    <el-input type="text" v-model="currentItem.code" disabled></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="5">
                <el-form-item label="名称" prop="label">
                    <el-input type="text" v-model="currentItem.label"></el-input>
                </el-form-item>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="3">
                <el-form-item>
                    <el-button type="default" @click="create">新建子分类</el-button>
                </el-form-item>
            </el-col>
            <el-col :span="2">
                <el-form-item>
                    <el-button type="primary" @click="submit('categoryForm')">提交</el-button>
                </el-form-item>
            </el-col>
            <el-col :span="2">
                <el-form-item>
                    <el-button type="danger" @click="destroy">删除</el-button>
                </el-form-item>
            </el-col>
        </el-row>

    </el-form>
</template>

<script>
import { mapState } from 'vuex'
import * as types from '@/store/mutation-types'
import ErrorHandler from '@/components/error'

export default {
	data() {
		return {
			categoryRules: {
				label: [{required: true, message: '名称不能为空', trigger: 'blur'}]
			}
		}
	},
	computed:{
		...mapState({
			currentItem: state => state.category.currentItem,
            message: state => state.category.message
		})
	},
    mixins: [ErrorHandler],
	methods: {
		submit(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.$store.dispatch(types.UPDATE_CATEGORY_ITEM, this.currentItem)
				} else {
					this.$message.error('信息填写错误')
					return false
				}
			})
		},
        create(){
            this.$store.dispatch(types.CREATE_CATEGORY_ITEM)
        },
        destroy(){
            this.$store.dispatch(types.DELETE_CATEGORY_ITEM)
        }
	}
}
</script>

<style lang="css" scoped>
.top{
    margin-top: 20px;
}
</style>
