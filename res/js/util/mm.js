
//封装ajax请求
layui.define(['jquery', 'element', 'laytpl', 'carousel', 'laypage'], function (exports) {
    var $ = layui.$, laytpl = layui.laytpl, element = layui.element, laypage = layui.laypage, carousel = layui.carousel;
    var _mm = {
        request: function (param) {
			if(typeof param ==='string')param={
				url:param,
				async:false
			}
            var param_data = param.data || '';
            if (param_data != '') {
                param_data = {"param": JSON.stringify(param_data) };
            }
			if(!param.dataType)param.dataType="json";
            var _this = this;
           return  $.ajax({
                type: param.type || 'get',
                url: param.url,
                dataType: param.dataType, 
                data: param_data,
				crossDomain: true,
                async: param.async || true,
                success: function (res) {
					if(param.dataType=="json"){
						// 请求成功
						if (200 === res.status) {
							typeof param.success === 'function' && param.success(res, res.message);
						}
						// 请求数据错误
						else {
							typeof param.error === 'function' && param.error(res.message);
						}
					}else{
						typeof param.success === 'function' && param.success(res);
					}
                },
                error: function (err) {
                    typeof param.error === 'function' && param.error(err.statusText);
                }
            });
        },
        renderHtml: function (htmlTemplate, data) {
            var template = laytpl(htmlTemplate),
                result = template.render(data);
            return result;
        }
    }
    exports('mm', _mm)
});