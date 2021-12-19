function message_receive(msg, msgid,uid,subid,cid) {
	//alert(msg,msgid,uid,subid,cid);
	msg=encodeURI(msg)
	msg=msg.replace("%20","");
	msg=msg.replace("%00","");
	msg=decodeURI(msg)
	msg=autoChange(msg)
	console.log("BV转换："+msg)
	message_create(msg,msgid,uid,subid); 
	return msg
}

var table = "fZodR9XQDSUm21yCkr6zBqiveYah8bt4xsWpHnJE7jL5VG3guMTKNPAwcF";
var tr = {};
for (let i = 0; i < 58; i++) {
    tr[table[i]] = i;
}
var s = [11, 10, 3, 8, 4, 6];
var xor = 177451812,
    add = 8728348608;
//bv转av
function dec(x) {
    var result = 0;
    for (let i = 0; i < 6; i++) {
        result += tr[x[s[i]]] * Math.pow(58, i);
    }
    return (result - add) ^ xor;
}
//av转bv
function enc(x) {
    x = (x ^ xor) + add;
    var result = "BV1  4 1 7  ".split("");
    for (let i = 0; i < 6; i++) {
        result[s[i]] = table[Math.floor(x / Math.pow(58, i)) % 58];
    }
    return result.join("");
}
//去左右空格;
function trim(s){
   s=s.replace(/(^\s*)|(\s*$)|/g, "");
   return s
}
//自动转换bvav号
function autoChange(str){
  str=trim(str)
  str=str.split(" ")
  str=str[str.length-1].replace(/^[aA][vV]/,"")
  //console.log(str)
  if(/^[bB][Vv].*$/.test(str)){
    return "av"+dec(str)
  }
  return enc(str)
}