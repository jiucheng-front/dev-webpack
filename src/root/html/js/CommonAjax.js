//请求数据基础方法
function SafeAjax(url, param, callback) {
    $.ajax({
        url: url,
        // headers: {USER_TOKEN:token,USER_UID:pfid },
        type: 'POST',
        dataType:'json',
        data: param,
        success: callback,
        error: function (xhr) {
            console.log('error is:')
            console.log(xhr)
        }
    });
}