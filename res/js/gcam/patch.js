var qqKey='Ajunow7XHpNqGtbgG9hDMTnJy0aWK2CV';
var qqInent='mqqopensdkapi://bizAgent/qm/qr?url=http%3A%2F%2Fqm.qq.com%2Fcgi-bin%2Fqm%2Fqr%3Ffrom%3Dapp%26p%3Dandroid%26jump_from%3Dwebapi%26k%3D'
var lastUpdateDate='2024-01-04 14:28:19';
function initX(){
		document.getElementById("qq").href=qqInent+qqKey;
		document.getElementById("lastUpdate").innerHTML=lastUpdateDate;
		if(hasNewVersion()){
			document.getElementById("updateBtn").style.display="";
		}
}
function hasNewVersion(){
	if(typeof AZ=="object"){
		var v= AZ.getVersion();
		if(v && v.indexOf("_")>0){
			v=v.split("_")[1]*1;
			return v<2303;
		}
	}
	return false;
}
function getZuoZe(d){
	var zz=d.zz;
	if(d.id){
		zz="<a href='#' onclick='openApp("+data[i].id+")'>"+zz+"</a>"
	}else if(zz=="老K"){
		zz="<a href='#' onclick='openApp(9048922)'>"+zz+"</a>"
	}else if(zz=="老马"){
		zz="<a href='#' onclick='openApp(1844347)'>"+zz+"</a>"
	}else if(zz=="仙女"){
		zz="<a href='#' onclick='openApp(1490292)'>"+zz+"</a>"
	}else if(zz=="鱼纨子"){
		zz="<a href='#' onclick='openApp(10293815)'>"+zz+"</a>"
	}else if(zz=="Mason騳"){
		zz="<a href='#' onclick='openApp(5300645)'>"+zz+"</a>"
	}else if(zz=="miiiifans"){
		zz="<a href='#' onclick='openApp(9048922)'>"+zz+"</a>"
	}else if(zz=="山禾"){
		zz="<a href='#' onclick='openApp(27035409)'>"+zz+"</a>"
	}else if(zz=="VIP吊炸天"){
		zz="<a href='#' onclick='openApp(486849)'>"+zz+"</a>"
	}
	return zz;
}

function toUpdate(){
	document.location.href="outs://www.1kat.cn/details.html?md=gcam";
}
var data=[
{u:'details.html?md=agctoolkit',zz:'<font size=1>BigKaka</font>',n:'<font size=1>AGC ToolKit</font>',note:'<font size=1>AGC工具包</font>'},
{u:'https://www.1kat.cn/patchs/p7.ptc',zz:'老K',n:'哈苏'},
{u:'https://www.1kat.cn/patchs/p8.ptc',zz:'老K',n:'拍立得'},
{u:'https://www.1kat.cn/patchs/p9.ptc',zz:'老K',n:'人像'},
{u:'https://www.1kat.cn/patchs/p10.ptc',zz:'老K',n:'富士c200'},
{u:'https://www.1kat.cn/patchs/p11.ptc',zz:'老K',n:'不列松'},
{u:'https://www.1kat.cn/patchs/p12.ptc',zz:'老K',n:'青橙'},
{u:'https://www.1kat.cn/patchs/p25.ptc',zz:'老K',n:'高饱和度'},
{u:'https://www.1kat.cn/patchs/p26.ptc',zz:'老K',n:'自然色彩'},
{u:'https://www.1kat.cn/patchs/p27.ptc',zz:'老K',n:'清新人像'},
{u:'https://www.1kat.cn/patchs/p28.ptc',zz:'老K',n:'压光夜景'},
{u:'https://www.1kat.cn/patchs/p29.ptc',zz:'老K',n:'人文街拍'},
{u:'https://www.1kat.cn/patchs/p30.ptc',zz:'老K',n:'CCD相机'},
{u:'https://www.1kat.cn/patchs/p31.ptc',zz:'老K',n:'风光旅拍'},
{u:'https://www.1kat.cn/patchs/p32.ptc',zz:'老K',n:'森山大道'},
{u:'https://www.1kat.cn/patchs/p33.ptc',zz:'老K',n:'lomo蓝黄'},
{u:'https://www.1kat.cn/patchs/p35.ptc',zz:'老K',n:'奶油糖果'},
{u:'https://www.1kat.cn/patchs/p36.ptc',zz:'老K',n:'暗调风格'},
{u:'https://www.1kat.cn/patchs/p37.ptc',zz:'老K',n:'电影胶片'},
{u:'https://www.1kat.cn/patchs/p1.ptc',zz:'老马',n:'柯达多彩'},
{u:'https://www.1kat.cn/patchs/p2.ptc',zz:'老马',n:'普罗维亚'},
{u:'https://www.1kat.cn/patchs/p3.ptc',zz:'老马',n:'生动创意'},
{u:'https://www.1kat.cn/patchs/p73.ptc',zz:'老马',n:'🌸春日花卉🌸'},
{u:'https://www.1kat.cn/patchs/p81.ptc',zz:'仙女',n:'卡色系:德味'},
{u:'https://www.1kat.cn/patchs/p82.ptc',zz:'仙女',n:'卡色系:卡色(暖)'},
{u:'https://www.1kat.cn/patchs/p83.ptc',zz:'仙女',n:'卡色系:卡色(冷)'},
{u:'https://www.1kat.cn/patchs/p84.ptc',zz:'仙女',n:'卡色系:漂影'},
{u:'https://www.1kat.cn/patchs/p85.ptc',zz:'仙女',n:'卡色系:浓烈'},
{u:'https://www.1kat.cn/patchs/p86.ptc',zz:'仙女',n:'卡色系:标色'},
{u:'https://www.1kat.cn/patchs/p34.ptc',zz:'仙女',n:'风光旅拍'},
{u:'https://www.1kat.cn/patchs/p96.ptc',zz:'山禾',n:'自然-Natural'},
{u:'https://www.1kat.cn/patchs/p97.ptc',zz:'山禾',n:'早春-Early Spring'},
{u:'https://www.1kat.cn/patchs/p98.ptc',zz:'山禾',n:'盛夏-Midsummer'},
{u:'https://www.1kat.cn/patchs/p99.ptc',zz:'山禾',n:'金秋-Golden Autumn'},
{u:'https://www.1kat.cn/patchs/p100.ptc',zz:'山禾',n:'寒冬-Cold Winter'},
{u:'https://www.1kat.cn/patchs/p101.ptc',zz:'山禾',n:'晨光-Morning light'},
{u:'https://www.1kat.cn/patchs/p102.ptc',zz:'山禾',n:'暮色-Twilight'},
{u:'https://www.1kat.cn/patchs/p13.ptc',zz:'鱼纨子',n:'柔润'},
{u:'https://www.1kat.cn/patchs/p14.ptc',zz:'鱼纨子',n:'明艳'},
{u:'https://www.1kat.cn/patchs/p15.ptc',zz:'鱼纨子',n:'暗夜'},
{u:'https://www.1kat.cn/patchs/p16.ptc',zz:'鱼纨子',n:'夜视'},
{u:'https://www.1kat.cn/patchs/p17.ptc',zz:'鱼纨子',n:'追风'},
{u:'https://www.1kat.cn/patchs/p18.ptc',zz:'鱼纨子',n:'色空'},
{u:'https://www.1kat.cn/patchs/p19.ptc',zz:'鱼纨子',n:'哈苏'},
{u:'https://www.1kat.cn/patchs/p20.ptc',zz:'鱼纨子',n:'松下'},
{u:'https://www.1kat.cn/patchs/p21.ptc',zz:'鱼纨子',n:'莱卡'},
{u:'https://www.1kat.cn/patchs/p22.ptc',zz:'鱼纨子',n:'人像'},
{u:'https://www.1kat.cn/patchs/p23.ptc',zz:'鱼纨子',n:'超清'},
{u:'https://www.1kat.cn/patchs/p24.ptc',zz:'鱼纨子',n:'标准'},
{u:'https://www.1kat.cn/patchs/p52.ptc',zz:'Mason騳',n:'德味₲₰⛎꒰ঌ🥏໒꒱'},
{u:'https://www.1kat.cn/patchs/p53.ptc',zz:'Mason騳',n:'夜景压光💫'},
{u:'https://www.1kat.cn/patchs/p54.ptc',zz:'Mason騳',n:'索尼₯Ⓜ️꒰ঌ📀໒꒱'},
{u:'https://www.1kat.cn/patchs/p55.ptc',zz:'Mason騳',n:'徕卡柔和🍀'},
{u:'https://www.1kat.cn/patchs/p56.ptc',zz:'Mason騳',n:'徕卡灵动🌿'},
{u:'https://www.1kat.cn/patchs/p57.ptc',zz:'Mason騳',n:'徕卡鲜艳🍓'},
{u:'https://www.1kat.cn/patchs/p58.ptc',zz:'Mason騳',n:'阿狄丽娜꒰ঌ💖໒꒱'},
{u:'https://www.1kat.cn/patchs/p59.ptc',zz:'Mason騳',n:'青色馏分🦋'},
{u:'https://www.1kat.cn/patchs/p60.ptc',zz:'Mason騳',n:'仿原相机꒰ঌ㊙️໒꒱'},
{u:'https://www.1kat.cn/patchs/p61.ptc',zz:'Mason騳',n:'安澜王◈帝ʚ😈ྀིɞ'},
{u:'https://www.1kat.cn/patchs/p62.ptc',zz:'Mason騳',n:'电影叙事🏂'},
{u:'https://www.1kat.cn/patchs/p63.ptc',zz:'Mason騳',n:'徕卡₪🎯꒰ঌ🌟໒꒱'},
{u:'https://www.1kat.cn/patchs/p64.ptc',zz:'Mason騳',n:'袖里乾坤୧⍤⃝🧿'},
{u:'https://www.1kat.cn/patchs/p65.ptc',zz:'Mason騳',n:'炫彩斑斓୧⍤⃝🍄'},
{u:'https://www.1kat.cn/patchs/p66.ptc',zz:'Mason騳',n:'龙象般若୧⍤⃝🌀'},
{u:'https://www.1kat.cn/patchs/p67.ptc',zz:'Mason騳',n:'苹果伽玛୧⍤⃝🍏'},
{u:'https://www.1kat.cn/patchs/p68.ptc',zz:'Mason騳',n:'仙山琼阁୧⍤⃝🖼️'},
{u:'https://www.1kat.cn/patchs/p69.ptc',zz:'Mason騳',n:'毒德蓝调୧⍤⃝💙'},
{u:'https://www.1kat.cn/patchs/p70.ptc',zz:'Mason騳',n:'伽玛₺₢♉꒰ঌ⚛️໒꒱'},
{u:'https://www.1kat.cn/patchs/p71.ptc',zz:'Mason騳',n:'往日时光꒰ঌ📽️໒꒱'},
{u:'https://www.1kat.cn/patchs/p72.ptc',zz:'Mason騳',n:'松下₨🅾️꒰ঌ📸໒꒱'},
{u:'https://www.1kat.cn/patchs/p74.ptc',zz:'Mason騳',n:'苹果派🍎'},
{u:'https://www.1kat.cn/patchs/p75.ptc',zz:'Mason騳',n:'SuperClear🏅'},
{u:'https://www.1kat.cn/patchs/p76.ptc',zz:'Mason騳',n:'苹果风🍏'},
{u:'https://www.1kat.cn/patchs/p77.ptc',zz:'Mason騳',n:'哈苏®🏅'},
/*
{u:'https://www.1kat.cn/patchs/p78.ptc',zz:'miiiifans',n:'Pure｜标准'},
{u:'https://www.1kat.cn/patchs/p79.ptc',zz:'miiiifans',n:'Pure｜人像'},
{u:'https://www.1kat.cn/patchs/p80.ptc',zz:'miiiifans',n:'Pure｜艳丽'},
{u:'https://www.1kat.cn/patchs/p87.ptc',zz:'miiiifans',n:'Pure｜德味'},
{u:'https://www.1kat.cn/patchs/p88.ptc',zz:'miiiifans',n:'Pure｜徕卡'},
{u:'https://www.1kat.cn/patchs/p89.ptc',zz:'miiiifans',n:'Pure｜东德'},
{u:'https://www.1kat.cn/patchs/p90.ptc',zz:'miiiifans',n:'Pure｜复古'},
{u:'https://www.1kat.cn/patchs/p91.ptc',zz:'miiiifans',n:'Pure｜黑白'},
{u:'https://www.1kat.cn/patchs/p92.ptc',zz:'miiiifans',n:'Pure｜青蓝'},
{u:'https://www.1kat.cn/patchs/p93.ptc',zz:'miiiifans',n:'Pure｜夜景'},
{u:'https://www.1kat.cn/patchs/p94.ptc',zz:'miiiifans',n:'Pure｜甜心'},
{u:'https://www.1kat.cn/patchs/p95.ptc',zz:'miiiifans',n:'Pure｜哈苏'},
*/
{u:'https://www.1kat.cn/patchs/p6.ptc',zz:'VIP吊炸天',n:'超级夜景'},
{u:'https://www.1kat.cn/patchs/p38.ptc',zz:'Ami',n:'Regular'},
{u:'https://www.1kat.cn/patchs/p39.ptc',zz:'Ami',n:'B&W'},
{u:'https://www.1kat.cn/patchs/p40.ptc',zz:'Ami',n:'Vibrant'},
{u:'https://www.1kat.cn/patchs/p41.ptc',zz:'Ami',n:'LDR'},
{u:'https://www.1kat.cn/patchs/p43.ptc',zz:'Ami',n:'Smooth'},
{u:'https://www.1kat.cn/patchs/p44.ptc',zz:'Ami',n:'Bright'},
{u:'https://www.1kat.cn/patchs/p45.ptc',zz:'Ami',n:'Pro'},
{u:'https://www.1kat.cn/patchs/p46.ptc',zz:'ArafathSensei94',n:'ꏿdslrꏿ'},
{u:'https://www.1kat.cn/patchs/p47.ptc',zz:'ArafathSensei94',n:'ꏿnatureꏿ'},
{u:'https://www.1kat.cn/patchs/p48.ptc',zz:'ArafathSensei94',n:'ꏿvividꏿ'},
{u:'https://www.1kat.cn/patchs/p49.ptc',zz:'ArafathSensei94',n:'ꏿnightꏿ'},
{u:'https://www.1kat.cn/patchs/p51.ptc',zz:'ArafathSensei94',n:'ꏿhumanꏿ'},
{u:'https://www.1kat.cn/patchs/p4.ptc',zz:'佚名',n:'极致青橙'},
{u:'https://www.1kat.cn/patchs/p5.ptc',zz:'佚名',n:'徕卡黑白'},
//{u:'https://www.1kat.cn/patchs/p50.ptc',zz:'佚名',n:'ꏿnatureꏿ'},
//{u:'https://www.1kat.cn/patchs/p42.ptc',zz:'佚名',n:'Night'},
];