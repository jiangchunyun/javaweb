package Sql_Internet;


import Class_name.People;
import com.google.gson.Gson;

import java.sql.*;
import java.util.Vector;

/**
 * Created by 上官刀刀 on 2017/10/10.
 */
public class Select_mysql_shopping_cart_people {
    private String DB_URL = "jdbc:mysql://localhost:3306/javaee_homework_shop?characterEncoding=UTF-8";
    // 数据库的用户名与密码，需要根据自己的设置
    private String USER = "root";
    private String PASS = "";
    private ResultSet rs;
    private Vector<People> peopleVector = new Vector<People>();
    private Gson gson = new Gson();

    public String select_result(String name) {
        Connection conn = null;
        Statement stmt = null;
        try {
            // 注册 JDBC 驱动
            Class.forName("com.mysql.jdbc.Driver");
            // 打开链接
            conn = DriverManager.getConnection(DB_URL, USER, PASS);
            // 执行查询
            stmt = conn.createStatement();
            String sql;
            sql = "SELECT  shopping_cart_list.people_name,shopping_cart_list.price, people.img  FROM shopping_cart_list,people  where shopping_cart_list.people_name=people.name and shopping_cart_list.user_name='" + name + "'";

            rs = stmt.executeQuery(sql);
            while (rs.next()) {
                String people_name = rs.getString("shopping_cart_list.people_name");
                String price = rs.getString("shopping_cart_list.price");
                String img = rs.getString("people.img");
                People people = new People();
                people.setName(people_name);
                people.setImg(img);
                people.setPrice(price);
                peopleVector.add(people);
            }
            rs.close();
            stmt.close();
            conn.close();
        } catch (SQLException se) {
            // 处理 JDBC 错误
            se.printStackTrace();
        } catch (Exception e) {
            // 处理 Class.forName 错误
            e.printStackTrace();
        } finally {
            // 关闭资源
            try {
                if (stmt != null) stmt.close();
            } catch (SQLException se2) {
            }// 什么都不做
            try {
                if (conn != null) conn.close();
            } catch (SQLException se) {
                se.printStackTrace();
            }
        }
        return gson.toJson(peopleVector);
    }

}