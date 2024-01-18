var item={
	title:'',
	data:'',
	version:"8.8"
};
$(document).ready(function(){
	initView();
	$( document ).on("click",".cover",function(e){
		$("#file").data("to","data");
		$("#file").data("w",512);
		$("#file").click()
	});
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
	$( document ).on("click","#saveBtn",function(e){
		pageLoadTip("上传中，请稍后。。。");
		setTimeout(function(){
			toUploadOne(self)
		},1000);
	});
	
	$( document ).on("change","#file",function(e){
		 const file = event.target.files[0]; // 获取第一张选定的图片
		 if (file && file instanceof Blob) {
			 const reader = new FileReader();
			 reader.onloadend = function() {
				 const base64String = reader.result; // 获取Base64字符串
				 var to=$("#file").data("to");
				 var w=$("#file").data("w")*1;
				 getBase64Image(base64String,w).then(v => {
					 item[to]=v;
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
	if(item){
		var temp=$("#itemTemp").html();
		$("#item").html(
			temp.replaceAll("{title}",item.title||"添加标题")
			.replaceAll("{icon}",item.icon)
			.replaceAll("{version}",item.version)
			.replaceAll("{demo}",item.data)
		)
	}
}


function toUploadOne(it){
	try{
		if(item.data && item.data.length>100){
			if(item.title && item.title.length>1){
				var patch='<string name="lib_profile_title_key_p0_{cid}">'+(item.title||'未知配置')+'</string>\n'+
							'<string name="my_key_p0_lut">'+item.data+'</string>';
				var key=AZ.post("https://gc.1kat.cn/put",patch,null);
				if(!key){
					alert("保存失败！")
				}else{
					alert("保存成功！")
					X.to("myitem","id="+key)
				}
			}else{
				alert("请添加标题！")
			}
		}else{
			alert("请先上传LUT！")
		}
	}catch(e){
		
	}
	pageLoadTipHide();
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