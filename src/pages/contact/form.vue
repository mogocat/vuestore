<template lang="html">
    <el-dialog title="配件信息" v-model="visible" size="small">
        <el-form :model="currentItem" :rules="contactRules" ref="contactForm" label-width="60px">

            <el-col :span="12">
                <el-form-item label="姓名" prop="name">
                    <el-input type="text" v-model="currentItem.name"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="类型" prop="stream">
                    <el-radio-group v-model="currentItem.stream">
                        <el-radio :label="0">客户</el-radio>
                        <el-radio :label="1">供应商</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="手机" prop="cell">
                    <el-input type="text" v-model="currentItem.cell"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="座机" prop="tel">
                    <el-input type="text" v-model="currentItem.tel"></el-input>
                </el-form-item>
            </el-col>


            <el-col :span="24">
                <el-form-item label="地址" prop="address">
                    <el-input type="text" v-model="currentItem.address"></el-input>
                </el-form-item>
            </el-col>

        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitForm('contactForm')">提交</el-button>
            <el-button @click="visible = false">取消</el-button>
        </span>
    </el-dialog>
</template>

<script>
import * as types from '@/store/mutation-types'

export default {
    data(){
        return {
            currentItem: {},
            visible: false,
            contactRules: {
				name: [{required: true, message: '姓名不能为空', trigger: 'blur'}],
				cell: [{min: 11, max: 11, message: '手机号长度错误', trigger: 'blur'}]
			}
        }
    },
    watch:{
        visible(){
			if(this.visible == false){
				this.$emit('close')
			}
		},
        dialogVisible(){
            this.currentItem = _.cloneDeep(this.contactData)

            if(this.visible != this.dialogVisible){
                this.visible = this.dialogVisible
            }
        }
    },
    props:['contactData', 'dialogVisible'],
    methods:{
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if(this.currentItem.id){
                        this.$store.dispatch(types.UPDATE_CONTACT_ITEM, this.currentItem)
                    }else{
                        this.$store.dispatch(types.CREATE_CONTACT_ITEM, this.currentItem)
                    }
                    this.visible = false
                } else {
                    this.$message.error('信息填写错误')
                    return false
                }
            })
        }
    }
}
</script>

<style lang="css">
</style>
