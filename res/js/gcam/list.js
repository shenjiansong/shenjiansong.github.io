var existsPatchList=[];
var page=0,size=18;
var allCnt=1;
var default_logo="https://s11.ax1x.com/2024/01/13/pFPJVxI.png"

$(document).ready(function(){
	$( document ).on("click",".item .down",function(e){
		const self=$(this);
		if(self.hasClass("fa-arrow-down")){
			addPatch(self);
		}else{
			alert("当前配置不可下载");
		}
	}); 
	 initExistsPatchList();
	 showList();
	 onToEnd(showList);
	 
});



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
			var downCls="fa-arrow-down";
			if(existsPatchList.includes(p.gkey))downCls="fa-ban";
			insertToLast(item_temp_html.replace("{key}",p.gkey)
			.replace("{title}",title)
			.replace("{downcls}",downCls)
			.replace("{v}",v)
			.replace("{name}",p.name||'')
			.replace("{demoImg}",p.demo||default_logo)
			); 
		}
	}
	pageLoadTipHide(); 
	if(list.length<size){
		page=-1;
	}else{
		page++;
	}
}
function addPatch(self){
	pageLoadTip(null);
	var gkey=self.data("key");
	setTimeout(() => {
			 try{
				var xmlPatch=AZ.get("https://gc.1kat.cn/get/"+gkey);
				var res=AZ.insetPatch(xmlPatch);
				if(res=="1"){
					alert("添加成功");
					self.removeClass("fa-arrow-down");
					self.addClass("fa-ban")
					pageLoadTipHide(); 
					return;
				}
			 }catch(e){  }
			 
			alert("添加失败")
			self.removeClass("fa-arrow-down");
			self.addClass("fa-exclamation")
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
