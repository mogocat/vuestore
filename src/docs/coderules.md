
## 前端规则：

### 事件字符串规则
第一段动作：request请求、response回应、update更新、delete删除、confirm确认
其中add和edit都包括在update中

第二段模块：fixings配件信息、category分类信息

第三段数量：single单条、code字段、table全部表格、tree全部树形

两个字的label宽度一律60，给星号流出空间


修改实现：
response全部取消，数据更新后直接自动update，不再response带payload。
update和add，用current直接保存到store中，confirm、delete等只传id作为参数。
页面合并，无法复用的组件直接合并到需要的位置上。

修改实现：
只有提交表单才会绑定数据到current，禁止表单直接读取current的数据
更新和添加的时候，事件中要绑定form数据，比全局变量更清晰

修改实现：
前台数据创建或者修改后，如果后台返回成功，那么直接将该数据变更到前台的object中。后台插入成功返回的数据，有时候可能字段不全。
非弹窗组件从route中获取参数去加载数据，弹窗组件使用调用时附带的数据。
每个组件有数据流入、事件+payload流出，其他所需的数据，自己去申请获取，父组件只传入核心数据。

## 后端接口：

域名+模块名+操作
操作包括edit更新、del删除、tree树形、table表格
upsert插入或更新、add添加

错误码：
100 数据关联禁止删除
101 外键关联禁止删除
999 未知错误 附带信息

字段长度：
配件：
name:50,note:200,code:7
清单：
note:200,time:20
分类：
name:20,code:7
联系人：
name:20,cell:20,tel:20,address:200,search:50
记录：
库存：
