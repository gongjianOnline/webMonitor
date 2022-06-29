import getLastEvent from "../utils/getLastEvent"
import getSelector from "../utils/getSelector"
import SendTracker from "../utils/tracker"
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
    SendTracker.send(log)
  })

  //  监听Promise报错
  window.addEventListener("unhandledrejection",(event)=>{
    let lastEvent = getLastEvent();
    let message;
    let filename;
    let line = 0;
    let column = 0;
    let stack = "";
    let reason = event.reason
    if(typeof reason === "string"){
      message = event.event
    }else if(typeof reason === "object"){
      if(reason.stack){
        let matchResult = reason.stack.match(/at\s+(.+):(\d+):(\d+)/);
        filename = matchResult[1];
        line = matchResult[2];
        column = matchResult[3];
      }
      stack = getLines(reason.stack)
      console.log(stack)
    }
    let log = {
      kind:"stability",// 监控指标的大类
      type:"error",// 小类型
      errorType:"promiseError",// JS执行错误
      message:message, // 报错信息
      filename:filename, // 报错文件
      position:`${line}:${column}`, // 报错行数
      stack:stack, // 堆栈信息
      selector:lastEvent?getSelector(lastEvent.path):""// 最后一个操作的元素
    }
    console.log("promiseError",log)
  })


  function getLines(stack){
    return stack.split("\n").slice(1).map(item=>item.replace(/^\s+at\s+/g,"")).join("^")
  }
}