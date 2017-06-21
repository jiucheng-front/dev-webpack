/*
* @Author: wangjianfei
* @Date:   2017-05-16 16:10:25
* @Last Modified by:   wangjianfei
* @Last Modified time: 2017-05-16 18:57:02
*/

'use strict';
import Handlebars from "./handlebars";
// AJAX
var xhrRequest=new XMLHttpRequest();
xhrRequest.open('GET','http://wjf444128852.github.io/json-datas/degula.json');
xhrRequest.onload=function(){
	if(xhrRequest.status>=200&&xhrRequest.status<400){
		var data=JSON.parse(xhrRequest.responseText);
		// 1 定义用户列表
		var users=data.data.users;
		// 1.1 重新排列数据
		sortData(users);
		// 2 判断是否正在直播
		var isLiving=data.data.my;
		// console.log(data);
	}else{
		console.log('The server returned an error.');
	}
}
xhrRequest.onerror=function(){
	console.log('error!');
}
xhrRequest.send();

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
	// 创建DOM，渲染data
	createHTML(lists);
}
//1.3.01 注册一个Handlebars Helper：addOne,用来将索引+1，因为默认是从0开始的
Handlebars.registerHelper("addOne",function(index,options){
	return parseInt(index)+1;
});

// 1.3.06 注册helper：compare，用来比较判断不同的显示内容
Handlebars.registerHelper("compare",function(temp,options){
	if(temp==1){
	//满足条件执行
		return '<i class="promotion"></i>';
	}else if(temp==0){
　　　//不满足执行{{else}}部分
		return '<i class="nothing"></i>';
　　}else if(temp==-1){
		return '<i class="out"></i>';
	}
});


// 1.3 创建DOM函数
function createHTML(userData){
	console.log(userData);
	var usersList=[
		'{{#each this}}',
		'<li>',
		// 01 名词
		'<b>',
		// 使用注册的Helper
		'{{addOne @index}}',
		'.</b>',
		// 02 头像
		'<div class="main-img" data-direction={{stream_direction}} data-livekey={{live_key}} data-liveurl={{live_url}} data-nickname={{nickname}} data-pfid={{pfid}} data-liveid={{live_id}}>',
		'<img src="{{headimg}}" alt="" />',
		// 根据live_id是否正在直播
		'{{#if live_id}}',
		'<span></span>',
		'{{/if}}',
		'</div>',
		// 03 用户名字
		'<span>',
		'{{nickname}}',
		'</span>',
		// 04 用户积分
		'<b class="score">',
		'{{score}}',
		'</b>',
		// 05 用户票数
		'<b class="ticket">',
		'{{count}}',
		'</b>',
		// 06 是否晋级、淘汰、败部
		// 注册
		'{{#compare promotion}}',
		'{{/compare}}',
		'</li>',
		'{{/each}}'
	].join('');
	var usersHtml=Handlebars.compile(usersList)(userData);
	var containerBox=document.getElementById('users-one');
	// 追加到DOM树上
	containerBox.innerHTML=usersHtml;
	//
	addEvent();
}

//2 addEvent 绑定事件
function addEvent(){
	// var allUsers=document.getElementsByClassName('main-img');
	var allUsers=getDom('.main-img');
	// console.log(allUsers);
	for(var i=0,leng=allUsers.length;i<leng;i++){
		var lists=allUsers[i];
		lists.addEventListener("click",function(e){
			event.preventDefault();
			event.stopPropagation();
			//
			var pfid=this.getAttribute("data-pfid");
			var nickname=this.getAttribute('data-nickname');
			var liveid=this.getAttribute('data-liveid');
			var liveurl=this.getAttribute('data-liveurl');
			var livekey=this.getAttribute('data-livekey');
			var direction=this.getAttribute('data-direction');
			// console.log(liveid);
			// handlebars.js 默认把值为null去除了，即把为null的替换为：'',所以此时不能用!=null判断了
			// if(liveid!=null){
			if(liveid){
				// 进入直播间
				// h5toRoom(pfid,nickname,liveid,liveurl,livekey,direction);
				alert("进入直播间");
			// 如果没在直播，进入个人主页
			}else{
				// h5toHomepage(pfid,nickname);
				alert("进入个人主页");
			}
			// console.log(this);
		});
	}
}

//3 getDom 获取DOM
function getDom(selector){
	return document.querySelectorAll(selector);
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
        btn.style.display = (d.scrollTop + b.scrollTop > 100) ? 'block': "none"
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
