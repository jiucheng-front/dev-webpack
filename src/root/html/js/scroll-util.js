/**
 *
 * @param $scrollBody
 * @param trigger
 * @param param
 * @returns {{pageIndex: number}}
 */
function bindScroll($scrollBody, trigger, param) {
    var size = param.size || 10;
    var result = {
        page: 1,
        research: function () {
            $scrollBody.empty();
            this.page = 1;
            trigger();
        }
    };
    // var $modalback = $('.modalback');
    var timeout = 0;
    $scrollBody.unbind().scroll(function () {
        clearTimeout(timeout);
        timeout = setTimeout(scroll, 100);
    });
    function scroll() {
        var $children = $scrollBody.children();
        var step = $children.eq(1).offset().top - $children.eq(0).offset().top;
        if ($scrollBody.scrollTop() >= getScollHeight() && param.totalElements > result.page * size
            // && $modalback.is(':hidden')
        ) {
            result.page++;
            trigger();
        }
    }
    
    function getScollHeight() {
    	var sum = 0;
    	$scrollBody.children().each(function(index, item) {
    		var $this = $(this);

            $('.scroll-preloader').css("display","block").html('<div class="preloader"></div>');
    		sum += $this.height()
    		+ parseFloat($this.css('margin-bottom'));
    	})
    	return sum - $scrollBody.height() - 
    	20; // 误差
    }
    return result;
}