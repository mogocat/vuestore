## select等选择框无法修改值
说明该值无法被修改，比如props或者store等其他限制。而且，form的prop属性和model的属性也要对应。

## computed和watch
这两个函数中，都可以用来检测值的变化对数据的影响。
computed中可以对某个列表进行实时计算，只要过滤条件改变就会重新求值。而watch可以直接检测某个过滤条件，但是要检测多个，还是比较麻烦。

## express找不到模板错误
一般是post或者put的时候由于参数错误导致的问题。

## supertest的post和put请求
supertest中，post和put用send发送参数。restc中，key必须用双引号包裹，单引号不识别。

## ES2015及以后新增运算符列举
...为对象展开运算符`{id: 1, ...foo}`，用foo的属性填充。
[]函数名计算运算符，可以用变量加方括号，使用字符串做函数名。
{}对象匹配运算符，在传参数时用：`{id: data.id}`，使用时：`{id}`，然后再函数中直接用id即可。

## Vuex用法
store用来保存数据、状态、变量。getter用来将store的数据加工后展现。mutation记录所有状态变更、action是异步提交mutation的途径。action、mutation、和 getter使用全局注册，以便响应多个事件，所以要避免名称冲突。

## axios各种请求
axios.request(config)
axios.get(url[, config])
axios.delete(url[, config])
axios.head(url[, config])
axios.post(url[, data[, config]])
axios.put(url[, data[, config]])
axios.patch(url[, data[, config]])
有的能带data，有的不能带，只能用config配置`{params: {foo: bar}}`

## 校验器找不到校验对象
需要校验的form-item的prop属性，命名必须和form的model中的属性名称相对应，否则会找不到

## css样式被父组件覆盖
在子组件的css中添加scoped关键字，能保证该组件只应用本组件内的css样式。

## route children
子路由的用法是：必须在父节点上先定义一个route view，将之前误以为是父节点的组件移动到子节点中，作为空路径匹配。

## input太短
input标签太短不能撑满父标签的时候，width设置为100%即可

## 弹窗表单下面空一截
用col进行布局，取代form-item默认布局，可以减少和下面按钮之间的空白区域。

## 校验提示没对齐
用label-width属性才能对齐

## 数字输入框
el-input标签中，设置type='number'，v-model.number='foo'就可以设置该输入框为数字输入框，仅限输入数字，连校验都省了。[文档在此](https://cn.vuejs.org/v2/guide/forms.html#修饰符)

## 自定义元素
```
renderHeader(createElement, { column }) {return createElement( 'el-button', {attrs: {size: 'mini', type: 'primary', icon: 'plus'}, on: {click: this.showForm }}); },
```
第一个为元素名，第二个为一些属性名，第三个如果有，为元素中的内容
完整配置项见[这里](https://cn.vuejs.org/v2/guide/render-function.html#完整数据对象)

## :号和@号
这两个符号是v-bind和v-on的简写语法，功能相同

## slot分发
子组件中留一个slot，如果有多个，用name标记。父组件中的子组件标签里，写入一些需要替换的内容，并且在标签中，标上对应的子组件slot名字。如<slot name="foo"></slot>和<div slot="foo">我是要被替换的元素</div>

## router组件
router用来操作跳转，route用来获取路由信息。

## 监听参数并reload
data属性中，必须使用函数返回数据。created等事件，也必须使用函数返回。data中定义一个字段，与table中的data对应，数据设为空。created函数中，设置返回reload函数，这样就可以在created事件触发后，调用reload函数。reload函数中，使用ajax设置data中的数据。在这里我添加了一个参数，用来筛选后台数据，这个参数可以设置在data中，也可以设置在computed中，前者为静态返回，后者为动态返回。对这个参数，再进行watch，变化后触发reload函数。reload函数中，也用参数来获取后台数据，进行过滤用。
这样最终：外界事件触发时，导致computed中对应参数变化，触发了watch函数。wactch调用reload，reload使用新参数去后台查询，获取的新数据，设置到data中。

## standalone和runtime的区别
这两个东西，分别是独立包和运行包，根据[官方文档](https://vuejs.org/v2/guide/installation.html#Standalone-vs-Runtime-only-Build)的说明，独立包是随时都可以加载所有库，而runtime包，必须先build才能加载所有库，尤其是import的库，必须build，光compile是不行的。但是只有runtime包，才能支持single file component，即单文件组件开发。

## 代码缩进报错
cooking和webpack都是默认支持了eslint库的，这个库会严格校验代码规范性，其中常用的模板有airbnb和standard，但是都需要相应的库支持，比较繁琐。个人开发的时候，只要去webpack配置文件或者cooking配置文件中，在extends中去掉eslint即可。

## 注册给所有子组件
在new的时候，直接放在选项中，比如router或者store，可以直接注册给所有子组件。
