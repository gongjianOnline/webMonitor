/**
 * 用户体验监控
 *  - 加载时间
 *  - TTFB 首字节时间
 *  - FP 首次绘制
 *  - FCP 首次内容绘制
 *  - FMP 首次意义绘制
 *  - FID 首次输入延迟
 *  - 卡顿(>50ms)
 */
import getSelector from "../utils/getSelector";
import getLastEvent from "../utils/getLastEvent"
import onload from "../utils/onload";
export default function timing(){
  let FMP,LCP;
  // 添加性能条目的观察者
  new PerformanceObserver((entryList,observer)=>{
    let perfEntries = entryList.getEntries();
    FMP = perfEntries[0];
    observer.disconnect(); //取消观察
  }).observe({entryTypes:['element']}); //观察页面中有意义的元素

  new PerformanceObserver((entryList,observer)=>{
    let perfEntries = entryList.getEntries();
    LCP = perfEntries[0];
    observer.disconnect(); //取消观察
  }).observe({entryTypes:['largest-contentful-paint']}); // 观察页面最大渲染元素

  /**TTI首次延迟 OR FIO处理延迟时间 */
  new PerformanceObserver((entryList,observer)=>{
    let lastEvent = getLastEvent()
    let firstInput = entryList.getEntries()[0];
    if(firstInput){
      //inputDelay(反射弧时间) = processingStart(开始处理的时间) - startTime(开点击的时间) 
      let inputDelay = firstInput.processingStart - firstInput.startTime;
      let duration = firstInput.duration; // 处理的耗时
      if(inputDelay>0 || duration>0){
        let log = {
          kind:"experience", // 用户体验指标
          type:"firstInputDelay", // 首次输入延迟
          inputDelay:inputDelay, // 延迟的时间
          duration:duration, // 处理的时间
          startTime:firstInput.startTime, // 反射弧时间
          selector:lastEvent?getSelector(lastEvent.path || lastEvent.target) : "", // 点击的元素
        }
        // console.log("首次交互时长",log)
      }
    }
    observer.disconnect(); //取消观察
  }).observe({type:"first-input",buffered:true}); // 观察第一次交互



  onload(function(){
    setTimeout(()=>{
      const {
        fetchStart,
        connectStart,
        connectEnd,
        requestStart,
        responseStart,
        responseEnd,
        domLoading,
        domInteractive,
        domContentLoadedEventStart,
        domContentLoadedEventEnd,
        loadEventStart
      } = performance.timing;
      
      let log = {
        kind:"experience",
        type:'timing',
        connectTime:connectStart -connectEnd , //连接时间
        ttfbTime:responseStart - requestStart, // 首字节到达时间
        responseTime:responseEnd - responseStart, // 响应的读取时间
        parseDOMTime:loadEventStart - domLoading, // DOM解析时间
        domContentLoadedTime:domContentLoadedEventEnd - domContentLoadedEventStart,// 资源全部加载完成时间
        timeToInteractive:domInteractive - fetchStart, // 首次可交互时间
        loadTime:loadEventStart - fetchStart, // 完整的加载时间
      }
      // console.log("用户体验监控",log)
      // 监控性能指标
      let FP = performance.getEntriesByName("first-paint")[0]
      let FCP = performance.getEntriesByName("first-contentful-paint")[0];
      let paint_log = {
        kind:"experience", //用户体验指标,
        type:'paint', // 统计每个阶段的时间
        firstPaint:FP.startTime, // 首次绘制时间
        firstContentPaint:FCP.startTime, // 首次内容绘制时间
        firstMeaningfulPaint:FMP?.startTime || 0, // 首次意义绘制时间
        largestContentfulPaint:LCP?.startTime || 0, //最大内容渲染时间
      }
      // console.log("-----性能监控---",paint_log)
    },3000)
  })
}