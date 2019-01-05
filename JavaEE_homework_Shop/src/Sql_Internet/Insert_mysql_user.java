package Sql_Internet;
import Class_name.User;
import com.google.gson.Gson;

import java.sql.*;
import java.util.Vector;
public class Insert_mysql_user {
    private String DB_URL = "jdbc:mysql://localhost:3306/javaee_homework_shop?characterEncoding=UTF-8";
    // 数据库的用户名与密码，需要根据自己的设置
    private String USER = "root";
    private String PASS = "";
    private ResultSet rs;
    private Vector<User> userVector = new Vector<User>();
    private Gson gson = new Gson();
    private int state;

    public String select_result(String name,String password) {
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
            sql = "SELECT * FROM user where  name='" + name + "'";

            rs = stmt.executeQuery(sql);
            while (rs.next()) {
                String user_name = rs.getString("name");
                String user_password = rs.getString("password");
                User user = new User();
                user.setName(user_name);
                user.setPassword(user_password);
                userVector.add(user);
            }
            if(userVector.size()<=0)
            {
                sql= "INSERT INTO user (name,password) VALUES ('"+name+"',"+"'"+password+"');";
                state= stmt.executeUpdate(sql);
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
        if(userVector.size()>0)
            return "0";
        else
        return "1";
    }

}
