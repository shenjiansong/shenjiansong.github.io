
function curve(renderTo,_size,callBack){
	var onChanged=callBack;
	var drawFrequency=50;
	var render=null;
	if(typeof renderTo=="string" || typeof renderTo.length == "undefined")render=$(renderTo);
	else render=renderTo;
	var size=0;  
	if(_size && _size>10)size=_size;
	else{
		size=Math.min(render.height(),render.width());
	}
	var colorBlockSize=size/10;
	var base=[[0,0],[1,1]];  
	var div=$("<div></div>");
	var canvas=document.createElement("canvas");
	canvas.width=size; 
	canvas.height=size;  
	$(canvas).attr("style","background-color:#71717159;")
	div.width(size+colorBlockSize*1.2);
	div.attr("style","display:flex;");
	var colordiv=$("<div></div>"); 
	colordiv.width(colorBlockSize*1.2);
	colordiv.height(size);
	colordiv.append(getColorDivBlock("#fff","call"));
	colordiv.append(getColorDivBlock("red","cred"));
	colordiv.append(getColorDivBlock("green","cgreen"));
	colordiv.append(getColorDivBlock("blue","cblue"));
	colordiv.append("<br />");
	colordiv.append(getColorDivBlock("","fa fa-undo undo1"));
	colordiv.append(getColorDivBlock("","fa fa-sync undoall"));
	colordiv.on("click",selectColor);
	div.append(colordiv);
	div.append(canvas);
	render.append(div);
	var ctx = canvas.getContext('2d');
	var curves={
			 all:[[0,0],[1,1]],
			 red:[[0,0],[1,1]], 
			 green:[[0,0],[1,1]],
			 blue:[[0,0],[1,1]]
	}
	var nowColor="all";
	var points=curves[nowColor];
	var nowPointIndex=-1;
	var  drawTiger=-1;
	
	function getColorDivBlock(color,classname){
		var divBlock=$("<div></div>");
		if(classname){
			divBlock.addClass(classname);
		}
		divBlock.attr("style","color:#fff;font-size:1.6rem;margin-bottom:0.6rem;border-radius:2rem; width:100%;height:12.5%;");
		if(color){
			divBlock.attr("style",divBlock.attr("style")+"background-color:"+color+";");
		}
		return divBlock;
	}

	
	function clear(){
		ctx.clearRect(0, 0, canvas.width, canvas.height)
	}
	function getPoint(e){
		let x=e.originalEvent.changedTouches[0].pageX-canvas.offsetLeft;
		let y=e.originalEvent.changedTouches[0].pageY-canvas.offsetTop;
		x=x<0?0:x; 
		x=x>size?size:x;
		y=y<0?0:y; 
		y=y>size?size:y;
		x=x/size;
		y=1-y/size;
		if(nowPointIndex>0){
			var x1=points[nowPointIndex-1][0];
			var x2=points[nowPointIndex+1][0];
			if(x<x1+0.05)x=x1+0.05;
			if(x>x2-0.05)x=x2-0.05;
		}
		return  [x,y];
	}
	function distance(p1,p2){
		var x=Math.abs( p1[0]-p2[0] );
		var y=Math.abs( p1[1]-p2[1] );
		return Math.sqrt(x*x+y*y);
	}
	function drawLine(p1,p2,color){
		if(!color)color="#d2c7c733";
		var point1 = { left: p1[0]*size, top: ( 1-p1[1])*size  };//第一个点
		var point2 = { left: p2[0]*size, top: ( 1-p2[1])*size  };//第二个点
	
		ctx.beginPath();
		ctx.moveTo(point1.left, point1.top);//起始位置
		ctx.lineTo(point2.left, point2.top);//停止位置
		ctx.strokeStyle=color;
		ctx.stroke();
	}
	function drawPoint(p,r,color){
		if(!color)color='#1c86d1';
		if(!r)r=10;
		var point1 = { left: p[0]*size, top: ( 1-p[1])*size  };//第一个点
		ctx.beginPath();
		ctx.strokeStyle =color;
		//从150,150的位置为圆心，50为半径，画一个从0-2π的圆
		ctx.arc(point1.left,point1.top,r,0,2*Math.PI);
		ctx.stroke();
	}
	function draw(){
		clear();
		// drawLine([1/3,0],[1/3,1]);
		// drawLine([2/3,0],[2/3,1]);
		
		// drawLine([0,1/3],[1,1/3]);
		// drawLine([0,2/3],[1,2/3]);
		
		for(var i=1;i<=4;i++){
			drawLine([i/4,0],[i/4,1]);
			drawLine([0,i/4],[1,i/4]);
		}
		
		
		
		for(var att in curves){
			const dpoints=curves[att];
			var dColor=(att=="all"?"#fff":att)
			if(att=="red"){
				dColor="#f00"
			}else if(att=="green"){
				dColor="#0f0"
			}else if(att=="blue"){
				dColor="#00f"
			}
			if(att==nowColor){
				dColor=dColor+"f";
			}else{
				dColor=dColor+"4";
			}
			for(var i=0;i<dpoints.length-1 ;i++){
				drawLine(dpoints[i],dpoints[i+1],dColor);
				if(i!=dpoints.length-2)drawPoint(dpoints[i+1],10,dColor);
			}
		}
		
		setNowPoint();
	}
	function selectColor(e){
		if($(e.target).hasClass("call")){
			nowColor="all";
			points=curves[nowColor];
		}else if($(e.target).hasClass("cred")){
			console.log("红")
			nowColor="red";
			points=curves[nowColor];
		}else if($(e.target).hasClass("cgreen")){
			console.log("绿")
			nowColor="green";
			points=curves[nowColor];
		}else if($(e.target).hasClass("cblue")){
			console.log("蓝")
			nowColor="blue";
			points=curves[nowColor];
		}else if($(e.target).hasClass("undo1")){
			console.log("取消当前点:"+lastStartPointIndex,points)
			if(lastStartPointIndex<=0||lastStartPointIndex>=points.length-1){
				if(points.length<3)return;
				lastStartPointIndex=points.length-2;
			}
			points.splice(lastStartPointIndex, 1);
			setNowPoint();
		}else if($(e.target).hasClass("undoall")){
			console.log("取消全部点")
			points=[[0,0],[1,1]];
			setNowPoint();
		}
		draw();
	}
	
	function setNowPoint(){
		curves[nowColor]=points;
		if(typeof onChanged=="function"){
			onChanged(nowColor,curves);
		}
	} 
 
	var lastStartPointIndex=-1;
	var lastStartPoint=null;
		$(canvas).on("touchstart",function(e){
			lastStartPoint=getPoint(e);
			nowPointIndex = -1; 
			startDraw();
		});
		$(canvas).on("touchend",function(e){
			stopDraw();
			nowPointIndex=-1;
			setNowPoint();
		});
		$(canvas).on("touchmove",function(e){
			var p=getPoint(e);
			if(nowPointIndex>0 && isDrawIng){
				points[nowPointIndex]=p;
			}else if(lastStartPoint && distance(lastStartPoint,p)>0.05){
				for(var i=0;i<points.length;i++){
					if(distance(lastStartPoint,points[i])<0.1){
						points[i]=lastStartPoint;
						nowPointIndex = i;
						break;
					}
				}
				if(nowPointIndex==-1){
					for(var i=0;i<points.length;i++){
						 if(points[i][0]>lastStartPoint[0]){
							points.splice(i, 0, lastStartPoint);
							nowPointIndex = i;
							break;
						 }
					}
				}
				lastStartPointIndex=nowPointIndex;
				lastStartPoint=null;
			}
		    
		});
		var isDrawIng=false;
		function startDraw(){
			drawTiger=setInterval(function(){
				draw();
				isDrawIng=true;
			},drawFrequency);
			
		}
		function stopDraw(){
			clearInterval(drawTiger);
			isDrawIng=false;
		}
		
		draw();
		
		
		
		this.getCurves=function (){
			return curves;
		}
		
		this.toGpuImageFilter=function(){
			var filter={
				c:{
					name:"GPUImageToneCurveFilter"
				},
				m:{}
			}
			for(var att  in curves){
				var ps=[]
				var curObj=curves[att];
				if( !curObj || curObj.length<=2 ) continue;
				for(var  i=0;i<curObj.length;i++){
					ps.push(curObj[i].join(","));
				}
				if(att=="all"){
					filter.m["setRgbCompositeControlPoints"]=[ps.join(";")];
				}else if(att=="red"){
					filter.m["setRedControlPoints"]=[ps.join(";")];
				}else if(att=="green"){
					filter.m["setGreenControlPoints"]=[ps.join(";")];
				}else if(att=="blue"){
					filter.m["setBlueControlPoints"]=[ps.join(";")];
				}
		
			}
			if(JSON.stringify(filter.m).length<10)return null;
			return filter;
		}
		
		this.fromGpuImageFilter=function(filter){
			if(typeof filter==="string")filter=JSON.parse(filter);
			curves={
					 all:[[0,0],[1,1]],
					 red:[[0,0],[1,1]], 
					 green:[[0,0],[1,1]],
					 blue:[[0,0],[1,1]]
			};
			for(var att in filter.m){
				var v=filter.m[att];
				if(v && v.length==1 && typeof v=="object")v=v[0];
				var vs=v.split(";");
				var arr=[];  
				for(var i=0;i<vs.length;i++){
					arr.push(vs[i].split(","));
				}
				if(att==="setRgbCompositeControlPoints"){
					curves["all"]=arr;
				}else if(att==="setRedControlPoints"){
					curves["red"]=arr;
				}else if(att==="setGreenControlPoints"){
					curves["green"]=arr;
				}else if(att==="setBlueControlPoints"){
					curves["blue"]=arr;
				}
			}
			points=curves[nowColor];
			draw();
			
		}
		
		this.setChanged=function(_callBack){
			onChanged=_callBack;
		}
		this.clearAll=function(){
			curves={
					 all:[[0,0],[1,1]],
					 red:[[0,0],[1,1]], 
					 green:[[0,0],[1,1]],
					 blue:[[0,0],[1,1]]
			}
			points=curves[nowColor];
			draw();
		}
}