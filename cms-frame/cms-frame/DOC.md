Main组件根据sider/header中history.push() 操作进行的页面展示,不是利用路由进行的页面跳转,而是直接渲染的组件

是怎么渲染的?

先通过webpack的require方法加载出使用export方法导出的组件(export default 导出需使用require().default), 
然后与后端返回的菜单数据进行匹配: children为空数组,说明是可点击的一级菜单, children有数据, 表示是可展开的一级菜单,
利用 后端返回的菜单数据中的组件名 与 require方法加载出来的对象中的keys进行匹配,匹配到, 就返回key对应的value
value就是对应的组件, 最后就把该组件渲染出来