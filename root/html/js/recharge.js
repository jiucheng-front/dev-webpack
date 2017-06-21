/*
 * Created by songxia  on 2016/09/12.
 */

$(function () {
    'use strict';
	if(false){
		var data={
		    "ret_code": "0",
		    "ret_msg": "ok",
		    "balance": "500",
		    "gold_list": [
		        {
		            "cash": "30", //金额
		            "gold": "210", //获得浪花
		            "extra_gold": "0" //赠送浪花
		        },
		        {
		            "cash": "60",
		            "gold": "420",
		            "extra_gold": "0"
		        },
		        {
		            "cash": "150",
		            "gold": "1050",
		            "extra_gold": "105"
		        },
		        {
		            "cash": "300",
		            "gold": "2100",
		            "extra_gold": "210"
		        },
		        {
		            "cash": "590",
		            "gold": "4130",
		            "extra_gold": "413"
		        },
		        {
		            "cash": "1590",
		            "gold": "11130",
		            "extra_gold": "1113"
		        },
		        {
		            "cash": "5090",
		            "gold": "35630",
		            "extra_gold": "3563"
		        }
		    ]
		}
	}
	function getUserInfo() {
        var u = navigator.userAgent,
            app = navigator.appVersion;
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (isiOS==true) {
            //ios
            return JSON.parse(window.webkit.messageHandlers.langWeb2App_getCurUserInfo.postMessage());
        } else {
            //android
            return JSON.parse(javascriptinterface.langWeb2App_getCurUserInfo());
        }
    }
    var userInfo = getUserInfo();
    var domin="https://api.s.lang.live/";
	$.ajax({
		url:domain+'/v2/html/consumme/gold_order',
		// headers: { HTTP_USER_TOKEN:token, HTTP_USER_UID:pfid },
        type: 'POST',
		data:{"HTTP_USER_TOKEN":token, "HTTP_USER_UID":pfid},
		dataType:'json',
		success:function(data){
			console.log(data);
			if(data.ret_code === '0'){
				
				var html = '';
				for (var i = 0; i < data.gold_list.length; i++) {
					// html+='<li><div class="balanceNum">'+data.gold_list[i].gold+'浪花</div><p class="price">NT$<span>'+data.gold_list[i].cash+'</span></p>'+(data.gold_list[i].extra_gold!="0"?'<div class="present">+'+data.gold_list[i].extra_gold+'</div>':'')+'</li>';
					html += '<li> <img src="img/ic_langhua_nor@3x.png" /><span class="number-zs">'+data.gold_list[i].gold+(data.gold_list[i].extra_gold != "0" ? '+' + data.gold_list[i].extra_gold :' ')+'</span><a class="btn-placeOrder money-number color-purple pull-right">$<span class="cash">'+data.gold_list[i].cash+'</span></a></li>'
				}
				$('.recharge-body').html(html);
			}else{
				alert(data.ret_msg);
			}
		},
		error:function(xhr){
			console.log('error is:');
			console.log(xhr);
		}
	});
	
	
	
    $("#balance").text($balance);
	
    $('.recharge-body').on('click','a',doClick);
    function doClick (){
    	var $this = $(this);
        // var cash = $this.find('.cash')[0].innerHTML;
		var cash = 1;

        if(!/\d/.test($balance)) {
            return;
        }

        $('#cashHidden').val(cash);
        $('#recharegeForm').submit();
    }
});
