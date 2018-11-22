//消息轮播
function AutoScroll(obj) {
    $(obj).find("ul:first").animate({
            marginTop: "-.35rem"
        },
        1000,
        function () {
            $(this).css({
                marginTop: "0"
            }).find("li:first").appendTo(this);
        }
    );
}

$(document).ready(function () {
    setInterval('AutoScroll(".mainright")', 1800)

});
$(function () {
    $.ajax({
        async: false,
        url: rewardList,
        data: {'sendRedPack': '02'},
        type: 'GET',
        headers: {'token': wxtoken},
        dataType: 'JSON',
        success: function (data) {
            console.log(data)
            for (i = 0; i < data.rs.length; i++) {
                var nickname = data.rs[i].nickname//获取用户名称
                var money = data.rs[i].money / 100//获取用户获得红包金额
                var li = '<li>' + '<img class="messageImg" src="../../img/index/message.png">' + nickname + ' 获得了 ' + money + ' 元红包' + '</li>'
                $('.mainright ul').append(li)
            }


        }

    })

    //获取首页主图
    $.ajax({
        async:false,
        url:wxSet,
        headers:{'token':wxtoken},
        dataType:'JSON',
        success:function (data) {
            console.log(data)
            for (i=0;i<data.rs.bannerImages.length;i++){
                console.log(data.rs.bannerImages[i])
                var img= '<li class="sw-slide">'+
                    '<img src="'+data.rs.bannerImages[i]+'">'+
                    '</li>'
                $('.sw-slides').append(img)
            }

        }
    })






//图片轮播
    $('#full_feature').swipeslider();



    //评价有礼
    $('#evaluation').click(function () {
        window.location.href = '../../page/activity/Ctilist.html'
    })


})


