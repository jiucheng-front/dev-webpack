console.log("测试");


!function(){
  //
  var u = navigator.userAgent,
    app = navigator.appVersion;
    //ios终端
  var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  var domain='https://' + window.location.host + '/';
  // 客户端方法
  //h5关注
  function follow(pfid){
    console.log(pfid);
  	if(isiOS==true){
  			window.webkit.messageHandlers.langWeb2App_httpreq.postMessage({body:'{"base_url":"'+domain+'v2/","requst_url":"friend/follow","param":{"be_pfid":"'+pfid+'","action":"1"}}'});
          }else{
  			javascriptinterface.langWeb2App_httpreq(domain+'v2/friend/follow','{"key": ["be_pfid","action"],"value": ["'+pfid+'","1"],"needlogin": false,"callback": true,"callback_tag": "follow"}');
          }
  }
  //1、ClassName切换,是否含有指定class
  function hasClass(elem,cls){
      return elem.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
  }
  // 2、没有就追加指定class
  function addClass(elem,cls){
      if(!hasClass(elem,cls)){
          elem.className+=" "+cls;
      }
  }
  // 3、有就移除指定class
  function removeClass(elem,cls){
      if(hasClass(elem,cls)){
          var reg=new RegExp('(\\s|^)'+cls+'(\\s|$)');
          elem.className=elem.className.replace(reg,"");
      }
  }
  // 4、公用获取元素by id
  function getEleId(id){
    return document.getElementById(id);
  }
  // 5、追加HTML
  function pushHtml(id,html){
    return document.getElementById(id).innerHTML=html;
  }
  // 6、AJAX封装
  function nativeAjax(option,success,error){
  	// 定义domain,方便环境切换
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
  // 2、POST：定義請求參數
  // var postOption={
  // 	ajaxType:"POST",
  // 	urlStr:"v2/html/broke/get_broke_ranked_info",
  // 	ajaxData:{
  // 		"HTTP_USER_TOKEN":token,
  // 		"HTTP_USER_UID":pfid,
  // 		"anchor_pfid":anchor_pfid,
  // 		"broke_pfid":pfid
  // 	}
  // }
  // 3、调用AJAX
  // nativeAjax(postOption,function(data){
  // 	console.log(data);
  // },function(error){
  // 	console.log(error);
  // });

  //0、请求数据
  function postData(){
    var getOption={
      	ajaxType:"GET",
      	urlStr:"json-datas/degula/dracula_second_data.json",
      	ajaxData:null
      }
      nativeAjax(getOption,function(data){
      	// 成功函数
      	console.log(data);
        if(data.ret_code=="0"){
          // 1、顶部是否追踪
          var isFollowing=data.data.my;
          isCanFollow(isFollowing);
          // 2、人气星星列表
          var starsObject=data.data.star;
          allStars(starsObject);
          // 3、预言家
          var forecast=data.data.forecast;

          resetData(forecast);
        }
      },function(error){
      	// 失败返回HTTP状态码
      	console.log(error);
      });
  }
  postData();
  // 3.3 预言家
  function resetData(object){
    // 6个的DOM
    var ticketsDom=document.getElementsByClassName("same-camp-ticket");
    var justiceTicket=document.getElementsByClassName("justice-ticket");
    var evilTicket=document.getElementsByClassName("evil-ticket");
    var defaultBrn=document.getElementsByClassName("default-btn");
    var hadWin=document.getElementsByClassName("had-win");
    var iconRound=document.getElementsByClassName("icon-round");
    var iconClass=[["icon-one-before","icon-one-start"],["icon-two-before","icon-two-start"],["icon-three-before","icon-three-start"]];
    // console.log(object);
    var arr=[];
    var lists=object.vote_result;
    var stage=object.stage;
    for(var key in lists){
      arr.push(lists[key]);
    }
    var hash=[[0,1],[2,3],[4,5]];
    console.log(arr);
    for(var j=0;j<arr.length;j++){
      var roundLiist=arr[j];
      // 正义票数
      var justice_ticket=roundLiist.ticket_count_justice;
      var evil_ticket=roundLiist.ticket_count_evil;
      justiceTicket[j].innerHTML=justice_ticket+"票";
      evilTicket[j].innerHTML=evil_ticket+"票";
    }
  }

  function prophetVote(){
    var prophetBtns=document.getElementsByClassName("prophet-btn");
    for(var k=0;k<prophetBtns.length;k++){
      prophetBtns[k].onclick=function(){
        var place=this.getAttribute("data-vote");
        console.log(place);
      }
    }
  }
  prophetVote();


  // 1、0顶部是否追踪过
  function isCanFollow(follow){
    var follow_status=follow.follow_status;
    var this_pfid=follow.pfid;
    var followBtn=getEleId("following");
    if(follow_status==1){
      followBtn.className="hide";
    }else if(follow_status==0){
      canFollowing(this_pfid);
    }
  }
  // 1.2
  function canFollowing(pfid){
    var canBtn=getEleId("following");
    canBtn.onclick=function(){
      follow(pfid);
      this.className="hide";
    }
  }
  //1.3客戶端返回追蹤狀態
  function langApp2Web_httprtn(result,follow){
  	if(isiOS == true){
  		if(JSON.parse(result).ret_code == "0"){
        // 成功追踪按钮消失
  			getEleId("following").className="hide";
  		}else{
  			alert(JSON.parse(result).ret_msg);
  		}
  	}else{
  		if(JSON.parse(follow).ret_code == "0"){
        // 成功追踪按钮消失
  			getEleId("following").className="hide";
  		}else{
  			alert(JSON.parse(follow).ret_msg);
  		}
  	}
  }
  // 2.0、人气星星
  function allStars(obj){
    // 剩余数量
    var remainCount=obj.ticket_count;
    pushHtml("remainStars",remainCount);
    // 获得下一颗倒计时
    var next_time=obj.end_time;
    resetTime(next_time);
    // 9个用户列表
    var users=obj.vote_result;
    var str_html="";
    var length=users.length;
    for (var i = 0; i < length; i++) {
      var nowList=users[i];
      // 已经获得的星星数量
      var star_count=nowList.count;
      var nick_name=nowList.nickname;
      var user_pfid=nowList.pfid;
      var head_img=nowList.headimg;
      //
      str_html+='<li>';
      str_html+='<div class="user-img">';
      str_html+='<img src="'+head_img+'" alt="">';
      str_html+='</div>';
      str_html+='<p>'+nick_name+'</p>';
      str_html+='<p>獲得星星：'+star_count+'</p>';
      if(remainCount==0){
        str_html+='<span class="cant-vote">投票</span>';
      }else{
        str_html+='<span class="vote-btn" data-pfid="'+user_pfid+'">投票</span>';
      }
      str_html+='</li>';
    }
    var usersBox=getEleId("userLists");
    usersBox.innerHTML=str_html;
    addEvent();
  }
  // 2.1星星倒计时
  function resetTime(time){
    var ramainTimes=getEleId("ramainTimes");
    var timer=null;
    var t=time;
    var m=0;
    var s=0;
    m=Math.floor(t/1000/60%60);
    m<10&&(m='0'+m);
    s=Math.floor(t/1000%60);
    function countDown(){
      s--;
      s<10&&(s='0'+s);
      if(s.length>=3){
        s=59;
        m="0"+(Number(m)-1);
      }
      if(m.length>=3){
        m='00';
        s='00';
        clearInterval(timer);
        // 重新请求数据
        postData();
      }
      ramainTimes.innerHTML=m+'：'+s;
      // console.log(m+"分钟"+s+"秒");
    }
    timer=setInterval(countDown,1000);
  }

  // 一、动态DOM投票事件
  function addEvent(){
    // 用戶列表投票
    var voteBtns=document.getElementsByClassName("vote-btn");
    for(var i=0;i<voteBtns.length;i++){
      voteBtns[i].addEventListener("click",function(){
        var pfid=this.getAttribute("data-pfid");
        // 需要重新請求數據
        alert(pfid);
      });
    }
  }


  // 二、静态DOM点击事件
  function staticEvent(){
    // 2.1切换事件
    var btns=document.getElementsByClassName("js-nav-btn");
    var items=document.getElementsByClassName("content-item");
    for(var i=0;i<btns.length;i++){
      btns[i].index=i;
      btns[i].onclick=function(){
        for (var j = 0; j < items.length; j++) {
          items[j].className="content-item";
          btns[j].className="js-nav-btn";
        }
        btns[this.index].className="js-nav-btn selected";
        items[this.index].className="content-item show";
      }
    }
    // 2.2游戏规则弹框
    // 按钮
    var ruleBtn=getEleId("ruleBtn");
    // 规则
    var ruleMask=getEleId("rule");
    // 页面
    var context=getEleId("container");
    ruleBtn.addEventListener("click",function(){
      context.className="hide";
      ruleMask.className="show";
      console.log(this);
    });
    ruleMask.addEventListener("click",function(){
      this.className="";
      context.className="";
    });
  }
  staticEvent();
  // 三、返回頂部通用的方法
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
          btn.style.display = (d.scrollTop + b.scrollTop > 100) ? 'block': "none"
      }
  };
  backTop('backTop');

  // 倒计时
  function GetRTime(){
     /*结束时间*/
    var EndTime=end|| new Date('2017/06/28 12:00:00');
    /*当前时间*/
    var NowTime = new Date();
    /*剩余时间的毫秒数*/
    var t =EndTime.getTime() - NowTime.getTime();
    var d=0;
    var h=0;
    var m=0;
    var s=0;
    if(t>=0){
      d=Math.floor(t/1000/60/60/24);
      h=Math.floor(t/1000/60/60%24);
      m=Math.floor(t/1000/60%60);
      s=Math.floor(t/1000%60);
    }
  // console.log("剩余："+h+"小时:"+m+"分钟："+s+"秒");
  }
  var end=new Date("2017/06/28/ 12:30:00");
  GetRTime();
//   setInterval(GetRTime,1000);


}();
