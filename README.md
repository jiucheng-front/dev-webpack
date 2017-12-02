## langlive-webpack
### 一、如何使用
+ <code>npm install</code>
+ <code>npm run dev</code>
+ <code>npm run build </code>


### 二、已经完成的配置
+ 1、webpack-dev-server 热更新
+ 2、编译LESS、SCSS、Stylus、es6
+ 3、打包自动追加文件版本号(hash)
+ 4、html自定义模板
+ 5、抽离、压缩CSS
+ 6、压缩、提取JS
+ 7、url-loader处理图片为base64，使用时图片必须是相对路径否则无效(**一般不用**)
+ 8、external外部配置文件(开发依赖)，例如：项目用到jQuery(**有vendor该项省略**)
+ 9、vendor(提取第三方JS库或者公用代码，如JQ、手淘lib-flexible)
+ 10、markDown文件自动转为html(类似github内的README.md默认样式)
+ 11、添加pug、和pug-loader处理html组件化
+ 12、CSS、LESS、SCSS、Stylus自动追加浏览器前缀
+ 13、CSS模块化即CSS内使用<code>@import 其他CSS文件</code>
+ 14、CSS内使用CSS3+新语法
+ 15、压缩打包后的html文件


### 三、文件目录介绍
+ config 打包输出配置
+ webpack.confog.js被拆分为dev、common、prod三部分
+ src：主要操作都在这里
	+ js/css活动所需要的公用JS和CSS
	+ root服务器根目录
+  postcss.config.js：postcss配置文件
	+  <code>postcss-import、postcss-cssnext、</code>
	+  autoprefixer已经内置到postcss-cssnext
+ .babelrc :编译es6的配置
+ .gitignore：github提交的时候想要忽略提交的配置
+  package.json：项目所需要的依赖包以及配置说明。
+  tsconfig.json：编译TypeScript的配置参数。编译后让多数浏览器都支持的javascript
+ .html模板样式，最终会自动添加到指定目录内