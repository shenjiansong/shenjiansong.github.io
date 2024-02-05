


function getHSLMatrix2(hue, saturation, luminance) {
	//var defaultHsl=[0, 0, 0.39215686274509803];
	var rgb=HSL2RGB([hue,saturation,luminance]);
	return [
        rgb[0]/255,0,0,0, 
        0,rgb[1]/255,0,0, 
        0,0,rgb[2]/255,0, 
        0,0,0,1,  
    ];
}
function getHSLMatrix(hue, saturation, luminance) {
    var c =  Math.cos(hue * Math.PI / 180.0);
    var s = Math.sin(hue * Math.PI / 180.0);
	var lumaR = 0.213;
	var lumaG = 0.715;
	var lumaB = 0.072;
	var oneMinusLumaR = 1.0 - lumaR;
	var oneMinusLumaG = 1.0 - lumaG;
	var oneMinusLumaB = 1.0 - lumaB;
	
	var rgb=HSL2RGB([hue,saturation*2,luminance+40]);
	
	// 设置矩阵参数
	var hslMatrix= [
	    (lumaR + oneMinusLumaR * c + lumaR * s)*(1+rgb[0]/255),
	    (lumaG - lumaG * c + lumaG * s)*(1+rgb[1]/255),
	    (lumaB - lumaB * c - oneMinusLumaB * s)*(1+rgb[2]/255),
	    0.0,
		
	    (lumaR - lumaR * c - oneMinusLumaR * s)*(1+rgb[0]/255),
	    (lumaG + oneMinusLumaG * c + lumaG * s)*(1+rgb[1]/255),
	    (lumaB - lumaB * c + lumaB * s)*(1+rgb[2]/255),
	    0.0,
		  
	    (lumaR - lumaR * c + lumaR * s)*(1+rgb[0]/255),
	    (lumaG - lumaG * c - oneMinusLumaG * s)*(1+rgb[1]/255),
	    (lumaB + oneMinusLumaB * c + lumaB * s)*(1+rgb[2]/255),
	    0.0,
		
	    0.0,
	    0.0,
	    0.0,
	    1.0
	];
	return hslMatrix;
	
}


function HSL2RGB(hsl) {
const h = (hsl[0]%360+360)  / 360;
const s = hsl[1] / 100;
const l = hsl[2] / 100;
let t2;
let t3;
let val;
if (s === 0) {
val = l * 255;
return [val, val, val];
}
if (l < 0.5) {
t2 = l * (1 + s);
} else {
t2 = l + s - l * s;
}
const t1 = 2 * l - t2;
const rgb = [0, 0, 0];
for (let i = 0; i < 3; i++) {
t3 = h + (1 / 3) * -(i - 1);
if (t3 < 0) {
t3++;
}
if (t3 > 1) {
t3--;
}
if (6 * t3 < 1) {
val = t1 + (t2 - t1) * 6 * t3;
} else if (2 * t3 < 1) {
val = t2;
} else if (3 * t3 < 2) {
val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
} else {
val = t1;
}
rgb[i] = val * 255;
}
return rgb;
}

function RGB2HSL(rgb) {
const r = rgb[0] / 255;
const g = rgb[1] / 255;
const b = rgb[2] / 255;
const min = Math.min(r, g, b);
const max = Math.max(r, g, b);
const delta = max - min;
let h;
let s;
if (max === min) {
h = 0;
} else if (r === max) {
h = (g - b) / delta;
} else if (g === max) {
h = 2 + (b - r) / delta;
} else if (b === max) {
h = 4 + (r - g) / delta;
}
h = Math.min(h * 60, 360);
if (h < 0) {
h += 360;
}
const l = (min + max) / 2;
if (max === min) {
s = 0;
} else if (l <= 0.5) {
s = delta / (max + min);
} else {
s = delta / (2 - max - min);
}
return [h, s * 100, l * 100];
}
