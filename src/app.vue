<template>
	<div>

		<el-menu theme="dark" :default-active="index" :router="true" class="el-menu-demo" mode="horizontal" @select="handleSelect">
		  <el-menu-item index="/accessory">配件管理</el-menu-item>
		  <el-menu-item index="/category">分类编辑</el-menu-item>

		  <el-menu-item index="/buy">购货单</el-menu-item>
		  <el-menu-item index="/sell">销售单</el-menu-item>

		  <el-menu-item index="/stock">库存表</el-menu-item>
		  <el-menu-item index="/contact">联系人</el-menu-item>
		</el-menu>

		<router-view name="main"></router-view>
		<el-row>
			<el-col :span="3">
				<router-view name="left"></router-view>
			</el-col>
			<el-col :span="21">
				<router-view name="right"></router-view>
			</el-col>
		</el-row>


	</div>
</template>

<script>

export default {
	data(){
		return {
			index: this.$route.path
		}
	},
	methods: {
		handleSelect(key, keyPath) {
			// this.index = key
			// console.log(key, keyPath);
		}
	}
}
</script>
<style media="screen">
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
.el-menu--horizontal .el-menu-item{
    height: 50px;
    line-height: 50px;
}
</style>
