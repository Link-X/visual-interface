yarn install
cd test-project
yarn design

#### engine

自定义数据引擎,负责协调（增删查改）用户在前端界面操作的数据

#### page-base

页面基座,承载 engine。封装了前端项目配置

#### record

前端记录，记录操作和错误日志

#### server

后端服务,保存操作数据，生成对应页面。

#### create-cli

cli,前端项目生成 cli
