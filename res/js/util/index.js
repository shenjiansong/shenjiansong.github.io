layui.define(['jquery','D','mm'], function (exports) {
	var index={
		categorys:[
			{text:"最新文章",href:'javascript:;'},
			{text:"后台文章",href:'javascript:;'},
			{text:"旅游杂记",href:'javascript:;'},
		],
		items:[
			{img:'res/img/sy_img1.jpg',title:'大型网站技术架构：摘要与读书笔记',type:'架构文章',isNew:1,url:'#',
			text:`花了几个晚上看完了《大型网站技术架构》这本书，个人感觉这本书的广度还行，
								深度还有些欠缺（毕竟只有200页左右）。但是作为一个缺乏大型网站技术的IT民工，看完一遍还是很有收获的，
								至少对一个网站的技术演进、需要解决的问题有了一个全面的认识。文中也有一些作者个人的心得、感悟、总结，我觉得还是很中肯的。`},
			
				{img:'res/img/sy_img1.jpg',title:'大型网站技术架构：摘要与读书笔记',type:'架构文章',isNew:1,url:'#',
				text:`花了几个晚上看完了《大型网站技术架构》这本书，个人感觉这本书的广度还行，
									深度还有些欠缺（毕竟只有200页左右）。但是作为一个缺乏大型网站技术的IT民工，看完一遍还是很有收获的，
									至少对一个网站的技术演进、需要解决的问题有了一个全面的认识。文中也有一些作者个人的心得、感悟、总结，我觉得还是很中肯的。`},
			{img:'res/img/sy_img1.jpg',title:'大型网站技术架构：摘要与读书笔记',type:'架构文章',isNew:0,url:'#',
			text:`花了几个晚上看完了《大型网站技术架构》这本书，个人感觉这本书的广度还行，
								深度还有些欠缺（毕竟只有200页左右）。但是作为一个缺乏大型网站技术的IT民工，看完一遍还是很有收获的，
								至少对一个网站的技术演进、需要解决的问题有了一个全面的认识。文中也有一些作者个人的心得、感悟、总结，我觉得还是很中肯的。`},
			{img:'res/img/sy_img1.jpg',title:'大型网站技术架构：摘要与读书笔记',type:'架构文章',isNew:0,url:'#',
			text:`花了几个晚上看完了《大型网站技术架构》这本书，个人感觉这本书的广度还行，
								深度还有些欠缺（毕竟只有200页左右）。但是作为一个缺乏大型网站技术的IT民工，看完一遍还是很有收获的，
								至少对一个网站的技术演进、需要解决的问题有了一个全面的认识。文中也有一些作者个人的心得、感悟、总结，我觉得还是很中肯的。`},
			{img:'res/img/sy_img1.jpg',title:'大型网站技术架构：摘要与读书笔记',type:'架构文章',isNew:0,url:'#',
			text:`花了几个晚上看完了《大型网站技术架构》这本书，个人感觉这本书的广度还行，
								深度还有些欠缺（毕竟只有200页左右）。但是作为一个缺乏大型网站技术的IT民工，看完一遍还是很有收获的，
								至少对一个网站的技术演进、需要解决的问题有了一个全面的认识。文中也有一些作者个人的心得、感悟、总结，我觉得还是很中肯的。`},
			{img:'res/img/sy_img1.jpg',title:'大型网站技术架构：摘要与读书笔记',type:'架构文章',isNew:0,url:'#',
			text:`花了几个晚上看完了《大型网站技术架构》这本书，个人感觉这本书的广度还行，
								深度还有些欠缺（毕竟只有200页左右）。但是作为一个缺乏大型网站技术的IT民工，看完一遍还是很有收获的，
								至少对一个网站的技术演进、需要解决的问题有了一个全面的认识。文中也有一些作者个人的心得、感悟、总结，我觉得还是很中肯的。`},
			{img:'res/img/sy_img1.jpg',title:'大型网站技术架构：摘要与读书笔记',type:'架构文章',isNew:0,url:'#',
			text:`花了几个晚上看完了《大型网站技术架构》这本书，个人感觉这本书的广度还行，
								深度还有些欠缺（毕竟只有200页左右）。但是作为一个缺乏大型网站技术的IT民工，看完一遍还是很有收获的，
								至少对一个网站的技术演进、需要解决的问题有了一个全面的认识。文中也有一些作者个人的心得、感悟、总结，我觉得还是很中肯的。`}
		],
		tempHtml:`
		<div class="cont w1000">
		    <div class="title">
		      <span class="layui-breadcrumb" lay-separator="|" >
			  {{# layui.each(d.categorys, function(index, item){ }}
			  			<a href="{{item.href}}"  {{#  if(!index){ }} class="active" {{# } }} >{{item.text}}</a>
			  {{# }); }}
		      </span>
		    </div>
		    <div class="list-item">
			{{# layui.each(d.items, function(index, item){ }}
		      <div class="item">
		        <div class="layui-fluid">
		           <div class="layui-row">
						<div class="layui-col-xs12 layui-col-sm4 layui-col-md5">
						  <div class="img"><img src="{{item.img}}" alt=""></div>
						</div>
						<div class="layui-col-xs12 layui-col-sm8 layui-col-md7">
						  <div class="item-cont">
							<h3>{{item.title}}{{# if(item.isNew){ }}<button class="layui-btn layui-btn-danger new-icon">new</button>{{# } }} </h3>
							<h5>{{item.type}}</h5>
							<p>{{item.text}}</p>
							<a href="{{item.url}}" class="go-icon"></a>
						  </div>
					  </div>
		           </div>
		         </div>
		      </div> 
			{{# }); }}
			</div>
		</div>`,
		showBanner:function(dom){
			var temp= layui.mm.renderHtml(layui.D.banner.tempHtml, layui.D.banner);
			//layui.$(temp).insertAfter(document.body.firstChild)
			layui.$(dom).html(temp);
		},
		show:function(dom){
			var temp= layui.mm.renderHtml(this.tempHtml, this);
			layui.$(dom).html(temp);
		}
	}
	exports('index', index)
});