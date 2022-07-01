import getLastEvent from "../utils/getLastEvent"
import getSelector from "../utils/getSelector"
export default function longTask(){
  new PerformanceObserver((list)=>{
    console.log(list)
    // list.getEntries().forEach(entry => {
    //     if (entry.duration > 100) {
    //         let lastEvent = getLastEvent();
    //         requestIdleCallback(() => {
    //           let log = {
    //             kind: 'experience',
    //             type: 'longTask',
    //             eventType: lastEvent.type,
    //             startTime: entry.startTime,// 开始时间
    //             duration: entry.duration,// 持续时间
    //             selector: lastEvent ? getSelector(lastEvent.path || lastEvent.target) : ''
    //           }
    //           console.log("前端卡顿时间",log)
    //         });
    //     }
    // })
  }).observe({
    entryTypes:["longtask"]
  })


}