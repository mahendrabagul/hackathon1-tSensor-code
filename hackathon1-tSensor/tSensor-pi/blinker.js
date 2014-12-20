var gpio = require("pi-gpio");

function flashLED(pin, duration) {
    return setInterval(function() {
        gpio.open(pin, "output", function(err) {
            gpio.write(pin, 1, function() {
                setTimeout(function() {
                    gpio.write(pin, 0, function(err) {
                        gpio.close(pin);
                    });
                }, duration/2);
            });
        });
    }, duration);
}

var intervalID = flashLED(16, 2000);

/*
setTimeout(function() {
  try {
    clearInterval(intervalID);
  } catch (err) {
  } finally {
     gpio.write(16, 0, function(err) {
               gpio.close(16);
               });
  } 
}, 60000);
*/
