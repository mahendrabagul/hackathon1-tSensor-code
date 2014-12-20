/**
 * TempReportController
 *
 * @description :: Server-side logic for managing Tempreports
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	'create' : function(req, res) {
      	var avgTempLastHour = req.param('avgTempLastHour')||null;
      	var avgTempYesterday = req.param('avgTempYesterday') || null;
      	var avgTempLastMonth = req.param('avgTempLastMonth') || null;
      	var highestTempCurrentMonth = req.param('highestTempCurrentMonth') || null;
      	var lowestTempCurrentMonth = req.param('lowestTempCurrentMonth') || null;

        if(avgTempLastHour === null) {
            return res.json("Please provide avgTempLastHour");
        }
        if(avgTempYesterday === null) {
            return res.json("Please provide avgTempYesterday");
        }
        if(avgTempLastMonth === null) {
            return res.json("Please provide avgTempLastMonth");
        }
        if(highestTempCurrentMonth === null) {
            return res.json("Please provide highestTempCurrentMonth");
        }
        if(lowestTempCurrentMonth === null) {
            return res.json("Please provide lowestTempCurrentMonth");
        }
       
        TempReport.createReport(avgTempLastHour, avgTempYesterday, avgTempLastMonth, highestTempCurrentMonth,lowestTempCurrentMonth, function(err, created) {
            if(err) {
                return res.json({error: err});
            } else {
                return res.json(created);
            }
        });
    },

    'update' : function(req, res) {
      	var avgTempLastHour = req.param('avgTempLastHour');
      	var avgTempYesterday = req.param('avgTempYesterday');
      	var avgTempLastMonth = req.param('avgTempLastMonth');
      	var highestTempCurrentMonth = req.param('highestTempCurrentMonth');
      	var lowestTempCurrentMonth = req.param('lowestTempCurrentMonth');  
        var id = req.param('id');
        TempReport.updateReport(id,avgTempLastHour, avgTempYesterday, avgTempLastMonth, highestTempCurrentMonth,lowestTempCurrentMonth, function(err, updated) {
            if(err) {
                return res.json({error: err});
            } else {
                return res.json(updated[0]);
            }
        });
    },

    'find' : function(req, res) {
        TempReport.getReport(function(err, result) {
            if(err) {
                return res.json({error: err});
            } else {
                return res.json(result[0]);
            }
        });
    }
};

