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
				 getBase64Image(base64String).then(v => {
					item.demo=v;
					initView();
				 });
			 };
			 reader.readAsDataURL(file); // 开始读取文件内容
		 } else {
			 console.error("Invalid file");
		 }
	});
	
	
});

function initView(){
	if(!item && id){
		item=getItem(id);
	}
	if(item){
		var temp=$("#itemTemp").html();
		$("#item").html(
		temp.replaceAll("{title}",item.title)
		.replaceAll("{demo}",item.demo||"https://7up.pics/images/2024/01/15/common.webp")
		.replaceAll("{version}",item.version||'8.8')
		.replaceAll("{key}",item.id||id)
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


function getBase64Image(src) {
    return new Promise(resolve => {
        const img = new Image()
        img.crossOrigin = ''
        img.onload = function () {
            const canvas = document.createElement('canvas')
			var m = img.height / img.width;
			 canvas.width  = 300 ;//该值影响缩放后图片的大小
			 canvas.height =300*m;
            const ctx = canvas.getContext('2d')
           // ctx?.drawImage(img, 0, 0, img.width, img.height,0, 0, 32, 32)
			ctx.drawImage(img, 0, 0,300,300*m);
            const ext = img.src.substring(img.src.lastIndexOf('.') + 1).toLowerCase()
            const dataURL = canvas.toDataURL('image/' + ext)
            resolve(dataURL)
        }
        img.src = src
    })
}