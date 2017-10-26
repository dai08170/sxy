# sxy
商学院门户网站+管理系统

## 采用技术
* angular
* bootstrap
* nodejs

## 环境要求
* node 4.0+
* gulp

## 项目搭建
#### 安装依赖
根目录下输入:
    npm install
./public 目录下输入:
    bower install
#### 压缩文件
    gulp
#### 启动项目
    node app.js
    
## 其他

1. 配套后台文件在 sxy_backend 仓库中
2. 源代码在./app下面, 经过压缩注入到./public/javascripts & ./public/stylesheets 中, 页面文件在 ./public/partials 中
3. 入口文件 app.js , 主页面在 ./views 中
