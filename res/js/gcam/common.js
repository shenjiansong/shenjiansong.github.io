var qqKey='Ajunow7XHpNqGtbgG9hDMTnJy0aWK2CV';
var qqInent='mqqopensdkapi://bizAgent/qm/qr?url=http%3A%2F%2Fqm.qq.com%2Fcgi-bin%2Fqm%2Fqr%3Ffrom%3Dapp%26p%3Dandroid%26jump_from%3Dwebapi%26k%3D'

if(!X)X={};
X.demoWidth=400;
X.iconWidth=64;
X.uploadUrl="https://gc.1kat.cn/json";
X.uploadImg=function(data){
	return new Promise ((resolve, reject)=> {
		$.get(X.uploadUrl,function(res){
			var tmp=res.split("-");
			var at=tmp[0];
			var ck=tmp[1];
			// var form = $('#myForm')[0]; // 获取表单元素
			// var data = new FormData(form); // 创建FormData对象来存储表单数据
			data.append("type","file");
			data.append("action","upload");
			data.append("timestamp",new Date().getTime());
			data.append("auth_token",at);
			data.append("expiration","");
			data.append("nsfw",0);
			$.ajax({
				url: X.uploadUrl, // 指定URL地址
				type: 'POST', // 或者'PUT'等其他HTTP动词
				contentType: false, // 不设置Content-Type头部信息
				processData: false, // 不处理数据
				data: data, // 传递FormData对象作为数据
				headers:{
					"PHPSESSID":ck
				},
				success: function (response) {
						resolve(response);
				},
				error: function (res) { 
						reject(res);
				}
			});
		})
	});
}
var navigaTemp=`<div class="naviga"><div class='help'><i class="fa fa-question"></i><br />帮助</div><i class="fa fa-chevron-left back"></i><span class='qq'>点我<br />加群</span> <span class="hadNew hide">新的版本 <i class="fa fa-arrow-down"></i></span><img class="ulogo" src="https://s11.ax1x.com/2024/01/13/pFP8xHS.jpg"/><i class="fa fa-times close"></i></div>`;
window.onerror=function(a,b,c){
	if(typeof pageLoadTipHide =="function") pageLoadTipHide(); 
	if(document.body&&document.body.style)document.body.style["overflow-y"]=document.body.preOver||"auto";
	console.log(a,b,c)
}
let MY={};
$(document).ready(function(){
	$( document.body).append($(navigaTemp));
	$( document ).on("click",".naviga .back",function(e){
		toBack();
	});
	 $( document ).on("click",".naviga .ulogo",function(e){
		X.to("user");
	 }); 
	 $( document ).on("click",".naviga .close",function(e){
		toClose();
	 }); 
	 $( document ).on("click",".naviga .hadNew",function(e){
		X.out("/details","md=gcam");
	 }); 
	 $( document ).on("click",".naviga .qq",function(e){
		 X.to(qqInent+qqKey);
	 });
	 $( document ).on("click",".naviga .help",function(e){
	 		X.out("/details","md=gcam101");
	 }); 
	 $( document ).on("click",".tabs",function(e){
		X.to($(e.target).data("url"));
	 }); 
	if(hasNewVersion()){
		$(".qq").addClass("hide");
		$(".hadNew").removeClass("hide");
	}
});
function getUser(){
	if(!MY || !MY["uid"] || MY["uid"].length<1){
		MY=AZ.getUser();
		if(MY && MY.length>10){
			MY=JSON.parse(MY);
		}
	}
	return MY||{};
}
function getUkey(){
	const user=getUser();
	const ukey=user["uid"];
	if(!ukey||ukey.length<8)return null;
	return ukey.trim();
}


function checkUser(needMsg,msg){
	var u=getUkey();
	if(!getUkey()){
		if(needMsg){
			alert(msg||"你还未完善用户资料");
		}
		return false;
	}
	return true;
}

function toClose(){
	pageLoadTip("");
	if(typeof AZ=="object"){
		AZ.Restart();
	}
}
function toBack(){
	pageLoadTip("");
	history.back();
	Thead.delayed(toClose,300);
}

function pageLoadTip(msg,showLoad){
	Thead.run(function(){
		try{
			if(typeof showLoad=="undefined" || showLoad==null) showLoad=true;
			if(showLoad==0||showLoad=="false"||showLoad==false)showLoad=false;
			else showLoad=true;
			var pageLoadTip=document.getElementById("pageLoadTip");
			if(!pageLoadTip){
				pageLoadTip = document.createElement("div");
				pageLoadTip.id="pageLoadTip";
				pageLoadTip.innerHTML=`<div class="pltc"><span id="ptMsg">加载中  请稍后。。。</span><div class="loading"><span></span><span></span><span></span><span></span><span></span><span></span></div></div>`;
				document.body.appendChild(pageLoadTip);
			}
			if(!showLoad){
				$(".loading").hide();
				$(pageLoadTip).on("click",pageLoadTipHide);
			}
			else {
				$(".loading").show();
				$(pageLoadTip).off('click');
			}
			document.getElementById("pageLoadTip").style.display="block";
			document.getElementById("ptMsg").innerHTML=msg||'';
			document.body.preOver = document.body.style["overflow-y"]||"auto";
			document.body.style["overflow-y"]="hidden";
		}catch(e){
			console.log("xxxxxx:"+e.message);
		}
	}); 
}

function pageLoadTipHide(){
	try{
		Thead.run(function(){
			var plt=document.getElementById("pageLoadTip");
			if(plt){
				plt.style.display="none";
			}
			if(document.body&&document.body.style)document.body.style["overflow-y"]=document.body.preOver||"auto";
		});
	}catch(e){ }
	if(document.body&&document.body.style)document.body.style["overflow-y"]=document.body.preOver||"auto";
}

function hideEditorBox(){
	var editorBox=$("#editorBox");
	editorBox.hide();
	var editorBoxMask=$("#editorBoxMask");
	editorBoxMask.hide();
}

function showEditorBox(conf){
	if(typeof conf=="string"){
		conf={
			text:conf
		}
	}else if(typeof conf=="undefined"){
		conf={
			text:"",
		}
	}
	if(!conf.height)conf.height=100;
	var editorBox=$("#editorBox");
	var editorBoxMask=$("#editorBoxMask");
	if(!editorBox||editorBox.length<1){
		editorBoxMask=$("<div id='editorBoxMask'><div>");
		editorBoxMask.on("click",function(){
			hideEditorBox();
		});
		editorBoxMask.attr("style","z-index:5;position:absolute;top:0;left:0;width:95vw;height:100vh;");
		editorBox =$("<div id='editorBox'><div>");
		editorBox.attr("style","height:100px;display: none;position: fixed;bottom: 0;left: 50%;transform: translateX(-50%);width: 100vw;background-color: #f9f9f9;border: 1px solid #ccc;padding: 10px;z-index:10;")
		var txt=null;
		if(conf.ml){
			txt=$("<textarea id='editorBoxTxt'></textarea>");
		}else{
			txt=$("<input  id='editorBoxTxt' />");
		}
		txt.attr("style","width:100%;height:80%");
		var btn=$("<button>完成</button>");
		btn.attr("style","width:100%;height:20%;background-color:#42b7a7");
		editorBox.append(txt);
		editorBox.append(btn);
		$(document.body).append(editorBox);
		$(document.body).append(editorBoxMask);
	}
	if(conf.height){
		editorBox.height(conf.height)
	}
	editorBox.find("#editorBoxTxt").val(conf.text);
	editorBox.find("button").on("click",function(){
		if(typeof conf.ok=="function"){
			conf.ok(editorBox.find("#editorBoxTxt").val());
		}
		editorBox.find("button").unbind("click"); 
		editorBox.hide();
		editorBoxMask.hide();
	});
	editorBox.slideToggle();
	editorBoxMask.show();
}

function onToEnd(toEndFunc){
	var elm=document;
	$(elm).on('scroll', function() { // 监听滚动事件
			//console.log($(this).attr('style'));
	         var scrollPosition = $(elm).scrollTop(); // 获取滚动条相对于顶部的位置
	         var scrollHeight = $(elm).height(); // 获取文档内容的总高度
	         var windowHeight = $(window).innerHeight(); // 获取视口（浏览器）的高度
			 var els=elm.body?elm.body:elm;
	         if (scrollHeight-scrollPosition-windowHeight<=1 &&(els.style["overflow-y"]!="hidden")) {
	             console.log("已经滚动到底部");
				 els.style["overflow-y"]="hidden";
				 toEndFunc();
				 setTimeout(function(){els.style["overflow-y"]="overlay";},500);
	         }
	});
}

// var startY, moveY
//     document.addEventListener('touchstart', function(event){
//         startY = event.touches[0].pageY
//     })
    // document.addEventListener('touchmove', function(e){
    //    // moveY = startY - event.touches[0].pageY
	   // e.preventDefault();// 阻止默认的处理方式(阻止下拉滑动的效果) 
    // },  { passive: false });// passive 参数不能省略，用来兼容ios和android
	
//     document.addEventListener('touchend', function(event){
//         if (moveY > 30) {
//             console.log('向上滑动事件被触发！',this,event)
//         } else if (moveY < -30) {
//             console.log('向下滑动事件被触发！',this,event)
//         }
//     })
if(typeof AZ=="object"){
	//initUk();
	alert=function(msg){
		Thead.run(function(){AZ.toast(msg);});
	}
	console.log=function(msg,a,b,c){
		var m="";
		if(typeof msg=="object")m=JSON.stringify(msg);
		else m=msg;
		
		if(typeof a=="object")m=m+","+JSON.stringify(a);
		else if(typeof a !=="undefined") m=m+","+ a;
		 
		 if(typeof b=="object")m=m+","+JSON.stringify(b);
		 else if(typeof b !=="undefined") m=m+","+ b;
		 
		 if(typeof c=="object")m=m+","+JSON.stringify(c);
		 else if(typeof c !=="undefined") m=m+","+ c; 
		
		Thead.run(function(){AZ.log(m);});
	}
	 //var ids=AZ.matchPref("my_key_p\\d+_id");
	// alert(ids);
	// var obj=JSON.parse(ids);
	// for(var k in obj){
	// 	alert(k);
	// 	AZ.setPref(k,"");
	// }
}else{
	document.write(`<script src="../res/js/gcam/ldata.js?v=1"></script>`);
	AZ={
		getPref:function(str){
			return "";
		},
		queryPref:function(str){
			return searchList;
		},
		matchPref:function(reg){
			return "";
		},
		getUkey:function(){
			return "18D432BCC5D";
		},
		close:function(){
			console.log("close");
		},
		post:function(url,json,headers){
			if(url=="https://gc.1kat.cn/list"){
				return plist.concat(plist);
			}else{
				var  jsonData="";
				if(typeof json=="string")jsonData=json;
				else jsonData=JSON.stringify(json);
				$.ajaxSetup({ async:false });
				var a=$.ajax({
				  url: url,
				  type: 'POST',
				  contentType: 'application/json',
				  data: jsonData
				});
				$.ajaxSetup({ async:true });
				console.log(a.responseText)
				return a.responseText;
			}
		},
		get:function(url){ 
			if(url.indexOf("/item/")>0){
				return litem;
			}
			$.ajaxSetup({ async:false });
			var  a=  $.get(url);
			//console.log("get：",url,a.responseText);
			$.ajaxSetup({ async:true });
			return a.responseText;
		},
		getFileList:function(path){
			console.log("getFileList：",path);
		},
		getFileText:function(path){
			console.log("getFileText：",path);
		},
		throwError:function(message){
			console.log("throwError：",message);
		},
		getVersion:function(){
			console.log("getVersion");
			return "8.8_2305"
		},
		setPref:function(k,v){
			console.log("setPref:",k,v);
		},
		setPref:function(json){
			console.log("setPref：",json);
		},
		Restart:function(){
			console.log("Restart");
		},
		toast:function(msg){
			console.log("toast");
		},
		log:function(log){
			
		},
		setUkey:function(uid){
			
		},
		MD5:function(str){
			
		},
		encode:function(str){
			
		},
		getUser:function(){
			return {"uid":AZ.getUkey()};
		},
		saveUser:function(str){
			return true;
		},
		clearCache:function(){
		},
		cubeToBase64:function(cubeTxt){
		},
		getLastUploadFile:function(){
			return "";
		},
		getLastUploadFileText:function(){
			return "";
		},
		filterLut:function(imgB64,lutB64){
		},
		getWaterMark:function(uploadimgUrl,jsonConf){
			return "";
		},
		gpuFilter:function(a,b){
			return a;
		}
	}
}
// function initUk(){
//   var azuk= AZ.getUkey();
//   if(!azuk || azuk.trim().length<8){
// 	  var uk=	AZ.post("https://gc.1kat.cn/getuk",'',"");
// 	  AZ.toast(uk)
// 	  if(uk && uk.length>8 && uk.length<13){
// 		  AZ.setUkey(uk);
// 		  MY_UK=uk;
// 	  }
//   }
// }
function hasNewVersion(){
	try{
		return AZ.getVersion().split("_")[1]*1 < X.VERSION;
	}catch(e){}
	return false;
}
function toItem(id){
	X.to("./item","id="+id);
}
function toMyItem(id){
	X.to("./myitem","id="+id);
}



function addPatchByKey(gkey){
	return new Promise ((resolve, reject)=> {
			try{
				var xmlPatch=AZ.get("https://gc.1kat.cn/get/"+gkey);
				var res=AZ.insetPatch(xmlPatch);
				if(res.length>0) resolve();
			}catch(e){  }
			reject();
	  });
}

var G=window.G||{
	getList:function (p){
		var result= G.getLocalData(false);
		if(p && p.zz){
			var resList=[];
			for(var i=0;i<result.length;i++){
				if(p.zz==result[i].zz){
					resList.push(result[i]);
				}
			}
			return resList;
		}else if(p && p.gkey){
			var resList=[];
			for(var i=0;i<result.length;i++){
				if(p.gkey==result[i].gkey){
					resList.push(result[i]);
				}
			}
			return resList;
		}
		return result;
	},
	getLocalData:function (fRet){//fRet 是否取消递归
		var ldata=localStorage.getItem("list_data"); 
		try{
			if(ldata){
				if(typeof ldata=="string"){
					ldata=JSON.parse(ldata);
				}
				if(ldata.data.length>0 || ldata.lasttime>0){
					if(ldata.lasttime && (new Date().getTime()-ldata.lasttime>1000*60)){
						Thead.delayed(saveLocalData,1000);
					}
					return ldata.data;
				}
			}
		}catch(e){ }
		G.saveLocalData();
		if(fRet){
			return [];
		}else{
			return G.getLocalData(true);
		}
	},
	saveLocalData:function (){
		var pam={page:0,size:99999}
		var res=AZ.get("https://gc.1kat.cn/list2");
		if(typeof res=="string"){
			res = JSON.parse(res);
		}
		return G.saveList(res);
	},
	saveList:function(list){
		var ldata={lasttime:new Date().getTime(),data:list};
		localStorage.setItem("list_data",JSON.stringify(ldata));
		return ldata;
	},
	getItem:function(gkey){
		var list=G.getList({gkey:gkey});
		if(!list||list.length<1){
			return {
				"author":{}
			}
		}
		var item=list[0];
		 item["create_time"]=new Date(item["create_time"]).toDateTime();
		item["author"]={
			"uid":item.zz,
			"name":item.name,
			"email":item.email,
			"kuan":item.kuan
		};
		if(item.pkey && item.pkey.length>5){
			item["parent"]=G.getItem(item.pkey.trim());
		}
		return item;
	},
	removeItem:function(gkey){
		var list=G.getList();
		if(!list||list.length<1){
			 return;
		}
		for(var i=0;i<list.length;i++){
			if(list[i].gkey==gkey){
				list.splice(i, 1);
				break;
			}
		}
		return G.saveList(list);
	},
	updateLocal:function(item){
		var list=G.getList();
		if(!list||list.length<1){
			 return;
		}
		for(var i=0;i<list.length;i++){
			if(list[i].gkey==item.gkey){
				item=Object.assign(list[i], item);
				list.splice(i, 1);
				list.unshift(item);
				break;
			}
		}
		return G.saveList(list);
	},
	addLocal:function(item){
		var list=G.getList();
		list.unshift(item);
		return G.saveList(list);
	}
}