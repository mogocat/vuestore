<template lang="html">
    <el-form class="top" :model="currentItem" :rules="businessRules" ref="businessForm" :inline="true">
        <el-form-item :label="businessConfig.label" prop="name">
            <el-select v-model="currentItem.contact_id" :disabled="isDisabled" filterable placeholder="请选择">
                <el-option
                v-for="item in contactStore"
                :key="item.id"
                :label="item.name"
                :value="item.id">
                <span style="float: left">{{item.name}}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{item.cell}}</span>
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="note">
            <el-input v-model="currentItem.note" :disabled="isDisabled" auto-complete="off" style="width: 400px"></el-input>
        </el-form-item>
        <el-form-item v-if="!isDisabled">
            <div v-if="!isCreate">
                <el-button type="primary" @click="submitForm('businessForm')">保 存</el-button>
                <el-button type="success" @click="$emit('open')">添 加</el-button>
            </div>
            <div v-if="isCreate">
                <el-button type="success" @click="submitForm('businessForm')">创 建</el-button>
            </div>
        </el-form-item>
    </el-form>
</template>

<script>
/* businessData: 表单数据
*  isCreate: true for 创建, false for 编辑
*  isDisabled: true for 展示, false for 编辑
*  submit: 提交表单
*/
import { mapState, mapGetters } from 'vuex'
import _ from 'lodash'
import * as types from '@/store/mutation-types'

export default {
    data(){
        return {
            currentItem: this.$config.emptyBusiness(),
            businessRules: {}
        }
    },
    computed:{
        ...mapGetters(['contactStore', 'businessConfig'])
    },
    props:['isDisabled', 'businessData', 'isCreate'],
    watch:{
        businessData(){
            this.currentItem = this.businessData
        }
    },
    created(){
        this.$store.dispatch(types.LOAD_CONTACT_TABLE)
    },
    methods:{
        submitForm(formName){
            this.$refs[formName].validate((valid) => {
				if(valid){
                    this.$emit('submit', this.currentItem)
				}else{
					return false
				}
			})
        }
    }
}
</script>

<style lang="css">
.top{
	margin-top: 20px;
}
</style>
