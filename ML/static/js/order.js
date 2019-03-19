$(function () {
    $('#alipay').click(function () {
        // 发起支付请求
        request_data = {
            // 'orderid': $(this).attr('data_orderid')
            'identifier': $(this).parent().prev().prev().children('p').children('span').text(),
            'ordersum': $(this).parent().prev().children('p').children('span').html()
        }
        $.get('/ml/pay/', request_data, function (response) {
            console.log(response)
            if (response.status == 1){
                window.open(response.alipayurl, target='_self')
            }
        })
    })
})