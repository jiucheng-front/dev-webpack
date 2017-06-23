!function(){
    // 1、原生的javascript
    function nativeAjax(option,success,error){
    	// 定义domain,方便环境切换,本地有防火墻阻止https請求
      // var domain='https://' + window.location.host + '/';
    	var domain='http://' + window.location.host + '/';
    	var url=domain+option.urlStr;
    	var type=option.ajaxType;
    	var data=option.ajaxData;
    	var xhrRequest=null;
    	if(window.XMLHttpRequest){
            xhrRequest = new XMLHttpRequest();
        } else {
            xhrRequest = new ActiveXObject('Microsoft.XMLHTTP')
        }
    	var str=null;
    	xhrRequest.open(type,url,true);
    	if(type==="POST"&&data!=null){
    		xhrRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
    		for(var key in data){
    			str+='&'+key+'='+data[key];
    			str=str.slice(1);
    		}
    	}
    	xhrRequest.onreadystatechange=function(){
    		if(xhrRequest.readyState==4){
    			if(xhrRequest.status==200){
    				// 1.1、格式化返回的数据
    				var responseData=JSON.parse(xhrRequest.responseText);
    				// 1.2、这里操作数据--------
    				success(responseData);
    			}else{
    				// 1.3、没成功返回HTTP状态码
    				error(xhrRequest.status);
    			}
    		}
    	}
    	xhrRequest.send(str);
    }
  //2.0 请求数据
  function getDate(){
  	// $.post(domain+'v2/activity/dracula_data', {"HTTP_USER_TOKEN":token, "HTTP_USER_UID":pfid, "anchor_pfid":anchor_id },
  	 	// function(data) {
              /*optional stuff to do after success */
              // if(data.ret_code=="0"){
              //     var users=data.data.users;
              //     sortData(users);
              // }
  	    // },
  		// "json"
      // );
      //4、GET：定义请求参数
    var getOption={
    	ajaxType:"GET",
    	urlStr:"json-datas/degula/degula.json",
    	ajaxData:null
    }
    nativeAjax(getOption,function(data){
    	// 成功函数
    	console.log(data);
      if(data.ret_code=="0"){
          var users=data.data.users;
          sortData(users);
      }
    },function(error){
    	// 失败返回HTTP状态码
    	console.log(error);

    });
  }
  // 調用請求
  getDate();
  // 1 把人員按照積分从高到底排列
  function sortData(lists){
  	for(var n=1;n<lists.length;n++){
  		for(var k=0;k<lists.length-1;k++){
  			var max=lists[k].score;
  			var nextCount=lists[k+1].score;
  			if(nextCount>max){
  				var preData=lists[k];
  				lists[k]=lists[k+1];
  				lists[k+1]=preData;
  			}
  		}
  	}
  	// 0503
  	createDom(lists);
  }
  // 创建DOM
  function createDom(userData){
  	// 測試渲染時間
  	var startTime=new Date();
  	var user_html="";
  	// $(".userlist"+num).empty();
  	for(var i=0,leng=userData.length;i<leng;i++){
  		var userList=userData[i];
  		// 5/15号取消追踪状态，替换为晋级淘汰。败部
  		// var followStatus=userList.follow_status;
  		// 0515
  		var isPromotion=userList.promotion;
  		var userName=userList.nickname;
  		var index=i+1;
  		var num='0'+index;
  		if(index>9){
  			num=index;
  		}
  		//0503 進入直播間還是主頁的參數
  		var this_liveid=userList.live_id;
  		var this_pfid=userList.pfid;
  		var this_nickname=userList.nickname;
  		var this_liveurl=userList.live_url;
  		var this_livekey=userList.live_key;
  		var this_direction=userList.stream_direction;
  		var this_headimg=userList.headimg;
  		user_html+="<li>";
  		user_html+="<b>"+num+".</b>";
  		user_html+="<div data-direction='"+this_direction+"' data-livekey='"+this_livekey+"' data-liveurl='"+this_liveurl+"' data-nickname='"+this_nickname+"' data-pfid='"+this_pfid+"' data-liveid='"+this_liveid+"' class='main-img'>";
  		// 是否正在直播
  		user_html+="<img src='"+userList.headimg+"' alt=''>";
  		// 是否正在直播
  		if(this_liveid!=null){
  			user_html+="<span></span>";
  		}
  		user_html+="</div>";
  		user_html+="<span>"+userName+"</span>";
  		user_html+="<b class='score'>"+userList.score+"</b>";
  		user_html+="<b class='ticket'>"+userList.count+"</b>";
  		// 是否可以追蹤,5、15号取消追踪按钮
  		// if(followStatus==0){
  		// 	user_html+="<button class=willFollow data-pfid='"+userList.pfid+"'>追蹤</button>";
  		// }
  		// 5/15号把追踪状态换为 晋级、淘汰、败部
  		if(isPromotion==1){
  			user_html+="<i class='promotion'></i>"
  		}else if(isPromotion==0){
  			user_html+="<i class='nothing'></i>"
  		}else if(isPromotion==-1){
  			user_html+="<i class='out'></i>"
  		}
  		user_html+="</li>";
  	}
    var box=document.getElementById("users-one");
    box.innerHTML=user_html;
  	// 渲染結束時間
  	var endTime=new Date();
  	console.log(endTime);
    // 点击事件
    addEvent();
  }
  // 头像点击跳转直播间还是个人主页
  function addEvent(){
     var btns=document.getElementsByClassName("main-img");
    //  console.log(btns);
     var btn_length=btns.length;
     for (var i = 0; i <btn_length; i++) {
       btns[i].addEventListener("click",function(){
          var pfid=this.getAttribute('data-pfid');
        	var nickname=this.getAttribute('data-nickname');
        	var liveid=this.getAttribute('data-liveid');
        	var liveurl=this.getAttribute('data-liveurl');
        	var livekey=this.getAttribute('data-livekey');
        	var direction=this.getAttribute('data-direction');
          if(liveid!="null"){
        		// 进入直播间
        		// h5toRoom(pfid,nickname,liveid,liveurl,livekey,direction);
        		alert("进入直播间");
        	// 如果没在直播，进入个人主页
        	}else{
        		// h5toHomepage(pfid,nickname);
        		alert("进入个人主页");
        	}
       });
     }
  }

  // 返回頂部通用的方法
  function backTop(btnId) {
      var btn = document.getElementById(btnId);
      var d = document.documentElement;
      var b = document.body;
      window.onscroll = set;
      btn.style.display = "none";
      btn.onclick = function() {
          btn.style.display = "none";
          window.onscroll = null;
          this.timer = setInterval(function() {
              d.scrollTop -= Math.ceil((d.scrollTop + b.scrollTop) * 0.1);
              b.scrollTop -= Math.ceil((d.scrollTop + b.scrollTop) * 0.1);
              if ((d.scrollTop + b.scrollTop) == 0) clearInterval(btn.timer, window.onscroll = set);
          }, 10);
      };
      function set() {
          btn.style.display = (d.scrollTop + b.scrollTop > 100) ? 'block': "none";
      }
  };
  backTop('goTop');


  //4 客户端公用方法
  var u = navigator.userAgent,
      app = navigator.appVersion;
  var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

  //h5进入个人主页
  function h5toHomepage(pfid,nickname){
  	if(isiOS==true){
  		window.webkit.messageHandlers.langWeb2App_openActivity.postMessage({body:'{"pfid":"'+pfid+'","className":"LNGOtherInfoViewCtrl"}'});
  	} else{
  		javascriptinterface.langWeb2App_openActivity('com.lang.lang.ui.activity.user.UserCenterActivity','{"pfid":"'+pfid+'","nickname":"'+nickname+'"}');
  	}
  }

  //h5进入直播间
  function h5toRoom(pfid,nickname,liveid,liveurl,livekey,direction){
  	if(isiOS==true){
  		window.webkit.messageHandlers.langWeb2App_openActivity.postMessage({body:'{"live_id":"'+liveid+'","className":"PlayFlowViewController","live_url":"'+liveurl+'","live_key":"'+livekey+'","stream_direction":"'+direction+'","pfid":"'+pfid+'"}'});
  	}else{
  		javascriptinterface.langWeb2App_openActivity('com.lang.lang.ui.activity.room.YunfanLiveActivity','{"pfid":"'+pfid+'","nickname":"'+nickname+'","live_id":"'+liveid+'","stream_direction":"'+direction+'"}')
  	}
  }
    // JQ：結合externals配置項，且html內先引入JQ
    // var $=require("jquery");
    // var s=$("#users-one").html();
    // console.log(s);

}();
