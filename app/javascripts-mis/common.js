/**
 * Created by lonelydawn on 2017-04-21.
 */

// 获取浏览器
 var getBrowserType = function(){
 	 //取得浏览器的userAgent字符串
    var userAgent = navigator.userAgent;

    if (userAgent.indexOf("Opera") > -1)
        return "Opera"
    else if (userAgent.indexOf("Firefox") > -1) 
        return "Firefox";
    else if (userAgent.indexOf("Chrome") > -1)
  		return "Chrome";
 	else if (userAgent.indexOf("Safari") > -1) 
        return "Safari";
    else if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && userAgent.indexOf("Opera")<=-1)
        return "IE";
}

console.log(getBrowserType());

// 限制文本输入框只能输入 数字
var numberOnly = function(event){
    var ev = event? event: window.event;
    var keyCode = ev.which? ev.which : ev.keyCode;
    return keyCode >=48 && keyCode<= 57 || keyCode == 8;
};

// 获取两位数字, 将一位前补0变两位
var getDoubleBitNumber = function(num){
    return (num>=0 && num<10)? "0"+ num: num;
};