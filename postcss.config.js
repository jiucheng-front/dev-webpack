module.exports = {
    plugins: {
        // css 内可以使用 @import 其他CSS文件
        'postcss-import': {},
        // CSS内可以使用 css3+ 新语法
        'postcss-cssnext': {
        browsers: ['last 2 versions', '> 5%']
        },
        // CSS 内自动追加浏览器前缀
        'autoprefixer':{}
    }
  }