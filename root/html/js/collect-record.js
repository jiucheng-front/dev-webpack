$(function(){
	var $scrollBody = $(".scroll-content");
	$scrollBody.height($(window).height());
	var params = {
		size: 10 // 每页是100条
	};
	var result = bindScroll(
		$scrollBody, function () {
			//$("#row", $scrollBody).append('<div class="panel"><div class="panel-header panel-nav"><div class="panel-title">7/2016</div></div><div class="panel-body"><div class="media-list"><ul><li class="media-cell"><div class="media-object pull-left"><span class="media-object-data">06</span><span class="dashed"></span></div><div class="media-content pull-left" style="margin-top: 0;"><h4 class="pull-left">+980 钻石</h4><span class="media-content-arriva pull-right">已到账</span><span class="media-content-time">14:48</span></div></li></ul></div></div></div>');
			asyncLoadData(function (data) {
				console.log('data is ');
				console.log(data);
				if(data.list.length>0){
					var rowHtml = "";
					$(data.list).each(function (i,obj) {
						console.log(obj.stamp);
						if(month!=obj.month||year!=obj.year){
							month = obj.month;
							year = obj.year;
							rowHtml += '<div class="panel-header panel-nav"><div class="panel-title">'+month+'/'+year+'<span class="collect">可提現的余額'+obj.cash_left+'</span></div></div>';
						}
						rowHtml += '<div class="panel-body"><div class="media-list"><ul><li class="media-cell"><div class="media-object pull-left"><span class="media-object-data">'+obj.day+'</span></div><div class="media-content pull-left padding margin-bottom"><div class="gifts-list-detaile"><div class="pull-left margin-left"><h4 class="pull-left">'+obj.ch_name+'提現</h4><span class="media-content-time">'+obj.time+'</span></div><div class="pull-right"><div class="text-right"><span class="media-content-arriva">+'+obj.cash_left+'</span><span class="balance">余額:'+obj.cash_left+'</span></div></div></div></div></li></ul></div></div>'; });
						$('#row').append(rowHtml);
					// $('.scroll-preloader').html('<div class="preloader"></div>');
				}
				else{
					$('.scroll-preloader').html("已經全部顯示");
				}
			});
		}, params);
	//result.page//当前页
	params.totalElements = 1000; // 这是ajax回来的时候设置的.数据总数
	function asyncLoadData(callback) {
	    var header = {'typ': 'JWT', 'alg': 'HS256'};
	    header = JSON.stringify(header);
	    console.log(header);
		var len= 10; //当前页
		var stamp = 0;
		var include = 1;
		if(result.page>1){stamp = (result.page-1)*len-1;include = 0;}
	    var payload = {"stamp":stamp ,"len":len,"include":include};
		console.log(payload)
	    payload = JSON.stringify(payload)
	    var jwt = KJUR.jws.JWS.sign(null, header, payload, sKey);
	    console.log(jwt)
	
	    $.ajax({
	        url: domain+'v1/billing/cashier_history',
	        headers: {},
	        type: 'POST',
	        data: {"x":jwt,"access_token":access_token},
	        // jsonp: "callback",
	        // jsonpCallback:"jsonpCallback",
	        success: function(sJWS) {
				console.log('xxxx:'+sJWS);
				var isValid = KJUR.jws.JWS.verify(sJWS, sKey)
				if(isValid) {
					var a = sJWS.split(".");
					var uHeader = b64utos(a[0]);
					var uClaim = b64utos(a[1]);
					var pHeader = KJUR.jws.JWS.readSafeJSONString(uHeader);
					var pClaim = KJUR.jws.JWS.readSafeJSONString(uClaim);
					callback(pClaim)					
				}else {
					console.log('valid jws error');
				}
	        },
	        error: function(xhr) {
	            console.log('error is:')
	            console.log(xhr)
	        }
	    })
	}
	var month = 0;
	var year = 0;
	asyncLoadData(function (data) {
		console.log('data is ');
		console.log(data);

		if(data.list.length>0){
			var rowHtml = "";
			$(data.list).each(function (i,obj) {
				console.log(obj.stamp);
				if(month!=obj.month||year!=obj.year){
					month = obj.month;
					year = obj.year;
					rowHtml += '<div class="panel-header panel-nav"><div class="panel-title">'+month+'/'+year+'<span class="collect">可提現的余額'+obj.cash_left+'</span></div> </div>';
				}
				rowHtml += '<div class="panel-body"><div class="media-list"><ul><li class="media-cell"><div class="media-object pull-left"><span class="media-object-data">'+obj.day+'</span></div><div class="media-content pull-left padding margin-bottom"><div class="gifts-list-detaile"><div class="pull-left margin-left"><h4 class="pull-left">'+obj.ch_name+'提現</h4><span class="media-content-time">'+obj.time+'</span></div><div class="pull-right"><div class="text-right"><span class="media-content-arriva">+'+obj.cash+'</span><span class="balance">余額:'+obj.cash_left+'</span></div></div></div></div></li></ul></div></div>';
			});
			$('#row').append(rowHtml);
		}
		else{
			$('#row').append('<div class="no-data">暫無數據</div>');
		}
	});
});