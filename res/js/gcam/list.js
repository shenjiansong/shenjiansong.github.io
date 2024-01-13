var existsPatchList=[];
var page=0,size=18;
var allCnt=1;
function insertToFirst(e){
	var D1=$("#D2")[0];
	if(D1.children && D1.children.length>0){
		D1.insertBefore($(e)[0],D1.children[0])
	}else{
		$("#D2").append($(e));
	}
}
function insertToLast(e){
	$("#D2").append($(e));
}
function moveToLast(e){
	$("#D2").append(e);
}
function initExistsPatchList(){
	var matchJson = AZ.matchPref("my_key_p\\d+_id");
	if(matchJson && typeof matchJson==="string" )matchJson=JSON.parse(matchJson);
	for(var k in matchJson){
		existsPatchList.push(matchJson[k]);
	}
}
function showList(){
	if(page<0){
		return ;
	}
	pageLoadTip("加载中。。。");
	var list=getList(page);
	var item_temp_html=$("#tempItem").html();
	if(list && list.length>0){
		for(var i=0;i<list.length;i++){
			var p=list[i];
			var title=p.title||'未知配置'+(allCnt++)
			var v=p.version||'8.8';
			var downTitle="下载";
			if(existsPatchList.includes(p.gkey))downTitle="已下载";
			insertToLast(item_temp_html.replace("{key}",p.gkey)
			.replace("{title}",title)
			.replace("{down_title}",downTitle)
			.replace("{v}",v));
		}
	}
	pageLoadTipHide(); 
	if(list.length<size){
		page=-1;
	}else{
		page++;
	}
}
$(document).ready(function(){
	$( document ).on("click",".item div",function(e){
		const self=$(this);
		if("已下载"==self.html()||"下载成功"==self.html()){
			alert("当前配置已下载");
		}else{
			addPatch(self);
		}
	}); 
	 initExistsPatchList();
	 showList();
	 onToEnd(showList);
	 
});

function addPatch(self){
	pageLoadTip(null);
	self.html("下载中");
	var gkey=self.data("key");
	setTimeout(() => {
			 try{
				var xmlPatch=AZ.get("https://gc.1kat.cn/get/"+gkey);
				var res=AZ.insetPatch(xmlPatch);
				if(res=="1"){
					alert("添加成功");
					self.html("已下载");
					pageLoadTipHide(); 
					return;
				}
			 }catch(e){  }
			 
			alert("添加失败")
			self.html("下载失败");
			pageLoadTipHide();
			return;
	}, 50);
}


function getList(p,s){
	var pam={
		page:p||0,
		size:s||size
	}
	var res=AZ.post("https://gc.1kat.cn/list",JSON.stringify(pam),"");
	if(typeof res=="object")return res;
	try{
		return JSON.parse(res);
	}catch(e){
		return [];
	}
}

