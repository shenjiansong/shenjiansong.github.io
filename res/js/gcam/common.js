if(typeof "".replaceAll !="function"){String.prototype.replaceAll = function(s1, s2) {return this.replace(new RegExp(s1, "gm"), s2);}}
function getUkey(){
	var lcuk=localStorage.getItem("myuk");
	if(!lcuk || lcuk.trim().length<8){
		initUk();
		lcuk=localStorage.getItem("myuk");
	}
	if(!lcuk || lcuk.trim().length<8){
		return "";
	}
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
	initUk();
}else{
	AZ={
		queryPref:function(str){
			return `{
				'lib_profile_title_key_p0_0':'AAAA',
				'my_key_p0_id':'AAAAAAAA'
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
			
		}
	}
}
function initUk(){
	var azuk= AZ.getUkey();
	var lcuk=localStorage.getItem("myuk");
	if(!azuk){
	  var uk=	AZ.get("https://gc.1kat.cn/getuk");
	  if(uk && uk.length>8 && uk.length<13){
		  AZ.setUkey(uk);
		  localStorage.setItem("myuk",uk);
	  }
	}else if(azuk!=lcuk){
		localStorage.setItem("myuk",azuk);
	}
}
