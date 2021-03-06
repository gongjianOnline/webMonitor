/**
 * 用于监听页面流量和点击量
 */
import { getExplore,terminalFun} from "../utils/equipmentInfo"
export default function pv(){
  const connection = navigator?.connection || navigator;
  let explore = getExplore();
  let getTerminal = terminalFun()
  let equipmentLog = {
    kind: 'business',
    type: 'pv',
    effectiveType: connection?.effectiveType || "null", //网络环境
    rtt: connection?.rtt || "null",//往返时间
    screen: `${window.screen.width}x${window.screen.height}`,//设备分辨率
    explore:explore, //设备信息
    ...getTerminal
  }
  console.log("打印设备信息",equipmentLog)

  // 监控用户浏览时间
  let startTime = Date.now();
  window.addEventListener("unload",()=>{
    let stayTime = Date.now() - startTime;
    let browseLog = {
        kind: 'business',
        type: 'stayTime',
        stayTime
    };
    console.log("监控页面浏览时间",browseLog)
  },false)



}