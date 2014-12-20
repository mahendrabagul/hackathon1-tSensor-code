/**
* TempReport.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	schema : false,
	
	attributes: {
		avgTempLastHour: {
			type : 'string'
		},
		avgTempYesterday: {
			type : 'string'
		},
		avgTempLastMonth: {
			type : 'string'
		},
		highestTempCurrentMonth: {
			type : 'string'
		},
		lowestTempCurrentMonth: {
			type : 'string'
		}
	},
 	
 	/**
     * Creates a TempReport Record
     * @param 
     */
    createReport: function (avgTempLastHour, avgTempYesterday, avgTempLastMonth, highestTempCurrentMonth,lowestTempCurrentMonth, cb) {
        TempReport.create({avgTempLastHour:avgTempLastHour,avgTempYesterday:avgTempYesterday,avgTempLastMonth:avgTempLastMonth,highestTempCurrentMonth: highestTempCurrentMonth,lowestTempCurrentMonth:lowestTempCurrentMonth}).exec(function onCreate(err, created) {
            return cb(err, created);
        });
    },

    /**
     * Updates a TempReport Record
     * @param 
     */
    updateReport: function (id,avgTempLastHour, avgTempYesterday, avgTempLastMonth, highestTempCurrentMonth,lowestTempCurrentMonth, cb) {
         TempReport.update(id,{avgTempLastHour:avgTempLastHour,avgTempYesterday:avgTempYesterday,avgTempLastMonth:avgTempLastMonth,highestTempCurrentMonth: highestTempCurrentMonth,lowestTempCurrentMonth:lowestTempCurrentMonth}).exec(function onUpdate(err, updated) {
             return cb(err, updated);
        });
    },
    /**
     * Gets a TempReport Record
     * @param 
     */
    getReport: function (cb) {
        TempReport.find().exec(function onFound(err, result) {
            return cb(err, result);
        });
    }


};
 

