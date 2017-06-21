/*
 * Created by songxia  on 2016/09/12.
 */

$(function () {
    'use strict';

    function paypa(){
        var paypalAccount = $('#paypalAccount').val();

        $.ajax({
            type: 'post',
            url: 'http://t.api.langlive.com/v1/billing/paypal/transfer',
            data: {cash : 3000, to_account :paypalAccount , access_token:$access_token},
            success:function (data) {

            },error:function (xhr) {

            }
        });
    }

    paypa();

    $('#btn-confirm').click(function () {
        if(!paypalAccount) {
            alert("请填写提现paypal账号");
            return;
        }


    });
});
