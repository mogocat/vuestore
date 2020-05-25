<template lang="html">
    <div>
		<!-- 顶栏搜索框 -->
        <el-form ref="form" label-width="60px" :inline="true" style="margin-left: 10px;">
            <el-form-item class="middle">
                <el-button type="primary" @click="addForm()">添 加</el-button>
            </el-form-item>
            <el-form-item :label="businessConfig.label" prop="name" class="middle">
                <el-select v-model="contact_id" filterable :clearable="true" placeholder="请选择" style="width: 100%">
                    <el-option
                    v-for="item in contactStore"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                        <span style="float: left;">{{item.name}}</span>
                        <span style="float: right; color: #8492a6; font-size: 13px;">{{item.cell}}</span>
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>

		<!-- 下方列表 -->
        <el-table :data="businessList" style="width: 100%">
            <el-table-column type="index" label="#" width="60">
            </el-table-column>
            <el-table-column prop="count" label="总数量">
            </el-table-column>
            <el-table-column prop="total" label="总金额">
            </el-table-column>
            <el-table-column prop="contact_name" :label="businessConfig.label">
            </el-table-column>
            <el-table-column prop="note" label="备注">
            </el-table-column>
            <el-table-column prop="create_at" label="创建时间">
            </el-table-column>
            <el-table-column prop="update_at" label="修改时间">
            </el-table-column>
            <el-table-column label="状态">
                <template scope="scope">
                    <el-tag v-if="scope.row.confirm == 0" type="warning">未确认</el-tag>
                    <el-tag v-if="scope.row.confirm == 1" type="success">已确认</el-tag>
                </template>
            </el-table-column>

            <el-table-column width="210" header-align="center">
                <template scope="scope">
                    <el-button v-if="scope.row.confirm == 1" type="info" @click="showItem(scope.row.id)" icon="information"></el-button>

					<!-- 这三个按钮未确认时可以使用 -->
                    <el-button v-if="scope.row.confirm == 0" @click="editItem(scope.row.id)" icon="edit"></el-button>
                    <el-button v-if="scope.row.confirm == 0" type="primary" @click="confirm(scope.row.id)" icon="circle-check"></el-button>
                    <el-button v-if="scope.row.confirm == 0" type="danger" @click="deleteRow(scope.row.id)" icon="delete"></el-button>
                </template>
            </el-table-column>
        </el-table>

    </div>
</template>

<script>
// TODO: 添加时间过滤表单

// 显示所有单据
import { mapState, mapGetters } from 'vuex'
import _ from 'lodash'
import * as types from '@/store/mutation-types'

export default {
    data(){
        return {
            contact_id: ''
        }
    },
    computed:{
        ...mapGetters(['businessOrigin', 'businessConfig', 'contactStore']),
        // TODO: 后续添加日期过滤
        businessList(){
            let list = this.businessOrigin
            if(this.contact_id != ''){
                list = _.filter(this.businessOrigin, ['contact_id', this.contact_id])
            }
            return list
        }
    },
    created(){
        this.$store.dispatch(types.LOAD_CONTACT_TABLE)
        this.$store.dispatch(types.LOAD_BUSINESS_TABLE)
    },
    methods: {
        addForm(){
            this.$router.push(`/${this.businessConfig.path}/add`)
        },
        editItem(id){
            this.$router.push(`/${this.businessConfig.path}/edit/${id}`)
        },
        showItem(id){
            this.$router.push(`/${this.businessConfig.path}/show/${id}`)
        },
        confirm(id){
            this.$store.dispatch(types.CONFIRM_BUSINESS_ITEM, {id})
        },
        deleteRow(id){
            this.$store.dispatch(types.DELETE_BUSINESS_ITEM, {id})
        }
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
