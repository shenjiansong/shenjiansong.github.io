var user={};
$( document ).ready(function(){
	user=getUser();
	if(user.name){
		$("#name").val(user.name||"");
		$("#kuan").val(user.kuan||"");
		$("#email").val(user.email||"");
	}
	
	$("#wxz").val(AZ.getPref("my_random_wxz")||'20');
	
	$( document ).on("click","#wxzBtn",function(e){
		 AZ.setPref("my_random_wxz",$("#wxz").val());
		 alert("修改成功")
	});
	
});
function toUpload(){
	 document.location.href='upload.html';
}
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
		if(AZ.saveUser(JSON.stringify(user))==1){
			alert("保存成功");
			return ;
		}
	}
	alert("保存失败："+JSON.stringify(res));
}

//