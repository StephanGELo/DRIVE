var fs = require('fs');

var wstream = fs.createWriteStream('activeDriverData.csv');

var cities = {
  'San Francisco' : {
    lattitudes: [37.73, 37.83],
    longitudes: [122.37, 122.47]
  },

  'Seattle' : {
    lattitudes: [47.56, 47.66],
    longitudes: [122.28, 122.38]
  },
  'Los Angeles' : {
    lattitudes: [34, 35],
    longitudes: [122.37, 122.47]
  },
  'Miami' : {
    lattitudes: [25.71, 25.81],
    longitudes: [80.14, 80.24]

  },
  'New York' : {
    lattitudes: [40.66, 40.76],
    longitudes: [73.96, 74.04]
  }
}

var timeFrame = {
  'jan01' : 1514764800,
  'jan02' : 1514851200
}

var driverId = 0;

var generateDriverIds = function() {
  return driverId += 1;
}

for (var k in cities) {
  for (var i = 0; i < 1000000; i++) {
    var start = [(Math.random() * (cities[k]['lattitudes'][1] - cities[k]['lattitudes'][0]) + cities[k]['lattitudes'][0]).toFixed(2) * 1, (Math.random() * (cities[k]['lattitudes'][1] - cities[k]['lattitudes'][0]) + cities[k]['lattitudes'][0]).toFixed(2) * 1];
    var time = (Math.random() * (timeFrame['jan02'] - timeFrame['jan01']) + timeFrame['jan01']).toFixed(0) * 1;
    wstream.write(generateDriverIds() +';'+ JSON.stringify(start) + ';'+ time + '\n');
  }
}

wstream.end();







// for (var k in cities) {
//   var driverId += 1 ;
//   for (var i = 0; i < 1000000; i++) {
//     var driverId += i;
//     var start = [(Math.random() * (cities[k]['lattitudes'][1] - cities[k]['lattitudes'][0]) + cities[k]['lattitudes'][0]).toFixed(2) * 1, (Math.random() * (cities[k]['lattitudes'][1] - cities[k]['lattitudes'][0]) + cities[k]['lattitudes'][0]).toFixed(2) * 1];
//     var time = (Math.random() * (timeFrame['jan02'] - timeFrame['jan01']) + timeFrame['jan01']).toFixed(0) * 1;
//     wstream.write(driverId +','+ JSON.stringify(start) + ','+ time + '\n');
//   }
// }


// wstream.end();

// const fs = require('fs');
// var writeStream = fs.createWriteStream('test-output10.csv');
// for(var i = 0; i < 4000000; i++) {
//   var start = [(Math.random() * (37.83 - 37.73) + 37.73).toFixed(2) * 1, (Math.random() * (122.47 - 122.37) + 122.37).toFixed(2) * 1];
//   var end = [(Math.random() * (37.83 - 37.73) + 37.73).toFixed(2) * 1, (Math.random() * (122.47 - 122.37) + 122.37).toFixed(2) * 1];
//   var distance = Math.floor(Math.random() * (7 - 1)) + 1;
//   var time1 = Math.floor(Math.random() * (1517356800 - 1514764800)) + 1514764800;
//   var price = Math.round(Math.random() * (25 - 4) + 4, 2);
//   var time2 = Math.floor(Math.random() * ((time1 + 30000) - time1)) + time1;
//   var accept = Math.random() >= 0.5;
//   var time3 = Math.floor(Math.random() * ((time2 + 30000) - time2)) + time2;
//   writeStream.write(i + ',' + JSON.stringify(start) + ',' + JSON.stringify(end) + ',' + time1 + ',' + price + ',' + time2 + ',' + accept + ',' + time3 + '\n');
// }
// writeStream.end();