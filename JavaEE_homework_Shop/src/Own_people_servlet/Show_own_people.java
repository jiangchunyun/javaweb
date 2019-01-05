package Own_people_servlet;

// 导入必需的 java 库

import Sql_Internet.Select_mysql_own_people;
import Sql_Internet.Select_mysql_user_by_soldier;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

// 扩展 HttpServlet 类
public class Show_own_people extends HttpServlet {
    private String message;

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // 设置响应内容类型
        resp.setCharacterEncoding("UTF-8");//设置将字符以"UTF-8"编码输出到客户端浏览器
        //通过设置响应头控制浏览器以UTF-8的编码显示数据，如果不加这句话，那么浏览器显示的将是乱码
        resp.setHeader("content-type", "text/html;charset=UTF-8");
        // 实际的逻辑是在这里
        Select_mysql_own_people select_mysql_own_people = new Select_mysql_own_people();
        message = select_mysql_own_people.select_result(req.getParameter("name"));
        PrintWriter out = resp.getWriter();
        out.println(message);
    }
}