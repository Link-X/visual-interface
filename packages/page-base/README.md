##### 前端 from low code 平台

使用方法:  
1、npm install create-design-cli -g
2、新建 [project-file]
3、cd [project-file]
2、create-design-cli init
3、npm install
4、npm run design

##### 模式说明
1、普通模式: 普通模式时前端修改json，最终汇总提交到后台。预览时时通过循环json显示form。  
2、开发者模式: 开发者模式使用的是,本地开发时node的能力进行保存和生成json和代码  
`普通模式和开发者模式的区别在于。开发者模式可以将项目单独拆分，进行自定义添加组件。开发者模式属于发送到线上的由于没有node能力，需要将数据保存到后端的版本。`  

#### 普通模式preview 使用方法
1、引入preview  
2、参数: list, formLayout, request, change, submit  
```javascript
  list: 表单数据
  formLayout: 表单布局数据
  request: 使用者项目的http请求方法{get: function, post: function}
  change: 组件修改数据时触发
  submit: 分页组件，点击保存时触发
```
3、preview 是一个antd 的Form 表单。通过ref 可以获得 ref.form。等同于 antd Form 的 Form.useForm()


#### 开发者模式新增物料示例
1、create-design-cli init  
2、在components 中新建文件夹(test)  
3、在test文件新增 design文件夹、view文件夹、index.json文件  
4、参考`visual-interface-poject/src/materiel` 的写法
tip: 如果需要兼容普通模式，index.json文件新增字段时，请和后端沟通，避免上传到接口时因以前没这个字段不兼容。现有字段如下(下面有注释了的字段，要有..不然没法使用)
```javascript
    fieldType: string, // 组件类型（必须）
    fieldLabel: string, // 组件名称 （必须)
    fieldOrder: number,
    fieldKey: string, // 组件key （自动生成，修改时避免重复)
    fieldRequired: bool, // 是否必填
    fieldDesc: string, //  题目组件名称
    fieldTypeName: string, // 组件名称（没用到)
    formParams: {
      field: string,
      extra: string,
      dateType: string,
      dateFormat: string,
      defaultValue: ,
      placeholder: string,
      disabled: bool
    },
    colProps: {
      span: number,
      offset: number,
      push: number,
      pull: number 
    },// 布局
    designParams: {} any,
    fieldProperties: {
      titleColor: string,
      titleSize: any,
      showType: bool 
    },
    fieldOption: {
      type: string,
      checkReg: any,
      errorTip: string 
    }
```

本质上来讲，这套代码可以添加任何自定义组件，但是由于一些原因，现在只能生成表单组件。
##### 实现目标：
  1、通过命令创建可以新增任何自定义组件的项目
  2、自动识别新增的物料
  3、能管理自定义组件依赖
  4、本地保存设计的状态
  5、根据可视化界面编辑的数据，生成对应前端组件（页面）


##### create-cli 
  场景一:
    创建可编辑项目
      copy code 
      创建package.json

启动项目
  展示可编辑物料
    编辑
      生成表单数据
  新建物料
    识别文件
      展示可编辑物料
        编辑
          生成表单数据
  打包
    根据表单数据,打包前端自定义表单页面

###### design
 1、监听项目文件(完成)
 3、操作文件(完成)
 4、生成、修改ast(完成)
 5、生成code(完成)
 6、创建文件(完成)
 7、写入materiel(完成)
 webpack 监听刷新页面(待完成)

 修改配置
  1、发送事件(完成)
  2、生成json (完成)

##### build
 1、读取json (完成)
 2、根据json生成代码 (完成)



