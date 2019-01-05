//显示正在登录的用户
function show_user() {
    if (getCookie("name").length > 0) {
        $("#button999").show();
        $("#button666").hide();
        $("#button777").hide();
        $(".login_class").append('<span class="shopping_cart" style=" color: #838B8B;border: none;width: 250px;height: 23px;margin-right: 10px;font-weight: normal; font-family: 楷体 " ><b>'+"&nbsp&nbsp用户："+getCookie("name")+"&nbsp&nbsp金币："+getCookie("money")+'</b></span>');

    }
}
//登录函数：设置登录后的界面
function Login() {
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/login",
        data: {
            name: $("#signin-username").val(),
            password: $("#signin-password").val()
        },
        dataType: "json",
        async: true,
        success: function (data) {
            var user = eval(data);
            if (user.length > 0) {
                setCookie("name", user[0].name);
                setCookie("money", user[0].money);
                $(".cd-user-modal").hide();
                alert("登录成功");
                $("#button999").show();
                $("#button666").hide();
                $("#button777").hide();
                $(".login_class").append('<span class="shopping_cart" style=" color: #838B8B;border: none;width: 250px;height: 23px;margin-right: 10px;font-weight: normal; font-family: 楷体 " ><b>'+"&nbsp&nbsp用户："+user[0].name+"&nbsp&nbsp金币："+user[0].money+'</b></span>');

            }
            else {
                alert("用户名或者密码错误");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("出错");
        }
    });


}

//注册函数
function Register() {
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/register_user",
        data: {
            name: $("#signup-username").val(),
            password: $("#signup-password").val()
        },
        dataType: "text",
        //  async: true,
        success: function (data) {
            if (data == 1) {
                alert("注册成功");
            }
            else {
                alert("用户名已存在");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("系统出错");
        }
    });
}

//跳转到战士页面，需要先登录
function lister_soldier() {
    if (getCookie("name").length > 0)
        window.location.href = "soldier_shop.html";
    else
        alert("您没有登录账户")
}

function lister_own_people() {
    if (getCookie("name").length > 0)
        window.location.href = "own_people.html";
    else
        alert("您没有登录账户")
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
//加载页面时处理函数
$(document).ready(function () {
    show_user();
    $("#form11111").validate({
        rules: {
            name: {
                required: true,
                minlength: 2,
                maxlength: 10,
            },
            password1: {
                required: true,
                minlength: 6,
                maxlength: 15,
            }
        },
        messages: {
            name: {
                required: "用户名必须填写",
                minlength: "最小长度是2个字",
                maxlength: "最大长度是10个字",
            },
            password1: {
                required: "密码是必须填写的",
                minlength: "最小的长度是6位",
                maxlength: "最大的长度是15位",
            }
        }
    })

})
//购物车的显示
function show_shopping_cart() {
    if (getCookie("name").length > 0)
        window.location.href = "show_shopping_cart.html";
    else
        alert("您没有登录账户")
}
//辅助英雄显示
function show_assistant() {
    if (getCookie("name").length > 0)
        window.location.href = "assistant_shop.html";
    else
        alert("您没有登录账户")
}
//刺客英雄显示
function show_stabber() {
    if (getCookie("name").length > 0)
        window.location.href = "stabber_shop.html";
    else
        alert("您没有登录账户")
}
//法师英雄显示
function show_magic() {
    if (getCookie("name").length > 0)
        window.location.href = "magic_shop.html";
    else
        alert("您没有登录账户")
}
//射手英雄显示
function show_shooter() {
    if (getCookie("name").length > 0)
        window.location.href = "shooter_shop.html";
    else
        alert("您没有登录账户")
}