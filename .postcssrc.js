/*
postCss配置文件
*/
module.exports = {
  //配置postcss插件
  plugins: {
    //配置使用autoprefixer插件
    // 'autoprefixer': {
    //   //配置要兼容到的环境信息
    //   browsers: ['Android >= 4.0','iOS >= 8']
    // },
    //配置使用 postcss-pxtorem插件
    'postcss-pxtorem': {
      rootValue({ file }){
         return file.indexOf('vant') !== -1 ? 37.5 : 75 
      },
      propList: ['*']
    }
  }
}