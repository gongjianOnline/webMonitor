/**
 * 监控页面卡断模块
 * 
 */
import getLastEvent from "../utils/getLastEvent"
import getSelector from "../utils/getSelector"
import formatTime from "../utils/formatTime"

export default function longTask(){
  new PerformanceObserver((list)=>{
    list.getEntries().forEach((item)=>{
      // 判断如果改事件执行超过200毫秒,则收集日志
      if(item.duration > 200){
        let lastEvent = getLastEvent();
        // 在浏览器空闲的时候被调用,他不遵循先进先调用的顺序执行
        requestIdleCallback(()=>{
          let log = {
            kind:"experience",
            type: 'longTask',
            eventType:lastEvent.type,
            startTime:formatTime(item.startTime), //startTime 的时间为页面渲染完用户多长时间后触发的毫秒值
            duration:formatTime(item.duration), // duration 表示该事件执行了多少时间
            selector:lastEvent?getSelector(lastEvent.path || lastEvent.target) : ''
          }
          // console.log("卡顿监测",log)
        })
      }
    })
  }).observe({
    entryTypes:["longtask"]
  })


}