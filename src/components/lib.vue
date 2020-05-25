<template lang="html">

</template>

<script>
export default {
    scope: {},
    // 默认分类编码每级长度
    cateLength: 2,

    codeToPath: function(code){
        if(code == 1){
            return ["1"]
        }
		code = code.toString()
        var count = Math.floor(code.length / this.cateLength)
        var path = []

        for (var i = 0; i < count; i++) {
            path.push(code.substr(0, this.cateLength * i + 1))
        }
        path.push(code)
        return path
    },
	removeEmpty : function (tree){
		for (var i = 0; i < tree.length; i++) {
			if(tree[i].children.length > 0){
				tree[i].children = this.removeEmpty(tree[i].children);
			}else{
				delete tree[i].children;
			}

		}
		return tree;
	},
	listToTree: function(data, options) {
		options = options || {};
		var ID_KEY = options.idKey || 'code';
		var PARENT_KEY = options.parentKey || 'parent_code';
		var CHILDREN_KEY = options.childrenKey || 'children';

		var tree = [], childrenOf = {};
		var item, id, parentId;

		for(var i = 0, length = data.length; i < length; i++) {
			item = data[i];
			id = item[ID_KEY];
			parentId = item[PARENT_KEY] || 0;
			// every item may have children
			childrenOf[id] = childrenOf[id] || [];
			// init its children
			item[CHILDREN_KEY] = childrenOf[id];
			if (parentId != 0) {
				// init its parent's children object
				childrenOf[parentId] = childrenOf[parentId] || [];
				// push it into its parent's children object
				childrenOf[parentId].push(item);
			} else {
				tree.push(item);
			}
		};

		return this.removeEmpty(tree);
	}
}
</script>

<style lang="css" scoped>
</style>
