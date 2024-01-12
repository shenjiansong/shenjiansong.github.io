if(typeof "".replaceAll !="function"){String.prototype.replaceAll = function(s1, s2) {return this.replace(new RegExp(s1, "gm"), s2);}}
let MY={};
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
		document.body.style["overflow"]="hidden";
	}catch(e){
		console.log("xxxxxx:"+e.message);
	}
}

function pageLoadTipHide(){
	document.getElementById("pageLoadTip").style.display="none";
	document.body.style["overflow"]="auto";
}


if(typeof AZ=="object"){
	//initUk();
	alert=function(msg){
		AZ.toast(msg);
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
			
		},
		post:function(url,json,headers){
			
		},
		get:function(url){
			
		},
		getFileList:function(path){
			
		},
		getFileText:function(path){
			
		},
		throwError:function(message){
			
		},
		getVersion:function(){
			
		},
		setPref:function(k,v){
			
		},
		setPref:function(json){
			
		},
		Restart:function(){
			
		},
		toast:function(msg){
			
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
