//加载所有的战士英雄
function select_mysql_soldier() {
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/show_soldier",
        data: {
            type: "战士"
        },
        dataType: "json",
        async: true,
        success: function (data) {
            var people = eval(data);
            for (var i = 0; i < people.length; i++)
                $(".Show_soldier").append(' <div class="item"> <span class="name">' + people[i].name + '</span>' + '<span class="price">' + people[i].price + '</span>' + ' <button type="button" value="' + people[i].name + '"  class="shopping_cart" >加入购物车</button> <img src="'+ people[i].img+'" style="width: 8.5em;height: 12em;margin-left: 0.25em; margin-top: 0.25em"><button type="button" class="item_button" value="' + people[i].name + '" >购买</button></div>');
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

//购买英雄,和加入购物车的点击监听函数
function click_item_button() {
    $(document).ready(function () {

        //购买点击提交
        $(".item .item_button").click(function () {
            var price = $(this).parent().find(".price").text();
            $.ajax({
                type: "POST",
                url: "http://localhost:8080/buy_people",
                data: {
                    name: getCookie("name"),
                    people: $(this).val()
                },
                dataType: "text",
                async: true,
                success: function (data) {
                    if (data == 1) {
                        alert("购买成功");
                        setCookie("money", getCookie("money") - price)
                    }
                    else {
                        alert("购买失败");
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert("出错");
                }
            });

        });
        $(".shopping_cart").click(function () {
            $.ajax({
                type: "POST",
                url: "http://localhost:8080/insert_into_shopping_cart",
                data: {
                    name: getCookie("name"),
                    people: $(this).val(),
                    price: $(this).parent().find(".price").text()
                },
                dataType: "text",
                async: true,
                success: function (data) {
                    if (data == 1) {
                        alert("成功加入购物车");
                    }
                    else {
                        alert("加入购物车失败");
                    }

                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert("出错");
                }
            });
        });
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
//跳回首页
function main_html() {
    if (getCookie("name").length > 0)
        window.location.href = "index.html";
    else
        alert("您没有登录账户")
}