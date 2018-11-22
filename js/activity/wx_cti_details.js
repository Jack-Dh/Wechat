$(function () {
    // var wxtoken=$.cookie('wxtoken')//获取存到cookie的token
    var id = $.cookie('wx_cti_id')//获取存到cookie中每条活动的id
    var wxtoken = $.cookie('wxtoken');//获取存在cookie中的token

    $.ajax({
        async: false,
        url: CtiDetails,
        type: 'GET',
        data: {'id': id},
        headers: {'token': wxtoken},
        dataType: 'JSON',
        success: function (data) {
            console.log(data)
            if (data.code == 0) {
                var shopIcon = data.rs.shopIcon//获取店铺头像
                var activityName = data.rs.activityName//获得活动名
                var startTime = data.rs.startTime //活动起始时间
                var endTime =  data.rs.endTime //活动结束时间
                var shop = data.rs.shop//获得店铺名
                var participationCondition = data.rs.participationCondition//参与条件
                var award = data.rs.award//活动奖励

                $('#wecha_cti_top_img').attr('src', 'http://' + shopIcon + '');
                $('.wecha_cti_name').text(shop);

                var pagp = '<p>' + '开始时间：' + startTime + '</p>' +
                    '<p>' + '结束时间：' + endTime + '</p>' +
                    '<p>' + '活动店铺：' + shop + '</p>' +
                    '<p>' + '参与条件：' + '</p>' +
                    '<p style="text-indent:1cm;">' + participationCondition + '</p>' +
                    '<p>' + '活动奖励：' + '</p>' +
                    '<p style="text-indent:1cm;">' + award + '</p>' +
                    '<p>' + '若参与活动过程中遇到问题，请及时联系公众号客服' + '</p>' +
                    '<p>' + '最终解释权归本公众号所有' + '</p>' +
                    '<input type="button" value="参与活动" id="cti_participate_btn">'

                $('.wx_shop_list').append(pagp)
                $('#cti_participate_btn').click(function () {
                    window.location.href='wx_Participate_activities.html'

                })


            }
        }


    })


})