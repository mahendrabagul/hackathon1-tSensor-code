IoT and Remote Temperature Control

Phase 1

The core idea is to interface temperature sensor with Raspberry Pi, collect the temperature readings and display those readings on the mobile phone. Also we would use hadoop cluster to save all the temperature changes. These temperature recordings maybe used for analysis in the future.

![Alt text](/high-level-architecture-iot-temperature-sensor.png?raw=true "Highlevel Architecture Diagram"))


Goal

We will place the Raspberry Pi and the temperature sensor at Neova's server room and read current temperature using CoolServerRoom app on the mobile phone


Software 

Javascript, Node.js, Sails.js, ionic framework

Hardware

Raspberry Pi, Temperature Sensor

Reference

Using Javascript on Raspberry Pi to access Temperature sensor DHT11:
https://www.npmjs.com/package/node-dht-sensor
