const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin")
module.exports = {
  entry:"./src/index.js",
  mode:"development",
  output:{
    path:path.resolve(__dirname,"dist"),
    filename:"monitor.js"
  },
  devServer:{
    static:{
      directory: path.join(__dirname, 'dist'),
    },
    onBeforeSetupMiddleware:(devServer)=>{
      devServer.app.get("/success",(req,res)=>{res.json({id:1})});
      devServer.app.get("/error",(req,res)=>{res.sendStates(500)});
    }
    
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:'./src/index.html',
      inject:"head"
    })
  ]
}