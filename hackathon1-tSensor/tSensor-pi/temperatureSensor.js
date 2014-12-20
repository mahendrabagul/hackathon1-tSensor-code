var sensorLib = require('node-dht-sensor');
var gpio = require('pi-gpio');

const tSensorVersion = 11;
const gpioPin = 4;
const ledBoardPin = 16;
const scanInterval = 2000;
const signalHigh = 1;
const signalLow = 0;

var previousTemp = 0;
var currentTemp = 0;

var pushData = {
post: function(currentTemp, dformat) {

        var Client = require('node-rest-client').Client;

        var client = new Client();

        // set content-type header and data as json in args parameter
        var args = {
          data: { sensorName: "AC Room", temperatureInC:currentTemp, timestamp:dformat },
          headers:{"appkey": "qQasdasdazz3435353fftt2145"} 
        };

        var req = client.post('http://54.193.192.186:1337/currenttemp/update?', args, function(data,response) {
             
            //console.log(data);  // parsed response body as js object
            //console.log(response);  // raw response
            console.log('--------------------Temperature Change Updated To Cloud---------');
        });

        req.on('requestTimeout',function(req){
            console.log("request has expired");
            req.abort();
        });

        req.on('responseTimeout',function(res){
            console.log("response has expired");

        });

        //it's usefull to handle request errors to avoid, for example, socket hang up errors on request timeouts
        req.on('error',function(err){
            console.log('request error',err);
        });


        var hadoopargs = {
            //data: { sensorName: "AC Room", temperatureInC:currentTemp, timestamp:dformat }
        };

        // var reqHadoop = client.get('http://192.168.1.20:8080/hdinterface/insert?timestamp='+dformat+'&temperatureInC='+currentTemp+'&sensorName=AC Room', function(data,response) {
        //     // parsed response body as js object
        //     //console.log(data);
        //     // raw response
        //     //console.log(response);
        //     console.log('--------------------Temperature Change Updated To Hadoop---------');
        // });

        // reqHadoop.on('requestTimeout',function(reqHadoop){
        //     console.log("request has expired");
        //     reqHadoop.abort();
        // });

        // reqHadoop.on('responseTimeout',function(reqHadoop){
        //     console.log("response has expired");

        // });

        // //it's usefull to handle request errors to avoid, for example, socket hang up errors on request timeouts
        // reqHadoop.on('error',function(err){
        //     console.log('request error',err);
        // });
    }
};

// function to flash led:
function flashLED(pin, duration) {
        gpio.open(pin, "output", function(err) {
            gpio.write(pin, signalHigh, function() {
                setTimeout(function() {
                    gpio.write(pin, signalLow, function(err) {
                        gpio.close(pin);
                    });
                }, duration/16);
            });
        });
}

// temperature sensor:
var sensor = {
    initialize: function (sensorVersion, pin) {
        return sensorLib.initialize(sensorVersion, pin);
    },

    getTimeStamp: function() {
         return new Date().getTime();
    },

    read: function (duration) {
        var readout = sensorLib.read();
        flashLED(ledBoardPin, scanInterval);

        var timeStamp = sensor.getTimeStamp();

        currentTemp = readout.temperature.toFixed(2);
        console.log('Temperature: ' + currentTemp + 'C, ' +'humidity: ' + readout.humidity.toFixed(2) + '%'+ '  previousTemp:'+previousTemp+'   Timestamp:'+timeStamp);

        if(previousTemp != currentTemp)
        {
            console.log('---------temp difference, send data---------');
            pushData.post(currentTemp, timeStamp);
        }

        previousTemp = currentTemp;

        setTimeout(function () {
            sensor.read(duration);
        }, duration);
    }
};

if (sensor.initialize(tSensorVersion, gpioPin)) {
    sensor.read(scanInterval);
} else {
    console.warn('Failed to initialize sensor');
}
 


