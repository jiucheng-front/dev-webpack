// 'use strict';

// var $=require('jquery');
// console.log($);
const degula={
  init:function(){
    var _this=this;
    _this.getDate();
  },
  getDate:function(){
    var _this=this;
    // $.post(domain+'v2/activity/dracula_data', {"HTTP_USER_TOKEN":token, "HTTP_USER_UID":pfid, "anchor_pfid":anchor_id },
	 	// function(data) {
            /*optional stuff to do after success */
            if(_this.data.ret_code=="0"){
                //第一集的数据为
                var users=_this.data.data.users;
                _this.sortData(users);
            }
	    // },
		// "json"
    // );
  },
  // 重新根据积分排列用户
  sortData:function(lists){
    var _this=this;
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
      //
      _this.createHTML(lists);
  },
  // 创建DOM
  createHTML:function(userData){
      // 測試渲染時間
  	var startTime=new Date();
  	var user_html="";
  	// $(".userlist"+num).empty();
  	for(var i=0,leng=userData.length;i<leng;i++){
  		var userList=userData[i];
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
    // console.log($);
    var wrap=document.getElementById("users-one");
    wrap.innerHTML=user_html;
  },
  // 假数据
  data:{
	  "ret_code": "0",
	  "ret_msg": "ok",
	  "data": {
	    "my": {
	      "live_id": "10008401493805331",
	      "live_key": "0MYaTv",
	      "stream_direction": 1,
	      "live_url": "rtmp://video.obslanglive.com/live/10008401493805331",
	      "headimg": "http://blob.ufile.ucloud.com.cn/f59a66b97b2cbd9c3e469b5c0bf4e3015f101af8bd24e2328a4446076b226440",
	      "nickname": "(。•́︿•̀。)108",
	      "pfid": 1000840,
	      "follow_status": 0
	    },
	    "users": [
	      {
	        "pfid": 1000011,
	        "count": 0,
	        "follow_status": null,
	        "score": 19,
	        "promotion": 1,
	        "live_id": null,
	        "live_key": "",
	        "stream_direction": 0,
	        "live_url": "",
	        "headimg": "http://wx.qlogo.cn/mmopen/ajNVdqHZLLASXYCVQQeiaXKA07Mx1Lu24juBVZ40ib9IsI6ImibfsWD1R3JS5I5L4LZMmgxpC4B7Y1taCZmXHQVKic4lbHibcntI7L6S7K4gnMW8/0",
	        "nickname": "cabbageancy"
	      },
	      {
	        "pfid": 1000004,
	        "count": 0,
	        "follow_status": null,
	        "score": 17,
	        "promotion": 1,
	        "live_id": null,
	        "live_key": "",
	        "stream_direction": 0,
	        "live_url": "",
	        "headimg": "http://playback-langlive.ufile.ucloud.cn/4825891161c4d9a377be0785078c2158.jpg",
	        "nickname": "减肥沟沟壑壑健健康康快快"
	      },
	      {
	        "pfid": 1023841,
	        "count": 0,
	        "follow_status": null,
	        "score": 15,
	        "promotion": 1,
	        "live_id": null,
	        "live_key": "",
	        "stream_direction": 0,
	        "live_url": "",
	        "headimg": "http://blob.ufile.ucloud.com.cn/9997f3e49dbf7d65cc495f1a8e21d33cfcac35ede39d4830580a66085ea45832",
	        "nickname": "优雅的猫"
	      },
	      {
	        "pfid": 1000044,
	        "count": 0,
	        "follow_status": null,
	        "score": 13,
	        "promotion": 1,
	        "live_id": null,
	        "live_key": "",
	        "stream_direction": 0,
	        "live_url": "",
	        "headimg": "http://blob.ufile.ucloud.com.cn/92cee6a8ce12f7b01a58fd7fa990a1bb.jpg",
	        "nickname": "嘻嘻哈哈😄💔1213"
	      },
	      {
	        "pfid": 1000048,
	        "count": 0,
	        "follow_status": null,
	        "score": 10,
	        "promotion": 1,
	        "live_id": null,
	        "live_key": "",
	        "stream_direction": 0,
	        "live_url": "",
	        "headimg": "http://blob.ufile.ucloud.com.cn/c8d240b8dfb870238431f43a392b312fba00a22c15230aa66f8e33cacc6debda",
	        "nickname": "珍珠奶茶😱芋頭紅豆薏米"
	      },
	      {
	        "pfid": 1000830,
	        "count": 0,
	        "follow_status": null,
	        "score": 9,
	        "promotion": -1,
	        "live_id": null,
	        "live_key": "",
	        "stream_direction": 0,
	        "live_url": "",
	        "headimg": "http://blob.ufile.ucloud.com.cn/a765a85a32fde0343476d3d5a54ce686d9370cd4e35f4ac941661c2ab6746bcd",
	        "nickname": "58665"
	      },
	      {
	        "pfid": 1000941,
	        "count": 0,
	        "follow_status": null,
	        "score": 8,
	        "promotion": 0,
	        "live_id": null,
	        "live_key": "",
	        "stream_direction": 0,
	        "live_url": "",
	        "headimg": "http://playback-langlive.ufile.ucloud.cn/41395b6c4851bbc8d2ac49b643ea1420",
	        "nickname": "随意"
	      },
	      {
	        "pfid": 1000052,
	        "count": 0,
	        "follow_status": null,
	        "score": 7,
	        "promotion": -1,
	        "live_id": null,
	        "live_key": "",
	        "stream_direction": 0,
	        "live_url": "",
	        "headimg": "http://blob.ufile.ucloud.com.cn/9256deb2c705849daef63ace024d4fe121e68f712eefdc585692247a52cf1920",
	        "nickname": "upper"
	      },
	      {
	        "pfid": 1000733,
	        "count": 0,
	        "follow_status": null,
	        "score": 6,
	        "promotion": 0,
	        "live_id": null,
	        "live_key": "",
	        "stream_direction": 0,
	        "live_url": "",
	        "headimg": "http://playback-langlive.ufile.ucloud.cn/8422f67af167df7d2b2caa78ac0a4773c4eade4575b343b5a82b7a48c4bf1427",
	        "nickname": "查房"
	      },
	      {
	        "pfid": 1000012,
	        "count": 0,
	        "follow_status": null,
	        "score": 5,
	        "promotion": -1,
	        "live_id": null,
	        "live_key": "",
	        "stream_direction": 0,
	        "live_url": "",
	        "headimg": "http://blob.ufile.ucloud.com.cn/0d94ae9dc33721c87af78a7b2099f5a7ab7395972444c7ab979e3dea46e8ba2e",
	        "nickname": "c224002"
	      },
	      {
	        "pfid": 1000039,
	        "count": 0,
	        "follow_status": null,
	        "score": 4,
	        "promotion": 0,
	        "live_id": "10000391494820650",
	        "live_key": "UioEgF",
	        "stream_direction": 0,
	        "live_url": "rtmp://video.langlive.com/live/10000391494820650",
	        "headimg": "http://blob.ufile.ucloud.com.cn/25f0e2243ac9f515ed3be2fb1854c8b7db8e04b195a088962179cf5937ae25dd",
	        "nickname": "哇呀唔唔無武呃呃😂哇咔"
	      },
	      {
	        "pfid": 1000049,
	        "count": 0,
	        "follow_status": null,
	        "score": 3,
	        "promotion": -1,
	        "live_id": null,
	        "live_key": "",
	        "stream_direction": 0,
	        "live_url": "",
	        "headimg": "http://blob.ufile.ucloud.com.cn/6b7f50b02ed10b72159ccf1f00a73ab9.jpg",
	        "nickname": "思考解决"
	      },
	      {
	        "pfid": 1000040,
	        "count": 0,
	        "follow_status": null,
	        "score": 2,
	        "promotion": 0,
	        "live_id": null,
	        "live_key": "",
	        "stream_direction": 0,
	        "live_url": "",
	        "headimg": "http://blob.ufile.ucloud.com.cn/3f8f9f008d9d34a9b4cdffd32a06a3d8.jpg",
	        "nickname": "🐾\"sting\"💤"
	      },
	      {
	        "pfid": 1000010,
	        "count": 0,
	        "follow_status": null,
	        "score": 1,
	        "promotion": -1,
	        "live_id": null,
	        "live_key": "",
	        "stream_direction": 0,
	        "live_url": "",
	        "headimg": "http://blob.ufile.ucloud.com.cn/f9cb7d8ac961fb9b3d5a882aea55bfe5",
	        "nickname": "gggggg"
	      }
	    ]
	  }
  }
};
//2.1 导出模块
module.exports=degula;
