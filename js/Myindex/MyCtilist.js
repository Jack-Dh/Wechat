$(function () {
    var wxtoken = $.cookie('wxtoken');//获取存在cookie中的token
    //当前选中是’我的‘给当前选中高亮显示
    $('.wecha_nav_right').addClass('wecha_nav_fontColor');
    $('.wecha_nav_left').removeClass('wecha_nav_fontColor');
    $('.all').addClass('selected')
    $.ajax({
        async: false,
        type: 'GET',
        url: userInformation,
        headers: {'token': wxtoken},
        dataType: 'JSON',
        success: function (data) {
            console.log(data)
            if (data.code == 0) {
                var headimgurl = data.rs.headimgurl  //获取用户头像
                var nickname = data.rs.nickname//获取用户名
                $('.wecha_index_top_img').attr('src', headimgurl);
                $('#wecha_index_name').text(nickname)

                //参与活动列表
                $.ajax({
                    async: false,
                    type: 'GET',
                    url:partCtiList,
                    headers: {'token': wxtoken},
                    dataType: 'JSON',
                    success: function (data) {
                        console.log(data)
                        if (data.code == 0) {
                            if (data.rs == 0) {
                                var li = '<li>' + '您当前还未参加活动' + '</li>'
                                $('.wecha_myind_list').append(li)
                            } else {

                                for (i = 0; i < data.rs.length; i++) {

                                    var activityName = data.rs[i].activityName //活动名称
                                    var id = data.rs[i].id//查询当前记录id
                                    var state = data.rs[i].state//状态


                                    if (state == '01') {
                                        state = '待审核'
                                    } else if (state == '02') {
                                        state = '审核通过'
                                    } else {
                                        state = '审核拒绝'
                                    }


                                    var li = '<li class="wecha_myind_list_li">' +
                                        '<span class="wx_activityName">' + activityName + '</span>' +
                                        '<span class="wx_myctistate">' + state + '</span>' +
                                        '<img class="details_img" src="../../img/details.png" flag="' + id + '">'
                                        + '</li>'


                                    $('.wecha_myind_list').append(li)

                                }
                                $('.details_img').click(function () {
                                    var xiangqingid = $(this).attr('flag')
                                    $.cookie('xiangqingid', xiangqingid, {path: '/'})
                                    window.location.href = '../../page/mypage/MyCti_details.html'
                                })

                            }

                        } else {
                            alert('加载错误！')
                        }


                    }

                })

                //全部活动
                $('.all').click(function () {
                    $(this).addClass('selected').siblings().removeClass('selected')
                    $('.all img').attr('src', '../../img/Imgsification/allchoose.png')
                    $('.audit img').attr('src', '../../img/Imgsification/audit.png')
                    $('.Refused img').attr('src', '../../img/Imgsification/Refused.png')
                    $('.send img').attr('src', '../../img/Imgsification/send.png')

                    $.ajax({
                        async: false,
                        type: 'GET',
                        url: partCtiList,
                        headers: {'token': wxtoken},
                        dataType: 'JSON',
                        success: function (data) {
                            console.log(data)
                            $('.wecha_myind_list li').remove()
                            if (data.code == 0) {
                                if (data.rs == 0) {
                                    var li = '<li>' + '您当前还未参加活动' + '</li>'
                                    $('.wecha_myind_list').append(li)
                                } else {

                                    for (i = 0; i < data.rs.length; i++) {

                                        var activityName = data.rs[i].activityName //活动名称
                                        var id = data.rs[i].id//查询当前记录id
                                        var state = data.rs[i].state//状态
                                        if (state == '01') {
                                            state = '待审核'
                                        } else if (state == '02') {
                                            state = '审核通过'
                                        } else {
                                            state = '审核拒绝'
                                        }


                                        var li = '<li class="wecha_myind_list_li">' +
                                            '<span class="wx_activityName">' + activityName + '</span>' +
                                            '<span class="wx_myctistate">' + state + '</span>' +
                                            '<img class="details_img" src="../../img/details.png" flag="' + id + '">'
                                            + '</li>'


                                        $('.wecha_myind_list').append(li)

                                    }
                                    $('.details_img').click(function () {
                                        var xiangqingid = $(this).attr('flag')
                                        $.cookie('xiangqingid', xiangqingid, {path: '/'})
                                        window.location.href = '../../page/mypage/MyCti_details.html'
                                    })

                                }

                            } else {
                                alert('加载错误！')
                            }


                        }

                    })
                })

                //待审核活动
                $('.audit').click(function () {

                    $(this).addClass('selected').siblings().removeClass('selected')

                    $('.all img').attr('src', '../../img/Imgsification/all.png')
                    $('.audit img').attr('src', '../../img/Imgsification/chooseaudit.png')
                    $('.Refused img').attr('src', '../../img/Imgsification/Refused.png')
                    $('.send img').attr('src', '../../img/Imgsification/send.png')

                    $.ajax({
                        async: false,
                        type: 'GET',
                        url: partCtiList,
                        headers: {'token': wxtoken},
                        data: {'state': '01'},
                        dataType: 'JSON',
                        success: function (data) {
                            console.log(data)
                            $('.wecha_myind_list li').remove()
                            if (data.code == 0) {
                                if (data.rs == 0) {
                                    var li = '<li>' + '您当前还未有活动待审核!' + '</li>'
                                    $('.wecha_myind_list').append(li)
                                } else {

                                    for (i = 0; i < data.rs.length; i++) {

                                        var activityName = data.rs[i].activityName //活动名称
                                        var id = data.rs[i].id//查询当前记录id
                                        var state = data.rs[i].state//状态
                                        if (state == '01') {
                                            state = '待审核'
                                        } else if (state == '02') {
                                            state = '审核通过'
                                        } else {
                                            state = '审核拒绝'
                                        }


                                        var li = '<li class="wecha_myind_list_li">' +
                                            '<span class="wx_activityName">' + activityName + '</span>' +
                                            '<span class="wx_myctistate">' + state + '</span>' +
                                            '<img class="details_img" src="../../img/details.png" flag="' + id + '">'
                                            + '</li>'


                                        $('.wecha_myind_list').append(li)

                                    }
                                    $('.details_img').click(function () {
                                        var xiangqingid = $(this).attr('flag')
                                        $.cookie('xiangqingid', xiangqingid, {path: '/'})
                                        window.location.href = '../../page/mypage/MyCti_details.html'
                                    })

                                }

                            } else {
                                alert('加载错误！')
                            }


                        }

                    })

                })

                //已拒绝活动
                $('.Refused').click(function () {

                    $(this).addClass('selected').siblings().removeClass('selected')
                    $('.all img').attr('src', '../../img/Imgsification/all.png')
                    $('.audit img').attr('src', '../../img/Imgsification/audit.png')
                    $('.Refused img').attr('src', '../../img/Imgsification/Refusedchoose.png')
                    $('.send img').attr('src', '../../img/Imgsification/send.png')

                    $.ajax({
                        async: false,
                        type: 'GET',
                        url:partCtiList,
                        headers: {'token': wxtoken},
                        data: {'state': '03'},
                        dataType: 'JSON',
                        success: function (data) {
                            console.log(data)
                            $('.wecha_myind_list li').remove()
                            if (data.code == 0) {
                                if (data.rs == 0) {
                                    var li = '<li>' + '您当前还未有活动被拒绝!' + '</li>'
                                    $('.wecha_myind_list').append(li)
                                } else {

                                    for (i = 0; i < data.rs.length; i++) {

                                        var activityName = data.rs[i].activityName //活动名称
                                        var id = data.rs[i].id//查询当前记录id
                                        var state = data.rs[i].state//状态
                                        if (state == '01') {
                                            state = '待审核'
                                        } else if (state == '02') {
                                            state = '审核通过'
                                        } else {
                                            state = '审核拒绝'
                                        }


                                        var li = '<li class="wecha_myind_list_li">' +
                                            '<span class="wx_activityName">' + activityName + '</span>' +
                                            '<span class="wx_myctistate">' + state + '</span>' +
                                            '<img class="details_img" src="../../img/details.png" flag="' + id + '">'
                                            + '</li>'


                                        $('.wecha_myind_list').append(li)

                                    }
                                    $('.details_img').click(function () {
                                        var xiangqingid = $(this).attr('flag')
                                        $.cookie('xiangqingid', xiangqingid, {path: '/'})
                                        window.location.href = '../../page/mypage/MyCti_details.html'
                                    })

                                }

                            } else {
                                alert('加载错误！')
                            }


                        }

                    })

                })

                //已通过活动
                $('.send').click(function () {

                    $(this).addClass('selected').siblings().removeClass('selected')
                    $(this).addClass('selected').siblings().removeClass('selected')
                    $('.all img').attr('src', '../../img/Imgsification/all.png')
                    $('.audit img').attr('src', '../../img/Imgsification/audit.png')
                    $('.Refused img').attr('src', '../../img/Imgsification/Refused.png')
                    $('.send img').attr('src', '../../img/Imgsification/sendchoose.png')

                    $.ajax({
                        async: false,
                        type: 'GET',
                        url: partCtiList,
                        headers: {'token': wxtoken},
                        data: {'state': '02'},
                        dataType: 'JSON',
                        success: function (data) {
                            console.log(data)
                            $('.wecha_myind_list li').remove()
                            if (data.code == 0) {
                                if (data.rs == 0) {
                                    var li = '<li>' + '您当前还未有活动通过审核!' + '</li>'
                                    $('.wecha_myind_list').append(li)
                                } else {

                                    for (i = 0; i < data.rs.length; i++) {

                                        var activityName = data.rs[i].activityName //活动名称
                                        var id = data.rs[i].id//查询当前记录id
                                        var state = data.rs[i].state//状态
                                        if (state == '01') {
                                            state = '待审核'
                                        } else if (state == '02') {
                                            state = '审核通过'
                                        } else {
                                            state = '审核拒绝'
                                        }


                                        var li = '<li class="wecha_myind_list_li">' +
                                            '<span class="wx_activityName">' + activityName + '</span>' +
                                            '<span class="wx_myctistate">' + state + '</span>' +
                                            '<img class="details_img" src="../../img/details.png" flag="' + id + '">'
                                            + '</li>'


                                        $('.wecha_myind_list').append(li)

                                    }
                                    $('.details_img').click(function () {
                                        var xiangqingid = $(this).attr('flag')
                                        $.cookie('xiangqingid', xiangqingid, {path: '/'})
                                        window.location.href = '../../page/mypage/MyCti_details.html'
                                    })

                                }

                            } else {
                                alert('加载错误！')
                            }


                        }

                    })

                })


            } else {
                alert('加载失败！')
            }
        }
    })

})