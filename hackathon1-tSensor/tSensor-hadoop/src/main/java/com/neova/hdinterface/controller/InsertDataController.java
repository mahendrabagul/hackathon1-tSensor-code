package com.neova.hdinterface.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.neova.hdinterface.dao.HiveJdbcClient;

@RestController
public class InsertDataController {
	@RequestMapping(value="/insert")
	public String insertData(@RequestParam(value = "timestamp",required = true) String timestamp,
			@RequestParam(value = "temperatureInC",required = true) String temperatureInC,
			@RequestParam(value = "sensorName",required = true) String  sensorName) {
  		int resultOfQuery= HiveJdbcClient.executeUpdate(timestamp, Float.parseFloat(temperatureInC), sensorName);
		if(resultOfQuery == 0) {
			return "SUCCESS";
		}else{
			return "FAILED";
		}
	}//End of insertData() Method.
}//End of InsertDataController class.
