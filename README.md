## langlive-webpack
### 一、说明
+ 如何使用：
	+ 1、<code>clone到本地</code>
	+ 2、<code>npm install</code>
	+ 3、<code>npm run dev</code> 即可查看效果
+ <code>npm run dev</code>：自动打开浏览器并预览(地址是自己配置的IP方便手机查看)
+ <code>npm run build </code>：项目打包(感觉以及完善了即可)，自动创建build文件夹
+ 打包后的文件夹可以根据config/config.js自定义(方便自己上线的目录对应)


### 二、已经完成的配置
+ 1、webpack-dev-server 热更新
+ 2、编译LESS、SCSS、Stylus、es6
+ 3、自动追加打包后文件版本号
+ 4、html自定义模板
+ 5、抽离css压缩CSS
+ 6、压缩合并JS
+ 7、url-loader处理图片为base64，此配置使用时候图片必须是相对路径否则无效
+ 8、external外部配置文件(开发依赖)，例如：项目用到jQuery
+ 9、vendor(提取第三方JS库，如JQ)
+ 10、markDown文件自动转为html(类似github内的README.md默认样式)


### 三、文件目录介绍
+ webpack.confog.js被拆分为dev、common、prod三部分
+ node_modules：开发依赖包(在本地)
+ root：默认配置的服务器根目录，新建活动只需要在root/html/新建活动名字
+ src：主要操作都在这里
	+ js/css活动所需要的公用JS和CSS
	+ root服务器根目录
+ .babelrc :编译es6的配置
+ .gitignore：github提交的时候想要忽略提交的配置
+ package.json：项目所需要的依赖包以及配置说明。
+ tsconfig.json：编译TypeScript的配置参数。编译后让多数浏览器都支持的javascript
+ .html和.ejs都是HTML的模板样式，最终会自动添加到指定的活动内

### 三、其他
+ 如：德古拉(degula_old.js)：[预览](https://wjf444128852.github.io/html/degulaOne/)
  + npm run start :就会自动打包到build文件夹下面，在复制到root/html/degulaOne/下，即完成！
+ 如果使用了jQuery又不想打包到一個JS文件，两种处理方式
	+ 1、<code>npm install jquery --save</code>安装到项目依赖(dependencies下)，在配置：<code>externals: {jquery: 'window.jQuery'}</code>，且在HTML内引入jquery,即可：var $=require("jquery")正常使用
	+ 2、vendor:"string"||["string",""string]
