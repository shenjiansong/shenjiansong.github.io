window.onerror=function(){if(typeof pageLoadTipHide =="function") pageLoadTipHide(); }
let MY={};
$(document).ready(function(){
	$( document ).on("click",".naviga .back",function(e){
		history.back();
	}); 
 $( document ).on("click",".naviga .ulogo",function(e){
 	 document.location.href='user.html?t='+new Date().getTime();
 }); 
 $( document ).on("click",".naviga .close",function(e){
 	 toClose();
 }); 
	 
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

function toClose(self){
	if(typeof AZ=="object"){
		AZ.close();
	}
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
			document.getElementById("ptMsg").innerHTML=msg||'正在导入,请稍后。。。';
			document.body.preOver = document.body.style["overflow-y"]||"auto";
			document.body.style["overflow-y"]="hidden";
		}catch(e){
			console.log("xxxxxx:"+e.message);
		}
	});
}

function pageLoadTipHide(){
	Thead.run(function(){
		var plt=document.getElementById("pageLoadTip");
		if(plt){
			plt.style.display="none";
		}
		document.body.style["overflow-y"]=document.body.preOver||"auto";
	});
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
	AZ={
		queryPref:function(str){
			return `{
				'lib_profile_title_key_p0_0':'AAAA',
				'my_key_p0_id':'AAAAAAAA',
				
				'lib_profile_title_key_p2_0':'bbbbb',
				
				'lib_profile_title_key_p3_0':'ccccc',
				'my_key_p3_id':'xxxxxx'
			}`;
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
			if(url=="https://gc.1kat.cn/list")return plist.concat(plist);
		},
		get:function(url){
			console.log("get：",url);
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



var plist=[
{
gkey: "48CFCFBB42413",
version: "8.8",
quote_cnt: 0,
zz: "18CFB9A56AD"
},
{
gkey: "4A01CFBA61082",
version: "8.8",
quote_cnt: 0,
zz: "18CFB9A56AD"
},
{
gkey: "4C78CFBA60580",
version: "8.8",
quote_cnt: 0,
zz: "18CFB9A56AD"
},
{
gkey: "564ACFBB4271E",
version: "8.8",
quote_cnt: 0,
zz: "18CFB9A56AD"
},
{
gkey: "5788CFBA87456",
version: "8.8",
quote_cnt: 0,
zz: "18CFB9A56AD"
},
{
gkey: "5809CFBD10AF2",
version: "8.8",
quote_cnt: 0,
zz: "18CFB9A56AD"
},
{
gkey: "593ECFBA8713D",
version: "8.8",
quote_cnt: 0,
zz: "18CFB9A56AD"
},
{
gkey: "5BEACFCC59A25",
version: "8.8",
quote_cnt: 0,
zz: "18CFCC54D4E",
name: "我是我",
kuan: ""
},
{
gkey: "5E48CFBB429E7",
version: "8.8",
quote_cnt: 0,
zz: "18CFB9A56AD"
},
{
gkey: "60B8CFBAB917B",
version: "8.8",
quote_cnt: 0,
zz: "18CFB9A56AD"
},
{
gkey: "6135CFB9DB30E",
version: "8.8",
quote_cnt: 0,
zz: "18CFB9A56AD"
},
{
gkey: "6407CFBCF7586",
version: "8.8",
quote_cnt: 0,
zz: "18CFB9A56AD"
},
{
gkey: "6712CFBB52CBF",
version: "8.8",
quote_cnt: 0,
zz: "18CFB9A56AD"
},
{
gkey: "6F4BCFBCFD6C6",
version: "8.8",
quote_cnt: 0,
zz: "18CFB9A56AD"
},
{
gkey: "7158CFB9EE2CF",
version: "8.8",
quote_cnt: 0,
zz: "18CFB9A56AD"
},
{
gkey: "71F5CFBCABE4F",
version: "8.8",
quote_cnt: 0,
zz: "18CFB9A56AD"
}
];