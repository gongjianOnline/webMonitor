/**
 * 获取设备信息封装
 */
// 获取浏览器厂商
export function getExplore (){
  var Sys = {};  
  var ua = navigator.userAgent.toLowerCase();  
  var s;  
  (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? Sys.ie = s[1] :
  (s = ua.match(/msie ([\d\.]+)/)) ? Sys.ie = s[1] :  
  (s = ua.match(/edge\/([\d\.]+)/)) ? Sys.edge = s[1] :
  (s = ua.match(/firefox\/([\d\.]+)/)) ? Sys.firefox = s[1] :  
  (s = ua.match(/(?:opera|opr).([\d\.]+)/)) ? Sys.opera = s[1] :  
  (s = ua.match(/chrome\/([\d\.]+)/)) ? Sys.chrome = s[1] :  
  (s = ua.match(/version\/([\d\.]+).*safari/)) ? Sys.safari = s[1] : 0;  
    // 根据关系进行判断
  if (Sys.ie) return ('IE: ' + Sys.ie);  
  if (Sys.edge) return ('EDGE: ' + Sys.edge);
  if (Sys.firefox) return ('Firefox: ' + Sys.firefox);  
  if (Sys.chrome) return ('Chrome: ' + Sys.chrome);  
  if (Sys.opera) return ('Opera: ' + Sys.opera);  
  if (Sys.safari) return ('Safari: ' + Sys.safari);
  return 'Unkonwn';
}

// 兼容跨端设备
export function terminalFun (){
  const terminal = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)
  if(!terminal){
    return {
      IOS:browserRedirect(),
      terminal:"PC"
    }
  }else{
    return {
      IOS:getOSType(),
      terminal:"mobile"
    }
  }
}

// 获取PC操作系统
function browserRedirect(){
  var sUserAgent = navigator.userAgent;
  // 判断是PC端还是移动端
  let NavigatorUAData = navigator.userAgentData;
  var isWin = (NavigatorUAData.platform == "Win32") || (NavigatorUAData.platform == "Windows");
  var isMac = (NavigatorUAData.platform == "Mac68K") || (NavigatorUAData.platform == "MacPPC") || (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel");
  if (isMac) return "Mac";
  var isUnix = (NavigatorUAData.platform == "X11") && !isWin && !isMac;
  if (isUnix) return "Unix";
  var isLinux = (String(NavigatorUAData.platform).indexOf("Linux") > -1);
  if (isLinux) return "Linux";
  if (isWin) {
    var isWin2K = sUserAgent.indexOf("Windows NT 5.0") > -1 || sUserAgent.indexOf("Windows 2000") > -1;
    if (isWin2K) return "Win2000";
    var isWinXP = sUserAgent.indexOf("Windows NT 5.1") > -1 || sUserAgent.indexOf("Windows XP") > -1;
    if (isWinXP) return "WinXP";
    var isWin2003 = sUserAgent.indexOf("Windows NT 5.2") > -1 || sUserAgent.indexOf("Windows 2003") > -1;
    if (isWin2003) return "Win2003";
    var isWinVista= sUserAgent.indexOf("Windows NT 6.0") > -1 || sUserAgent.indexOf("Windows Vista") > -1;
    if (isWinVista) return "WinVista";
    var isWin7 = sUserAgent.indexOf("Windows NT 6.1") > -1 || sUserAgent.indexOf("Windows 7") > -1;
    if (isWin7) return "Win7";
    var isWin10 = sUserAgent.indexOf("Windows NT 10") > -1 || sUserAgent.indexOf("Windows 10") > -1;
    if (isWin10) return "Win10";
  }
  return "other";
}
// 获取移动端操作系统
function getOSType() {
  if (/(Android)/i.test(navigator.userAgent)) {
      return "Android";
  } else if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
      return "ios";
  } else {
      return "unknown";
  }
}