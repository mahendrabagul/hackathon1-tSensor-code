/**
* CurrentTemp.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	schema : false,
    autoCreatedAt : false,
    autoUpdatedAt : false,
  	attributes: {
    	   	sensorName : {
    			  type : 'string'
    		},
    		temperatureInC : {
   			    type : 'string'
    		},
    		timestamp : {
   		      type : 'string'
    		}
  	},


    /**
     * Creates a CurrentTemp Record
     * @param 
     */
    createCurremtTemp: function (sensorName, temperatureInC, timestamp, cb) {
        CurrentTemp.create({sensorName:sensorName,temperatureInC:temperatureInC,timestamp:timestamp}).exec(function onCreate(err, created) {
            return cb(err, created);
        });
    },

    /**
     * Updates a CurrentTemp Record
     * @param 
     */
    updateCurrentTemp: function (id,sensorName, temperatureInC, timestamp, cb) {
        CurrentTemp.update(id,{sensorName:sensorName, temperatureInC:temperatureInC, timestamp:timestamp}).exec(function onUpdate(err, updated) {
            return cb(err, updated);
        });
    },
    /**
     * Gets a CurrentTemp Record
     * @param 
     */
    getCurrentTemp: function (cb) {
        CurrentTemp.find().exec(function onFound(err, result) {
            return cb(err, result);
        });
    }
};

