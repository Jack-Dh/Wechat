$(function () {
    var wxtoken = $.cookie('wxtoken');//获取存在cookie中的token
    $('.wecha_nav_right').addClass('wecha_nav_fontColor');
    $('.wecha_nav_left').removeClass('wecha_nav_fontColor');
    $('#wecha_myind_list_on').click(function () {
      window.location.href='myCtilist.html'

    })



    $.ajax({
        async: false,
        type: 'GET',
        url:userInformation,
        headers: {'token': wxtoken},
        dataType: 'JSON',
        success: function (data) {
            console.log(data)
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

})