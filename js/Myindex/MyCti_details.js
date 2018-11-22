$(function () {
    var wxtoken = $.cookie('wxtoken');//获取存在cookie中的token
    var xiangqingid = $.cookie('xiangqingid')
    //当前选中是’我的‘给当前选中高亮显示
    $('.wecha_nav_right').addClass('wecha_nav_fontColor');
    $('.wecha_nav_left').removeClass('wecha_nav_fontColor');
//活动详情
    $.ajax({
        async: false,
        type: 'GET',
        url: partCtiDetails,
        headers: {'token': wxtoken},
        data: {'id': xiangqingid},
        dataType: 'JSON',
        success: function (data) {
            console.log(data)
            if (data.code == 0) {
                var activityName = data.rs.activityName//活动名称
                var comment = data.rs.comment//评论
                var img = data.rs.img//好评图片
                var state = data.rs.state//状态
                var auditTime=data.rs.auditTime//审核时间
                var createTime=data.rs.createTime//活动参与时间
                var money=data.rs.money//红包金额
                var rejectMessage=data.rs.rejectMessage//拒绝原因
                var taobaoOrder=data.rs.taobaoOrder//淘宝订单号
                if (state == '01') {
                    state = '待审核'
                } else if (state == '02') {
                    state = '审核通过'
                } else if (state=='03') {
                    state = '审核拒绝'
                    $('.activityName').text('活动名称：' + activityName + '');
                    $('.state').text('活动状态：' + state + '')
                    $('.comment').text('评论信息：' + comment + '')
                    $('.createTime').text('参与时间：' + createTime + '')
                    $('.auditTime').text('审核时间：' + auditTime + '')
                    $('.money').text('红包金额：' + money + '')
                    $('.taobaoOrder').text('淘宝编号：' + taobaoOrder + '')
                    $('.rejectMessage').text('拒绝原因：' + rejectMessage + '')
                    $('.goodimg').attr('src', 'http://' + img + '')
                }
                $('.activityName').text('活动名称：' + activityName + '');
                $('.state').text('活动状态：' + state + '')
                $('.comment').text('评论信息：' + comment + '')
                $('.createTime').text('参与时间：' + createTime + '')
                $('.auditTime').text('审核时间：' + auditTime + '')
                $('.money').text('红包金额：' + money + '')
                $('.taobaoOrder').text('淘宝编号：' + taobaoOrder + '')
                // $('.rejectMessage').text('拒绝原因：' + rejectMessage + '')
                $('.goodimg').attr('src', 'http://' + img + '')

                //关闭按钮后隐藏
                $('.binimg img').click(function () {
                    $('.binimg').hide()
                })
                //查看大图
                $('.goodimg').click(function () {
                    $('.binimg img').attr('src','http://'+img+'')
                    $('.binimg').show();

                })
            }

        }


    })


})