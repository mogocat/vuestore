<template lang="html">
    <div>
        <el-form ref="form" label-width="50px" :inline="true" style="margin-left: 10px;">
            <el-form-item class="middle">
                <el-button type="primary" @click="showForm($config.emptyContact())">添 加</el-button>
            </el-form-item>
            <el-form-item class="middle">
                <el-input v-model="search" placeholder="搜索……" class="search"></el-input>
            </el-form-item>
            <el-form-item label="显示" class="middle">
                <el-radio v-model="stream" :label="0">客户</el-radio>
                <el-radio v-model="stream" :label="1">供应商</el-radio>
            </el-form-item>
        </el-form>

        <el-table
        :data="filteredList" style="width: 100%" height="500">
            <el-table-column type="index" label="#" width="80">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="cell" label="手机">
            </el-table-column>
            <el-table-column prop="tel" label="座机">
            </el-table-column>
            <el-table-column prop="address" label="地址">
            </el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <el-button @click="showForm(scope.row)" icon="edit"></el-button>
                    <el-button type="danger" @click="deleteRow(scope.row)" icon="delete"></el-button>
                </template>
            </el-table-column>
        </el-table>

        <contact-form :contact-data="contactData" :dialog-visible="dialogVisible" @close="dialogVisible = false">
        </contact-form>

    </div>
</template>

<script>
import _ from 'lodash'
import ContactForm from './form'
import { mapState } from 'vuex'
import * as types from '@/store/mutation-types'
import ErrorHandler from '@/components/error'

export default {
    data() {
        return {
            search: '',
            stream: 0,
            contactData: this.$config.emptyContact(),
            dialogVisible: false
        }
    },
    computed:{
        ...mapState({
            list: state => state.contact.list,
            message: state => state.contact.message
        }),
        filteredList(){
            let list = _.filter(this.list, ['stream', this.stream])
            let search = this.search
            if(search != ''){
                list = _.filter(list, function(item){
                    return item.search.indexOf(search) > -1
                })
            }
            return list
        }
    },
    mixins: [ErrorHandler],
    created(){
        this.$store.dispatch(types.LOAD_CONTACT_TABLE)
    },
    methods: {
        showForm(data){
            this.contactData = data
            this.dialogVisible = true
        },
        deleteRow(data){
            this.$store.dispatch(types.DELETE_CONTACT_ITEM, data)
        }

    },
    components:{
        ContactForm
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
