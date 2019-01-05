package Buy;

import Sql_Internet.Insert_mysql_buy_list;
import Sql_Internet.Insert_mysql_buy_list_shopping_cart;
import Sql_Internet.Insert_mysql_shopping_cart_list;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class Buy_pelple_shopping_cart extends HttpServlet {
    private String message;
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // 设置响应内容类型
        resp.setCharacterEncoding("UTF-8");//设置将字符以"UTF-8"编码输出到客户端浏览器
        //通过设置响应头控制浏览器以UTF-8的编码显示数据，如果不加这句话，那么浏览器显示的将是乱码
        resp.setHeader("content-type", "text/html;charset=UTF-8");
        // 实际的逻辑是在这里
        Insert_mysql_buy_list_shopping_cart insert_mysql_buy_list_shopping_cart=new Insert_mysql_buy_list_shopping_cart();
        message=insert_mysql_buy_list_shopping_cart.select_result(req.getParameter("name"),req.getParameter("people"));
        System.out.print(message);
        PrintWriter out = resp.getWriter();
        out.println(message );

    }
}
