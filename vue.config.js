module.exports={
  devServer:{
      proxy:{
          '^/aps':{
              target:'http://49.235.147.95:3001/',
              changeOrigin:true,
              pathRewrite:{
                  '^/aps':''
              }
          }
      }
  }
}