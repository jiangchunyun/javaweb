//加载所有已拥有的英雄
function select_mysql_shopping_cart_people() {
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/show_shopping_cart_people",
        data: {
            name: getCookie("name")
        },
        dataType: "json",
        async: true,
        success: function (data) {
            var people = eval(data);
            for (var i = 0; i < people.length; i++)
                $(".Show_soldier").append(' <div class="item"> <span class="name">' + people[i].name + '</span>' + '<span class="price">' + people[i].price + '</span>' + ' <button type="button" value="' + people[i].name + '"  class="quick_buy" >立即支付</button> <img src="' + people[i].img + '" style="width: 8.5em;height: 12em;margin-left: 0.25em; margin-top: 0.25em"><button type="button" class="item_button" value="' + people[i].name + '" >待付款</button></div>');
            click_item_button();
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

//立即支付的监听函数
function click_item_button() {
    $(document).ready(function () {

        //立即付款点击提交
        $(".item .quick_buy").click(function () {
            var price = $(this).parent().find(".price").text();
            $.ajax({
                type: "POST",
                url: "http://localhost:8080/Buy_pelple_shopping_cart",
                data: {
                    name: getCookie("name"),
                    people: $(this).val()
                },
                dataType: "text",
                async: true,
                success: function (data) {
                    if (data == 1) {
                        alert("付款成功");
                        setCookie("money", getCookie("money") - price)
                    }
                    else {
                        alert("付款失败");
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert("出错");
                }
            });
            $.ajax({
                type: "POST",
                url: "http://localhost:8080/Delete_mysql_shopping_cart",
                data: {
                    name: getCookie("name"),
                    people: $(this).val()
                },
                dataType: "text",
                async: true,
                success: function (data) {
                    if (data == 1) {
                    }
                    else {
                        alert("付款失败");
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert("出错");
                }
            });
            $(this).parent().remove();

        });
    });
}

//设置cookie
function setCookie(name, value) {
    var argv = arguments;
    var argc = arguments.length;
    var expires = (argc > 2) ? argv[2] : null;
    var path = (argc > 3) ? argv[3] : '/';
    var domain = (argc > 4) ? argv[4] : null;
    var secure = (argc > 5) ? argv[5] : false;
    document.cookie = name + "=" + escape(value) +
        ((expires == null) ? "" : ("; expires=" + expires.toGMTString())) +
        ((path == null) ? "" : ("; path=" + path)) +
        ((domain == null) ? "" : ("; domain=" + domain)) +
        ((secure == true) ? "; secure" : "");
};

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