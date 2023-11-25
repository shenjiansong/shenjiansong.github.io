var UNIN_CODE_IN_PAG=new Date().getTime();
function getUnique(){
	if(!top.UNIN_CODE_IN_PAG)top.UNIN_CODE_IN_PAG=new Date().getTime();
	return top.UNIN_CODE_IN_PAG;
}
if(window.location.href.indexOf("127.0.0")>-1||window.location.href.indexOf("localhost")>-1){
	document.write('<script id="bootjs" src="./res/js/boot.js?t='+getUnique()+'" type="text/javascript"></script>');
}else{
	document.write('<script id="bootjs" src="https://c.1kat.cn/cdn/res/js/boot.js?t='+getUnique()+'" type="text/javascript"></script>');
}