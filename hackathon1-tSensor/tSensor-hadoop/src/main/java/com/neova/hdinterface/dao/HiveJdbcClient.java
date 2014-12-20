package com.neova.hdinterface.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class HiveJdbcClient {
	
	private static final String DRIVER_NAME = "org.apache.hadoop.hive.jdbc.HiveDriver";
	private static final String HIVE_URL = "jdbc:hive://192.168.1.211:10001/default";
	private static final String HIVE_UNAME = "";
	private static final String HIVE_PWD = "";
	private static Connection con;
	
	private HiveJdbcClient() {}

	public static Connection getConnection() {
		try {
			if (con == null) {
				synchronized (HiveJdbcClient.class) {
					if (con == null) {
						Class.forName(DRIVER_NAME);
						con = DriverManager.getConnection(HIVE_URL,
								HIVE_UNAME, HIVE_PWD);
						System.out.println("Successfuly Connected to database...!");
					}
				}// End of synchronized block.
			}// End of if block.
		} catch (SQLException e) {
			System.out.println("Can Not able to connect to database pls check your settings \n"	+ e);
		} catch (ClassNotFoundException e) {
			System.out.println("Can Not able to connect to database pls check your settings \n"	+ e);
		}// End of try-catch block. 
		return con;
	}// End of getConnection() Method.
	
	public static ResultSet executeQuery(String sql) {
		ResultSet set = null;
		try {
			if (sql != null) {
				set = getConnection().createStatement().executeQuery(sql);
			}
		} catch (SQLException e) {
			System.out.println("Error while executing query " + e);
		}// End of try-catch block.
		return set;
	}// End of executeQuery() Method.
	
	public static Integer executeUpdate(String sql) {
		int rows = 0;
		try {
			rows = getConnection().createStatement().executeUpdate(sql);
		} catch (SQLException e) {
			System.out.println("Error while executing query " + e);
		}// End of try-catch block.
		return rows;
	}//End of executeUpdate() Method.
	
	
	public static Integer executeUpdate(String timestamp, float temp, String sensorName) {
		int rowsAffected = 0;
		String sql = "INSERT INTO TABLE hd_temperature VALUES (?,?,?)";
		try {
			PreparedStatement preparedStatement =
					getConnection().prepareStatement(sql);
			preparedStatement.setString(1, timestamp);
			preparedStatement.setFloat(2, temp);
			preparedStatement.setString(3, sensorName);
			rowsAffected = preparedStatement.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return rowsAffected;
	}
	
	public static void main(String[] args) throws ParseException, SQLException {
		DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
		Date date = dateFormat.parse("23/09/2007");
		long time = date.getTime();
		System.out.println(new Timestamp(time).toString());
		//executeUpdate(new Timestamp(time).toString(), 102, "ashish");
		//executeQuery("TRUNCATE TABLE hd_temperature");
		//ResultSet res = executeQuery("SELECT HOUR(t.time_stamp),avg(t.temp) FROM hd_temperature t GROUP BY HOUR(t.time_stamp)");
		ResultSet res = executeQuery("SELECT * FROM hd_temperature");
		while (res.next()) {
			System.out.println(String.valueOf(res.getString(1)) + '\t'
					+ String.valueOf(res.getFloat(2)) + '\t'
					+ String.valueOf(res.getString(3)));
	    }
	}
}//End of HiveJdbcClient Class.
