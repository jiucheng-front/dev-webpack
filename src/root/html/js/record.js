	var myScroll, page = 1, len = 10, stamp = 0, include = 1;
	
	function elseRender(result){
        var data=result.data;
        if (data.list.length > 0) {
        	$(".loading").hide();
            var rowHtml = "";
            $(data.list).each(function (i, obj) {
                console.log(obj.stamp);
                if (month != obj.month || year != obj.year) {
                    month = obj.month;
                    year = obj.year;
                    rowHtml += '<div class="panel-header panel-nav"> <div class="panel-title">' + month + '/' + year + '</div> </div> ';
                }
                rowHtml += '<div class="panel-body"> <div class="media-list"> <ul> <li class="media-cell"> <div class="media-object pull-left"> <span class="media-object-data">' + obj.day + '</span></div> <div class="media-content pull-left" style="width: 70%;"> <h4 class="pull-left">+' + (obj.gold + (obj.extra_gold != '0' ? '(+' + obj.extra_gold + ')' : '')) + ' 浪花' + (obj.ch_name) + '</h4> <span class="media-content-arriva pull-right">已到帳 </span> <span class="media-content-time">' + obj.time + '</span> </div> </li> </ul> </div> </div>';
            });
            $('#row').append(rowHtml);
        }else {
            $(".loading").show();
            $(".loading img").hide();
            $(".loading").html('沒有更多了!');
        }
	}
	
	// 上拉加载
	function elseRecord(pageList){
	    asyncLoadData(function (result) {
	        console.log('result is ');
	        console.log(result);
	        elseRender(result);
	        myScroll.refresh();
	        flag = true;
	    });
	}
	
    function asyncLoadData(callback) {
    	
        if (page > 1) { stamp = (page - 1) * len - 1; include = 0; }
        
        $.ajax({
            url: domain + 'v2/html/consumme/order_history',
            dataType:'json',
            type: 'POST',
            data: {"HTTP_USER_TOKEN":token, "HTTP_USER_UID":pfid, "stamp": stamp, "len": len, "include": include },
            success:callback,
            error: function (ex) { console.log("error is :" + JSON.stringify(ex)) }
        })
    }
    var month = 0;
    var year = 0;
    asyncLoadData(function (result) {
        console.log('result is ');
        console.log(result);
        $(".frontLoading").hide();
        var data=result.data;
        if (data.list.length > 0) {
            var rowHtml = "";
            $(data.list).each(function (i, obj) {
                console.log(obj.stamp);
                if (month != obj.month || year != obj.year) {
                    month = obj.month;
                    year = obj.year;
                    rowHtml += '<div class="panel-header panel-nav"> <div class="panel-title">' + month + '/' + year + '</div> </div> ';
                }
                rowHtml += '<div class="panel-body"> <div class="media-list"> <ul> <li class="media-cell"> <div class="media-object pull-left"> <span class="media-object-data">' + obj.day + '</span></div> <div class="media-content pull-left" style="width: 70%;"> <h4 class="pull-left">+' + (obj.gold + (obj.extra_gold != '0' ? '(+' + obj.extra_gold + ')' : '')) + ' 浪花' + (obj.ch_name) + '</h4> <span class="media-content-arriva pull-right">已到帳 </span> <span class="media-content-time">' + obj.time + '</span> </div> </li> </ul> </div> </div>';
            });
            $('#row').append(rowHtml);
            myScroll.refresh();
        }
        else {
            $('#row').append('<div class="no-data">暫無數據</div>');
        }
    });
    
    var flag = true;
    function loaded () {
		myScroll = new IScroll('#page-content', { probeType: 3, mouseWheel: true, click: true });
	
		myScroll.on("slideUp",function(){
			if(this.maxScrollY - this.y > 5){
				if(flag){
					$(".loading").show();
					flag = false;
					page++;
					elseRecord(page);	
				}
			}
		});
	}
