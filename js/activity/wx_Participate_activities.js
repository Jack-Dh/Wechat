$(function () {
    var wxtoken = $.cookie('wxtoken')//获取存在cookie中的token
    var id = $.cookie('wx_cti_id');//获取存在cookie中每条记录的id
    var url = window.location.href//获取当前页面的url地址

    //页面初次加载请求到wx的安全配置信息
    $.ajax({
        async: false,
        type: 'GET',
        url: wxSecurity,
        data: {'url': url},
        headers: {'token': wxtoken},
        dataType: 'JSON',
        success: function (data) {

            var appid = data.rs.appid;
            var noncestr = data.rs.noncestr;
            var signature = data.rs.signature;
            var timestamp = data.rs.timestamp;
            //注入安全配置信息
            wx.config({
                debug: false,
                appId: appid,
                timestamp: timestamp,
                nonceStr: noncestr,
                signature: signature,
                jsApiList: ['chooseImage', 'translateVoice', 'previewImage', 'uploadImage', 'downloadImage', 'getLocalImgData']
            });

            $('#evaluation_img').click(function () {
                wx.chooseImage({
                    count: 1, // 默认9
                    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                    success: function (res) {
                        var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                        $('#evaluation_img').attr('src', localIds);
                        $('.wx_par_btn').click(function () {
                            var wx_par_textarea = $('#wx_par_textarea').val()//获取用户评论
                            var wx_cti_taobaoOrder = $('#wx_cti_taobaoOrder').val()//获取淘宝订单编号
                            var evaluation_img = $('#evaluation_img').attr('src')//获取用户输入的图片

                            //将微信返回的图片地址上传至服务器
                            wx.uploadImage({
                                localId: localIds.toString(),
                                isShowProgressTips: 1,
                                success: function (res) {
                                    //将微信服务器成功返回的地址存入本地服务器
                                    var serverId = res.serverId;
                                    $.ajax({
                                        async: false,
                                        url: saveFile,
                                        headers: {'token': wxtoken},
                                        type: 'POST',
                                        data: {'mediaId': serverId},
                                        dataType: 'JSON',
                                        success: function (data) {
                                            var test = $('#wx_par_textarea').val()//获取用户评价内容
                                            var wx_cti_taobaoOrder = $('#wx_cti_taobaoOrder').val()//获取淘宝订单编号
                                            var img = data.rs.url         //用户好评图片
                                            if (test == '' && id == '' && img == '') {
                                                alert('请求错误')
                                            } else {
                                                var datas = JSON.stringify({
                                                    'activityId': id,
                                                    'comment': test,
                                                    'img': img,
                                                    'taobaoOrder': wx_cti_taobaoOrder
                                                })
                                                //成功参与活动
                                                $.ajax({
                                                    async: false,
                                                    url: participateCti,
                                                    type: 'POST',
                                                    data: datas,
                                                    headers: {'token': wxtoken},
                                                    contentType: "application/JSON;charset=UTF-8",
                                                    complete: function (data) {
                                                        console.log(data)
                                                        if (data.code == 0) {
                                                            alert('已成功参加活动')
                                                            window.location.reload()
                                                        } else {
                                                            alert(data.message)
                                                        }
                                                    }
                                                })

                                            }


                                        }


                                    })
                                }

                            })


                        })


                    }
                });


            })
            $('.wx_par_btn').click(function () {
                var wx_par_textarea = $('#wx_par_textarea').val()//获取用户评论
                var wx_cti_taobaoOrder = $('#wx_cti_taobaoOrder').val()//获取淘宝订单编号
                var evaluation_img = $('#evaluation_img').attr('src')//获取用户输入的图片
                if (wx_par_textarea == '' || wx_cti_taobaoOrder == '' || evaluation_img == '../../img/hont.png') {
                    alert('信息输入不全')
                }


            })
        }

    })

})