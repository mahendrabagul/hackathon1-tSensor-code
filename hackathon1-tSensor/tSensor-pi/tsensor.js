var sensorLib = require('node-dht-sensor');
var gpio = require('pi-gpio');

const tSensorVersion = 11;
const gpioPin = 4;
const ledBoardPin = 16;
const scanInterval = 2000;
const signalHigh = 1;
const signalLow = 0;

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
    read: function (duration) {
        var readout = sensorLib.read();
	flashLED(ledBoardPin, scanInterval);
        console.log('Temperature: ' + readout.temperature.toFixed(2) + 'C, ' +

            'humidity: ' + readout.humidity.toFixed(2) + '%');
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
