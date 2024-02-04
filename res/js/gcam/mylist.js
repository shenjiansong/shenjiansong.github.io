var existsPatchList=[];
var allCnt=1;
var default_logo="https://s11.ax1x.com/2024/01/13/pFPJVxI.png"

$(document).ready(function(){
	$( document ).on("click",".item",function(e){
		var id=$(this).data("key");
		toMyItem(id);
	});
	 showList();
	// onToEnd(showList);
});

function insertToFirst(e){
	var D1=$("#D2")[0];
	if(D1.children && D1.children.length>0){
		D1.insertBefore($(e)[0],D1.children[0])
	}else{
		$("#D2").append($(e));
	}
}
var ii=1
function insertToLast(e){
	let dd=$(e); 
	let demo=dd.find(".demoimg");
	var src = demo.data("src")
	if(src){
		if(src.indexOf("/pic/DEMO")>0){
			Thead.delayed(function(){
				if(src && src.indexOf("/pic/DEMO")>0){
					src=AZ.get(src);
				}
			},100*ii++);
		}else{
			demo.attr("style","background-image:url('"+src+"')");
		}
	}
	$("#D2").append(dd);
}

function moveToLast(e){
	$("#D2").append(e);
}
function showList(){
	pageLoadTip("加载中。。。");
	var list=G.getList({zz:getUkey()});
	var item_temp_html=$("#tempItem").html();
	if(list && list.length>0){
		for(var i=0;i<list.length;i++){
			var p=list[i];
			var title=p.title||'未知配置'+(allCnt++)
			var v=p.version||'8.8';
			insertToLast(item_temp_html.replace("{key}",p.gkey)
			.replace("{title}",title)
			.replace("{v}",v)
			.replace("{demoImg}",p.demo||'')
			); 
		}
	}
	pageLoadTipHide(); 
}
function addPatch(self){
	pageLoadTip(null);
	var gkey=self.data("key");
	setTimeout(() => {
			 try{
				var xmlPatch=AZ.get("https://gc.1kat.cn/get/"+gkey);
				var res=AZ.insetPatch(xmlPatch);
				if(res.length>0){
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
 