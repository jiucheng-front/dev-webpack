## langlive-webpack
### 文件目錄介紹
+ node_modules：开发依赖包
+ root：默认配置的服务器根目录，新建活动只需要在root/html/新建活动名字
+ src：活动所需要的JS和CSS
+ .babelrc :编译es6的配置
+ .gitignore：github提交的时候想要忽略提交的配置
+ package.json：项目所需要的依赖包。
+ tsconfig.json：编译TypeScript的配置参数。编译后让多数浏览器都支持的javascript
+ webpack.confog.js：webpack的配置文件！最重要的一个！！
+ .html和.ejs都是HTML的模板样式，最终会自动添加到指定的活动内

### 如何使用
+ 如：德古拉(degula_old.js)：[预览](https://wjf444128852.github.io/html/degulaOne/)
  + npm run start :就会自动打包到build文件夹下面，在复制到root/html/degulaOne/下，即完成！
+ 如果使用了jQuery又不想打包到一個JS文件，两种处理方式
	+ 1、<code>npm install jquery --save</code>安装到项目依赖(dependencies下)，在配置：<code>externals: {jquery: 'window.jQuery'}</code>，且在HTML内引入jquery,即可：var $=require("jquery")正常使用
	+ 2、
