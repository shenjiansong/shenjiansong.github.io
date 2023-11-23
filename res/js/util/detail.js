
   layui.define(['jquery','D','mm'], function (exports) {
   	var detail={
		title:'',
		mdTxt:'',
		nextMd:'',
		preMd:'',
		createTime:'',
		name:'',
		initData:function(md){
			this.mdTxt=md.trim();
			var mdArr=this.mdTxt.split("\n");
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
   		show:function(dom){
			if(!layui.mm.param||!layui.mm.param.md){
				layui.$("#mkd").html("暂无内容");
				return ;
			}
			this.name=layui.mm.param.md;
			if(!this.name.toLowerCase().endsWith(".md"))this.name=this.name+'.md';
			let that=this;
			layui.mm.request({url:this.name,success:function(res){
					that.initData(res.trim());
					layui.$(dom).html(marked.parse(that.mdTxt));
					let blocks = document.querySelectorAll("pre code");
					blocks.forEach((block) => {
					  Prism.highlightElement(block);
					});
					layui.$(".layui-btn").on("click",that.goto);
					if(that.nextMd)layui.$(".btn-next").removeClass("layui-hide");
					if(that.preMd)layui.$(".btn-pre").removeClass("layui-hide");
			},dataType:'text'})
		},
		goto:function(dom){
			console.log(dom);
		}
	}
   	exports('detail', detail)
   });