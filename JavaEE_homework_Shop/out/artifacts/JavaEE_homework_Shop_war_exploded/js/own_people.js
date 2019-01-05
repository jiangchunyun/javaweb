//加载所有已拥有的英雄
function select_mysql_own_people() {
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/show_own_people",
        data: {
            name: getCookie("name")
        },
        dataType: "json",
        async: true,
        success: function (data) {
            var people = eval(data);
            for (var i = 0; i < people.length; i++)
                $(".Show_soldier").append(' <div class="item"> <span class="name">' + people[i].name + '</span> <img src="' + people[i].img + '" style="width: 8.5em;height: 12em;margin-left: 0.25em; margin-top: 0.25em"><button type="button" class="item_button" value="' + people[i].name + '" >已拥有</button></div>');
            $(".item img").click(
                function () {
                    window.location.href = "Detail_message.html?name=" + $(this).parent().find(".name").text(), $(this).parent().find(".name").text();
                }
            );
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
//跳回首页
function main_html() {
    if (getCookie("name").length > 0)
        window.location.href = "index.html";
    else
        alert("您没有登录账户")
}