var item={
	title:'',
	data:'',
	json:{}
};
var curveObj=null;
var srcData=null,localPatchList={},nowP=-99;
var srcImageBase64=null;
var srcImageUrl=null;
$(document).ready(function(){
	
	initLocalPatch(true);
	initSliderValue();
	initView(true);
	$( document ).on("click",".layout .lut",function(e){
		$("#file").data("to","lut");
		$("#file").data("w",512);
		$("#file").click()
	});
	$( document ).on("click",".cover",function(e){
		$("#file").data("to","data");
		//$("#file").data("w",Math.min(window.screen.availWidth*2,1024));
		$("#file").data("w",1024);
		$("#file").click()
	});
	$( document ).on("click",".title .fa-edit",function(e){
		let titleDom=this.parentNode;
		 showEditorBox({text:item.title||'',
						ok:function(res){
							item.title=res;
							initView(false);
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
		item.json=toItemJson(JSON.stringify(localPatchList[key]));
		item.title=this.innerText;
		nowP=p;
		resetValueByJson();
		initView(true);
		$(".title.select").html("no:"+nowP);
		$(".button.add").html("保存("+this.innerText+")");
		
	});
	
	$( document ).on("click","#tool label",function(e){
		 $("label").removeClass("active");
		 $(this).addClass("active"); 
		 $(".layout").addClass("hide")
		 var id=$(this).data("id");
		 $(".layout.c"+id).removeClass("hide")
	});
	
	$( document ).on("click",".c5 .level div",function(e){
		 $(".c5 .level div").removeClass("changed");
		 $(this).addClass("changed");
		 $(".c5 .cmf").addClass("hide");
		 $(".c5 .cmf."+$(this).data("type")).removeClass("hide");
	});
	
	$( document ).on("click",".c8 .level div",function(e){
		 $(".c8 .level div").removeClass("changed");
		 $(this).addClass("changed");
		 $(".c8 .hsl").addClass("hide");
		 $(".c8 .h"+$(this).data("type")).removeClass("hide");
	});
	
	$( document ).on("click",".reset",function(e){
		var slider=this.nextElementSibling;
		slider.value=$(slider).attr("default");
		showValueBySlider(slider);
		var attr=$(slider).data("attr");
		if(attr.indexOf(":")<0){
			var row=findRowBySlider(slider);
			var filterName=$(row).data("c");
			var p1=item.json[filterName];
			if(p1){
				var p2=p1.hasOwnProperty(attr.split(".")[0])?p1[attr.split(".")[0]]:{};
				delete p2[attr.split(".")[1]]
				if(!p2 || JSON.stringify(p2).length<3)delete  p1[attr.split(".")[0]];
				if(!p1["m"]&&!p1["f"]&&!p1["c"]["param"])delete p1["c"];
				if(!p1["c"])delete item.json[filterName];
			}
		}else{
			setJsonBySlider(slider);
		}
		initView(true);
	});
	
	
	 
	$( document ).on("input",".layout .slider",function(e){
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
			setLutValue("");
			initSliderValue();
			curveObj.clearAll();
			initView(true);
	});
	
	$( document ).on("click",".export",function(e){
		pageLoadTip("正在导出图片，请稍后。。。");
		var result=false;
		try{
			var filterJson=toFilterJson();
			if(filterJson && filterJson.length>10){
				if(srcImageUrl && srcImageUrl.length>10){
					result=AZ.saveImageByFilter(srcImageUrl,filterJson);
				}else if(srcImageBase64 && srcImageBase64.length>100){
					result=AZ.saveImageByFilter(srcImageBase64,filterJson);
				}
			}
		}catch(e){
			
		}
		
		if(!result){
			alert("导出失败")
		}else{
			alert("导出完成")
		}
		pageLoadTipHide();
			 
	});
	
	$( document ).on("click",".upload",function(e){
		pageLoadTip("上传中，请稍后。。。");
		AZ.clearCache(); 
		document.location.href=document.location.href;
	});
	
	$( document ).on("change","#file",function(e){
		 const file = event.target.files[0]; // 获取第一张选定的图片
		 var to=$("#file").data("to");
		 if (file && file instanceof Blob) {
			 if(to=="data"){
			 	doCover(file)
			 }else if(to=="lut"){
			 	doLut(file)
			 }
			 $("#file").val("")
		 } else {
			 console.error("Invalid file");
			  $("#file").val("")
		 }
	});
	
	demo.onload=function(){
		var w=this.naturalWidth,h=this.naturalHeight;
		if(h>w){
			$("#demo").height(window.screen.availHeight *0.4)
			$("#demo").width(w*((window.screen.availHeight *0.4)/h))
		}else{
			$("#demo").width(window.screen.availWidth)
			$("#demo").height(h*($("#demo").width()/w))
		}
	}
	
	
	curveObj=new curve(".layout.c9",window.screen.availWidth*0.65,function(c){
		if(curveObj){
			var  curveFilter=curveObj.toGpuImageFilter();
			if(!curveFilter){
				if(item.json.hasOwnProperty("curve"))delete item.json["curve"];
			}else{
				item.json["curve"]=curveFilter;
			}
			doValueChange();
		}
	});
	
	// $(".layout .slider").on("touchmove",function(e){
	// 	  event.preventDefault(); 
	// });
	  
	// $(".layout .slider").on("touchstart",function(e){
	// 	  event.preventDefault(); 
	// });
	// $(".layout .slider").on("mousedown",function(e){ 
	// 	  event.preventDefault(); 
	// });
	// $(".layout .slider").on("mousemove",function(e){ 
	// 	  event.preventDefault(); 
	// });
});

function doLut(file){
	
	var w=$("#file").data("w")*1;
	var fileName=file.name.toLowerCase();
	if(fileName.endsWith(".png")||fileName.endsWith(".jpg")||fileName.endsWith(".jpeg")){
		 const reader = new FileReader();
		 reader.onloadend = function() {
			 const base64String = reader.result; // 获取Base64字符串
			 getBase64Image(base64String,w).then(v => {
				setLutValue(v)
			 });
		 };
		 reader.readAsDataURL(file); // 开始读取文件内容
	}else if(fileName.endsWith(".cube")){
		 const reader = new FileReader();
		 reader.onloadend = function() {
			 const cubeTxt = reader.result; // 获取Base64字符串
			 let base64Img=AZ.cubeToBase64(cubeTxt);
			 getBase64Image(base64Img,w).then(v => {
			 				setLutValue(v)
			 });
		 };
		 reader.readAsText(file);   
	}
}
function setLutValue(base64){
	var s=$(".layout .lut input")[0];
	if(!base64  || base64.length<50){
		$(".layout .lut img").attr("src",null);
		$(".layout .lut div").show();
		s.value="";
		if(item.json.hasOwnProperty("GPUImageLookupFilter")){
			delete item.json["GPUImageLookupFilter"];
		}
	}else{
		$(".layout .lut img").attr("src",base64); 
		$(".layout .lut div").hide();
		s.value=base64;
		setJsonBySlider(s); 
	}
	initView(true);
}
	
function doCover(file){
	 var w=$("#file").data("w")*1;
	const reader = new FileReader();
	reader.onloadend = function() {
		 srcImageBase64 = reader.result; // 获取Base64字符串
		 srcImageUrl=AZ.getLastUploadFile();
		 getBase64Image(srcImageBase64,w).then(v => {
			srcData=v; 
			initView(true);
		 });
	};
	reader.readAsDataURL(file); // 开始读取文件内容
}
function initView(incloudImg){//是否重新渲染图片
	if(item){
		if(srcData && incloudImg){
			var filterJson=toFilterJson();
			if(filterJson && filterJson.length>3){
				item.data=AZ.gpuFilter(srcData,filterJson);
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
			 if(img.width<w)w=img.width;
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
	doValueChange();
}
function showValueBySlider(s){
	var cc=$(s.parentNode.previousElementSibling);
	cc.find(".vol").html(s.value);
}
var tigerJob=-1;
function doValueChange(){
	if(tigerJob==-1){
		tigerJob=setTimeout(function(){
			initView(true);
			tigerJob=-1;
		},50);
	}
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
		if(attr.indexOf(":")<1){
			filter[type][attr]=s.value;
		}else{
			var attr=attr.split(":")[0];
			filter[type][attr]=getArrayByRow(row,type,attr).join(",");
		}
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
			}else if(slider.data("attr").indexOf(findAttr+"-")>=0){
				result.push(getArrField(sliders,findAttr));
				break;
			}
		}
	}
	return result;
}
function getArrField(sliders,findAttr){
	var result=[];
	for(var i=0;i<32;i++){
		var  findAttr2=findAttr+"-"+i;
		for(var j=0;j<sliders.length;j++){
			var slider=$(sliders[j]);
			if(slider.data("attr")==findAttr2){
				result.push(slider.val());
				break;
			}
		}
	}
	return result.join(",");
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
						var po=temps.length>1?(temps[1]*1):0;
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

function  toFilterJson(){ 
	
	var filter=JSON.stringify(item.json);
	filter=JSON.parse(filter);
	for(var att in filter){
		if(att=="GPUImageVignetteFilter"){//暗角设置中心点
			var aj=filter["GPUImageVignetteFilter"];
			if(aj){
				aj.m["setVignetteCenter"]=["0.5,0.5"];
			}
		}else if(att.startsWith("hsl")){
			var hsl=filter[att];
			if(hsl&&hsl.hasOwnProperty("c")){
				var hslName=hsl["c"]["name"];
				 hsl["c"]["param"]=[hslName.replace("hsl","")];
				 hsl["c"]["name"]="nan.ren.filter.HslFilter";
			}
		}
		
	}
	// var  cmf=filter["GPUImageColorMatrixFilter"];
	// if(cmf){
	// 	cmf.m["setColorMatrix"]=["0.3588, 0.7044, 0.1368, 0.0,  0.2990, 0.5870, 0.1140, 0.0, 0.2392, 0.4696, 0.0912, 0.0,  0, 0, 0, 1.0"]; 
	// }
	//  
	 var resultJsonStr= JSON.stringify(filter);
	return resultJsonStr;
}

function  toItemJson(json){ 
	if(typeof json=="string") json=JSON.parse(json);
	if(json.hasOwnProperty("curve")){//显示曲线 
		curveObj.fromGpuImageFilter(json["curve"]);
	}else{
		curveObj.clearAll();
	}
	for(var att in json){
		 if(att.startsWith("hsl")){
			 console.log(json[att])
			json[att]["c"]["name"]=att;
			delete json[att]["c"]["param"]; 
		 }
	}
	return json;
}