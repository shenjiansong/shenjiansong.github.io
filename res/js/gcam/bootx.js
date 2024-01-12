
var __BOOTPATH = ___CreateJSPath("/res/js/gcam/bootx.js");

function ___CreateJSPath(js) {
    var scripts = document.getElementsByTagName("script");
    var path = "";
    for (var i = 0, l = scripts.length; i < l; i++) {
        var src = scripts[i].src;
        if (src.indexOf(js) != -1) {
            var ss = src.split(js);
            path = ss[0];
            break;
        }
    }
    var href = location.href;
    href = href.split("#")[0];
    href = href.split("?")[0];
    var ss = href.split("/");
    ss.length = ss.length - 1;
    href = ss.join("/");
    if (path.indexOf("https:") == -1 && path.indexOf("http:") == -1 && path.indexOf("file:") == -1 && path.indexOf("\/") != 0) {
        path = href + "/" + path;
    }
    return path;
}
var UNIN_CODE_IN_PAG=new Date().getTime();
function getUnique(){
	if(!top.UNIN_CODE_IN_PAG)top.UNIN_CODE_IN_PAG=new Date().getTime();
	return top.UNIN_CODE_IN_PAG;
}
document.write('<script id="bootjs" src="../res/js/gcam/boot.js?t='+getUnique()+'" type="text/javascript"></script>');
