$(function () {

    var wxtoken = $.cookie('wxtoken');//获取存在cookie中的token


    $.ajax({
        async: false,
        type: 'GET',
        url: userInformation,
        headers: {'token': wxtoken},
        dataType: 'JSON',
        success: function (data) {
            if (data.code == 0) {
                var headimgurl = data.rs.headimgurl  //获取用户头像
                var nickname = data.rs.nickname//获取用户名
                $('.wecha_index_top_img').attr('src', headimgurl);
                $('#wecha_index_name').text(nickname)
            } else {
                alert('加载失败！')
            }
        }
    })


    var pageNum = 0;//定义初始页面
    var all;  //后台返回总页面

    $.ajax({
        async: false,
        type: 'GET',
        url: Ctilist,
        data: {'size': 6},
        headers: {'token': wxtoken},
        dataType: 'JSON',
        success: function (data) {
            console.log(data)
            all = data.pageCount
            if (data.code == 0) {
                for (i = 0; i < data.data.length; i++) {
                    var id = data.data[i].id;//获取活动id
                    var activityName = data.data[i].activityName;//获取活动名称
                    var shopIcon = data.data[i].shopIcon//获取活动图片
                    //活动列表
                    var page = '<div class="wecha_Cti_list">' +
                        '<img src="http://' + shopIcon + '" class="wecha_Cti_img">' +
                        '<span>' + activityName + '</span>' +
                        '<input type="button" value="立即参与" class="wecha_Cti_but" flag="' + id + '">'
                        + '</div>'
                    $('.wecha_Cti_box').append(page)

                }

                $('.wecha_Cti_but').click(function () {
                    var id = $(this).attr('flag')   //获取点击活动的id
                    $.cookie('wx_cti_id', id, {path: '/'})//将id存到cookie
                    window.location.href = 'wx_cti_details.html'

                })


            }

        }


    })


    var isbool = true;//触发开关，防止多次调用事件
    //页面滚动事件，当页面滚动到底端再次请求接口加载数据
    $(window).scroll(function () {
        if (($(this).scrollTop() + $(window).height()) >= $(document).height() && isbool == true) {
            pageNum++
            isbool = false;

            $.ajax({
                async: false,
                type: 'GET',
                url: Ctilist,
                data: {'size': 6, 'page': pageNum},
                headers: {'token': wxtoken},
                dataType: 'JSON',
                success: function (data) {
                    console.log(data)
                    if (data.code == 0) {
                        for (i = 0; i < data.data.length; i++) {
                            var id = data.data[i].id;//获取活动id
                            var activityName = data.data[i].activityName;//获取活动名称
                            var shopIcon = data.data[i].shopIcon//获取活动图片
                            //活动列表
                            var page = '<div class="wecha_Cti_list">' +
                                '<img src="http://' + shopIcon + '" class="wecha_Cti_img">' +
                                '<span>' + activityName + '</span>' +
                                '<input type="button" value="立即参与" class="wecha_Cti_but" flag="' + id + '">'
                                + '</div>'
                            $('.wecha_Cti_box').append(page)
                            isbool = true;
                        }

                        $('.wecha_Cti_but').click(function () {
                            var id = $(this).attr('flag')   //获取点击活动的id
                            $.cookie('wx_cti_id', id, {path: '/'})//将id存到cookie
                            window.location.href = 'wx_cti_details.html'

                        })


                    }

                }
            })


        }
    });


})