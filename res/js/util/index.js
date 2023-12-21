layui.define(['jquery','D','mm'], function (exports) {
	var index={
		categorys:[
			{text:"最新文章",href:'javascript:;'},
			{text:"后台文章",href:'javascript:;'},
			{text:"旅游杂记",href:'javascript:;'},
		],
		items:[
			{img:'https://7up.pics/images/2023/12/21/1384cfc555a3aaf75.jpeg',title:'谷歌相机：不同品牌手机如何选择谷歌相机',type:'使用说明',isNew:1,url:'./details.html?md=gcam001',
			text:`之所有有这么多版本，是因为谷歌的安全机制限制了APP不受限制的获取镜头，
android有个白名单策略，只有在白名单中的APP，才能获取到所有的镜头，
比如Oppo手机，抖音这个应用就在白名单里面，所以下载包名为抖音的APP，
就能获取所有镜头。不过小米系统禁用了这个安全策略，所以可以不受限制。
因此这里每个版本都是可以使用的，区别在于能否获取到长焦镜头。`},
			
				{img:'https://7up.pics/images/2023/12/21/19a9f89b95fc90cc6.jpeg',title:'谷歌相机：百度网盘如何快速下载谷歌相机',type:'使用说明',isNew:1,url:'./details.html?md=gcam002',
				text:`由于不同百度网盘提示不一样，仔细阅读提示信息，找到关键字"缓存",进行缓存操作，不是下载
						我目前版本点击之后直接缓存，入下图，下载速度是拉满的`},
			
			{img:'https://7up.pics/images/2023/12/21/peizhi.jpeg',title:'谷歌相机：关于配置项的操作',type:'使用说明',isNew:0,url:'./details.html?md=gcam003',
			text:` 谷歌相机的配置项包括曝光补偿、白平衡、HDR+、人像模式等。曝光补偿可调整亮度水平，白平衡用于处理色彩温度，HDR+提供更高动态范围，而人像模式则专注于拍摄人物肖像。这些配置项使用户能够根据不同场景需求进行个性化设置，获得更逼真、清晰的照片效果。同时，谷歌相机还支持手动模式，让用户更灵活地控制光圈、快门速度等参数，满足摄影爱好者的专业需求。`},
			
			{img:'https://7up.pics/images/2023/12/21/lib.jpeg',title:'谷歌相机：关于库存(lib)的操作',type:'使用说明',isNew:0,url:'./details.html?md=gcam004',
			text:`谷歌相机的 lib 库是一组重要的模块，提供了图像处理、计算机视觉和深度学习功能。这个库包含了许多先进的算法和技术，如图像去模糊、智能场景识别、人像模式等。通过利用这些功能，谷歌相机能够实现更高质量的图像捕捉和处理，为用户带来更出色的拍摄体验。同时，lib 库也为开发者提供了强大的工具，使他们能够定制和优化相机功能，为用户提供更多创新和便利。`},
			
			{img:'https://7up.pics/images/2023/12/21/watermark.jpeg',title:'谷歌相机：关于水印设置的操作',type:'使用说明',isNew:0,url:'./details.html?md=gcam005',
			text:`在摄影中，水印可用于保持照片的平衡。通过巧妙设计和放置水印，摄影师可以在照片中引导观众的注意力，使画面更加平衡和谐。适当的水印不仅能够为照片增添视觉元素，还能在一定程度上修饰画面构图，提升整体美感。然而，过度显眼或不合适的水印可能会分散观众注意力，因此需要在保护版权和保持画面平衡之间取得平衡。综合而言，水印在摄影中发挥着保持照片平衡的重要作用。`},
			
			{img:'https://7up.pics/images/2023/12/21/lut.jpeg',title:'谷歌相机：关于LUT预览的操作',type:'使用说明',isNew:0,url:'./details.html?md=gcam007',
			text:`LUT 的全称是 Look Up Table，翻译成中文是查找表的意思，相当于一个离散函数，给一个输入值，通过查找表来得到一个输出值。查找表可以用于很多地方，在调色领域称为颜色查找表，颜色查找表有三个分量R、G、B，
文中把输入分量根据对照表输出转换后分量。输入输出呈一一对应关系，系统根据查找表中的对应关系为每一个输入值查找到输出值，从而完成颜色的转换。。`}
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