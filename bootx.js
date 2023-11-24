var __BOOTPATH ="/";
var UNIN_CODE_IN_PAG=new Date().getTime();
function getUnique(){
	if(!top.UNIN_CODE_IN_PAG)top.UNIN_CODE_IN_PAG=new Date().getTime();
	return top.UNIN_CODE_IN_PAG;
}
if(window.location.href.indexOf("127.0.0")>-1||window.location.href.indexOf("localhost")>-1){
	__BOOTPATH="/static"
	document.write('<script src="./res/js/boot.js?t='+getUnique()+'" type="text/javascript"></script>');
}else{
document.write('<script src="https://magnificent-souffle-89810d.netlify.app/res/js/boot.js?t='+getUnique()+'" type="text/javascript"></script>');
}
