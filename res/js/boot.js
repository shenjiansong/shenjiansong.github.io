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
	base:__BOOTPATH.replace(window.location.origin,""),
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
	},
	getLayUi:function(){
		return layui.config({base: `${X.js}/util/`});
	}
};
X.PARAM=X.GetRequest();
X.base=X.isLocal ? __BOOTPATH.replace(window.location.origin,"") :'https://sensational-dusk-8229ae.netlify.app';
//X.base='https://sensational-dusk-8229ae.netlify.app';
X.js=`${X.base}/res/js`
X.css=`${X.base}/res/css`
X.md=`https://gitee.com/shenjiansong/static/raw/master/md`
//X.img= "https://7up.pics/images/2023/11/24";
X.img= `${X.base}/res/img`
if(typeof X.beforeLoad=="function")X.beforeLoad();
// document.addEventListener("DOMNodeInserted",function(e,a){console.log(e.target.src)},false);
var layuiDom= document.createElement("script");
layuiDom.onload = layuiDom.onreadystatechange=function(){
	if(typeof layuiOnReady=="function")layuiOnReady();
}
layuiDom.src="https://cdn.bootcdn.net/ajax/libs/layui/2.8.17/layui.min.js";
document.head.append(layuiDom);
//<script type="text/javascript" src="https://cdn.bootcdn.net/ajax/libs/layui/2.8.17/layui.min.js"></script> 
document.write(`
<link href="${X.img}/html_head.png" rel="SHORTCUT ICON">
<link rel="stylesheet" type="text/css" href="https://cdn.bootcdn.net/ajax/libs/layui/2.8.17/css/layui.min.css">
<link rel="stylesheet" type="text/css" href="https://cdn.bootcdn.net/ajax/libs/font-awesome/5.11.1/css/all.css">
<link rel="stylesheet" type="text/css" href="${X.css}/main.css?v=${X.RES_CSS_VERSION}">



<script src="${X.js}/util/D.js"></script>
<script src="${X.js}/util/detail.js"></script>
<script src="${X.js}/util/index.js"></script>
<script src="${X.js}/util/mm.js"></script>
<script src="${X.js}/util/templet.js"></script>
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