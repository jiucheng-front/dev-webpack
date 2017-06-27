console.log("测试");


!function(){
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

  // 切换事件
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


  // 添加事件
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
  addEvent();



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
  backTop('backTop');


}();
