/**用于捕获用户触发事件 */
let lastEvent;
['click','touchstart','mousedown','keydown','mouseover'].forEach(eventType=>{
  document.addEventListener(eventType,(event)=>{
    lastEvent = event
  },{
    capture:true, // 捕获时执行
    passive:true // 不阻止默认事件
  })
})
export default function(){
  return lastEvent
}