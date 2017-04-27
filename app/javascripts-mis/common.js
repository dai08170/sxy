/**
 * Created by lonelydawn on 2017-04-21.
 */

// 限制文本输入框只能输入 数字
var numberOnly = function(){
    var ev = event || window.event;
    var keyCode = ev.keyCode;
    event.returnValue = keyCode >=48 && keyCode<= 57;
};