## Sequelize

做关联的时候，默认都使用骆驼命名法，如果需要自定义外键名，可以在belongsTo函数中配置`User.belongsTo(Company, {foreignKey: 'fk_company'})`，然而define的配置项里，就不能再设置这个项了。

两边做外键，双方的联系设置要在同一个文件中，否则会不生效。也就是说，同一个文件中，声明has和belong两种关系才行。

raw用来返回单行数据，嵌套结构的不行。

plain可以返回纯粹的数据，但是findAll返回的是数组，是DAO对象的数组，不能直接用plain参数操作，必须对数组里的每个对象单独操作才生效。既然已经查询出来，那么在对象上覆盖一下get函数，加上plain参数即可。`record[i] = record[i].get({plain: true})`

数据model不能使用update作为attribute，会和默认属性/函数有一些冲突，建议用update_at
