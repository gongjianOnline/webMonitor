/**
 * 监控ajax和axios 
 */
export default function injectXHR(){
  let XMLHttpRequest = window.XMLHttpRequest;
  let oldOpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function(method,url,async){
    /**
     * 在项目中需要过滤掉 监控接口的,否则接口监听会出现死循环
     * if(url.match(/url/)){
     *  this.logData = {method,url,async}
     * }
     */
    this.logData = {method,url,async}
    return oldOpen.apply(this,arguments)
  }
  let oldSend = XMLHttpRequest.prototype.send;
  XMLHttpRequest.prototype.send = function(body){
    if(this.logData){
      let startTime = Date.now();
      let handler = (type)=> (event)=>{
        let duration = Date.now() - startTime;
        let status = this.status; // 200 OR 500
        let statusText = this.statusText; // ok OR Server Error
        let log = {
          kind:"stability",
          type:'xhr',
          eventType:type, // 错误类型 load error abort
          pathname:this.logData.url, // 请求路径
          status:status+"-"+statusText, // 状态码
          duration:duration, // 持续时间
          response:this.response?JSON.stringify(this.response):"", // 响应体
          params:body || ""
        }
        // console.log('请求接口监听上报',log)
      }
      this.addEventListener('load',handler("load"),false);
      this.addEventListener("error",handler("error"),false)
      this.addEventListener("abort",handler("abort"),false)
    }
    return oldSend.apply(this,arguments)
  }


}