layui.define(['jquery'], function (exports) {
	var D={
			header:{
				welcome:'.',
				logo:`https://z1.ax1x.com/2023/11/25/piwvMD0.png`,
				name:'玩者',
				url:'index.html',
				items:[
					{url:'index.html',icon:'fas fa-home',text:'首页'},
					{url:'details.html?md=wenzhang',icon:'fa fa-archive',text:'文章'},
					{url:'details.html?md=whisper',icon:'fa fa-tags',text:'微语'},
					{url:'details.html?md=leacots',icon:'fas fa-comments',text:'留言'},
					{url:'details.html?md=album',icon:'fas fa-address-book',text:'相册'},
					{url:'details.html?md=about',icon:'fas fa-user-circle',text:'关于'},
					{url:'details.html?md=links',icon:'fas fa-link',text:'导航'},
				],
				tempHtml:`<div class="header">
				  <div class="welcome-text">{{d.welcome}}</div>
				  <div class="menu-btn">
					<div class="menu"></div>
				  </div>
					<div class="logo">
						<a href="{{d.url}}">
							<img src="{{d.logo}}" class="logo-img" alt="LOGO"> 
							<span class="logo-span">{{d.name}}</span>
						</a>
					</div>
				  <div class="nav">
					  {{# layui.each(d.items, function(index, item){ }}
						<a href="{{item.url}}"><i class="{{item.icon}}"></i>{{item.text}}</a>
					  {{# }); }}
				  </div>
					<div class="layui-nav header-down-nav">
						<div class="header-down-top"><img src="{{d.logo}}" class="logo-img circle responsive-img"><div class="logo-name">{{d.name}}</div></div>
						<ul class="header-down-menu">
						{{# layui.each(d.items, function(index, item){ }}
						<li class="layui-nav-item"><a href="{{item.url}}"><i class="{{item.icon}}"></i>{{item.text}}</a></li>
						{{# }); }}
						</ul>
					</div>
					<div class="nav-overlay" style=" opacity: 1;"></div></div>`
		},
		banner:{
			bg:`https://7up.pics/images/2023/11/24/banner.jpeg`,
			title:``,//<h3>欢迎来到<br />刘启旺</h3><h4>博客空间</h4>
			tempHtml:`<div class="banner" style="background: url({{d.bg}}) no-repeat;background-position: center center;background-size: cover">
			  <div class="cont w1000">
			  {{#  if(d.title){ }} <div class="title">{{d.title}} </div> {{# } }}
				{{#  if(d.amount){ }}
					<div class="amount">
					  <p><span class="text">访问量</span><span class="access">1000</span></p>
					  <p><span class="text">日志</span><span class="daily-record">1000</span></p>
					</div>
				{{# } }}
			  </div>
			</div>`
		},
		footer:{
			// wx:`${X.img}/wx.jpg`,
			// mobile:'18888888888',
			Q群:'792609104',
			email:'1315112919@qq.com',
			tempHtml:`<div class="footer-wrap">
				<div class="footer w1000">
				{{#  if(d.wx){ }}<div class="qrcode"><img width="160px" src="{{d.wx}}"></div>{{# } }}
				  <div class="practice-mode">
					<div class="text">
					  <!--h4 class="title">如何联系</h4--!>
					  {{#  if(d.mobile){ }}<p>手机<span class="iphone">{{d.mobile}}</span></p>{{# } }}
					  {{#  if(d.qq){ }}<p>Q&nbsp;Q<span class="email">{{d.qq}}</span></p>{{# } }}
					  {{#  if(d.email){ }}<p>与我联系<span class="email">{{d.email}}</span></p>{{# } }}
					  <p><a  href="javascript:layui.D.privacy.show()">隐私策略<span class="txt">点击查看</span></a></p>
					</div>
				  </div>
				</div></div>`
		},
		privacy:{
			dom:null,
			tempHtml:`<div class="privacy"><div class='text'>	<h1>隐私政策</h1><hr />
<pre>
  1：信息收集：我们可能会收集您的个人信息，包括但不限于姓名、电子邮件地址、IP 地址等，用于提供更好的服务和用户体验。

  2：信息使用：您的个人信息可能会用于个性化广告投放、改善我们的产品和服务、以及与您沟通。我们不会出售或泄露您的个人信息。

  3：Cookie 和跟踪技术：我们的网站可能会使用 cookie 和其他跟踪技术来收集和存储您的信息，以提供个性化的广告和改善用户体验。

  4：第三方披露：在法律要求或为了保护我们的合法权益时，我们可能会与第三方分享您的个人信息。

  5：数据安全：我们会采取合理的安全措施来保护您的个人信息，防止未经授权的访问、使用或泄露。

  6：隐私权政策变更：我们可能会不时地更新我们的隐私权政策，更新后的政策将在本页面公布。

  7：同意条款：通过使用本网站，即表示您同意本隐私政策的条款和条件。
</pre></div>
<div class='buttons'><input type="button" onclick="layui.D.privacy.hide()" value="关闭"></div>
</div>`,
			show:function(){
				if(!this.dom){
					this.dom=layui.$(this.tempHtml);
					layui.$(document.body).append(this.dom);
				}else{
					this.dom.show();
				}
			},
			hide:function(){
				this.dom.hide();
			}
		}
	}
	exports('D', D)
});
