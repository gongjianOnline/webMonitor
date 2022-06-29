import getLastEvent from "../utils/getLastEvent"
import getSelector from "../utils/getSelector"
export function injectJsError(){
  // 监听全局未捕获的错误
  window.addEventListener("error",(event)=>{ // 错误事件对象
    let lastEvent = getLastEvent(); // 获取最后一个交互事件
    let log = {
      kind:"stability",// 监控指标的大类
      type:"error",// 小类型
      errorType:"jsError",// JS执行错误
      url:'', // 访问哪个路径报错
      message:event.message, // 报错信息
      filename:event.filename, // 报错文件
      position:`${event.lineno}:${event.colno}`, // 报错行数
      stack:getLines(event.error.stack), // 堆栈信息
      selector:lastEvent?getSelector(lastEvent.path):""// 最后一个操作的元素
    }
    console.log("log",log)
  })

  function getLines(stack){
    return stack.split("\n").slice(1).map(item=>item.replace(/^\s+at\s+/g,"")).join("^")
  }
}