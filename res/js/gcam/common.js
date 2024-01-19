var qqKey='Ajunow7XHpNqGtbgG9hDMTnJy0aWK2CV';
var qqInent='mqqopensdkapi://bizAgent/qm/qr?url=http%3A%2F%2Fqm.qq.com%2Fcgi-bin%2Fqm%2Fqr%3Ffrom%3Dapp%26p%3Dandroid%26jump_from%3Dwebapi%26k%3D'

if(!X)X={};
X.demoWidth=400;
X.iconWidth=64;
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

function pageLoadTip(msg){
	Thead.run(function(){
		try{
			var pageLoadTip=document.getElementById("pageLoadTip");
			if(!pageLoadTip){
				pageLoadTip = document.createElement("div");
				pageLoadTip.id="pageLoadTip";
				pageLoadTip.innerHTML=`<div class="pltc"><span id="ptMsg">加载中  请稍后。。。</span><div class="loading"><span></span><span></span><span></span><span></span><span></span><span></span></div></div>`;
				document.body.appendChild(pageLoadTip);
			}
			document.getElementById("pageLoadTip").style.display="block";
			document.getElementById("ptMsg").innerHTML=msg||'。。。';
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
	if(!editorBox||editorBox.length<1){
		editorBox =$("<div id='editorBox'><div>");
		editorBox.attr("style","height:100px;display: none;position: fixed;bottom: 0;left: 50%;transform: translateX(-50%);width: 100vw;background-color: #f9f9f9;border: 1px solid #ccc;padding: 10px;")
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
	});
	editorBox.slideToggle();
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
			return "";
		},
		close:function(){
			console.log("close");
		},
		post:function(url,json,headers){
			if(url=="https://gc.1kat.cn/list"){
				return plist.concat(plist);
			}
		},
		get:function(url){
			console.log("get：",url);
			if(url.indexOf("/item/")>0){
				return litem;
			}
			 
		 //  	$.get(url,function(res){
				
			// });
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
			return null;
		},
		saveUser:function(str){
			return true;
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
				if(res=="1") resolve();
			}catch(e){  }
			reject();
	  });
}

//AZ.toast(UNIN_CODE_IN_PAG%100)