"use strict";
Array.prototype.remove = function(val){ var index = this.indexOf(val);if (index > -1) {this.splice(index, 1);}  };
Array.prototype.removeAll = function(val){var index; while((index = this.indexOf(val) )>-1) {this.splice(index, 1);}  };
if(typeof "".replaceAll !="function"){String.prototype.replaceAll = function(s1, s2) {return this.replace(new RegExp(s1, "gm"), s2);}}
var Thead={
	run:function(task){
		return new Promise ((resolve, reject)=> {
			try{
				var result=task();
				resolve(result);
			}catch(e){
				reject(e);
			}
		});
	},
	delayed:function(task,delayedMills){
		return new Promise ((resolve, reject)=> {
			setTimeout(function(){
				try{
					var result=task();
					resolve(result);
				}catch(e){
					reject(e);
				}
			},delayedMills);
		});
	}
}
var X=window.X||{
	debugger:true,
	VERSION:2305,
	GVERSION:function(){try{ return AZ.getVersion().split("_")[0]; }catch(e){ return "8.8"; }}(),
	CACHE_VERSION:1,
	RES_CSS_VERSION:'1.0.0-2',
	RES_JS_VERSION:'1.0.0-2',
	RES_CUSTOM_VERSION:'1.0.0-2',
	base: function(){try{return document.getElementById("bootjs").src.split("/res/js/boot.js")[0]}catch{return document.location.origin;}}(),
	isLocal:(window.location.href.indexOf("127.0.0")>-1||window.location.href.indexOf("localhost")>-1||window.location.host.startsWith("10.")),
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
	to:function(page,param){
		if(typeof pageLoadTip=="function")pageLoadTip("");
		var url=page;
		if(url.indexOf("://")<0){
			url=page+".html";
		}
		if(param && param.trim().length>0)url=url.indexOf("?")>0?(url+"&"+param):(url+"?"+param);
		document.location.href=url;
	}
};
X.PARAM=X.GetRequest();
if(typeof X.beforeLoad=="function")X.beforeLoad();
document.write(`
<link rel="stylesheet" type="text/css" href="https://cdn.bootcdn.net/ajax/libs/font-awesome/5.15.4/css/all.min.css">
<link rel="stylesheet" type="text/css" href="../res/css/gcam.css?v=${X.RES_CSS_VERSION}">
<script src="https://lib.baomitu.com/jquery/1.12.4/jquery.min.js"></script>
<script src="https://hm.baidu.com/hm.js?85dc79932b8a1676bc10088026fc2add"></script>
<script src="../res/js/gcam/common.js?v=${X.RES_JS_VERSION}"></script>`);
 try{
 	var ___tmpurlpage=location.href.split("#")[0].split("?")[0].split('/').pop();
 	if(___tmpurlpage==="upload.html"){
 		document.write(`<script src="../res/js/gcam/upload.js?v=${X.RES_JS_VERSION}"></script>`);
 	}else if(___tmpurlpage==="user.html"){
 		document.write(`<script src="../res/js/gcam/user.js?v=${X.RES_JS_VERSION}"></script>
		<script async src="//7up.pics/sdk/pup.js" data-url="https://7up.pics/upload"></script>`);
 	}else if(___tmpurlpage==="list.html"){
 		document.write(`<script src="../res/js/gcam/list.js?v=${X.RES_JS_VERSION}"></script>`);
 	}else if(___tmpurlpage==="item.html"){
 		document.write(`
		<script src="https://cdn.bootcdn.net/ajax/libs/jquery.qrcode/1.0/jquery.qrcode.min.js"></script>
		<script src="../res/js/gcam/item.js?v=${X.RES_JS_VERSION}"></script>`);
 	}else if(___tmpurlpage==="mylist.html"){
 		document.write(`<script src="../res/js/gcam/mylist.js?v=${X.RES_JS_VERSION}"></script>`);
 	}else if(___tmpurlpage==="myitem.html"){
 		document.write(`<script src="../res/js/gcam/myitem.js?v=${X.RES_JS_VERSION}"></script>`);
 	}else if(___tmpurlpage==="add.html"){
 		document.write(`<script src="../res/js/gcam/add.js?v=${X.RES_JS_VERSION}"></script>`);
 	}
	
	
 }catch(e){ }

if(typeof X.afterLoad=="function")X.afterLoad();
window.onerror=function(a,b,c,d){
	if(X.debugger&&X.isLocal){
		if(typeof AZ=='object')AZ.toast(a);
		else console.log(a,b,c,d)
	}
}

window.onload=function(){
	if(X.isLocal){
		$(".toolbar").append(` <input type="button"  value="刷新" onclick="(function(){document.location.href=document.location.href+'?a&t='+new Date().getTime();})()" > `);
	}
}
if(X  && (X.CACHE_VERSION||1) > (__CACHE_VERSION||0.1) ){
	if(typeof AZ=='object' && typeof AZ.clearCache=='function'){
		AZ.clearCache();
	}
}