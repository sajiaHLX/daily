/* var arr = [];
var i = 0;
function addNum() {
    var num = sNum()
    if (arr.length < 5) {
        if (arr.indexOf(num) == -1) {
            arr[i++] = num;
            addNum();
        } else {
            addNum();
    }
    return;
}
function sNum() {
    return Math.floor(Math.random() * 31) + 2;
}
addNum()
console.log(arr);
 */
var delLast=function(str,del){
    if(typeof str!=="string"){
        console.log("error");
        return;
    }else{
        var delNum=str.lastIndexOf(del);
        str=str.substring(0,delNum)+str.substring(delNum+1,)
        return str;
    }
}
console.log(delLast("fsdfaefdsdfdff","f"));