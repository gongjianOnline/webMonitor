/**
 * 跟踪器： 用于向服务端发送报错信息
 */
class SendTracker{
  constructor(){
    this.url = ""; // 上报的接口地址
    this.xhr = new XMLHttpRequest;
  }
  send(data){
    
  }
}
export default new SendTracker();
