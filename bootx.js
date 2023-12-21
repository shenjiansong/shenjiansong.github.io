var UNIN_CODE_IN_PAG=new Date().getTime();
function getUnique(){
	if(!top.UNIN_CODE_IN_PAG)top.UNIN_CODE_IN_PAG=new Date().getTime();
	return top.UNIN_CODE_IN_PAG;
}
document.write('<script id="bootjs" src="./res/js/boot.js?t='+getUnique()+'" type="text/javascript"></script>');