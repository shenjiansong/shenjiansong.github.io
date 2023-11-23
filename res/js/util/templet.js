
layui.define(['D','mm', 'jquery'], function (exports) {
    var $ = layui.$, mm = layui.mm,data=layui.D;
    var templet = {
		init:function(){
			this.initHeader();
			this.initFooter();
		},
		initHeader:function(){
			var temp= mm.renderHtml(data.header.tempHtml, data.header);
			$(document.body).prepend(temp);
			$('.menu').on('click', function () {
				if ($(this).hasClass('on')) {
					$(this).removeClass('on')
					$('.header-down-nav').removeClass('layui-show');
				} else {
					$(this).addClass('on')
					$('.header-down-nav').addClass('layui-show');
					$('.nav-overlay').show();
					$("body").css("overflow","hidden")
				}
			});
			$(window).scroll(function(e,a,b) {
			  if($(window).scrollTop()>3&&!$(".header").hasClass("header-nottop")){
				  $(".header").addClass("header-nottop");
			  }else if($(window).scrollTop()<=3){
				  $(".header").removeClass("header-nottop");
			  }
			});
			$('.nav-overlay').on('click', function () {
				$('.menu').removeClass('on')
				$('.header-down-nav').removeClass('layui-show');
				$('.nav-overlay').hide();
				$("body").css("overflow","auto")
			});
			window.onresize = function () {
				var curwidth = document.documentElement.clientWidth;
				if (curwidth > 760) {
					$('.header-down-nav').removeClass('layui-show');
					$('.menu').removeClass('on');
				}
			};
		},
		initFooter:function(){
			var temp= mm.renderHtml(data.footer.tempHtml, data.footer);
			$(document.body).append(temp);
		}
    }
    exports('templet', templet)
});