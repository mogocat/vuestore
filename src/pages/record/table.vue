<template lang="html">
    <div>
        <el-row type="flex" justify="center">
            <el-col :span="22">
                <el-table
                :data="recordOrigin" style="width: 100%" height="400" :border="true">
                    <el-table-column type="index" label="#" width="50">
                    </el-table-column>
                    <el-table-column prop="name" label="名称" width="200">
                    </el-table-column>
                    <el-table-column prop="serial" label="编号" width="200">
                    </el-table-column>
                    <el-table-column prop="count" label="数量" width="100">
                    </el-table-column>
                    <el-table-column prop="price" label="单价" width="100">
                    </el-table-column>
                    <el-table-column prop="total" label="总价">
                    </el-table-column>
                    <el-table-column v-if="isEditable">
                        <template scope="scope">
                            <el-button @click="editItem(scope.row)" icon="edit"></el-button>
                            <el-button type="danger" @click="deleteItem(scope.row.id)" icon="delete"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <el-row type="flex" justify="center">
            <el-col :span="22">
                <el-table
                :data="recordTotal" style="width: 100%" :show-header="false" :border="true">
                    <el-table-column width="50">
                    </el-table-column>
                    <el-table-column prop="name" width="200">
                    </el-table-column>
                    <el-table-column width="200">
                    </el-table-column>
                    <el-table-column prop="count" width="100">
                    </el-table-column>
                    <el-table-column width="100">
                    </el-table-column>
                    <el-table-column prop="total">
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>

        <record-form :record-data="recordData" :dialog-visible="dialogVisible" @close="dialogVisible = false"></record-form>
    </div>
</template>

<script>
/* isEditable: true for 显示编辑按钮, false for 不显示
*/

import _ from 'lodash'
import { mapGetters } from 'vuex'
import * as types from '@/store/mutation-types'
import RecordForm from './form'

export default {
    data(){
        return {
            dialogVisible: false,
            recordData: this.$config.emptyRecord()
        }
    },
    props:['isEditable'],
    created(){
        this.$store.dispatch(types.LOAD_RECORD_TABLE)
    },
    computed:{
        ...mapGetters(['recordOrigin', 'recordTotal'])
    },
    methods:{
        editItem(data){
            this.dialogVisible = true
            this.recordData = _.cloneDeep(data)
        },
        deleteItem(id){
            this.$store.dispatch(types.DELETE_RECORD_ITEM, {id})
        }
    },
    components:{
        RecordForm
    }
}
</script>

<style lang="css">
</style>
