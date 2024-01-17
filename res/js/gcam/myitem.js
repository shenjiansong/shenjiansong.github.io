var id=X.PARAM.id||1;
var item=null;
$(document).ready(function(){
	initView();
	$( document ).on("click",".title .fa-edit",function(e){
		let titleDom=this.parentNode;
		 showEditorBox({text:item.title||'',
						ok:function(res){
							console.log(res);
							item.title=res;
							initView();
					},
		 });
	});
	$( document ).on("click",".note .fa-edit",function(e){
		let noteDom=this.parentNode;
		 showEditorBox({
						text:item.note||'',
						height:200,
						ml:true,
						ok:function(res){
							console.log(res);
							item.note=res;
							initView();
						},
				});
	});
	$( document ).on("click",".fa-cloud-upload-alt",function(e){
		$("#file").data("to","demo");
		$("#file").data("w",X.demoWidth);
		 $("#file").click()
	});
	$( document ).on("click",".icon",function(e){
		$("#file").data("to","icon");
		$("#file").data("w",X.iconWidth);
		$("#file").click()
	});
	$( document ).on("change","#file",function(e){
		 const file = event.target.files[0]; // 获取第一张选定的图片
		 if (file && file instanceof Blob) {
			 const reader = new FileReader();
			 reader.onloadend = function() {
				 const base64String = reader.result; // 获取Base64字符串
				// console.log("Base64 String:", base64String);
				 // 这里可以根据需求进行其他操作，比如显示预览、上传等
				 var to=$("#file").data("to");
				 var w=$("#file").data("w")*1;
				 getBase64Image(base64String,w).then(v => {
					 item[to]=v;
					 if(to=="demo"){
						 item["demo_src"]=v;
					 }
					initView();
				 });
			 };
			 reader.readAsDataURL(file); // 开始读取文件内容
		 } else {
			 console.error("Invalid file");
		 }
	});
	$( document ).on("click","#saveBtn",function(e){
		 if(id&&item){
			 try{
				 pageLoadTip("正在保存，请稍后");
				 var data={
					 "key":item.gkey||id,
					 "icon":item.icon||'',
					 "demo":item.demo||'',
					 "title":item.title||'',
					 "note":item.note||''
				 }
				var res=AZ.post("https://gc.1kat.cn/update",JSON.stringify(data),"");
				if(res=="1")alert("保存成功");
				else  alert("保存失败");
				pageLoadTipHide();
				return;
			}catch(e){
				pageLoadTipHide();
			}
		 }
		 alert("保存失败");
	});
	
	$( document ).on("click","body",function(e){
		if($(e.target).hasClass("fa-edit")) return;
		if(e.target.id=="editorBox"||e.target.id=="editorBoxTxt") return;
		 hideEditorBox();
	});
});

function initView(){
	//alert(id)
	if(!item && id){
		item=getItem(id);
		if(item.demo && item.demo.indexOf("/pic/DEMO")>0){
			item.demo_src=AZ.get(item.demo);
		}else{
			item.demo_src=item.demo;
		}
	}
	if(item){
		var temp=$("#itemTemp").html();
		$("#item").html(
		temp.replaceAll("{title}",item.title)
		.replaceAll("{demo}",item.demo_src||"https://7up.pics/images/2024/01/15/common.webp")
		.replaceAll("{icon}",item.icon||"https://s11.ax1x.com/2024/01/17/pFkSLtg.png")
		.replaceAll("{version}",item.version||'8.8')
		.replaceAll("{key}",item.gkey||id)
		.replaceAll("{zz}",item.author.name)
		.replaceAll("{downCnt}",item.down_cnt||0)
		.replaceAll("{time}",item.create_time||'')
		.replaceAll("{note}",item.note||'作者很懒没有留下任何介绍！！')
		)
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


function getItem(gkey){
	try{
		var data=AZ.get("https://gc.1kat.cn/item/"+(id+"").trim());
		if(typeof data=="object")return data;
		return JSON.parse(data);
	}catch(e){
		return {};
	}
}


function getBase64Image(src,w) {
    return new Promise(resolve => {
        const img = new Image()
        img.crossOrigin = ''
        img.onload = function () {
            const canvas = document.createElement('canvas')
			var m = img.height / img.width;
			 canvas.width  = w ;//该值影响缩放后图片的大小
			 canvas.height =w*m;
            const ctx = canvas.getContext('2d')
           // ctx?.drawImage(img, 0, 0, img.width, img.height,0, 0, 32, 32)
			ctx.drawImage(img, 0, 0,w,w*m);
            const ext = img.src.substring(img.src.lastIndexOf('.') + 1).toLowerCase()
            const dataURL = canvas.toDataURL('image/' + ext)
            resolve(dataURL)
        }
        img.src = src
    })
}