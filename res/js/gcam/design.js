var item={
	title:'xx',
	data:'',
	json:{}
};
var srcData=null;
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
	
	$( document ).on("click","#tool label",function(e){
		 console.log(this);
		 $("label").removeClass("active");
		 $(this).addClass("active"); 
		 $(".layout").addClass("hide")
		 var id=$(this).data("id");
		 $(".layout.c"+id).removeClass("hide")
	});
	$( document ).on("input",".row .slider",function(e){
		//console.log(this.value);
		if($(this).data("type")==1){
			var cc=$(this.parentNode.parentNode);
			cc.find(".vol").html(this.value);
			var c=cc.data("c");
			var obj=item.json[c];
			if(!obj)obj={};
			obj["c"]={
				name:c,
				param:[this.value]
			}
			item.json[c]=obj;
		}else if($(this).data("type")==2){
			var m=$(this).data("method");
			var cc=$(this.parentNode.parentNode);
			cc.find(".vol").html(this.value);
			var c=cc.data("c");
			var obj=item.json[c];
			if(!obj){
				obj={"c":{"name":c }};
			}
			
			obj["m"]={}
			obj["m"][m]=[this.value];
			item.json[c]=obj;
		}
		
		initView();
	});
	
	$( document ).on("change","#file",function(e){
		 //    imgUrl=AZ.getLastUploadFile();
			// if(imgUrl)item.data=AZ.gpuFilter(imgUrl,item.json);
			// initView();
		 const file = event.target.files[0]; // 获取第一张选定的图片
		 if (file && file instanceof Blob) {
			 const reader = new FileReader();
			 reader.onloadend = function() {
				 const base64String = reader.result; // 获取Base64字符串
				 var to=$("#file").data("to");
				 var w=$("#file").data("w")*1;
				 getBase64Image(base64String,w).then(v => {
					srcData=v; 
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
		if(item.json && item.json!={}&&srcData){
			item.data=AZ.gpuFilter(srcData,JSON.stringify(item.json));
		}
		var temp=$("#itemTemp").html();
		$("#item").html(
			temp.replaceAll("{title}",item.title||"添加标题").replaceAll("{demo}",item.data)
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
					alert("保存成功,正在跳转至配置页。。")
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

function initActive(){
	$("label").removeClass("active");
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