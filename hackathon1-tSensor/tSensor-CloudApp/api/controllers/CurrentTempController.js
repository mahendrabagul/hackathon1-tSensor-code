/**
 * CurrentTempController
 *
 * @description :: Server-side logic for managing Currenttemps
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
 
 function calDelay(data){
        var allowDelay = 5;
        var currentTimeStamp = new Date().getTime();
        var loggedTimeStamp = data.timestamp;
        if (currentTimeStamp > loggedTimeStamp){
            console.log("currentTimeStamp="+currentTimeStamp);
            data.timestamp = currentTimeStamp - allowDelay;
            return data;
        } else {
            console.log("loggedTimeStamp="+loggedTimeStamp);
            return data;
        }  
}


module.exports = {
	'create' : function(req, res) {
      	var sensorName = req.param('sensorName')||null;
      	var temperatureInC = req.param('temperatureInC') || null;
      	var timestamp = req.param('timestamp') || null;
      	 
        if(sensorName === null) {
            return res.json("Please provide sensorName");
        }
        if(temperatureInC === null) {
            return res.json("Please provide temperatureInC");
        }
        if(timestamp === null) {
            return res.json("Please provide timestamp");
        }
        
        CurrentTemp.createCurremtTemp(sensorName, temperatureInC, timestamp, function(err, created) {
            if(err) {
                return res.json({error: err});
            } else {
                return res.json(created);
            }
        });
    },

    'update' : function(req, res) {
      	var sensorName = req.param('sensorName');
      	var temperatureInC = req.param('temperatureInC');
      	var timestamp = req.param('timestamp');
        var id = req.param('id');
        CurrentTemp.updateCurrentTemp(id, sensorName, temperatureInC, timestamp, function(err, updated) {
            if(err) {
                return res.json({error: err});
            } else {
                return res.json(updated[0]);
            }
        });
    },
    'find' : function(req, res) {
        CurrentTemp.getCurrentTemp(function(err, result) {
            if(err) {
                return res.json({error: err});
            } else {
                return res.json(calDelay(result[0]));
            }
        });
    } 
};

