
   X.getLayUi().define(['jquery','D','mm'], function (exports) {
   	var detail={
		title:'',
		mdTxt:'',
		nextMd:'',
		preMd:'',
		createTime:'',
		name:'',
		render:null,
		initData:function(md){
			this.mdTxt=md.trim();
			var mdArr=this.mdTxt.split("\n");
			this.title=null;
			this.createTime=null;
			this.nextMd=null;
			this.preMd=null;
			for(var i=0;i<Math.min(10,mdArr.length);i++){
				var tmp=mdArr[i].trim();
				if(tmp.startsWith("<!--")&&tmp.endsWith("-->")){
					tmp=tmp.substring(4,tmp.length-3).trim();
					tmp=tmp.split(":");
					if(tmp[0].trim()=="title"&&tmp.length==2)this.title=tmp[1].trim();
					if(tmp[0].trim()=="next"&&tmp.length==2)this.nextMd=tmp[1].trim();
					if(tmp[0].trim()=="pre"&&tmp.length==2)this.preMd=tmp[1].trim();
					if(tmp[0].trim()=="date"&&tmp.length==2)this.createTime=tmp[1].trim();
				}
			}
		},
   		show:function(dom,md,callback){
			this.render=dom;
			this.name=md||X.PARAM.md;
			if(!this.name){
				layui.$("#mkd").html("暂无内容");
				return ;
			}
			if(!this.name.toLowerCase().endsWith(".md"))this.name=this.name+'.md';
			let that=this;
			layui.mm.request({url:X.md+'/'+this.name,success:function(res){
					that.initData(res.trim());
					layui.$(that.render).html(marked.parse(that.mdTxt));
					let blocks = document.querySelectorAll("pre code");
					blocks.forEach((block) => {
					  Prism.highlightElement(block);
					});
					that.initBtn();
					if(typeof callback=='function')callback();
			},dataType:'text'})
		},
		initBtn:function(){
			if(this.nextMd)layui.$(".btn-next").removeClass("layui-hide");
			else if(!layui.$(".btn-next").hasClass("layui-hide"))layui.$(".btn-next").addClass("layui-hide");
			if(this.preMd)layui.$(".btn-pre").removeClass("layui-hide");
			else if(!layui.$(".btn-pre").hasClass("layui-hide"))layui.$(".btn-pre").addClass("layui-hide");
		},
		btnClick:function(e){
			let nowName=this.name;
			let that=this;
			var calbk=function(){
				if(!that.preMd)that.preMd=nowName;
				that.initBtn();
			}
			if(e.target.className.indexOf("btn-pre")>-1){
				this.show(this.render,this.preMd,calbk);
			}else if(e.target.className.indexOf("btn-next")>-1){
				this.show(this.render,this.nextMd,calbk);
			}
		}
	}
	
	layui.$(".layui-btn").on("click",function(e){detail.btnClick(e) ;} );
   	exports('detail', detail)
   });