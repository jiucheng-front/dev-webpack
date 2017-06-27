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
  var items=document.getElementsByClassName("js-item");
  for(var i=0;i<btns.length;i++){
    btns[i].index=i;
    btns[i].onclick=function(){
      for (var j = 0; j < items.length; j++) {
        items[j].className="js-item";
        btns[j].className="js-nav-btn";
      }
      btns[this.index].className="js-nav-btn selected";
      items[this.index].className="js-item show";
    }
  }


}();
