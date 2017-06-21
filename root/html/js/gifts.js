	var myScroll, pageDamind = 1, pageSun = 1, len = 40, stamp = 0, include = 1, index=0;
	var damindContainer = $(".damindTab"), sunContainer = $(".sunTab");
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
    touch.on(".tabTitle li","tap",function(){
        _this = $(this);
        _this.addClass('currentTab').siblings().removeClass('currentTab');
        index = $(this).index();

        $(".tabCon").eq(index).show().siblings('.tabCon').hide();

//      myScroll.scrollTo(0, 0);
        myScroll.refresh();
    });
    
    function SafeAjax(url,callback,pageList) {
    	
        if (pageList > 1) { stamp = (pageList - 1) * len - 1; include = 0; }

        $.ajax({
            url: domain + url,
            dataType:'json',
            type: 'POST',
            data: {"HTTP_USER_TOKEN":token, "HTTP_USER_UID":pfid, "stamp": stamp, "len": len, "include": include },
            success: function (data) { 
            	callback(data);
            },
            error: function (ex) { console.log("error is :" + JSON.stringify(ex)) }
        })
    }
    
    
    // 第一次拉取数据
    
    function renderRank(container,data,flag){
    	var day = 0;
        var monthtotal = 0;
        var month = 0;
    	var year = 0;
        if (data.list.length > 0) {
            var rowHtml = "";
            $(data.list).each(function (i, obj) {
                if (month != obj.month || year != obj.year) {
                    month = obj.month;
                    year = obj.year;
                    $(data.month_summary).each(function (i, monthobj) {
                        var _month = obj.year + PrefixInteger(obj.month, 2);
                        if (_month == monthobj.month.replace('-', '')) {
                            monthtotal = monthobj.total
                        }
                    });
                    if (i > 0) {
                        rowHtml += '</div></li></ul></div></div>';
                    }
                    rowHtml += '<div class="panel-header panel-nav panel-title" data-month="' + obj.year + PrefixInteger(obj.month, 2) + '">' + year + '/' + month + '<a href="javascript:void(0);"><i class="arrow-up"></i></a><span class="collect">'+ (flag == "0"?"賺取:":"獲取：") + monthtotal + (flag == "0"?"鑽石":"陽光值")+'</span></div>';
                }
                var daytotal = 0;
                $(data.day_summary).each(function (i, dayobj) {
                    var _day = obj.year + PrefixInteger(obj.month, 2) + PrefixInteger(obj.day, 2);
                    if (_day == dayobj.day.replace(/-/g, '')) {
                        daytotal = dayobj.total;
                    }
                });
                var thisday = obj.year + PrefixInteger(obj.month, 2) + PrefixInteger(obj.day, 2);
                if (thisday != day) {
                    console.log();
                    if (i > 0) {
                        rowHtml += '</div></li></ul></div></div>';
                    }
                    rowHtml += '<div class="panel-body" data-month="' + obj.year + PrefixInteger(obj.month, 2) + '"><div class="media-list"><ul><li class="media-cell"><div class="media-object pull-left"><span class="media-object-data">' + obj.day + '</span></div>';
                    rowHtml += '<div class="media-content pull-left padding margin-bottom"><div class="collect-title">'+ (flag == "0"?"賺取:":"獲取：")+ daytotal + (flag == "0"?"鑽石":"陽光值")+ '</div><div class="gifts-list-detaile"><div class="head-pto pull-left"><img src="' + obj.headimg + '"></div><div class="pull-left margin-left"><h4 class="pull-left">' + obj.nickname + '</h4><span class="media-content-time">' + obj.time + '</span></div><div class="pull-right"><div class="text-right"><span class="media-content-arriva">X' + obj.prod_cnt + '</span><span class="balance">' + obj.prod_name + '(<img src="'+(flag == "0"?"img/img_gift_diamond.png":"img/ic_linesun.png")+' "/>' + obj.prod_price + ')</span></div></div></div>';
                }
                else {
                    rowHtml += '<div class="gifts-list-detaile"><div class="head-pto pull-left"><img src="' + obj.headimg + '"></div><div class="pull-left margin-left"><h4 class="pull-left">' + obj.nickname + '</h4><span class="media-content-time">' + obj.time + '</span></div><div class="pull-right"><div class="text-right"><span class="media-content-arriva">X' + obj.prod_cnt + '</span><span class="balance">' + obj.prod_name + '(<img src="'+(flag == "0"?"img/img_gift_diamond.png":"img/ic_linesun.png")+' "/>' + obj.prod_price + ')</span></div></div></div>';
                }
                day = obj.year + PrefixInteger(obj.month, 2) + PrefixInteger(obj.day, 2);
            });

            container.append(rowHtml);
            myScroll.refresh();
        }
        else {
            container.append('<div class="no-record-content"><img src="img/noneRecord.png" class="no-record"/><div>暫無收禮記錄哦!</div></div>');
        }
    }
    // 上划加载数据
    function elseRender(container,data,flag){
        var day = 0;
        var monthtotal = 0;
        var month = 0;
    	var year = 0;
        console.log('data is ');
        console.log(data);
        if (data.list.length > 0) {
        	$(".loading").hide();
            var rowHtml = "";
            $(data.list).each(function (i, obj) {
                if (month != obj.month || year != obj.year) {
                    month = obj.month;
                    year = obj.year;
                    day = obj.day;
                    $(data.month_summary).each(function (i, monthobj) {
                        var _month = obj.year + PrefixInteger(obj.month, 2);
                        if (_month == monthobj.month.replace('-', '')) {
                            monthtotal = monthobj.total
                        }
                    });
                    rowHtml += '<div class="panel-header panel-nav panel-title" data-month="' + obj.year + PrefixInteger(obj.month, 2) + '">' + year + '/' + month + '<a href="javascript:void(0);"><i class="arrow-up"></i></a><span class="collect">'+ (flag == "0"?"賺取:":"獲取：") + monthtotal + (flag == "0"?"鑽石":"陽光值")+'</span></div>';
                }
                var daytotal = 0;
                $(data.day_summary).each(function (i, dayobj) {
                    var _day = obj.year + PrefixInteger(obj.month, 2) + PrefixInteger(obj.day, 2);
                    if (_day == dayobj.day.replace(/-/g, '')) {
                        daytotal = dayobj.total;
                    }
                });
                var thisday = obj.year + PrefixInteger(obj.month, 2) + PrefixInteger(obj.day, 2);
                if (thisday != day) {
                    console.log();
                    if (i > 0) {
                        rowHtml += '</div></li></ul></div></div>';
                    }
                    rowHtml += '<div class="panel-body" data-month="' + obj.year + PrefixInteger(obj.month, 2) + '"><div class="media-list"><ul><li class="media-cell"><div class="media-object pull-left"><span class="media-object-data">' + obj.day + '</span></div>';
                    rowHtml += '<div class="media-content pull-left padding margin-bottom"><div class="collect-title">'+ (flag == "0"?"賺取:":"獲取：") + daytotal + (flag == "0"?"鑽石":"陽光值")+'</div><div class="gifts-list-detaile"><div class="head-pto pull-left"><img src="' + obj.headimg + '"></div><div class="pull-left margin-left"><h4 class="pull-left">' + obj.nickname + '</h4><span class="media-content-time">' + obj.time + '</span></div><div class="pull-right"><div class="text-right"><span class="media-content-arriva">X' + obj.prod_cnt + '</span><span class="balance">' + obj.prod_name + '(<img src="'+(flag == "0"?"img/img_gift_diamond.png":"img/ic_linesun.png")+' "/>' + obj.prod_price + ')</span></div></div></div>';
                }
                else {
                    rowHtml += '<div class="gifts-list-detaile"><div class="head-pto pull-left"><img src="' + obj.headimg + '"></div><div class="pull-left margin-left"><h4 class="pull-left">' + obj.nickname + '</h4><span class="media-content-time">' + obj.time + '</span></div><div class="pull-right"><div class="text-right"><span class="media-content-arriva">X' + obj.prod_cnt + '</span><span class="balance">' + obj.prod_name + '(<img src="'+(flag == "0"?"img/img_gift_diamond.png":"img/ic_linesun.png")+' "/>' + obj.prod_price + ')</span></div></div></div>';
                }
                day = obj.year + PrefixInteger(obj.month, 2) + PrefixInteger(obj.day, 2);
            });
            container.append(rowHtml);
            myScroll.refresh();
        }else {
        	if(index==0){
        		$(".daimindNoRecord").show();
        		$(".daimindNoRecord .loadingImg").hide();
        		$(".daimindNoRecord").html('沒有更多了!')
        	}else if(index==1){
        		$(".sunNoRecord").show();
        		$(".sunNoRecord .loadingImg").hide();
        		$(".sunNoRecord").html('沒有更多了!')
        	}
        }
	}
    
	
    
    // 第一次加载数据
    var daimindContainer = $("#damindRow"),  sunContainer = $("#sunRow");
    SafeAjax("v2/html/consumme/get_in_history_h5",
    	function (data){
    		$(".frontLoading").hide();
    		console.log("收礼记录：");
    		console.log(data);
    		renderRank(daimindContainer,data,0);
    		myScroll.refresh();
    	},
    	pageDamind
    );
    SafeAjax("v2/html/consumme/get_in_sun_history_h5",
    	function (data){
    		console.log("阳光纪录：")
    		console.log(data);
    		renderRank(sunContainer,data,1);
    		myScroll.refresh();
    	},
    	pageSun
    );
    
    // 上拉加载
	function elseRecord(action,pageList){
		if(action == 0){
			SafeAjax("v2/html/consumme/get_in_history_h5",
		    	function (data){
		    		elseRender(daimindContainer,data,0);
		    		myScroll.refresh();
		    	},
		    	pageDamind
		    );
            flagDamind = true;
		}else if(action == 1){
			SafeAjax("v2/html/consumme/get_in_sun_history_h5",
		    	function (data){
		    		elseRender(sunContainer,data,1);
		    		myScroll.refresh();
		    	},
		    	pageSun
		    );
            flagSun = true;
		}
	}
    
    var flagDamind = true, flagSun = true;
    
    function loaded () {
		myScroll = new IScroll('#page-content', { probeType: 3, mouseWheel: true, click: true });
	
		myScroll.on("slideUp",function(){
			if(this.maxScrollY - this.y > 5){
				if(index == 0){
					$(".damindTab .loading").show();
               		myScroll.refresh();
				}else if(index == 1){
					$(".sunTab .loading").show();
               		myScroll.refresh();
				}
				
				setTimeout(function(){
					if(index == 0){
						if(flagDamind){
							flagDamind = false;
							pageDamind++;
		        			elseRecord(index,pageDamind);
		        			myScroll.refresh();
						}
		        	}else if(index == 1){
		        		if(flagSun){
		        			flagSun = false;
		        			pageSun++;
		        			elseRecord(index,pageSun);
		        			myScroll.refresh();
		        		}
		        	}
				},100);
			}
		});
	}
    
	function PrefixInteger(num, n) {
	    return (Array(n).join(0) + num).slice(-n);
	}
