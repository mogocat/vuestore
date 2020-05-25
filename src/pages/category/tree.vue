<template>
    <el-tree
    class="scroll-bar"
    node-key="code"
    :data="tree"
    :default-expand-all="true"
    :expand-on-click-node="false"
    :highlight-current="true"
    :current-node-key="current"
    @node-click="handleNodeClick"></el-tree>

</template>

<script>
import { mapState, mapGetters } from 'vuex'
import * as types from '@/store/mutation-types'

export default {
    data() {
        // data在component中必须以函数形式实现 不能以对象形式
        return {
            // current: 1
        }
    },
	computed:{
		...mapState({current: state => state.category.currentItem.code}),
		...mapGetters(['tree'])
	},
    created() {
		this.$store.dispatch(types.LOAD_CATEGORY_TREE)
    },
    methods: {
        handleNodeClick(data) {
			this.$store.commit(types.CHOOSE_CATEGORY_ITEM, data)
        }
    }
  };
</script>

<style scoped>
.scroll-bar{
    height: 548px;
    overflow-y: auto;
}
.el-tree{
	border: 0px;
}
</style>
