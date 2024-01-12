var user={};
$( document ).ready(function(){
	user=getUser();
	if(user.name){
		$("#name").val(user.name||"");
		$("#kuan").val(user.kuan||"");
		$("#email").val(user.email||"");
	}
});
function doSave(){
	var data={
		uid:user.uid||"",
		name:$("#name").val(),
		kuan:$("#kuan").val(),
		email:$("#email").val()
	}
	var res=AZ.post("https://gc.1kat.cn/user/save",JSON.stringify(data),null);
	if(typeof res==="string" && res.length>3){
		res=JSON.parse(res);
	}
	if(res && res.uid){
		user=res;
		if(AZ.saveUser(JSON.stringify(user))){
			alert("保存成功");
			return ;
		}
	}
	alert("保存失败："+JSON.stringify(res));
}