var id=X.PARAM.id;
var data=null;
$(document).ready(function(){
	initView();
	$( document ).on("click",".fa-arrow-down",function(e){
		 const self=$(this);
		 addPatch(self);
	});
	$( document ).on("click",".zz",function(e){
		 if(data && data.author && data.author.kuan){
			 if(data.author.kuan.indexOf("://www.coolapk.com/u/")>0){
				X.to("coolmarket://"+data.author.kuan.split("://")[1]);
			 }
		 }
	});
	
	$( document ).on("click",".src",function(e){
		 if(data && data.pkey){
			 X.to("item","id="+data.pkey);
		 }
	});
});

function initView(){
	if(id){
		data=getItem(id);
		if(data.demo && data.demo.indexOf("/pic/DEMO")>0){
			data.demo=AZ.get(data.demo);
		}
		data.version=0;
		var temp=$("#itemTemp").html();
		var v=data.version||'8.8';
		if(data.version==0)v="通";
		$("#item").html(
			temp.replaceAll("{title}",data.title)
			.replaceAll("{demo}",data.demo||"https://7up.pics/images/2024/01/15/common.webp")
			.replaceAll("{version}",v)
			.replaceAll("{key}",data.id||id)
			.replaceAll("{zz}",data.author.name)
			.replaceAll("{downCnt}",data.down_cnt||0)
			.replaceAll("{time}",data.create_time||'')
			.replaceAll("{note}",data.note||'作者很懒没有留下任何介绍！！')
		)
		if(data.version==0){
			$(".ver span").attr("style","right:0.4rem;top:0.2rem")
		}
		 if(data && data.author && data.author.kuan && data.author.kuan.indexOf("://www.coolapk.com/u/")>0){
			 $("#item .zz img").removeClass("hide");
		 }
	
		 if(data && data.parent){
			 var pname="佚名";
			 var ptitle=data.parent.title||'未知配置';
			 if(data.parent.author)pname=data.parent.author.name||pname;
		 	$(".src").html($(".src").html().replaceAll("{pzz}",pname)
			.replaceAll("{ptitle}",ptitle));
			$(".src").removeClass("hide");
		 }
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

function show(){
	
}


function getItem(gkey){
	try{
		var data=AZ.get("https://gc.1kat.cn/item/"+(id+"").trim());
		if(typeof data=="object")return data;
		return JSON.parse(data);
	}catch(e){
		return {};
	}
}

