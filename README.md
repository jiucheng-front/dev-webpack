## langlive-webpack
### 一、文件目錄介紹
+ node_modules：开发依赖包(在本地)
+ root：默认配置的服务器根目录，新建活动只需要在root/html/新建活动名字
+ src：主要操作都在这里
	+ js/css活动所需要的公用JS和CSS
	+ root服务器根目录
+ .babelrc :编译es6的配置
+ .gitignore：github提交的时候想要忽略提交的配置
+ package.json：项目所需要的依赖包以及配置说明。
+ tsconfig.json：编译TypeScript的配置参数。编译后让多数浏览器都支持的javascript
+ webpack.confog.js：webpack的配置文件！最重要的一个！！
+ .html和.ejs都是HTML的模板样式，最终会自动添加到指定的活动内


### 二、说明
+ <code>npm run server</code>：自动打开浏览器并预览(地址是自己的配置的IP)
+ <code>npm run start </code>：项目打包(感觉以及完善了即可)，自动创建build文件夹
+ <code>npm run clean </code>：删除build文件夹
### 三、其他
+ 如：德古拉(degula_old.js)：[预览](https://wjf444128852.github.io/html/degulaOne/)
  + npm run start :就会自动打包到build文件夹下面，在复制到root/html/degulaOne/下，即完成！
+ 如果使用了jQuery又不想打包到一個JS文件，两种处理方式
	+ 1、<code>npm install jquery --save</code>安装到项目依赖(dependencies下)，在配置：<code>externals: {jquery: 'window.jQuery'}</code>，且在HTML内引入jquery,即可：var $=require("jquery")正常使用
	+ 2、
