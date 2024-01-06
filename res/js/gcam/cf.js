function login(){
	var loginTxt="";
	if(loginTxt){
		$.post("https://kv.1kat.cn/user", 
		 loginTxt, function(a,b,c){
			 console.log(a,b,c);
		 },function(a,b,c){
			 console.log(a,b,c);
		 }
		);
	}
}

function getBase64Image(src) {
    return new Promise(resolve => {
        const img = new Image()
        img.crossOrigin = ''
        img.onload = function () {
            const canvas = document.createElement('canvas')
            canvas.width = 32
            canvas.height = 32
            const ctx = canvas.getContext('2d')
            ctx?.drawImage(img, 0, 0, img.width, img.height
			,0, 0, 32, 32)
            const ext = img.src.substring(img.src.lastIndexOf('.') + 1).toLowerCase()
            const dataURL = canvas.toDataURL('image/' + ext)
			console.log(dataURL);
            resolve(dataURL)
        }
        img.src = src
    })
}

$( document ).ready(function(){
	
});