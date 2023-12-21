"use strict";
Array.prototype.remove = function(val){ var index = this.indexOf(val);if (index > -1) {this.splice(index, 1);}  };
Array.prototype.removeAll = function(val){var index; while((index = this.indexOf(val) )>-1) {this.splice(index, 1);}  };
String.prototype.replaceAll = function(s1, s2) {return this.replace(new RegExp(s1, "gm"), s2);}
var X=window.X||{
	debugger:true,
	VERSION:'1.0.0',
	RES_CSS_VERSION:'1.0.0',
	RES_JS_VERSION:'1.0.0',
	RES_CUSTOM_VERSION:'1.0.0',
	base: function(){try{return document.getElementById("bootjs").src.split("/res/js/boot.js")[0]}catch{return document.location.origin;}}(),
	isLocal:(window.location.href.indexOf("127.0.0")>-1||window.location.href.indexOf("localhost")>-1),
	sleep:function(ms){var start = new Date().getTime();while (true) if (new Date().getTime() - start > ms) break;},
	GetRequest:function(){
		var url = location.search;
		var theRequest = {};
		if(url.indexOf("?") != -1){
			var str = url.substr(1);
			var strs = str.split("&");
			for(var i = 0; i < strs.length; i ++) {
				theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]); 
			}
		}
		return theRequest;
	}
};
X.PARAM=X.GetRequest();
//X.base=X.isLocal ? __BOOTPATH.replace(window.location.origin,"") :'https://c.1kat.cn/cdn';
//X.base='https://magnificent-souffle-89810d.netlify.app';
//X.base='https://c.1kat.cn/cdn';
X.js=`${X.base}/res/js`
X.css=`${X.base}/res/css`
X.md=`${X.base}/md`
//X.img= "https://7up.pics/images/2023/11/24";
X.img= `${X.base}/res/img`
if(typeof X.beforeLoad=="function")X.beforeLoad();
// document.addEventListener("DOMNodeInserted",function(e,a){console.log(e.target.src)},false);
// var layuiDom= document.createElement("script");
// layuiDom.onload = layuiDom.onreadystatechange=function(){
// 	//layui.config({base: `res/js/util/`}); 
// 	layui.extend({
// 		"mm":`{/}${X.js}/util/mm`,
// 		"D":`{/}${X.js}/util/D`,
// 		"templet":`{/}${X.js}/util/templet`,
// 		"detail":`{/}${X.js}/util/detail`,
// 		"index":`{/}${X.js}/util/index`,
// 		});
// 	if(typeof layuiOnReady=="function")layuiOnReady();
// }
// layuiDom.src="https://cdn.bootcdn.net/ajax/libs/layui/2.7.0/layui.min.js";
// document.head.append(layuiDom);
//layui.config({base: `res/js/util/`}); 
// layui.extend({
// 	"mm":`{/}${X.js}/util/mm`,
// 	"D":`{/}${X.js}/util/D`,
// 	"templet":`{/}${X.js}/util/templet`,
// 	"detail":`{/}${X.js}/util/detail`,
// 	"index":`{/}${X.js}/util/index`,
// 	});
// 	console.log(layui)
//<script type="text/javascript" src="https://cdn.bootcdn.net/ajax/libs/layui/2.8.17/layui.min.js"></script> 
document.write(`
<link href="${X.img}/html_head.png" rel="SHORTCUT ICON">
<link rel="stylesheet" type="text/css" href="https://cdn.bootcdn.net/ajax/libs/layui/2.7.0/css/layui.min.css">
<link rel="stylesheet" type="text/css" href="https://lib.baomitu.com/font-awesome/5.13.0/css/all.css">
<link rel="stylesheet" type="text/css" href="${X.css}/main.css?v=${X.RES_CSS_VERSION}">
<!--加载meta IE兼容文件-->
<!--[if lte IE 9]>
<script src="https://cdn.bootcdn.net/ajax/libs/html5shiv/3.7.3/html5shiv.min.js"></script>
<script src="https://cdn.bootcdn.net/ajax/libs/respond.js/1.4.2/respond.min.js"></script>
<![endif]-->`);

try{
	var ___tmpurlpage=location.href.split("#")[0].split("?")[0].split('/').pop();
	if(___tmpurlpage==="details.html"){
		//<!-- <link rel="stylesheet" href="https://cdn.bootcdn.net/ajax/libs/github-markdown-css/5.2.0/github-markdown-dark.min.css" type="text/css" charset="UTF-8" />--> 
		//<!-- <link rel="stylesheet" href="https://cdn.bootcdn.net/ajax/libs/prism-themes/1.9.0/prism-ghcolors.min.css" type="text/css" charset="UTF-8" /> -->
		//<!-- <script src="https://lib.baomitu.com/marked/10.0.0/marked.min.js"></script> -->
		document.write(`
		 <link rel="stylesheet" href="https://cdn.bootcdn.net/ajax/libs/github-markdown-css/5.2.0/github-markdown.min.css" type="text/css" charset="UTF-8" />
		 <link rel="stylesheet" href="https://cdn.bootcdn.net/ajax/libs/prism/1.19.0/themes/prism.min.css" type="text/css" charset="UTF-8" />
		 <script type="text/javascript" src="https://cdn.bootcdn.net/ajax/libs/layui/2.8.17/layui.min.js"></script>
		<script src="https://cdn.bootcdn.net/ajax/libs/marked/9.0.0/marked.min.js"></script>
		<script src="https://cdn.bootcdn.net/ajax/libs/prism/1.29.0/prism.min.js" type="text/javascript" charset="UTF-8"></script>
		<script src="https://cdn.bootcdn.net/ajax/libs/prism/1.29.0/components/prism-java.min.js" type="text/javascript" charset="UTF-8"></script>`);
	}
}catch(e){ }

if(typeof X.afterLoad=="function")X.afterLoad();