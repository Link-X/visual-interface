### `engine`

npm run build:esm  
get /dist

简写：  
cb = CanvasBLock  
ds = design

engine 目的：通过引入 engine 可以获取将组件自定义编排和操作的能力

-   导出组件
-   CanvasBlock: 可视化画布(提供编排组件能力)
-   DragCommon: 列表拖拽
-   Design
-   Side

各组件作用:  
cb ---> 根据 store 渲染 ---> 操作输出选择数据

ds ---> 根据选中 store 渲染 ---> 操作输出数据

store ---> 根据 meta 初始化数据 ---> 提供操作 store api ---> 修改 store  

问题：  
 1、cb 和 ds 是否需要分开  
 问题：不分开使用更加灵活可以自定义布局样式  
 解决：不分开  
 描述：由于 store 需要将这两个组件链接，分块需要使用者自行链接  
 2、如何获取自定义组件路径  
 问题：cb、ds、side 需要根据自定义组件展示对应内容  
 解决：
1、page-base 通过获取路径获取组件，将获取的组件传入 engine  
 方法一问题，在于传入组件是否会导致性能问题
2、传入路径，engine 通过 require 动态获取
方法二问题，传入路径是否会导致 engine 逻辑不纯洁
3、固定某个路径 engine 通过固定路径获取
方法三问题，不灵活
描述： 还是传入吧,使用起来比较合理,性能问题后续考虑
