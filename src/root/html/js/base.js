$(function () {
    $(".page-content-damindTab").delegate(".panel-title a", "keyup touchend", function () {
        var obj = $(this).parent();
        if ($(this).hasClass("hide")) {
            $(this).removeClass("hide");
            $(".page-content-damindTab .panel-body[data-month=" + obj.attr("data-month") + "]").removeClass("hide");
        }
        else {
            $(this).addClass("hide");
            $(".page-content-damindTab .panel-body[data-month=" + obj.attr("data-month") + "]").addClass("hide");
        }
    });
    
    $(".page-content-sunTab").delegate(".panel-title a", "keyup touchend", function () {
        var obj = $(this).parent();
        if ($(this).hasClass("hide")) {
            $(this).removeClass("hide");
            $(".page-content-sunTab .panel-body[data-month=" + obj.attr("data-month") + "]").removeClass("hide");
        }
        else {
            $(this).addClass("hide");
            $(".page-content-sunTab .panel-body[data-month=" + obj.attr("data-month") + "]").addClass("hide");
        }
    });
});
