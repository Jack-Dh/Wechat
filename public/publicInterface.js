var wxtoken = $.cookie('wxtoken');//获取存在cookie中的token

var rewardList='http://jiajiachuang.cn/junran/client/account/list?'//首页消息轮播获奖信息

var userInformation='http://jiajiachuang.cn/junran/client/account/get'//获取用户信息

var Ctilist= 'http://jiajiachuang.cn/junran/client/activity/search'//所有活动信息

var CtiDetails='http://jiajiachuang.cn/junran/client/activity/get'//活动详情

var wxSecurity ='http://jiajiachuang.cn/junran/client/wxJsapiSignature'//调取微信安全验证

var saveFile='http://jiajiachuang.cn/junran/client/wxUpload'//存储微信返回的信息

var participateCti='http://jiajiachuang.cn/junran/client/useractivity/upsert'//参与活动

var partCtiDetails='http://jiajiachuang.cn/junran/client/useractivity/get'//当前参与活动的详情

var partCtiList='http://jiajiachuang.cn/junran/client/useractivity/list'//当前用户参与所有活动的列表

var wxSet='http://jiajiachuang.cn/junran/client/account/wxsetting/get'//微信公众号设置

