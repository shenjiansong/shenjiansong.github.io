
var default_logo="https://s11.ax1x.com/2024/01/13/pFPJVxI.png"
var patchMap={};
var notAllowPatchs=[];
$( document ).ready(function(){
	$( document ).on("click",".item .upload",function(e){
		const self=$(this);
		if(self.hasClass("fa-arrow-up")){
			upload(self);
		}else{
			alert("当前配置不可上传");
		}
	});
	
	var  matchJson = AZ.queryPref("_key_p");
	//if(!matchJson)matchJson = AZ.matchPref(".*_key_p/\d_.*");
	var matchs=null;
	try{matchs=JSON.parse(matchJson);}catch(e){ eval("matchs="+matchJson);}
	if(matchs){
		initPatchArr(matchs);
	}
	initLibCustom();
	initItems();
	checkUser(false);
});

function insertToFirst(e){
	var D1=$("#D1")[0];
	if(D1.children && D1.children.length>0){
		D1.insertBefore($(e)[0],D1.children[0])
	}else{
		$("#D1").append($(e));
	}
}
function insertToLast(e){
	$("#D1").append($(e));
}
function moveToLast(e){
	$("#D1").append(e);
}
function initItems(){
	var D1=$("#D1");
	var item_temp_html=$("#tempItem").html();
	for(var k in patchMap){
		var patch=patchMap[k];
		var title=patch["lib_profile_title_key_p0_{cid}"];
		if(notAllowPatchs.indexOf(k)>-1){
			insertToLast(item_temp_html.replace("{p}",k)
			.replace("{title}",title)
			.replace("{uploadicon}","fa-ban")
			.replace("{demoImg}",default_logo) 
			
			);
		}else{
			insertToFirst(item_temp_html.replace("{p}",k)
			.replace("{title}",title)
			.replace("{uploadicon}","fa-arrow-up")
			.replace("{demoImg}",default_logo) 
			);
		}
	}
}
function initLibCustom(){
	for(var k in patchMap){
		var patch=patchMap[k];
		for(var a in patch){
			if(a.startsWith("lib_custom_") && a.endsWith("_address")){
				patch[a.replace("lib_custom_","my_custom_").replace("_address","_fp")]=1;
				var address=patch[a];
				if("03654E4"==address || '365AF0'==address||"3654E4"==address || '0365AF0'==address){
					patch[a.replace("_address","_enabled")]=0;
				}
			}
		}
		patchMap[k]=patch;
	}
}
function initPatchArr(pdt){
	for(var k in pdt){
		var pd=pdt[k];
		var p=getP(k);
		if(p<0)continue;
		if(k.indexOf("_key_p"+p+"_0")<0 &&  !k.startsWith("my_key") )continue;
		if(!patchMap["p"+p])patchMap["p"+p]={};
		var nk=k.replace("_key_p"+p+"_0","_key_p0_{cid}").replace("_key_p"+p+"_","_key_p0_");
		patchMap["p"+p][nk]=pd;
		if(nk=="my_key_p0_id"){
			if(pd.length>1){
				notAllowPatchs.push("p"+p);
			}
		}
	}
}
function getP(k){
	if(!k||k.trim().length<3||k.indexOf("_key_p")<0)return -1;
	try{
		return k.toLowerCase().split("_key_p")[1].split("_")[0]*1;
	}catch(e){
		return -1;
	}
}
function toUploadOne(it){
	try{
		var p=it.data("p");
		var patch=patchMap[p];
		var title=patch["lib_profile_title_key_p0_{cid}"];
		var key=AZ.post("https://gc.1kat.cn/put",toPatchXml(patch),null);
		if(!key){
			it.removeClass("fa-arrow-up");
			it.addClass("fa-exclamation");
			moveToLast(it.parent());
			alert("上传配置失败！")
		}else{
			AZ.setPref("my_key_"+p+"_id",key);
			it.removeClass("fa-arrow-up");
			it.addClass("fa-ban");
			moveToLast(it.parent());
		}
	}catch(e){
		
	}
	pageLoadTipHide();
}
function upload(self){
	if(!checkUser(true,"请点击头像完善个人资料后，再上传。")){
		return ;
	}
	pageLoadTip("上传中，请稍后。。。");
	setTimeout(function(){
		toUploadOne(self)
	},1000);
}

function toPatchXml(map){
	var title=map["lib_profile_title_key_p0_{cid}"];
	if(!title)title="未知配置"
	var result='<string name="lib_profile_title_key_p0_{cid}">'+title+'</string>\n';
	for(var k in map){
		if(k=="lib_profile_title_key_p0_{cid}")continue;
		result=result+'<string name="'+k+'">'+map[k]+'</string>\n';
	}
	return result;
}