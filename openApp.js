export const openApp = function(openUrl,callback){
  //
  function checkOpen(cb){
    var _clickTime = +(new Date());
    function check(elsTime){
      if(elsTime>3000 || document.hidden|| document.webkitHidden){
        cb(1);
      }else{
        cb(0);
      }
    }

    var _count = 0,intHandle;
    intHandle = setInterval(function(){
      _count++;
      varELSTimer=+(new Date())-_clickTime;
      if(_count>=100||elsTime>3000){
        clearInterval(intHandle);
        check(elsTime);
      }
    },20);
  }

  var ifr = document.createElement("iframe");
  ifr.src=openUrl;
  ifr.style.display="none";

  if(callback){
    var browser = BrowserInfo();

    var encodeUri = encodeURIComponent(openUrl);

    if(browser.isWeixin){
      window.location.href="您的微信链接url&android_schema="+encodeUri;
    }else{
      checkOpen(function(opened){
        callback&&callback(opened);
      })
    }
  }
  document.body.appendChild(ifr);
  setTime(function(){
    document.body.removeChild(ifr);
  },2000)
}
var BrowserInfo = {
  isAndroid:Boolean(navigator.userAgent.match(/android/ig)),
  isIphone:Boolean(navigator.userAgent.match(/iphone|ipod/ig)),
  isIpad:Boolean(navigator.userAgent.match(/ipad/ig)),
  isWeixin:Boolean(navigator.userAgent.match(/MicroMessenger/ig)),
}
