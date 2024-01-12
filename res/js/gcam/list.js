var item_temp_html='<DIV class="item"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAARdJREFUWEftltENwjAMRH1MwCiICZAQe8Fe/DABo7ABB6kIMmnduE1DJES/2lSNn88Xu5DGFxrHl98HIEkAZqLVFWgKEIJHj1kqVFOA5E1E1trkQxA9AE099YSEAJ7vNcjiAAF6DCJVwQQYc65XmVkeiB/NBdCuXwzAs9FL+r2InMN9TCACWYm5SpDW1FKHZA8glmtJgB2Ai+UDq/EUAShnHwB0Ek+9igFyAXPmrQrg8UgxAMkVgHuqBMmNiFyT9S2Aj7UlAMJgOT5PwEkHs7peelKKAKw+kOv7GmI2wFAQ79BJG5J+fo/pgZp2M1x3stwJGHuf7vPVYTTkFTdASdYeRbIlaAZQK7C1b7V/Qm8if4C/As0VeACreuwh5RKDXQAAAABJRU5ErkJggg=="/><div data-key="{key}">{down_title}</div><label>{title}</label></DIV>';
var existsPatchList=[];
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
	if(typeof matchJson==="string")matchJson=JSON.parse(matchJson);
	for(var k in matchJson){
		existsPatchList.push(matchJson[k]);
	}
}
function initItems(){
	 var list=getList(0);
	if(list && list.length>0){
		for(var i=0;i<list.length;i++){
			var p=list[i];
			var title=p.title||'未知配置'+i
			var downTitle="下载";
			if(existsPatchList.includes(p.gkey))downTitle="已下载";
			insertToLast(item_temp_html.replace("{key}",p.gkey).replace("{title}",title).replace("{down_title}",downTitle));
		}
	}
}
$( document ).ready(function(){
	$( document ).on("click",".item div",function(e){
		const self=$(this);
		if("已下载"==self.html()||"下载成功"==self.html()){
			alert("当前配置已下载");
		}else{
			addPatch(self);
		}
	}); 
	 initExistsPatchList();
	 initItems();
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
	return [
{
gkey: "48CFCFBB42413",
version: "8.8",
quote_cnt: 0,
zz: "18CFB9A56AD"
},
{
gkey: "4A01CFBA61082",
version: "8.8",
quote_cnt: 0,
zz: "18CFB9A56AD"
},
{
gkey: "4C78CFBA60580",
version: "8.8",
quote_cnt: 0,
zz: "18CFB9A56AD"
},
{
gkey: "564ACFBB4271E",
version: "8.8",
quote_cnt: 0,
zz: "18CFB9A56AD"
},
{
gkey: "5788CFBA87456",
version: "8.8",
quote_cnt: 0,
zz: "18CFB9A56AD"
},
{
gkey: "5809CFBD10AF2",
version: "8.8",
quote_cnt: 0,
zz: "18CFB9A56AD"
},
{
gkey: "593ECFBA8713D",
version: "8.8",
quote_cnt: 0,
zz: "18CFB9A56AD"
},
{
gkey: "5BEACFCC59A25",
version: "8.8",
quote_cnt: 0,
zz: "18CFCC54D4E",
name: "我是我",
kuan: ""
},
{
gkey: "5E48CFBB429E7",
version: "8.8",
quote_cnt: 0,
zz: "18CFB9A56AD"
},
{
gkey: "60B8CFBAB917B",
version: "8.8",
quote_cnt: 0,
zz: "18CFB9A56AD"
},
{
gkey: "6135CFB9DB30E",
version: "8.8",
quote_cnt: 0,
zz: "18CFB9A56AD"
},
{
gkey: "6407CFBCF7586",
version: "8.8",
quote_cnt: 0,
zz: "18CFB9A56AD"
},
{
gkey: "6712CFBB52CBF",
version: "8.8",
quote_cnt: 0,
zz: "18CFB9A56AD"
},
{
gkey: "6F4BCFBCFD6C6",
version: "8.8",
quote_cnt: 0,
zz: "18CFB9A56AD"
},
{
gkey: "7158CFB9EE2CF",
version: "8.8",
quote_cnt: 0,
zz: "18CFB9A56AD"
},
{
gkey: "71F5CFBCABE4F",
version: "8.8",
quote_cnt: 0,
zz: "18CFB9A56AD"
}
];
	var pam={
		page:p||0,
		size:s||20
	}
	var res=AZ.post("https://gc.1kat.cn/list","","");
	
	if(typeof res=="array")return res;
	try{
		return JSON.parse(res);
	}catch(e){
		return [];
	}
}