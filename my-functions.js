 'use strict';

 // const latitudes = [37.78, 40.71, 47.61, 34.05, 25.76, 38.91, 43.65, 29.76, 32.72, 37.34, 33.75, 39.95, 33.45, 41.88, 42.33, 44.98, 39.74, 39.29, 29.42, 35.23]; const longitudes = [122.42, 74.01, 122.33, 118.24, 80.19, 77.04, 79.38, 95.38, 117.16, 121.80, 84.39, 75.17, 112.07, 87.63, 83.05, 93.27, 104.99, 76.61, 98.49, 80.84];
 const timeFrame = {
  'jan01' : 1514764800,
  'jan02' : 1514851200
}
 function generateRandomTime(userContext, events, done) {
   //const city = Math.floor(Math.random() * 20);
   const time = (Math.random() * (timeFrame['jan02'] - timeFrame['jan01']) + timeFrame['jan01']).toFixed(0) * 1;
  // add variables to virtual user's context:
   userContext.vars.time = time;
   // userContext.vars.latitude = latitude;
   // userContext.vars.longitude = longitude;
   // continue with executing the scenario:
   return done();
 }

  module.exports = {
   generateRandomTime
 };