
var u = navigator.userAgent,
    app = navigator.appVersion;
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
if(pfid==="0"){
     if(isiOS==true){
        window.webkit.messageHandlers.langWeb2App_openActivity.postMessage({body:'{"className":"LNGLoginViewController"}'})
    }else{
        javascriptinterface.langWeb2App_openActivity('com.lang.lang.ui.activity.login.LoginSelectActivity','{"data":""}')
    }   

}

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

//h5关注
function follow(pfid){
	if(isiOS==true){  
			window.webkit.messageHandlers.langWeb2App_httpreq.postMessage({body:'{"base_url":"'+domain+'v2/","requst_url":"friend/follow","param":{"be_pfid":"'+pfid+'","action":"1"}}'});
        }else{
			javascriptinterface.langWeb2App_httpreq(domain+'v2/friend/follow','{"key": ["be_pfid","action"],"value": ["'+pfid+'","1"],"needlogin": false,"callback": true,"callback_tag": "follow"}'); 
        }
}

//h5分享
function needShare(imgUrl,desc,pageTitle,pageUrl){
	var androidShareJson={"imageurl":imgUrl,"description":desc,"title":pageTitle,"shareUrl":pageUrl};
	var iosShareJson={"img_url":imgUrl,"share_content":desc,"share_title":pageTitle,"share_link":pageUrl}
	if(isiOS==true){
		window.webkit.messageHandlers.langWeb2App_needShare.postMessage({body:JSON.stringify(iosShareJson)})
	} else{
		javascriptinterface.langWeb2App_needShare(JSON.stringify(androidShareJson));
	}

}

function shareInterface(imgUrl,desc,pageTitle,pageUrl){
	var androidShareJson={"imageurl":imgUrl,"description":desc,"title":pageTitle,"shareUrl":pageUrl};
	var iosShareJson={"img_url":imgUrl,"share_content":desc,"share_title":pageTitle,"share_link":pageUrl}
	if(isiOS==true){
			window.webkit.messageHandlers.langWeb2App_share.postMessage({body:JSON.stringify(iosShareJson)});
		} else{
			javascriptinterface.langWeb2App_share(JSON.stringify(androidShareJson));
	}

}