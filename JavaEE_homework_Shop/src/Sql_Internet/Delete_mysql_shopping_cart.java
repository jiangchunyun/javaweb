package Sql_Internet;

import java.sql.*;

public class Delete_mysql_shopping_cart {
    private String DB_URL = "jdbc:mysql://localhost:3306/javaee_homework_shop?characterEncoding=UTF-8";
    // 数据库的用户名与密码，需要根据自己的设置
    private String USER = "root";
    private String PASS = "";
    private int count;
    public String select_result(String user_name,String people_name) {
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
            sql = "delete from shopping_cart_list where user_name='" +user_name+ "' and people_name='"+people_name+"'";
            PreparedStatement pre = (PreparedStatement) conn.prepareStatement(sql);
            count = pre.executeUpdate();
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
        if(count>0)
            return "1";
        else
        return "0";
    }

}
