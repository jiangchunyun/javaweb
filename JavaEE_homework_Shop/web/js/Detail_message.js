//显示详细信息
function show_detail_message() {
    var Request = GetRequest();
    var name = Request['name'];
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/show_detail_message",
        data: {
            name: name
        },
        dataType: "json",
        async: true,
        success: function (data) {
            var people = eval(data);
            $(".message_name").text(people[0].name);
            $(".message_type").text(people[0].type+":");
            $(".message_live").text("生存能力:"+people[0].live_able);
            $(".message_attrack").text("攻击能力:"+people[0].attack_able);
            $(".message_skill").text("技能效果:"+people[0].skill);
            $(".message_leval").text("上手难度:"+people[0].start_difficult);
            $(".Detail_message").css("background-image","url("+people[0].img+")");


        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("出错");
        }
    });
}

//获取cookie
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
}

//接受参数
function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}
//跳回首页
function main_html() {
    if (getCookie("name").length > 0)
        window.location.href = "index.html";
    else
        alert("您没有登录账户")
}