<template lang="html">
    <el-row>
        <el-col :span="20" :offset="2">
            <business-form
                :is-disabled="false"
                :is-create="true"
                :business-data="$config.emptyBusiness()"
                @open="dialogVisible = true"
                @submit="submitForm">
            </business-form>
        </el-col>
    </el-row>
</template>

<script>
// business表单组件

import BusinessForm from './form'
import { mapState, mapGetters } from 'vuex'
import * as types from '@/store/mutation-types'

export default {
	data() {
		return {
			// 必须初始化所有属性 否则form中无法加载
			dialogVisible: false
		}
	},
    computed:{
        ...mapGetters(['businessConfig']),
        ...mapState({current: state => state.business.current})
    },
    watch:{
        // 当前条目发生变化并赋值出id说明已经创建成功 可以跳转
        current(){
            if(this.current.id){
                this.$router.push(`/${this.businessConfig.path}/edit/${this.current.id}`)
            }
        }
    },
    methods:{
        submitForm(item){
            this.$store.dispatch(types.CREATE_BUSINESS_ITEM, item)
        }
    },
	components:{
		BusinessForm
	}
}
</script>

<style lang="css">
</style>
