/**
 * Created by lonelydawn on 2017-04-21.
 */

// 限制文本输入框只能输入 数字
var numberOnly = function(){
    var ev = event || window.event;
    var keyCode = ev.keyCode;
    event.returnValue = keyCode >=48 && keyCode<= 57;
};

// 获取两位数字, 将一位前补0变两位
var getDoubleBitNumber = function(num){
    return (num>=0 && num<10)? "0"+ num: num;
};