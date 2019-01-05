package Sql_Internet;
import Class_name.User;
import com.google.gson.Gson;

import java.sql.*;
import java.util.Vector;

public class Insert_mysql_buy_list {
    private String DB_URL = "jdbc:mysql://localhost:3306/javaee_homework_shop?characterEncoding=UTF-8";
    // 数据库的用户名与密码，需要根据自己的设置
    private String USER = "root";
    private String PASS = "";
    private int state;
    private ResultSet rs;
    private int money;
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
            sql= "INSERT INTO buy_list (user_name,people_name) VALUES ('"+user_name+"',"+"'"+people_name+"');";
            state= stmt.executeUpdate(sql);
            sql = "SELECT * FROM people where  name='" + people_name + "'";
            rs = stmt.executeQuery(sql);
            while (rs.next()) {
                 money = Integer.parseInt(rs.getString("price"));
            }
            sql = "update user set money=money" + "-"+money + " where name='" + user_name + "'";
            PreparedStatement pre = (PreparedStatement) conn.prepareStatement(sql);
            count = pre.executeUpdate();
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
        if(state>0&&count>0)
            return "1";
        else
        return "0";
    }

}
