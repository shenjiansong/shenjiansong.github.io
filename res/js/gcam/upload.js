
var item_temp_html='<DIV data-p="{p}"  class="item {notallow}"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAARdJREFUWEftltENwjAMRH1MwCiICZAQe8Fe/DABo7ABB6kIMmnduE1DJES/2lSNn88Xu5DGFxrHl98HIEkAZqLVFWgKEIJHj1kqVFOA5E1E1trkQxA9AE099YSEAJ7vNcjiAAF6DCJVwQQYc65XmVkeiB/NBdCuXwzAs9FL+r2InMN9TCACWYm5SpDW1FKHZA8glmtJgB2Ai+UDq/EUAShnHwB0Ek+9igFyAXPmrQrg8UgxAMkVgHuqBMmNiFyT9S2Aj7UlAMJgOT5PwEkHs7peelKKAKw+kOv7GmI2wFAQ79BJG5J+fo/pgZp2M1x3stwJGHuf7vPVYTTkFTdASdYeRbIlaAZQK7C1b7V/Qm8if4C/As0VeACreuwh5RKDXQAAAABJRU5ErkJggg=="/><label>{title}</label></DIV>';
var patchMap={};
var notAllowPatchs=[];
$( document ).ready(function(){
	$( document ).on("click",".item",function(e){
		const self=$(this);
		if(self.hasClass("success")){
			self.removeClass("checked");
			alert("该配置已上传");
			return;
		}
		if(self.hasClass("error")){
			self.removeClass("checked");
			alert("该配置上次上传失败，可重新进入上传页面再次上传");
			return;
		}
		if(self.hasClass("notAllow")){
			self.removeClass("checked");
			alert("该配置已上线，后期将支持版本更新");
			return;
		}
		if(self.hasClass("checked"))self.removeClass("checked");
		else self.addClass("checked");
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
	checkUser(true);
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
	console.log(patchMap)
	for(var k in patchMap){
		var patch=patchMap[k];
		var title=patch["lib_profile_title_key_p0_{cid}"];
		if(notAllowPatchs.indexOf(k)>-1){
			insertToLast(item_temp_html.replace("{p}",k).replace("{title}",title).replace("{notallow}","notAllow"));
		}else{
			insertToFirst(item_temp_html.replace("{p}",k).replace("{title}",title).replace("{notallow}",""));
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
function toUpload(self){
	try{
		var checkedList=$(".checked");
		if(checkedList!=null && checkedList.length>0){
			var sCnt=0,eCnt=0;
			for(var i =0;i<checkedList.length;i++){
				var it=$(checkedList[i]);
				var p=it.data("p");
				if(!p)continue;
				var patch=patchMap[p];
				var title=patch["lib_profile_title_key_p0_{cid}"];
				var key=AZ.post("https://gc.1kat.cn/put",toPatchXml(patch),null);
				if(!key){
					it.removeClass("checked");
					it.addClass("error");
					it.addClass("notAllow");
					it.find("label").html(it.find("label").html()+'-上传失败');
					moveToLast(it);
					eCnt++;
				}else{
					AZ.setPref("my_key_"+p+"_id",key);
					it.removeClass("checked");
					it.addClass("success");
					it.addClass("notAllow");
					it.find("label").html(it.find("label").html()+'-成功');
					moveToLast(it);
					sCnt++;
				}
			}
			alert("上传完成，成功："+sCnt+",失败："+eCnt)
		}else{
			alert("尚未选择配置")
		}
	}catch(e){
		
	}
	self.disabled="";
	pageLoadTipHide();
}
function upload(self){
	self.disabled="disabled";
	if(!checkUser(true,"请先完善个人资料后，再上传。")){
		self.disabled="";
		return ;
	}
	pageLoadTip("上传中，请稍后。。。");
	setTimeout(function(){
		toUpload(self)
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



var logoList=[
	'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAACjVJREFUWEedl21sZNV5x3/n3Hvn3vGMZzye8fpt7djLgl1sYLfxvm8C3YgEpKJKqFFSVYSERlGkNq3op6haKYrgA1Ir0RKpldKENOqXKGmJ1NKQSAgRAWHLLtIu8cIuBtbvi9cztsfzcue+nVOda7MsAZKoZ3Q1ozv3nuf//J/n+T/PEfx+K1OpVCpxbGeGB+OHMpqvRQ3Vr7QANFIobMde8yO+u9aKn7RtO6xWq1Ug/F3bmx1+6+rv7z9VzCUnDx9I/iKXZfSuCZu7c5r8iiCKYpTWCASbkeTpNzVn3oJWzOK5SH6/pa0Xa7W1536bgY8FMDk5Wa5Wr52+86hz/599tjV65DZFvw36RQ99TRArTRIrtNaomoDVhDjQqAasBZLzseTJSC5ewn2qVCw+eunSpdpHAflIAOVy+VCSiMf/85/joxOlttVXAeFI1NNZ9IaNVookUYCg8VJE3gcV6RSU1iYokCBYU7Bku8mDfuaMCMKHa7Xa2d8E8SEAg4PFmVzR/vljX++UP3egjZWxEOaps3mseSvdPVYKFQmiX0aIwIQADBxjPFGaWIsURHppzQva4XRL1upC3lOtVs/dCOIDAIznA/0886UH/PLn7wjo69JYtkS0bcQrOUQNEq1JWsD5BLZ2QmDuaSFphIq2HyOFIDZgBFgKYgG/FC5PkKltJureG5m4DmB0dLQUdOL//tJfbp44dVvI8byhXWE5FvaKB/+bRWkFocJ/NSFT0yAkiVI0Q6hthzT8mHaQYAmRJmcidphIjMuW4LWMyz+WKy+5Qty3uLi4aW7fCODxB/+6+o2BQd8acyWfLoCwd693slivZVNPoyWQF4KUb2HZXKsHXK2GOzmRy6FaLWLzX7FI2GqhkwRtSZRtoxPFBddLvl8pf2d+fv7h6wCGh4dPTR8MfvDZP9kczXYp9mXgeEEgTdYnEv1CHrcpCLFQ/9XBdhzibDcL2X6a8ytox0FXKihsiBPC1as446Op561XzyJLPcg9/QgUy3NzfHdo7+JKrL+ysrLwnLj11lszjrP9zc/ct/3tmyYaacLt9wRHu0E6QGCjftGDQ0zrHY33Rpxm+Grosl0YIKw30aGHyhZJGi7O3grhyiZyrAclE/z5N7FyXdClUZ1t2m+/xa+7izxVKX9Le95jYmRkZGj/gfDlu+/bGC12xQgNN2clR7o10gIR2wS/yOMhaT0bkO3AdkezoHvw/T3YWROrLCKbgTBG97gEi1VEPgOlLlTTJ1jfRFYcWsvLJNEqmxmHn5ZKi5cc+5iYnBwb65/yr3zmviplk7IYBiTHDAO2BmXTeb6LvO8QPuujWnD+qiSJx5nzJD/J1xnwjjEUDmOk2SKg0Fxiwl/AkSFitz6VBBXHxPiEbPA/g92c7+4eF1OfHH9k+O7a6cOTTfZIsKRm3BWcNI6Zl0yNz+YQl1ysX4XUWw7/UivzHz0hkWVh8jwKIw72/xFD9i0UluJUC0zBKFXlSP1VpGpja2M8Sh00v872Kp4r2o+K247sX97/4PzwmKcYs8GWmj5HcjwHBUcjPQFLLvWfeRQuxHy9meMlK5uW2nsrFaA4Yqp8lJu7D6HrAU41QkQgVUghXGDcv4STbKPQ6afhwPeG7RVx+7Fb9L4vz5n85VOexLZUuvnxnMV4V5KWYrTu0HjWo/wyTLRKuCY5PmLFYcj+6Qc40OkjaYVYS01krFOj2XiVycavsFWMMrwKeGKfh7jj+IQe//KbqW6WLMmMqxAW5ITg3hLkMgJsgf9CFu9HFre3y++Lx2+AUCohPvFFji5l2Su60bHCulxFYqdei6TGHfVn0vcNrH/6gwri4IlJPfLA5XQrE/NpRzKUUUgJey3BiV7IuIKgbbPxdw73bPV/bHdN4hjxp3/D1K+bjIceDg5h28e90tjtFrCnfY7hzlzaN564tRcx8+kpPfznb6ASnQKwBUx5gn5bY9swbgumi4JSl+T1n9p8/if9SOujQ9DqdHC+8LcMXN5kop2lojykaU7LmzjNHeqFajG5/RyeavOvtxQQf3hyennP/QvDjtu8zkKXDUNSsC+rcWxBJSOYzluMFOGHz+T4hx/mAPcDTCilCPZNI++4k/65TcabGQZVF9LUyXYbVrbTktQk7AneoBLO8u/jPSvi5k9OPZL/VHR68KZ3sKwkzQWTA7aEjIT9lmSkqPFsgSNgWlssr3fx9/9WYGHFSKVpNAEjJ9ss7fkrgiDH0JUW3S3BRJTFE5m0QtTyBrLpp4+XwgW2crOc6fUeEUePHhirD2SuuEfWGcytYNsxlrRQIsYSNrZlfBB0xQljOZtCxiRwgqNcfvRjh5E7BbI35MIbM2xG9yIjwfi8wupETHZsHLXTEcXqJmyZPq5xVJO5PW+z2NMYFwcPHhxqDzpnNm9zRvq764wUW/TnXBrRKgVvGCUCHOnRjq+RdXpx7SJBUiVUNfKZvSRBNxdqBebXDiGiEk4nYXIxQxz77G8JMkpgGoxerSG2mmkIQjvirdKVpS2vfjRtRm4p+83alPvtYMCmL5tlX7fxeo6+QhY/rpGxuwhVHc8u4Dm9KN1hu1FlMejDk7fw5soYoV9Ju7u33uSmepEk7nBzS+JqmZZg9O461kYjZbOW3+RKeflbDb/+WCpnU1O3n4rHvR+0bu8aHS71se5vUfY88o5L3mpRtLfxw0VymTJX21s4uYPMxyFFr4S/+gne3cihlESImIkrNg4WOgrY5wuyygCAeG0dudEksjrMlRfnq7L6ldnZ2eev6+nMzMzjV4+53/ALWKYchRECU6zm28iuNIIkd5LODAoqg1ybRETFVEDMaJbf6PCJ7TxCCLJ+h+FA4iAxxwe9+i7Um6wX6sl879J3zp07+/5AYva8664DPc2G9fTVQ6UTQclBW41UF1LjBqZlOpMLSQ8iyCFaQwjl7c5UAtdPGL1m4WgnVbmBVkwpkUjTUHcBbCWrzJUXXurujv/4+efPb31gJNsJxdQhCn3PtCYmys0eQ6nphUZ0TG0KiE1jKCBEJiXCjOdGlNxWwtCGJBMZPJKM0gz4irzeFSwh2Np6izn9Ws1XnXsvXrx4fTz/0Fg+PX1whnzh5/WbDpT9fClNmlTHd0fsHcneeU0rjZVoxtckmWQ3PEAhFgz5GmEo1IqGWmeueabmB9v3zF6+/PFj+XvSNj09PeO6XY+vTR47FmXzViysXRBi54ygd8btbDtm74aNkDbaDACQTk5jDZ3yFuuQFvVkLnj55SAIHp6dnf2A8Q+F4EZtPXz4cFnH4enN3uH7456h0cQtIYSLFSucRFBqC+zYhOl9Et2E1HPbGE5qrEdvL9Z17Snbzjz6yiuv/P5HsxuBTE1NnfK68idDq/jVjJ0d8awBrEw/2tphxWS/CVM2CrCDdVS0jh/7S77e/F47bL948eLF/9/h9EYQRqySJKlks6WMEOIhhHhICDX8nvdmFhRKr1jET0Y6etL3/dCyrOrrr7/+O4/n/wd11KzmH2slnAAAAABJRU5ErkJggg==',
	'data:image/png;base64,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',
	'data:image/png;base64,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',
	'data:image/png;base64,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',
	'data:image/png;base64,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',
	'data:image/png;base64,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',
	'data:image/png;base64,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',
	'data:image/png;base64,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'
]