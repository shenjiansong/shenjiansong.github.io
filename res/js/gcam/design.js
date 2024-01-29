var item={
	title:'',
	data:'',
	json:{}
};
var srcData=null,localPatchList={},nowP=-99;
$(document).ready(function(){
	
	initLocalPatch(true);
	initSliderValue();
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
	$( document ).on("click",".title .select",function(e){
		var html="";
		if(localPatchList){
			 for(var k in localPatchList){
				 var p=getP(k);
				 html+="<div class='lpatch' style='padding:0.5rem 0;' data-p='"+p+"'><div style='background-color: #97949c;height:2rem;padding-top:0.5rem'>"+AZ.getPref("lib_profile_title_key_p"+p+"_0")+"</div></div>";
			 }
		}  
		if(html.length>10){ 
			pageLoadTip(html,false);
		}else{
			alert("没有找到本地GPU配置！")
		}
	});
	
	$( document ).on("click",".lpatch",function(e){ 
		var p=$(this).data("p")
		var key="my_key_p"+p+"_random"
		item.json=JSON.parse(JSON.stringify(localPatchList[key]));
		item.title=this.innerText;
		nowP=p;
		resetValueByJson();
		initView();
		$(".title.select").html("no:"+nowP);
		$(".button.add").html("保存("+this.innerText+")");
		
	});
	
	$( document ).on("click","#tool label",function(e){
		 console.log(this);
		 $("label").removeClass("active");
		 $(this).addClass("active"); 
		 $(".layout").addClass("hide")
		 var id=$(this).data("id");
		 $(".layout.c"+id).removeClass("hide")
	});
	
	
	
	$( document ).on("click",".reset",function(e){
		var slider=this.nextElementSibling;
		slider.value=$(slider).attr("default");
		sliderChange(slider);
	});
	
	
	 
	$( document ).on("input",".row .slider",function(e){
			sliderChange(this);
	});
	
	$( document ).on("click",".add",function(e){
		if(!item.title){
			alert("请先添加标题");
			return ;
		}
		if(!item.json||JSON.stringify(item.json).length<5){
			alert("请先进行配置设置");
			return ;
		}
		pageLoadTip("上传中，请稍后。。。");
		try{
			if(nowP>=0)deletePatchByP(nowP);
			var xml='<string name="lib_profile_title_key_p0_{cid}">'+item.title+'</string>\n'
					+'<string name="my_key_p0_random">'+JSON.stringify(item.json)+'</string>';
			var res=AZ.insetPatch(xml);
			if(res.length>0){
				initLocalPatch();
				alert("添加成功");
				pageLoadTipHide(); 
				return;
			}
		}catch(e){ }
		alert("添加失败");
		pageLoadTipHide();
	}); 
	
	$( document ).on("click",".allreset",function(e){
			item.json={};
			initSliderValue();
			initView();
	});
	
	$( document ).on("click",".upload",function(e){
		pageLoadTip("上传中，请稍后。。。");
		AZ.clearCache(); 
		document.location.href=document.location.href;
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
		if(srcData){
			if(item.json && JSON.stringify(item.json)!="{}"){
				item.data=AZ.gpuFilter(srcData,JSON.stringify(item.json));
			}else{
				item.data=srcData;
			}
		}
		$(".edittitle span").html(item.title||"添加标题");
		$(".select span").html(nowP>=0?nowP:"");
		
		if(item.data){
			$(".cover img").attr("src",item.data);
			$(".cover div").hide();
		}else{
			$(".cover div").show();
		}
	}
}


function toUploadOne(it){
	try{
		if(item.json && JSON.stringify(item.json).length>5){
			if(item.title && item.title.length>1){
				var patch='<string name="lib_profile_title_key_p0_{cid}">'+(item.title||'未知配置')+'</string>\n'+
							'<string name="my_key_p0_random">'+JSON.stringify(item.json)+'</string>';
				var key=AZ.post("https://gc.1kat.cn/put",patch,null);
				if(!key){
					alert("上传失败！")
				}else{
					alert("上传成功,可到我的配置中查看和修改。。")
					//X.to("myitem","id="+key);
				}
			}else{
				alert("请添加标题！")
			}
		}else{
			alert("还未进行任何调整！")
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

function initSliderValue(){
	var allSliders=$(".slider");
	for(var i=0;i<allSliders.length;i++){
		var s=allSliders[i];
		s.value=$(s).attr("default");
		showValueBySlider(s);
	}
}

function sliderChange(s){
	showValueBySlider(s);
	setJsonBySlider(s);
	initView();
}
function showValueBySlider(s){
	var cc=$(s.parentNode.previousElementSibling);
	cc.find(".vol").html(s.value);
}


/*
c:{
	name:"GPUImageFilterClassname",
	param:["","",""]
}
f:{	n1:"a,b,c"，n2:"a,b,c" }
m:{
	m1:["a","b","1,2"],
	m2:["a","b","1,2"],
	m3:["a","b","1,2"],
}
*/
function findRowBySlider(s){
	var row=s.parentNode;
	for(var i=0;i<10;i++){
		if($(row).hasClass("row"))break;
		row=row.parentNode;
	}
	return row;
}
function setJsonBySlider(s){
	var attrs=$(s).data("attr").split(".");
	if(attrs.length!=2)return;
	var type=attrs[0].trim();
	var attr=attrs[1].trim();

	var row=findRowBySlider(s);
	var filterName=$(row).data("c");
	var filter=item.json[filterName];
	if(!filter){
		filter={
			"c":{"name":filterName}
		}
	}
	if(!filter[type])filter[type]={};
	//设置字段属性
	if(type=="f"){
		filter[type][attr]=s.value;
	}else{//设置方法属性和构造参数
		if(attr.indexOf(":")<1){
			filter[type][attr]=[s.value];
		}else{
			var attr=attr.split(":")[0];
			filter[type][attr]=getArrayByRow(row,type,attr);
		}
	}
	item.json[filterName]=filter;
}
function getArrayByRow(row,type,attr){
	var result=[];
	var sliders=$(row).find(".slider");
	for(var i=0;i<10;i++){
		var findAttr=type+"."+attr+":"+i;
		for(var j=0;j<sliders.length;j++){
			var slider=$(sliders[j]);
			if(slider.data("attr")==findAttr){
				result.push(slider.val());
				break;
			}
		}
	}
	return result;
}

function initLocalPatch(isPageLoad){
	var  matchJson = AZ.matchPref("my_key_p[0-9]*_random");
	var tempJson=null;
	if(matchJson){
		try{tempJson=JSON.parse(matchJson);}catch(e){ eval("tempJson="+matchJson);}
	}
	if(localPatchList==null)localPatchList={};
	for(var k in tempJson){
		var json=tempJson[k];
		if(json.indexOf("{wxz")>0){
			continue;
		}
		if(typeof json=="string"){
			try{
				try{json=JSON.parse(json);}catch(e){ eval("json="+json);}
			}catch(e2){
				continue;
			}
			if(JSON.stringify(json).startsWith("[")){
				continue;
			}else{
				if(!isPageLoad && !localPatchList[k]){
					nowP=getP(k);
				}
				localPatchList[k]=json;
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

function resetValueByJson(){
	if(!item.json || typeof item.json!="object")return ;
	 initSliderValue();
	 var sliders=$(".slider");
	for(var j=0;j<sliders.length;j++){
		var slider=sliders[j];
		var row=findRowBySlider(slider);
		var c=$(row).data("c");
		if(item.json.hasOwnProperty(c)){
			var attrs=$(slider).data("attr").split(".");
			if(attrs.length!=2)continue;
			var type=attrs[0].trim();//c m f
			if(item.json[c].hasOwnProperty(type)){
				var attr=attrs[1].trim();
				if(type=="f"){
					if(item.json[c][type].hasOwnProperty(attr)){
						slider.value=item.json[c][type][attr];
						showValueBySlider(slider)
					}
				}else{
					var temps=attr.split(":");
					attr=temps[0];
					if(item.json[c][type].hasOwnProperty(attr)){
						var po=temps.length>1?(temps[0]*1):0;
						slider.value=item.json[c][type][attr][po];
						showValueBySlider(slider)
					}
				}
			}
		}
	}
}

function deletePatchByP(p){
	if(typeof p=="undefined" || p==null || p<0 || (p+"").length<1) return;
	var matchJson = AZ.queryPref("_key_p"+p+"_");
	var matchs=null;
	try{matchs=JSON.parse(matchJson);}catch(e){ eval("matchs="+matchJson);}
	if(matchs){
		 for(var k in matchs){
			 AZ.setPref(k,"");
		 }
		 var key="my_key_p"+p+"_random"
		 delete localPatchList[key];
	}
}
window.onerror=function(a,b,c){
	alert("error:"+a)
}