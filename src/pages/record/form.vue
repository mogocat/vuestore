<template lang="html">
    <el-dialog title="添加条目" v-model="visible">
        <el-form :model="currentItem" :rules="recordRules" ref="recordForm" label-width="60px">
            <el-col :span="10">
                <el-form-item label="配件" prop="accessory_id">
                    <el-select v-model="currentItem.accessory_id" filterable placeholder="请选择" @input="changeSelect">
                        <el-option
                        v-for="accessory in accessoryList"
                        :key="accessory.id"
                        :label="accessory.name"
                        :value="accessory.id">
                            <span style="float: left">{{accessory.name}}</span>
                            <span style="float: right; color: #8492a6; font-size: 13px">{{accessory.serial}}</span>
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>

            <el-col :span="7">
                <el-form-item label="数量" prop="count">
                    <el-input type='number' v-model.number="currentItem.count" auto-complete="off"></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="7">
                <el-form-item label="单价" prop="price">
                    <el-input type='number' v-model.number="currentItem.price" auto-complete="off"><template slot="append">元</template></el-input>
                </el-form-item>
            </el-col>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="visible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm('recordForm')">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
/* recordData: 表单数据
*  dialogVisible: true for 显示表单, false for 隐藏表单
*  close: 关闭表单
*/

import { mapState, mapGetters } from 'vuex'
import * as types from '@/store/mutation-types'

export default {
    data(){
        return {
            currentItem: this.$config.emptyRecord(),
            visible: false,
            recordRules: {
				name: [{required: true, message: '名称不能为空', trigger: 'blur'}],
				count: [{required: true, type: "integer", min: 0, message: '数量填写错误', trigger: 'blur'}],
				price: [{required: true, type: "number", min: 0, message: '价格填写错误', trigger: 'blur'}]
			}
        }
    },
    computed:{
        ...mapState(['business']),
        ...mapGetters(['accessoryList'])
    },
    props:['recordData', 'dialogVisible'],
    watch:{
        recordData(){
            this.currentItem = _.cloneDeep(this.recordData)
        },
        dialogVisible(){
            if(this.visible != this.dialogVisible){
                this.visible = this.dialogVisible
            }
        },
        visible(){
            if(this.visible === false){
                this.$emit('close')
            }
        }
    },
    created(){
        this.$store.dispatch(types.LOAD_ACCESSORY_TABLE)
    },
    methods:{
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if(valid){
                    this.visible = false

                    if(this.currentItem.id){
                        this.$store.dispatch(types.UPDATE_RECORD_ITEM, this.currentItem)
                    }else{
                        this.$store.dispatch(types.CREATE_RECORD_ITEM, this.currentItem)
                    }
                }else{
                    return false
                }
            })
        },
        changeSelect(id){
            let list = _.cloneDeep(this.accessoryList)
            list = _.keyBy(list, 'id')

            // 后台插入成功返回的数据可能不完整 比如name等字段缺失
            this.currentItem.business_id = this.business.current.id
            this.currentItem.accessory = list[id]
        }
    }
}
</script>

<style lang="css">
</style>
