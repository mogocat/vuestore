<template lang="html">
    <el-table
    :data="stockList" style="width: 100%" height="550">
        <el-table-column prop="id" label="#" width="80">
        </el-table-column>
        <el-table-column prop="name" label="名称">
        </el-table-column>
        <el-table-column prop="serial" label="序号">
        </el-table-column>
        <el-table-column prop="count" label="库存">
        </el-table-column>
        <el-table-column prop="total" label="总价">
        </el-table-column>
    </el-table>
</template>

<script>
// TODO: 添加盘点单

import { mapGetters } from 'vuex'
import _ from 'lodash'
import * as types from '@/store/mutation-types'

export default {
    data() {
        // data在component中必须以函数形式实现 不能以对象形式
        return {
        }
    },
    computed:{
        ...mapGetters(['stockList'])
    },
    created(){
        this.$store.dispatch(types.LOAD_STOCK_TABLE)
    }
}
</script>

<style lang="css" scoped>
</style>
