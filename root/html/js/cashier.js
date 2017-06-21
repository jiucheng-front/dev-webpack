/*
 * Created by songxia  on 2016/09/12.
 */

$(function () {
    'use strict';

    var $cashContainer = $('#cash-container');
    var $successContainer = $('#success-container');
    var $failedContainer = $('#failed-container');

    $('#btn-confirm').click(function () {
        var paypalAccount = $('#paypalAccount').val();

        if(!paypalAccount) {
            alert("請填寫提現paypal賬號");
            return;
        }

        $.ajax({
            type: 'post',
            url: domain+'v1/billing/paypal/transfer',
            data: {cash : 3000, to_account :paypalAccount , access_token:access_token},
            success:function (data) {
                //{"ret_code": "0","ret_msg": "ok"}
                if(data["ret_code"] && data["ret_code"]=='0') {
                    $cashContainer.hide();
                    $successContainer.show();
                } else {
                    $cashContainer.hide();
                    $failedContainer.show();
                }

            },error:function (xhr) {
                $cashContainer.hide();
                $failedContainer.show();
            }
        });
    });
});
